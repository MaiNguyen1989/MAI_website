'use client';

import React, { useState } from 'react';
import { Question, Lead, LeadScores } from '@/types';
import { initialQuestions } from '@/lib/mockData';
import RadarChart from '@/components/charts/RadarChart';
import DistributionBarChart from '@/components/charts/DistributionBarChart';
import { supabase } from '@/lib/supabase';

export default function DiagnosePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedRole, setSelectedRole] = useState<'leader' | 'agent' | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // Lưu index phương án đã chọn cho mỗi câu
  const [analyzerStatus, setAnalyzerStatus] = useState("Khởi tạo hệ phân tích...");
  
  // Lưu điểm số cuối cùng để đồng bộ DB
  const [computedScores, setComputedScores] = useState<LeadScores>({});

  // Kết quả chi tiết sau tính toán
  const [tvvResult, setTvvResult] = useState<{
    distribution: { g1: number; g2: number; g3: number; g4: number };
    focusStage: 'G1' | 'G2' | 'G3' | 'G4';
    focusStageName: string;
    description: string;
    blindSpots: Array<{ questionText: string; selectedLabel: string; selectedText: string; stage: string }>;
  } | null>(null);

  const [leaderResult, setLeaderResult] = useState<{
    scores: { l: number; p: number; i: number; s: number };
    maturityLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
    maturityLevelName: string;
    description: string;
    focusLevel: string; // Vùng thấu suốt
    transitionLevels: string[]; // Vùng quá độ
    conflictText: string;
    systemShape: string;
    systemShapeDesc: string;
  } | null>(null);

  const [cognitiveHighlights, setCognitiveHighlights] = useState<Array<{ questionText: string; selectedLabel: string; selectedText: string; stage: string }>>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    role: ''
  });

  const [proposal, setProposal] = useState({
    solutionName: '',
    advice: '',
    details: '',
    actions: [] as string[]
  });

  const questionsConfig = initialQuestions;

  const selectRole = (role: 'leader' | 'agent') => {
    setSelectedRole(role);
    const questions = questionsConfig[role];
    setQuizQuestions(questions);
    setCurrentQuestionIdx(0);
    setUserAnswers(Array(questions.length).fill(-1)); // Mặc định chưa chọn (-1)
    
    // Gán role mặc định cho form
    setFormData(prev => ({
      ...prev,
      role: role === 'leader' ? 'Trưởng nhóm' : 'TVV'
    }));

    setStep(2); // Chuyển sang form điền thông tin cá nhân ở đầu
  };

  const selectOption = (optIdx: number) => {
    const updated = [...userAnswers];
    updated[currentQuestionIdx] = optIdx;
    setUserAnswers(updated);
  };

  const prevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Chuyển sang Step 4 (Loading phân tích)
      setStep(4);
      
      setTimeout(() => setAnalyzerStatus("Đánh giá các chỉ số và dữ liệu..."), 500);
      setTimeout(() => setAnalyzerStatus("Đang vẽ sơ đồ năng lực..."), 1000);
      setTimeout(() => {
        calculateResult();
        setStep(5);
      }, 1500);
    }
  };

  const saveLeadData = async (
    roleType: 'leader' | 'agent',
    rawScores: LeadScores,
    tvvRes: any,
    ldrRes: any
  ) => {
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const leadId = 'l-' + Date.now();

    const newLead: Lead = {
      id: leadId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      role: formData.role || (roleType === 'leader' ? 'Trưởng nhóm' : 'TVV'),
      scores: rawScores,
      date
    };

    // Đính kèm thêm kết quả phân tích sâu vào trường scores để lưu trữ DB
    const scoresPayload = {
      ...rawScores,
      selectedRole: roleType,
      focusStage: tvvRes ? tvvRes.focusStage : undefined,
      focusStageName: tvvRes ? tvvRes.focusStageName : undefined,
      maturityLevel: ldrRes ? ldrRes.maturityLevel : undefined,
      maturityLevelName: ldrRes ? ldrRes.maturityLevelName : undefined,
      systemShape: ldrRes ? ldrRes.systemShape : undefined,
      conflictDetected: ldrRes ? (ldrRes.conflictText !== "") : undefined
    };

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          id: newLead.id,
          name: newLead.name,
          phone: newLead.phone,
          email: newLead.email,
          company: newLead.company,
          role: newLead.role,
          scores: scoresPayload,
          date: newLead.date
        });
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase chưa cấu hình hoặc gặp lỗi kết nối. Hệ thống tự động chuyển sang chế độ lưu trữ LocalStorage dự phòng. Lỗi chi tiết:', err);
      try {
        const item = window.localStorage.getItem('mai_leads');
        const localLeads = item ? JSON.parse(item) : [];
        window.localStorage.setItem('mai_leads', JSON.stringify([newLead, ...localLeads]));
      } catch (e) {
        console.warn('Lỗi ghi LocalStorage fallback:', e);
      }
    }
  };

  const generateProposal = (roleType: 'leader' | 'agent', rawScores: LeadScores, currentStageOrLevel: string) => {
    let solutionName = "";
    let advice = "";
    let details = "";
    let actions: string[] = [];

    if (roleType === 'leader') {
      solutionName = "Executive LPIS Suite";
      const scoresArr = [
        { key: 'L', val: Number(rawScores.l) || 0 },
        { key: 'P', val: Number(rawScores.p) || 0 },
        { key: 'I', val: Number(rawScores.i) || 0 },
        { key: 'S', val: Number(rawScores.s) || 0 }
      ];
      scoresArr.sort((a, b) => a.val - b.val);
      const minAxis = scoresArr[0].key;

      if (minAxis === 'S') {
        advice = "Hệ sinh thái Quản trị & SOP chuẩn hóa COACHMATE";
        details = "Giúp bạn số hóa toàn diện quy trình, xây dựng đường ống tuyển dụng/huấn luyện và hệ điều hành LPIS tự vận hành.";
        actions = [
          "Ngừng thiết kế thêm các chính sách thúc đẩy doanh số ngắn hạn.",
          "Dành tuần này viết ra đúng 01 quy trình chuẩn (SOP) cho hoạt động cốt lõi nhất (Ví dụ: Quy trình tiếp cận khách hàng).",
          "Yêu cầu toàn đội ngũ tuân thủ nghiêm ngặt và theo dõi bằng dữ liệu thực tế."
        ];
      } else if (minAxis === 'I') {
        advice = "Chương trình Khai phóng & Phân quyền Lãnh đạo";
        details = "Chương trình coaching giúp giải phóng sức lao động, nâng cao kỹ năng đào tạo và ủy quyền để đội nhóm tự vận hành.";
        actions = [
          "Bạn đang là nút thắt cổ chai của đội nhóm, hãy liệt kê các việc bạn đang ôm đồm.",
          "Chọn ra đúng 3 việc bạn đang duyệt hàng ngày và thiết lập hạn mức rõ ràng.",
          "Bàn giao quyền quyết định và chịu trách nhiệm hoàn toàn cho trưởng nhóm cấp dưới."
        ];
      } else if (minAxis === 'P') {
        advice = "Khóa học Quản trị Hiệu suất dựa trên Dữ liệu (LPIS Level 2)";
        details = "Học cách thiết lập hệ thống đo lường PDCA, chỉ số hoạt động hàng ngày (Active Ratio) thay vì quản lý cảm tính.";
        actions = [
          "Xây dựng Dashboard theo dõi các chỉ số hoạt động hàng ngày (Active Ratio, số cuộc gặp, cuộc gọi).",
          "Tổ chức họp giao ban định kỳ dựa hoàn toàn trên con số Dashboard, không nhận định cảm tính.",
          "Phát hiện sớm lỗ hổng chuyển đổi của từng nhân sự để hỗ trợ đào tạo kịp thời."
        ];
      } else {
        advice = "Khóa huấn luyện: Mindful Leadership in Tech Era (LPIS Level 1/3)";
        details = "Giúp các nhà quản trị làm chủ tâm trí, xây dựng văn hóa coaching thấu cảm và kiến tạo môi trường bền bỉ.";
        actions = [
          "Lên lịch coaching 1-1 về mục tiêu và động lực cho 2 trưởng nhóm tiềm năng nhất dưới quyền.",
          "Tuyệt đối ngừng việc đi gặp khách hàng hộ hoặc chốt hợp đồng thay cho TVV.",
          "Thiết lập văn hóa học tập và chia sẻ cởi mở giữa các thành viên."
        ];
      }
    } else {
      solutionName = "LIBA Professional Suite";
      const focusStage = currentStageOrLevel;

      if (focusStage === 'G1') {
        advice = "Chương trình đào tạo: LIBA Foundation – Khởi nghiệp Bảo hiểm";
        details = "Khóa học giúp củng cố niềm tin làm nghề, làm chủ 3 đặc tính cốt lõi và 6 nhóm quyền lợi sản phẩm BHNT.";
        actions = [
          "Tham gia đầy đủ các lớp Workshop đào tạo sản phẩm nền tảng.",
          "Thực hành xác định nhu cầu bảo hiểm (Plan) cơ bản cho người thân/bè bạn dưới sự đồng hành của quản lý.",
          "Rèn luyện sự điềm tĩnh và thấu hiểu trước các phản hồi từ chối đầu tiên của thị trường."
        ];
      } else if (focusStage === 'G2') {
        advice = "Lớp học thực chiến: LIBA Level 1 – Sống được với nghề";
        details = "Nâng cao năng lực thẩm định quyền lợi và quy trình hóa tư vấn giúp gia tăng tỷ lệ chốt sales tự nhiên.";
        actions = [
          "Cố định khung giờ vàng đi gặp gỡ, tiếp cận khách hàng mới mỗi ngày.",
          "Tự ghi chép và theo dõi tỷ lệ chuyển đổi cuộc gặp - hợp đồng cá nhân.",
          "Giảm dần việc nhờ quản lý đi chốt hộ, tự làm chủ các ca tư vấn từ trung bình đến dễ."
        ];
      } else if (focusStage === 'G3') {
        advice = "Chương trình đào tạo: LIBA Level 2 – Hoạch định tài chính";
        details = "Tích hợp quản lý tài chính cá nhân vào giải pháp bảo hiểm, xây dựng phễu khách hàng tự chủ, độc lập.";
        actions = [
          "Học cách thiết lập mô hình danh mục tài sản và hoạch định tài chính - bảo hiểm cá nhân hóa.",
          "Tự thiết lập phễu khách hàng trực tuyến qua mạng xã hội hoặc thương hiệu cá nhân.",
          "Tham gia nhóm khai vấn định kỳ hàng tháng để duy trì cam kết và nhịp độ kỷ luật."
        ];
      } else {
        advice = "Khóa học cao cấp: LIBA Pro – Kiến tạo di sản";
        details = "Dành cho nhà cố vấn tài chính chuyên sâu. Làm chủ bức tranh kinh tế vĩ mô, chu kỳ thị trường và quản trị tài sản phức tạp.";
        actions = [
          "Cập nhật liên tục các xu hướng kinh tế vĩ mô và chính sách tiền tệ để tư vấn cho khách hàng VIP.",
          "Quy trình hóa hệ thống chăm sóc khách hàng cũ nhằm tối ưu hóa nguồn khách hàng tự giới thiệu.",
          "Tham gia làm mentor hoặc chia sẻ kinh nghiệm tại các workshop cộng đồng để nâng tầm thương hiệu cá nhân."
        ];
      }
    }

    setProposal({ solutionName, advice, details, actions });
  };

  const calculateResult = () => {
    if (selectedRole === 'agent') {
      // Logic tính điểm cho TVV (Agent)
      const counts = { G1: 0, G2: 0, G3: 0, G4: 0 };
      quizQuestions.forEach((q, idx) => {
        const opt = q.options[userAnswers[idx]];
        if (opt.stage === 'G1') counts.G1++;
        else if (opt.stage === 'G2') counts.G2++;
        else if (opt.stage === 'G3') counts.G3++;
        else if (opt.stage === 'G4') counts.G4++;
      });

      const g1 = (counts.G1 / 10) * 100;
      const g2 = (counts.G2 / 10) * 100;
      const g3 = (counts.G3 / 10) * 100;
      const g4 = (counts.G4 / 10) * 100;

      // Xác định Vùng trọng tâm (Maturity Level) bằng phương thức tích lũy đạt ngưỡng >= 50%
      let focusStage: 'G1' | 'G2' | 'G3' | 'G4' = 'G1';
      let cumulativeCount = 0;
      const stagesOrder: ('G1' | 'G2' | 'G3' | 'G4')[] = ['G1', 'G2', 'G3', 'G4'];
      for (const stg of stagesOrder) {
        cumulativeCount += counts[stg];
        if (cumulativeCount >= quizQuestions.length * 0.5) {
          focusStage = stg;
          break;
        }
      }

      const stageNames = {
        G1: 'Gia nhập (G1)',
        G2: 'Sống được với nghề (G2)',
        G3: 'Chủ động (G3)',
        G4: 'Bền vững (G4)'
      };

      const stageDescs = {
        G1: 'Bạn đang trong quá trình xây dựng niềm tin vào sản phẩm và tìm kiếm những khách hàng đầu tiên. Cảm xúc của bạn dễ trồi sụt theo lời từ chối của khách hàng.',
        G2: 'Bạn đã quyết định gắn bó với nghề, nhưng áp lực lớn nhất lúc này là thu nhập chưa ổn định, doanh số còn lên xuống thất thường theo tháng.',
        G3: 'Bạn đã biết làm nghề một cách độc lập. Bạn có kỷ luật, tự lên kế hoạch làm việc mà không cần quản lý phải đôn đốc hay nhắc nhở.',
        G4: 'Bạn đã dịch chuyển sang tư duy dài hạn, vận hành công việc như một doanh nghiệp cá nhân với nguồn khách giới thiệu (Referral) dồi dào.'
      };

      // Xác định điểm nghẽn (câu hỏi chọn đáp án ở giai đoạn thấp hơn vùng trọng tâm)
      const focusStageNum = parseInt(focusStage.replace('G', ''));
      const blindSpots: Array<{ questionText: string; selectedLabel: string; selectedText: string; stage: string }> = [];
      quizQuestions.forEach((q, idx) => {
        const opt = q.options[userAnswers[idx]];
        const optStageNum = parseInt((opt.stage || 'G1').replace('G', ''));
        if (optStageNum < focusStageNum) {
          blindSpots.push({
            questionText: q.text,
            selectedLabel: opt.label,
            selectedText: opt.text,
            stage: opt.stage || 'G1'
          });
        }
      });

      // Xác định điểm sáng (câu hỏi chọn đáp án ở giai đoạn cao hơn vùng trọng tâm)
      const highlights: Array<{ questionText: string; selectedLabel: string; selectedText: string; stage: string }> = [];
      quizQuestions.forEach((q, idx) => {
        const opt = q.options[userAnswers[idx]];
        const optStageNum = parseInt((opt.stage || 'G1').replace('G', ''));
        if (optStageNum > focusStageNum) {
          highlights.push({
            questionText: q.text,
            selectedLabel: opt.label,
            selectedText: opt.text,
            stage: opt.stage || 'G1'
          });
        }
      });
      setCognitiveHighlights(highlights);

      const scores: LeadScores = { mindful: g3, action: g2, tech: g4 };
      setComputedScores(scores);
      
      const tvvRes = {
        distribution: { g1, g2, g3, g4 },
        focusStage,
        focusStageName: stageNames[focusStage],
        description: stageDescs[focusStage],
        blindSpots
      };
      setTvvResult(tvvRes);
      setLeaderResult(null);

      // Tự động lưu Database Insight
      saveLeadData('agent', scores, tvvRes, null);
      // Tự động tạo đề xuất
      generateProposal('agent', scores, focusStage);

    } else {
      // Logic tính điểm cho Quản lý (Leader)
      const opt1 = quizQuestions[0].options[userAnswers[0]];
      const opt2 = quizQuestions[1].options[userAnswers[1]];
      const opt3 = quizQuestions[2].options[userAnswers[2]];
      const opt4 = quizQuestions[3].options[userAnswers[3]];
      const opt5 = quizQuestions[4].options[userAnswers[4]];
      const opt6 = quizQuestions[5].options[userAnswers[5]];
      const opt7 = quizQuestions[6].options[userAnswers[6]];
      const opt8 = quizQuestions[7].options[userAnswers[7]];
      const opt9 = quizQuestions[8].options[userAnswers[8]];
      const opt10 = quizQuestions[9].options[userAnswers[9]];

      const lScore = Math.round(((opt1.weight + opt4.weight + opt10.weight) / 3) * 2 * 10) / 10;
      const pScore = Math.round(((opt2.weight + opt7.weight + opt9.weight) / 3) * 2 * 10) / 10;
      const iScore = Math.round(((opt3.weight + opt6.weight) / 2) * 2 * 10) / 10;
      const sScore = Math.round(((opt5.weight + opt8.weight) / 2) * 2 * 10) / 10;

      // Tính tần suất của L1-L5
      const counts = { L1: 0, L2: 0, L3: 0, L4: 0, L5: 0 };
      const answersList = [opt1, opt2, opt3, opt4, opt5, opt6, opt7, opt8, opt9, opt10];
      answersList.forEach(opt => {
        if (opt.stage === 'L1') counts.L1++;
        else if (opt.stage === 'L2') counts.L2++;
        else if (opt.stage === 'L3') counts.L3++;
        else if (opt.stage === 'L4') counts.L4++;
        else if (opt.stage === 'L5') counts.L5++;
      });

      // Xác định Vùng thấu suốt (Maturity Level) bằng phương thức tích lũy đạt ngưỡng >= 50%
      let focusLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' = 'L1';
      let cumulativeCount = 0;
      const levelsOrder: ('L1' | 'L2' | 'L3' | 'L4' | 'L5')[] = ['L1', 'L2', 'L3', 'L4', 'L5'];
      for (const lvl of levelsOrder) {
        cumulativeCount += counts[lvl];
        if (cumulativeCount >= answersList.length * 0.5) {
          focusLevel = lvl;
          break;
        }
      }

      // Vùng quá độ (Các level khác có chọn câu trả lời)
      const transitionLevels: string[] = [];
      if (counts.L1 > 0 && focusLevel !== 'L1') transitionLevels.push('L1');
      if (counts.L2 > 0 && focusLevel !== 'L2') transitionLevels.push('L2');
      if (counts.L3 > 0 && focusLevel !== 'L3') transitionLevels.push('L3');
      if (counts.L4 > 0 && focusLevel !== 'L4') transitionLevels.push('L4');
      if (counts.L5 > 0 && focusLevel !== 'L5') transitionLevels.push('L5');

      const levelNames = {
        L1: 'Self-Leader (L1)',
        L2: 'Team Leader (L2)',
        L3: 'Team Builder (L3)',
        L4: 'Business Builder (L4)',
        L5: 'System Builder (L5)'
      };

      const levelDescs = {
        L1: 'Bạn giỏi thực chiến cá nhân, nhưng đang biến mình thành "ngôi sao cô đơn", kết quả đội nhóm phụ thuộc vào việc bạn tự bán.',
        L2: 'Bạn là một người quản lý tận tụy, nhưng đang mắc sai lầm "Làm thay". Bạn mệt mỏi vì suốt ngày phải đi chốt sales hộ và thúc giục TVV hoạt động.',
        L3: 'Bạn đã biết buông việc chi tiết để tập trung phát triển các Trưởng nhóm (UM/SUM). Tuy nhiên, bạn vẫn đang quản trị bằng cảm tính hoặc chưa có bộ quy trình chuẩn hóa để nhân bản diện rộng.',
        L4: 'Bạn vận hành đội ngũ như một cỗ máy bài bản, nói chuyện bằng dữ liệu, Dashboard và SOP. Điểm cần cải thiện là thổi thêm "phần hồn" (Văn hóa, sự gắn kết tự nhiên) vào hệ thống.',
        L5: 'Bạn đã chạm tới đỉnh cao của kiến tạo môi trường. Hệ thống tự chạy và tự sản sinh lãnh đạo mới ngay cả khi bạn vắng mặt.'
      };

      // Mâu thuẫn giữa tư duy (Câu 1) và thực thi (Câu 4 / 2)
      let conflictText = "";
      if (opt1.weight >= 4 && (opt4.weight === 2 || opt2.weight === 2)) {
        conflictText = "Hệ thống phát hiện khoảng cách giữa Góc nhìn và Thực tế của bạn: Ở phần định vị Cấp độ, bạn thể hiện tư duy mong muốn hướng tới việc tối ưu hệ thống và xây dựng quy trình bài bản (Tương đương Cấp độ Business Builder / System Builder). Tuy nhiên, ở hành vi thực tế, bạn lại chấm ở mức Level 2 (Bản năng/Làm thay) – bạn vẫn đang dành nhiều thời gian để làm thay việc chuyên môn và trực tiếp đi gặp khách cùng TVV khi họ gặp khó. Bạn đang bị mâu thuẫn giữa tầm nhìn quản trị và thói quen ôm đồm sự vụ.";
      }

      // Xác định hình thái hệ thống
      let systemShape = "Hình thoi co cụm";
      let systemShapeDesc = "Cả 4 trục L–P–I–S đều nằm ở vùng Bản năng hoặc Nhận thức. Doanh nghiệp hoặc đội nhóm của bạn đang vận hành hoàn toàn phụ thuộc vào sự vụ phát sinh hàng ngày. Bạn vừa thâm dụng thời gian để tự làm chuyên môn thay nhân sự, vừa là 'trục chống' duy nhất để mọi thứ không sụp đổ.";

      if (lScore >= 6 && iScore >= 6 && pScore < 6 && sScore < 6) {
        systemShape = "Mũi tên lệch trái";
        systemShapeDesc = "Điểm Lãnh đạo và Độc lập tốt, nhưng Hiệu suất và Hệ thống ở mức Bản năng/Nhận thức. Bạn là một nhà lãnh đạo có sức ảnh hưởng cá nhân lớn, đội ngũ rất yêu quý và có thể tự làm việc khi vắng mặt bạn trong ngắn hạn. Tuy nhiên, bạn đang quản lý hoàn toàn bằng cảm tính và truyền miệng. Đội nhóm thiếu các chỉ số đo lường PDCA rõ ràng và không có quy trình SOP chuẩn hóa.";
      } else if (pScore >= 6 && sScore >= 6 && lScore < 6 && iScore < 6) {
        systemShape = "Cánh buồm lệch phải";
        systemShapeDesc = "Điểm Quản trị hiệu suất và Quy trình hệ thống rất bài bản, nhưng điểm Lãnh đạo và Tính độc lập lại rất kém. Bạn là một nhà xây dựng quy trình tốt, có dashboard và công cụ công nghệ đầy đủ. Nhưng bạn đang mắc sai lầm lớn về mặt con người: Bạn chưa biết cách đào tạo, phân quyền và xây dựng đội ngũ kế thừa. Hệ thống của bạn có 'xác' (công cụ) nhưng thiếu 'hồn' (văn hóa và năng lực tự chủ).";
      } else if (lScore >= 6 && pScore >= 6 && iScore >= 6 && sScore >= 6) {
        systemShape = "Hệ thống phát triển cân bằng";
        systemShapeDesc = "Chúc mừng! Các chỉ số L-P-I-S của bạn phát triển khá đồng đều và vững chắc. Bạn đang đi đúng hướng trên lộ trình xây dựng một hệ điều hành doanh nghiệp bảo hiểm tự vận hành và nhân bản bền vững.";
      }

      // Xác định điểm sáng vượt trội (optStage > focusLevel)
      const focusLevelNum = parseInt(focusLevel.replace('L', ''));
      const highlights: Array<{ questionText: string; selectedLabel: string; selectedText: string; stage: string }> = [];
      answersList.forEach((opt, idx) => {
        const q = quizQuestions[idx];
        const optStageNum = parseInt((opt.stage || 'L1').replace('L', ''));
        if (optStageNum > focusLevelNum) {
          highlights.push({
            questionText: q.text,
            selectedLabel: opt.label,
            selectedText: opt.text,
            stage: opt.stage || 'L1'
          });
        }
      });
      setCognitiveHighlights(highlights);

      const scores: LeadScores = { l: lScore, p: pScore, i: iScore, s: sScore };
      setComputedScores(scores);

      const ldrRes = {
        scores: { l: lScore, p: pScore, i: iScore, s: sScore },
        maturityLevel: focusLevel,
        maturityLevelName: levelNames[focusLevel],
        description: levelDescs[focusLevel],
        focusLevel: levelNames[focusLevel],
        transitionLevels: transitionLevels.map(lvl => levelNames[lvl as keyof typeof levelNames]),
        conflictText,
        systemShape,
        systemShapeDesc
      };
      setLeaderResult(ldrRes);
      setTvvResult(null);

      // Tự động lưu Database Insight
      saveLeadData('leader', scores, null, ldrRes);
      // Tự động tạo đề xuất
      generateProposal('leader', scores, focusLevel);
    }
  };

  const resetDiagnose = () => {
    setSelectedRole(null);
    setQuizQuestions([]);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setStep(1);
    setFormData({ name: '', phone: '', email: '', company: '', role: '' });
    setTvvResult(null);
    setLeaderResult(null);
    setCognitiveHighlights([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Chuyển sang làm trắc nghiệm
  };

  return (
    <div id="view-diagnose" className="view-content py-12 px-margin-desktop min-h-[85vh] flex items-center">
      <div className="max-w-[750px] w-full mx-auto bg-zen-white border border-surface-container rounded-lg shadow-sm p-8 md:p-12 relative">
        
        {/* Step 1: Chọn vai trò */}
        {step === 1 && (
          <div id="diag-step-1" className="diag-step space-y-8">
            <div className="text-center">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block mb-2">
                DIAGNOSTIC PATHWAY
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-primary font-medium">Bạn đang đứng ở đâu trong hành trình sự nghiệp?</h2>
              <p className="font-body text-sm text-secondary mt-2 max-w-md mx-auto">
                Hãy chọn vai trò hiện tại của bạn để tải bộ câu hỏi định vị năng lực và nhận lộ trình giải pháp cá nhân hóa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div
                onClick={() => selectRole('leader')}
                className="group border border-surface-container hover:border-heritage-maroon p-6 cursor-pointer rounded-lg transition-soft text-center bg-background/30 hover:bg-zen-white"
              >
                <span className="material-symbols-outlined text-[48px] text-heritage-maroon/60 group-hover:text-heritage-maroon transition-colors">
                  leaderboard
                </span>
                <h3 className="font-headline text-xl font-bold text-primary mt-4">Nhà Quản Lý (Leader)</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed">
                  Giám đốc Vùng, Agency Leader, Trưởng nhóm kinh doanh cần đánh giá hệ điều hành quản trị đội ngũ.
                </p>
              </div>
              <div
                onClick={() => selectRole('agent')}
                className="group border border-surface-container hover:border-heritage-maroon p-6 cursor-pointer rounded-lg transition-soft text-center bg-background/30 hover:bg-zen-white"
              >
                <span className="material-symbols-outlined text-[48px] text-heritage-maroon/60 group-hover:text-heritage-maroon transition-colors">
                  person_celebrate
                </span>
                <h3 className="font-headline text-xl font-bold text-primary mt-4">Tư Vấn Viên (Agent)</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed">
                  Đại lý, Cố vấn Tài chính cần đánh giá sự tự chủ trong nghề nghiệp và phễu khách hàng.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Form điền thông tin cá nhân */}
        {step === 2 && (
          <div id="diag-step-2-form" className="diag-step space-y-8 animate-fade-in">
            <div className="text-center space-y-2 border-b border-surface-container/60 pb-6">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block">
                Mở đầu khảo sát
              </span>
              <h3 className="font-headline text-2xl text-primary font-bold">Điền Thông Tin Cập Nhật</h3>
              <p className="font-body text-xs text-secondary max-w-md mx-auto">
                Vui lòng cung cấp các thông tin cơ bản để hệ thống ghi nhận tóm tắt kết quả chẩn đoán dành riêng cho bạn.
              </p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Số điện thoại / Zalo</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
                    placeholder="Ví dụ: 0912345678"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
                    placeholder="email@congty.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Vị trí hiện tại</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none bg-zen-white h-[38px]"
                  >
                    <option value="">-- Chọn vị trí hiện tại --</option>
                    <option value="TVV">Tư vấn viên (TVV)</option>
                    <option value="Trưởng nhóm">Trưởng nhóm kinh doanh (UM/SUM)</option>
                    <option value="Giám đốc Ban">Giám đốc Ban kinh doanh (BM/SBM)</option>
                    <option value="Giám đốc Vùng">Giám đốc Vùng / Chủ GA (AD/GA)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Công ty / Văn phòng Vùng GA đang hoạt động</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
                  placeholder="Ví dụ: Prudential - GA Quy Nhơn 2, Manulife Vùng GA Sài Gòn..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-surface-container/60">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-surface-container px-6 py-3 font-label text-xs font-bold uppercase tracking-wider text-secondary rounded hover:bg-background transition-all"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-heritage-maroon text-zen-white py-3.5 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm shadow active:scale-[0.98]"
                >
                  Bắt đầu làm trắc nghiệm chẩn đoán
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Làm trắc nghiệm chọn đáp án */}
        {step === 3 && quizQuestions.length > 0 && (
          <div id="diag-step-3-quiz" className="diag-step space-y-8 animate-fade-in">
            <div className="flex justify-between items-center border-b border-surface-container/60 pb-4">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider" id="quiz-role-label">
                Định vị: {selectedRole === 'leader' ? 'Nhà quản lý' : 'Tư vấn viên'}
              </span>
              <span className="font-label text-xs font-bold text-secondary" id="quiz-progress-text">
                Câu {currentQuestionIdx + 1} / {quizQuestions.length}
              </span>
            </div>

            <div className="h-1 bg-surface-container w-full rounded-full overflow-hidden">
              <div
                id="quiz-progress-bar"
                className="h-full bg-heritage-maroon transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="font-headline text-xl md:text-2xl text-primary leading-snug font-medium" id="quiz-question-text">
                {quizQuestions[currentQuestionIdx].text}
              </h3>
            </div>

            {/* Các đáp án lựa chọn */}
            <div className="space-y-3 pt-2">
              {quizQuestions[currentQuestionIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => selectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3 active:scale-[0.99] duration-100 ${
                    userAnswers[currentQuestionIdx] === oIdx
                      ? 'border-heritage-maroon bg-heritage-maroon/[0.03] text-primary'
                      : 'border-surface-container hover:border-heritage-maroon/60 bg-zen-white text-secondary'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                    userAnswers[currentQuestionIdx] === oIdx
                      ? 'bg-heritage-maroon text-zen-white border-heritage-maroon'
                      : 'border-surface-container bg-background/20 text-secondary'
                  }`}>
                    {opt.label}
                  </span>
                  <span className="font-body text-sm leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-8 border-t border-surface-container/60">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIdx === 0}
                className={`text-secondary font-label text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 ${currentQuestionIdx === 0 ? 'opacity-40 pointer-events-none' : ''}`}
                id="quiz-prev-btn"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Quay lại
              </button>
              <button
                onClick={nextQuestion}
                disabled={userAnswers[currentQuestionIdx] === -1}
                className={`bg-heritage-maroon text-zen-white px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-1 rounded-sm active:scale-95 duration-150 ${
                  userAnswers[currentQuestionIdx] === -1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{currentQuestionIdx === quizQuestions.length - 1 ? 'Xem kết quả chẩn đoán' : 'Câu tiếp theo'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Hiệu ứng phân tích & Tự động lưu DB */}
        {step === 4 && (
          <div id="diag-step-4-loading" className="diag-step py-12 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="font-headline text-2xl text-primary font-medium" id="analyzer-status">
                {analyzerStatus}
              </h3>
              <p className="font-body text-xs text-secondary">Quy trình xử lý dữ liệu và tự động ghi nhận Insight của bạn.</p>
            </div>
          </div>
        )}

        {/* Step 5: Hiển thị kết quả hoàn chỉnh trực tiếp */}
        {step === 5 && (
          <div id="diag-step-5-results" className="diag-step space-y-8 animate-fade-in">
            <div className="text-center border-b border-surface-container/60 pb-6">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2">
                Diagnostic Result
              </span>
              <h2 className="font-display text-3xl text-primary font-medium">Bản đồ Định vị của Bạn</h2>
              <p className="font-body text-xs text-secondary mt-1">Kết quả phân tích chẩn đoán dựa trên dữ liệu phản tư.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-surface-container/40 pb-8">
              
              {/* Radar/Bar Component */}
              <div className="flex justify-center p-2 border border-surface-container rounded-lg bg-background/20 relative">
                {tvvResult && (
                  <DistributionBarChart distribution={tvvResult.distribution} />
                )}
                {leaderResult && (
                  <RadarChart scores={leaderResult.scores} />
                )}
              </div>

              {/* Feedback sơ bộ */}
              <div className="space-y-4">
                {tvvResult && (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase text-heritage-maroon tracking-wider font-label">Vùng trọng tâm nghề nghiệp:</span>
                      <h4 className="text-xl font-bold text-primary font-headline">{tvvResult.focusStageName}</h4>
                    </div>
                    <p className="font-body text-sm text-on-surface leading-relaxed italic font-medium">
                      "{tvvResult.description}"
                    </p>
                    
                    {tvvResult.blindSpots.length > 0 && (
                      <div className="bg-heritage-maroon/[0.02] border border-heritage-maroon/10 p-4 rounded text-xs space-y-2">
                        <span className="font-bold text-heritage-maroon uppercase block font-label">⚠️ Cảnh báo Điểm nghẽn (Blind Spots):</span>
                        <p className="text-secondary leading-relaxed text-[11px]">
                          Hệ thống nhận thấy bạn có xu hướng chẩn đoán ở giai đoạn thấp hơn vùng trọng tâm tại một số khía cạnh (như nguồn khách hàng hoặc quản trị thời vụ). Hãy tham khảo lộ trình hành động ưu tiên ở dưới để gỡ nghẽn.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {leaderResult && (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase text-heritage-maroon tracking-wider font-label">Maturity Level:</span>
                      <h4 className="text-xl font-bold text-primary font-headline">{leaderResult.maturityLevelName}</h4>
                    </div>
                    <p className="font-body text-sm text-on-surface leading-relaxed italic font-medium">
                      "{leaderResult.description}"
                    </p>
                    <div className="text-xs space-y-1 text-secondary pt-2">
                      <p>🔹 <strong>Vùng thấu suốt (Maturity Level):</strong> {leaderResult.focusLevel}</p>
                      {leaderResult.transitionLevels.length > 0 && (
                        <p>🔸 <strong>Vùng quá độ (Chuyển dịch):</strong> {leaderResult.transitionLevels.join(', ')}</p>
                      )}
                    </div>
                    <div className="border border-surface-container rounded p-3 bg-background/10 space-y-1">
                      <span className="font-bold text-primary text-xs uppercase block font-label">Hình thái vận hành: {leaderResult.systemShape}</span>
                      <p className="text-[11px] text-secondary leading-relaxed">{leaderResult.systemShapeDesc}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Khối hiển thị thang thứ bậc đầy đủ và mô tả biểu hiện */}
            <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-6 shadow-sm">
              <div className="border-b border-surface-container/60 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <h3 className="font-headline text-base font-bold text-primary uppercase tracking-wider">
                  Định vị Lộ trình Phát triển Năng lực
                </h3>
                <span className="text-[11px] text-secondary font-label font-bold">
                  (Cấp bậc hiện tại của bạn được highlight nổi bật)
                </span>
              </div>

              {tvvResult && (
                <div className="space-y-4">
                  {[
                    {
                      id: 'G1',
                      title: 'G1 - Gia nhập',
                      roleName: 'Người bán sản phẩm bảo vệ',
                      desc: 'Bạn đang trong quá trình xây dựng niềm tin vào sản phẩm và tìm kiếm những khách hàng đầu tiên. Cảm xúc của bạn dễ trồi sụt theo lời từ chối của khách hàng.'
                    },
                    {
                      id: 'G2',
                      title: 'G2 - Sống được với nghề',
                      roleName: 'Nhà tư vấn giải pháp tích lũy',
                      desc: 'Bạn đã quyết định gắn bó với nghề, nhưng áp lực lớn nhất lúc này là thu nhập chưa ổn định, doanh số còn lên xuống thất thường theo tháng.'
                    },
                    {
                      id: 'G3',
                      title: 'G3 - Chủ động',
                      roleName: 'Nhà hoạch định chiến lược (Tài chính - Bảo hiểm)',
                      desc: 'Bạn đã biết làm nghề một cách độc lập. Bạn có kỷ luật, tự lên kế hoạch làm việc mà không cần quản lý phải đôn đốc hay nhắc nhở.'
                    },
                    {
                      id: 'G4',
                      title: 'G4 - Bền vững',
                      roleName: 'Nhà cố vấn tài chính',
                      desc: 'Bạn đã dịch chuyển sang tư duy dài hạn, vận hành công việc như một doanh nghiệp cá nhân với nguồn khách giới thiệu (Referral) dồi dào.'
                    }
                  ].map((level) => {
                    const isCurrent = tvvResult.focusStage === level.id;
                    return (
                      <div
                        key={level.id}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          isCurrent
                            ? 'border-heritage-maroon bg-heritage-maroon/[0.03] shadow-sm relative overflow-hidden'
                            : 'border-surface-container/60 opacity-60 bg-background/5'
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute top-0 right-0 bg-heritage-maroon text-zen-white font-label text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
                            Cấp độ của bạn
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent ? 'bg-heritage-maroon text-zen-white' : 'bg-secondary/20 text-secondary'
                          }`}>
                            {level.id}
                          </span>
                          <h4 className={`font-headline text-sm font-bold ${isCurrent ? 'text-heritage-maroon' : 'text-primary'}`}>
                            {level.title} <span className="font-normal text-xs text-secondary">| {level.roleName}</span>
                          </h4>
                        </div>
                        <p className="font-body text-xs text-secondary leading-relaxed pl-7">
                          {level.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {leaderResult && (
                <div className="space-y-4">
                  {[
                    {
                      id: 'L1',
                      title: 'L1 - Self-Leader',
                      roleName: 'Làm chủ bản thân',
                      desc: 'Bạn giỏi thực chiến cá nhân, nhưng đang biến mình thành "ngôi sao cô đơn", kết quả đội nhóm phụ thuộc vào việc bạn tự bán.'
                    },
                    {
                      id: 'L2',
                      title: 'L2 - Team Leader',
                      roleName: 'Dẫn dắt đội nhóm',
                      desc: 'Bạn là một người quản lý tận tụy, nhưng đang mắc sai lầm "Làm thay". Bạn mệt mỏi vì suốt ngày phải đi chốt sales hộ và thúc giục TVV hoạt động.'
                    },
                    {
                      id: 'L3',
                      title: 'L3 - Team Builder',
                      roleName: 'Kiến tạo và phát triển đội nhóm',
                      desc: 'Bạn đã biết buông việc chi tiết để tập trung phát triển các Trưởng nhóm (UM/SUM). Tuy nhiên, bạn vẫn đang quản trị bằng cảm tính hoặc chưa có bộ quy trình chuẩn hóa để nhân bản diện rộng.'
                    },
                    {
                      id: 'L4',
                      title: 'L4 - Business Builder',
                      roleName: 'Xây dựng và tối ưu hệ thống kinh doanh',
                      desc: 'Bạn vận hành đội ngũ như một cỗ máy bài bản, nói chuyện bằng dữ liệu, Dashboard và SOP. Điểm cần cải thiện là thổi thêm "phần hồn" (Văn hóa, sự gắn kết tự nhiên) vào hệ thống.'
                    },
                    {
                      id: 'L5',
                      title: 'L5 - System Builder',
                      roleName: 'Kiến tạo hệ sinh thái và năng lực bền vững',
                      desc: 'Bạn đã chạm tới đỉnh cao của kiến tạo môi trường. Hệ thống tự chạy và tự sản sinh lãnh đạo mới ngay cả khi bạn vắng mặt.'
                    }
                  ].map((level) => {
                    const isCurrent = leaderResult.maturityLevel === level.id;
                    return (
                      <div
                        key={level.id}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          isCurrent
                            ? 'border-heritage-maroon bg-heritage-maroon/[0.03] shadow-sm relative overflow-hidden'
                            : 'border-surface-container/60 opacity-60 bg-background/5'
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute top-0 right-0 bg-heritage-maroon text-zen-white font-label text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
                            Cấp độ của bạn
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent ? 'bg-heritage-maroon text-zen-white' : 'bg-secondary/20 text-secondary'
                          }`}>
                            {level.id}
                          </span>
                          <h4 className={`font-headline text-sm font-bold ${isCurrent ? 'text-heritage-maroon' : 'text-primary'}`}>
                            {level.title} <span className="font-normal text-xs text-secondary">| {level.roleName}</span>
                          </h4>
                        </div>
                        <p className="font-body text-xs text-secondary leading-relaxed pl-7">
                          {level.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Khối giới thiệu LPIS dành riêng cho Leader */}
            {leaderResult && (
              <div className="bg-heritage-maroon/[0.02] border border-heritage-maroon/10 p-6 rounded-lg text-xs space-y-3">
                <span className="font-bold text-heritage-maroon uppercase block font-label text-sm tracking-wider border-b border-heritage-maroon/10 pb-2">
                  ℹ️ VỀ HỆ THỐNG ĐO LƯỜNG LPIS
                </span>
                <p className="font-body text-secondary leading-relaxed text-xs">
                  <strong>LPIS</strong> là hệ điều hành phát triển lãnh đạo tích hợp được MAI Institute phát triển dành riêng cho ngành BHNT, đo lường toàn diện trên 4 trục cốt lõi:
                </p>
                <ul className="space-y-2 font-body text-secondary text-xs pl-4 list-disc">
                  <li><strong>Leadership (Lãnh đạo):</strong> Năng lực định hướng, khai vấn và phát triển con người, dịch chuyển từ kiểm soát sang tạo động lực tự thân.</li>
                  <li><strong>Performance (Hiệu suất):</strong> Quản trị đội ngũ dựa trên con số cụ thể, thiết lập hệ thống chỉ số hoạt động hàng ngày (Active Ratio) thay vì quản lý theo cảm xúc.</li>
                  <li><strong>Independence (Độc lập):</strong> Mức độ trưởng thành và khả năng tự vận hành của các Trưởng nhóm cấp dưới khi không có sự can thiệp trực tiếp của bạn.</li>
                  <li><strong>System (Hệ thống):</strong> Tính chuẩn hóa quy trình (SOPs), ứng dụng công nghệ (Dashboard) và kiến tạo văn hóa kế thừa để doanh nghiệp nhân bản bền vững.</li>
                </ul>
                <p className="font-body text-secondary leading-relaxed text-xs pt-1">
                  <strong>Tại sao LPIS đo lường chính xác mức độ trưởng thành?</strong> LPIS không chỉ nhìn vào kết quả doanh số ngắn hạn (vốn phụ thuộc vào các đợt thi đua hoặc yếu tố mùa vụ), mà tập trung đánh giá sức khỏe cốt lõi của hệ thống vận hành. Một đội nhóm chỉ đạt độ trưởng thành thực sự khi các mắt xích tự giác hoạt động, quy trình rõ ràng và nhân sự liên tục được kế thừa.
                </p>
              </div>
            )}

            {/* Khối mô tả hiện trạng điểm số LPIS (Chỉ dành cho Leader) */}
            {leaderResult && (
              <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 shadow-sm">
                <span className="font-bold text-primary uppercase block font-label text-sm tracking-wider border-b border-surface-container/60 pb-2">
                  📊 Nhận Định Hiện Trạng Từng Trục Năng Lực LPIS của Bạn
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      label: 'Leadership (L) - Lãnh đạo',
                      score: leaderResult.scores.l,
                      desc: Number(leaderResult.scores.l) >= 7
                        ? 'Tốt. Bạn sở hữu tư duy định hướng và khai vấn tốt, chủ động giao quyền và nâng đỡ trưởng nhóm cấp dưới thay vì can thiệp ôm sự vụ.'
                        : Number(leaderResult.scores.l) >= 4
                        ? 'Trung bình. Bạn đã bắt đầu ý thức về việc coaching và phát triển con người, nhưng hành động đôi lúc vẫn mang tính chất áp đặt khi chịu áp lực số.'
                        : 'Yếu. Quản trị theo bản năng của một Best Seller cũ. Bạn chưa biết cách khai vấn đội ngũ và đang ôm đồm mọi quyết định.'
                    },
                    {
                      label: 'Performance (P) - Hiệu suất',
                      score: leaderResult.scores.p,
                      desc: Number(leaderResult.scores.p) >= 7
                        ? 'Tốt. Bạn thiết lập chỉ số và dashboard theo dõi hiệu suất ngày (Active Ratio) khoa học. Các buổi giao ban dựa hoàn toàn trên con số thực tế.'
                        : Number(leaderResult.scores.p) >= 4
                        ? 'Trung bình. Có theo dõi kết quả kinh doanh nhưng chưa chuẩn hóa chỉ số hoạt động. Đôi lúc nhận định hiệu suất còn mang tính cảm tính.'
                        : 'Yếu. Bạn hầu như chỉ quản trị theo doanh số cuối tháng, không kiểm soát được hành vi và phễu hoạt động hàng ngày của TVV.'
                    },
                    {
                      label: 'Independence (I) - Độc lập',
                      score: leaderResult.scores.i,
                      desc: Number(leaderResult.scores.i) >= 7
                        ? 'Tốt. Các trưởng nhóm (UM/SUM) của bạn có độ tự lập rất cao, hệ thống tự chạy ổn định và giữ vững doanh số ngay cả khi bạn vắng mặt.'
                        : Number(leaderResult.scores.i) >= 4
                        ? 'Trung bình. Nhóm có thể hoạt động ngắn hạn khi bạn đi vắng nhưng hiệu suất và kỷ luật làm việc sẽ giảm dần nếu thiếu sự đôn đốc của bạn.'
                        : 'Yếu. Đội nhóm hoàn toàn phụ thuộc vào sự hiện diện của bạn. Khi bạn không chạm tay vào việc, hệ thống gần như bị đóng băng.'
                    },
                    {
                      label: 'System (S) - Hệ thống',
                      score: leaderResult.scores.s,
                      desc: Number(leaderResult.scores.s) >= 7
                        ? 'Tốt. Bạn đã chuẩn hóa các quy trình cốt lõi (SOPs) về tuyển dụng, đào tạo và bàn giao công nghệ. Có đường ống phát triển lãnh đạo kế thừa tốt.'
                        : Number(leaderResult.scores.s) >= 4
                        ? 'Trung bình. Đã có một số quy trình viết tay hoặc slide đào tạo nhưng chưa tạo thành một hệ điều hành đồng bộ để nhân bản tự động.'
                        : 'Yếu. Hoạt động chủ yếu dựa vào truyền miệng và kinh nghiệm cá nhân. Thiếu quy trình chuẩn hóa khiến việc nhân bản đội nhóm gặp khó khăn.'
                    }
                  ].map((axis, aIdx) => (
                    <div key={aIdx} className="p-3 border border-surface-container/60 rounded bg-background/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-primary">{axis.label}</span>
                        <span className="font-label text-xs font-bold text-heritage-maroon bg-heritage-maroon/10 px-2 py-0.5 rounded">
                          {axis.score} / 10
                        </span>
                      </div>
                      <p className="text-[11px] text-secondary leading-relaxed pt-1">{axis.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Khối hiển thị Điểm Sáng Năng Lực / Vùng Tư Duy Vượt Trội */}
            {cognitiveHighlights.length > 0 && (
              <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 shadow-sm border-l-4 border-l-green-700">
                <div className="border-b border-surface-container/60 pb-3">
                  <h3 className="font-headline text-base font-bold text-green-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[20px] text-green-700">stars</span>
                    🌟 Điểm Sáng Năng Lực Vượt Trội (Vùng Tư Duy Vượt Ngưỡng)
                  </h3>
                  <p className="text-secondary text-[11px] mt-1 font-body">
                    Mặc dù cấp độ nền móng trung bình hiện tại của bạn là{' '}
                    <strong>
                      {leaderResult ? leaderResult.maturityLevelName : tvvResult?.focusStageName}
                    </strong>
                    , hệ thống ghi nhận bạn đã có những tư duy và hành vi xuất sắc thuộc cấp độ cao hơn ở các khía cạnh sau:
                  </p>
                </div>

                <div className="space-y-4">
                  {cognitiveHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="p-4 rounded border border-green-700/10 bg-green-500/[0.01] space-y-2">
                      <h4 className="font-headline text-xs font-bold text-primary flex items-start gap-1">
                        <span className="text-green-700 font-bold shrink-0">▸ Câu hỏi:</span>
                        <span className="italic">"{highlight.questionText}"</span>
                      </h4>
                      <p className="text-xs text-secondary pl-4 leading-relaxed">
                        <span className="font-semibold text-green-700">Lựa chọn của bạn:</span> {highlight.selectedText}{' '}
                        <span className="font-bold text-green-800 bg-green-100 px-1.5 py-0.5 rounded text-[9px] font-label">
                          Cấp độ {highlight.stage}
                        </span>
                      </p>
                      <p className="text-[11px] text-secondary/80 pl-4 border-l-2 border-green-700/30 italic">
                        <strong>Bình luận từ chuyên gia MAI:</strong> Bạn đang sở hữu những hạt giống tư duy đột phá ở cấp độ{' '}
                        {highlight.stage}. Đây chính là thế mạnh và điểm tựa cực kỳ quan trọng. Hãy áp dụng tư duy chuẩn hóa của khía cạnh này làm đòn bẩy để kéo dần các khía cạnh còn lại lên cùng cấp độ, từ đó nâng cấp toàn diện hiệu suất làm nghề/hệ thống của bạn.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mâu thuẫn tư duy - thực thi đối với Leader */}
            {leaderResult && leaderResult.conflictText && (
              <div className="bg-heritage-maroon/[0.02] border border-heritage-maroon/10 p-5 rounded-lg text-xs space-y-2">
                <span className="font-bold text-heritage-maroon uppercase block font-label">🔍 Đối chiếu Tư duy vs Thực thi thực tế:</span>
                <p className="text-primary leading-relaxed text-sm italic">
                  {leaderResult.conflictText}
                </p>
              </div>
            )}

            {/* Khối đề xuất chương trình đào tạo & SOP hành động (không chứa PDF) */}
            <div className="border border-surface-container rounded-lg p-6 bg-background/10 space-y-4">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block border-b border-heritage-maroon/15 pb-2">
                🎯 ĐỀ XUẤT CHƯƠNG TRÌNH PHÁT TRIỂN DÀNH RIÊNG CHO BẠN
              </span>
              <h4 className="font-headline text-lg font-bold text-primary">{proposal.advice}</h4>
              <p className="font-body text-xs text-secondary leading-relaxed">{proposal.details}</p>
              <button
                onClick={() => window.location.href = selectedRole === 'leader' ? '/solutions?branch=management' : '/solutions?branch=specialist'}
                className="bg-heritage-maroon text-zen-white px-6 py-2.5 font-label text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all rounded-sm active:scale-95 duration-100"
              >
                Tìm hiểu giải pháp {proposal.solutionName}
              </button>
            </div>

            {/* SOP hành động gỡ nghẽn */}
            {proposal.actions.length > 0 && (
              <div className="bg-heritage-maroon/[0.02] border border-heritage-maroon/15 p-6 rounded-lg space-y-4">
                <h3 className="font-headline text-sm font-bold text-heritage-maroon uppercase tracking-widest block font-label border-b border-heritage-maroon/10 pb-2">
                  🚶 Lộ trình Hành động Ưu tiên tuần này (SOP gỡ nghẽn):
                </h3>
                <ul className="space-y-3">
                  {proposal.actions.map((act, aIdx) => (
                    <li key={aIdx} className="flex gap-3 text-xs leading-relaxed text-secondary">
                      <span className="w-5 h-5 rounded-full bg-heritage-maroon/10 text-heritage-maroon flex items-center justify-center font-bold shrink-0">
                        {aIdx + 1}
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-center pt-4">
              <button
                onClick={resetDiagnose}
                className="text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider border-b border-heritage-maroon/20 hover:border-heritage-maroon transition-all"
              >
                Thực hiện chẩn đoán mới
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
