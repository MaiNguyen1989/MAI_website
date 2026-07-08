'use client';

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Question, Lead, LeadScores } from '@/types';
import { initialQuestions, initialLeads } from '@/lib/mockData';
import RadarChart from '@/components/charts/RadarChart';

export default function DiagnosePage() {
  const [questionsConfig] = useLocalStorage<typeof initialQuestions>('mai_questions', initialQuestions);
  const [leads, setLeads] = useLocalStorage<Lead[]>('mai_leads', initialLeads);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedRole, setSelectedRole] = useState<'leader' | 'agent' | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  
  const [analyzerStatus, setAnalyzerStatus] = useState('Đang phân tích chỉ số hệ thống...');
  const [computedScores, setComputedScores] = useState<LeadScores>({ mindful: 5, action: 5, tech: 5 });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });

  const [proposal, setProposal] = useState({
    solutionName: '',
    advice: '',
    details: ''
  });

  const selectRole = (role: 'leader' | 'agent') => {
    setSelectedRole(role);
    const questions = questionsConfig[role];
    setQuizQuestions(questions);
    setCurrentQuestionIdx(0);
    setUserAnswers(Array(questions.length).fill(5)); // Mặc định điểm 5/10
    setStep(2);
  };

  const updateSliderValue = (val: string) => {
    const updated = [...userAnswers];
    updated[currentQuestionIdx] = parseInt(val);
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
      // Chuyển sang Step 3 (Loading phân tích)
      setStep(3);
      
      setTimeout(() => setAnalyzerStatus("Đánh giá các chỉ số tỉnh thức và dữ liệu..."), 500);
      setTimeout(() => setAnalyzerStatus("Đang vẽ sơ đồ năng lực..."), 1000);
      setTimeout(() => {
        calculateResult();
        setStep(4);
      }, 1500);
    }
  };

  const calculateResult = () => {
    const scoreMap: Record<string, number[]> = { mindful: [], action: [], tech: [] };
    quizQuestions.forEach((q, idx) => {
      scoreMap[q.axis].push(userAnswers[idx]);
    });

    const mindful = Math.round((scoreMap.mindful.reduce((a, b) => a + b, 0) / scoreMap.mindful.length) * 10) / 10 || 5;
    const action = Math.round((scoreMap.action.reduce((a, b) => a + b, 0) / scoreMap.action.length) * 10) / 10 || 5;
    const tech = Math.round((scoreMap.tech.reduce((a, b) => a + b, 0) / scoreMap.tech.length) * 10) / 10 || 5;

    const scores = { mindful, action, tech };
    setComputedScores(scores);
  };

  const getMinAxis = (scores: LeadScores): 'mindful' | 'action' | 'tech' => {
    const m = Number(scores.mindful);
    const a = Number(scores.action);
    const t = Number(scores.tech);
    
    if (m <= a && m <= t) return 'mindful';
    if (a <= m && a <= t) return 'action';
    return 'tech';
  };

  const getDiagnosisFeedback = () => {
    const minAxis = getMinAxis(computedScores);
    if (minAxis === 'mindful') {
      return {
        short: `"Hệ thống của bạn đang rơi vào trạng thái 'Kiệt sức vô hình'. Năng suất cao nhưng áp lực tinh thần khiến nhân sự dễ rời bỏ."`,
        detailed: "Điểm Tỉnh thức (Mindful) của bạn đang ở mức thấp nhất. Tình trạng stress, kiệt sức của đội ngũ hoặc sự thiếu bình yên trong tư vấn đang kìm hãm sự gắn kết lâu dài. Bạn cần đưa triết lý quản trị tĩnh tâm và kỹ năng coaching thấu cảm vào vận hành."
      };
    } else if (minAxis === 'action') {
      return {
        short: `"Quy trình thực thi của đội ngũ đang gặp nút thắt lớn. Thiếu năng lực chốt hợp đồng nhân văn và tính nhất quán."`,
        detailed: "Điểm Hành động (Action) của bạn chưa đạt yêu cầu. Kỹ năng tư vấn thực chiến và quy trình làm việc chuẩn của bạn hoặc đại lý chưa đồng nhất. Bạn cần chuẩn hóa quy trình 5 bước tinh hoa để biến bán hàng bản năng thành cố vấn khoa học."
      };
    } else {
      return {
        short: `"Hạ tầng quản trị đang cồng kềnh, thủ công. Bạn đang tốn quá nhiều thời gian họp hành thay vì tối ưu quy trình."`,
        detailed: "Điểm Công nghệ (Tech Integration) đang kéo hiệu suất đi xuống. Việc lưu trữ leads bằng sổ tay, thủ công làm thất thoát cơ hội và giảm tốc độ. Ứng dụng app quản trị tự động hoặc phễu số sẽ giúp bạn giải phóng 30% thời gian họp vô bổ."
      };
    }
  };

  const getSolutionRedirectUrl = () => {
    const minAxis = getMinAxis(computedScores);
    if (selectedRole === 'leader') {
      if (minAxis === 'mindful') {
        return '/solutions?branch=management&stage=2'; // Hướng tới Team Leader (Kỹ năng giao tiếp khai vấn / giảm stress)
      } else {
        return '/solutions?branch=management&stage=5'; // Hướng tới System Builder (COACHMATE - Hệ thống quản trị)
      }
    } else {
      if (minAxis === 'mindful') {
        return '/solutions?branch=specialist&stage=2'; // Hướng tới LIBA Level 1 (Tư vấn chuẩn mực & điềm tĩnh)
      } else {
        return '/solutions?branch=specialist&stage=3'; // Hướng tới LIBA Level 2 (Hoạch định tài chính chiến lược)
      }
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

    const newLead: Lead = {
      id: 'l-' + Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      role: selectedRole === 'leader' ? "Nhà quản lý" : "Tư vấn viên",
      scores: computedScores,
      date
    };

    setLeads([newLead, ...leads]);

    // Tạo đề xuất cá nhân hóa
    const minAxis = getMinAxis(computedScores);
    let solutionName = "";
    let advice = "";
    let details = "";

    if (selectedRole === 'leader') {
      solutionName = "Executive Suite";
      if (minAxis === 'mindful') {
        advice = "Khóa huấn luyện: Mindful Leadership in Tech Era";
        details = "Chương trình chuyên biệt giúp Agency Leader làm chủ tâm trí, giảm stress hệ thống và tối ưu hóa năng suất thông qua sự thấu cảm, đồng hành cùng đại lý.";
      } else {
        advice = "Đăng ký Demo Hệ thống quản trị tự động hóa (App Quản trị)";
        details = "Chúng tôi cung cấp bản quyền App quản lý chỉ số hoạt động kinh doanh (Active Ratio), tự động hóa quy trình họp và huấn luyện của MAI Institute.";
      }
    } else {
      solutionName = "Professional Suite";
      if (minAxis === 'mindful') {
        advice = "Khóa đào tạo: Tư vấn chuẩn mực & Thiết lập Tài chính Cá nhân";
        details = "Giáo trình giúp nhà tư vấn chuyển đổi tâm thế thành Cố vấn tài chính chuyên nghiệp, giữ vững sự điềm tĩnh và thấu cảm trước mọi lời từ chối.";
      } else {
        advice = "Tải Giáo trình chuyển đổi hiệu suất cốt lõi & Quy trình 5 bước";
        details = "Tài liệu hướng dẫn xây dựng phễu khách hàng trực tuyến, quy trình tư vấn tinh hoa để duy trì doanh số bền vững không phụ thuộc quan hệ thân quen.";
      }
    }

    setProposal({ solutionName, advice, details });
    setStep(5);
  };

  const downloadPDF = () => {
    alert("Khởi tạo tiến trình tải tài liệu...\nTệp PDF Báo cáo Phân tích Chi tiết & E-book (Bản demo) đã được tải xuống máy của bạn.");
  };

  const resetDiagnose = () => {
    setSelectedRole(null);
    setQuizQuestions([]);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setStep(1);
    setFormData({ name: '', phone: '', email: '', company: '' });
  };

  const feedback = getDiagnosisFeedback();

  return (
    <div id="view-diagnose" className="view-content py-12 px-margin-desktop min-h-[80vh] flex items-center">
      <div className="max-w-[700px] w-full mx-auto bg-zen-white border border-surface-container rounded-lg shadow-sm p-8 md:p-12 relative">
        
        {/* Step 1: Chọn vai trò */}
        {step === 1 && (
          <div id="diag-step-1" className="diag-step space-y-8">
            <div className="text-center">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block mb-2">
                Diagnostic Tools
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-primary font-medium">Bắt đầu chẩn đoán hệ thống</h2>
              <p className="font-body text-sm text-secondary mt-2">Vui lòng chọn vai trò hoạt động của bạn để tải câu hỏi phù hợp</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div
                onClick={() => selectRole('leader')}
                className="group border border-surface-container hover:border-heritage-maroon p-6 cursor-pointer rounded-lg transition-soft text-center bg-background/30 hover:bg-zen-white"
              >
                <span className="material-symbols-outlined text-[48px] text-heritage-maroon/60 group-hover:text-heritage-maroon transition-colors">
                  leaderboard
                </span>
                <h3 className="font-headline text-xl font-bold text-primary mt-4">Nhà Quản Lý</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed">
                  Giám đốc Vùng, Agency Leader, Trưởng nhóm kinh doanh cần đánh giá hệ thống quản trị đội ngũ.
                </p>
              </div>
              <div
                onClick={() => selectRole('agent')}
                className="group border border-surface-container hover:border-heritage-maroon p-6 cursor-pointer rounded-lg transition-soft text-center bg-background/30 hover:bg-zen-white"
              >
                <span className="material-symbols-outlined text-[48px] text-heritage-maroon/60 group-hover:text-heritage-maroon transition-colors">
                  person_celebrate
                </span>
                <h3 className="font-headline text-xl font-bold text-primary mt-4">Tư Vấn Viên</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed">
                  Đại lý, Cố vấn Tài chính cần đánh giá kỹ năng tư vấn cá nhân và quy trình tìm kiếm khách hàng.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Làm trắc nghiệm */}
        {step === 2 && quizQuestions.length > 0 && (
          <div id="diag-step-2" className="diag-step space-y-8">
            <div className="flex justify-between items-center border-b border-surface-container/60 pb-4">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider" id="quiz-role-label">
                Vai trò: {selectedRole === 'leader' ? 'Nhà quản lý' : 'Tư vấn viên'}
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

            <div className="space-y-6 pt-4 min-h-[120px]">
              <h3 className="font-headline text-2xl text-primary leading-tight font-medium" id="quiz-question-text">
                {quizQuestions[currentQuestionIdx].text}
              </h3>
            </div>

            {/* Slider */}
            <div className="space-y-4 pt-4">
              <input
                type="range"
                min="1"
                max="10"
                value={userAnswers[currentQuestionIdx]}
                onChange={(e) => updateSliderValue(e.target.value)}
                className="w-full accent-heritage-maroon cursor-pointer h-1.5 bg-surface-container rounded-lg appearance-none"
                id="quiz-slider"
              />
              <div className="flex justify-between text-xs text-secondary font-label font-medium px-1">
                <span className="max-w-[45%] text-left" id="quiz-min-label">
                  {quizQuestions[currentQuestionIdx].minLabel}
                </span>
                <span className="bg-heritage-maroon/10 text-heritage-maroon font-bold text-sm px-3 py-1 rounded" id="quiz-current-val">
                  {userAnswers[currentQuestionIdx]} / 10
                </span>
                <span className="max-w-[45%] text-right" id="quiz-max-label">
                  {quizQuestions[currentQuestionIdx].maxLabel}
                </span>
              </div>
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
                className="bg-heritage-maroon text-zen-white px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-1 rounded-sm active:scale-95 duration-150"
              >
                <span>{currentQuestionIdx === quizQuestions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Hiệu ứng phân tích */}
        {step === 3 && (
          <div id="diag-step-3" className="diag-step py-12 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="font-headline text-2xl text-primary font-medium" id="analyzer-status">
                {analyzerStatus}
              </h3>
              <p className="font-body text-xs text-secondary">Quy trình xử lý dữ liệu và thiết lập đồ thị radar năng lực.</p>
            </div>
          </div>
        )}

        {/* Step 4: Hiển thị kết quả sơ bộ và Lead Form */}
        {step === 4 && (
          <div id="diag-step-4" className="diag-step space-y-8">
            <div className="text-center border-b border-surface-container/60 pb-6">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2">
                Diagnostic Result
              </span>
              <h2 className="font-display text-3xl text-primary font-medium">Báo cáo sức khỏe hệ thống</h2>
              <p className="font-body text-xs text-secondary mt-1">Kết quả đánh giá sơ bộ dựa trên khung năng lực 3 trục.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Radar Component */}
              <div className="flex justify-center p-2 border border-surface-container rounded-lg bg-background/20 relative">
                <RadarChart scores={computedScores} />
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <h4 className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider">Đánh giá chung:</h4>
                <p className="font-body text-sm text-on-surface leading-relaxed font-semibold italic">
                  {feedback.short}
                </p>
                <p className="font-body text-xs text-secondary leading-relaxed">
                  {feedback.detailed}
                </p>
              </div>
            </div>

            {/* Lead Lock Form */}
            <div className="bg-paper-grey/50 p-6 rounded-lg border border-surface-container space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-headline text-xl text-primary font-semibold">Nhận Báo Cáo Phân Tích Chi Tiết &amp; E-Book</h3>
                <p className="font-body text-xs text-secondary">
                  Để lại thông tin doanh nghiệp để mở khóa link tải Báo cáo Phân tích PDF &amp; E-book xử lý vấn đề từ chuyên gia.
                </p>
              </div>
              
              <form onSubmit={handleLeadSubmit} className="space-y-4">
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
                    <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Số điện thoại</label>
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
                    <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Tên Công ty / Đơn vị</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
                      placeholder="Ví dụ: Manulife Việt Nam"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-heritage-maroon text-zen-white py-3.5 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm shadow active:scale-[0.98] duration-150"
                >
                  Mở khóa Báo cáo chi tiết &amp; Nhận đề xuất
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 5: Đề xuất cá nhân hóa & Tải PDF */}
        {step === 5 && (
          <div id="diag-step-5" className="diag-step space-y-8">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-[64px] text-green-700">task_alt</span>
              <h2 className="font-display text-3xl text-primary font-medium">Đăng ký thành công!</h2>
              <p className="font-body text-sm text-secondary">Cảm ơn bạn đã để lại thông tin. Hệ thống đã mở khóa tài nguyên dành riêng cho bạn.</p>
            </div>

            <div className="border border-green-700/20 bg-green-500/5 p-6 rounded-lg text-center space-y-4">
              <h3 className="font-headline text-lg font-bold text-primary">Tài liệu &amp; Báo cáo phân tích hệ thống</h3>
              <p className="font-body text-xs text-secondary max-w-md mx-auto">
                Vui lòng bấm nút dưới đây để tải về file báo cáo PDF chi tiết cùng E-Book cẩm nang giải quyết lỗ hổng hệ thống.
              </p>
              <button
                onClick={downloadPDF}
                className="bg-heritage-maroon text-zen-white px-8 py-4 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all inline-flex items-center gap-2 rounded-sm shadow active:scale-95 duration-150"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span> Tải Báo cáo PDF &amp; E-Book (Free)
              </button>
            </div>

            {/* Đề xuất giải pháp cá nhân hóa */}
            <div className="space-y-4 pt-4 border-t border-surface-container/60">
              <h3 className="font-headline text-xl text-primary font-bold">Giải pháp tối ưu hóa đề xuất cho bạn:</h3>
              <div className="border border-surface-container rounded-lg p-6 bg-background/10 space-y-4">
                <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block">
                  {proposal.solutionName} Program
                </span>
                <h4 className="font-headline text-xl font-bold text-primary mt-2">{proposal.advice}</h4>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed">{proposal.details}</p>
                <button
                  onClick={() => window.location.href = getSolutionRedirectUrl()}
                  className="mt-4 bg-heritage-maroon text-zen-white px-5 py-2.5 font-label text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all rounded-sm"
                >
                  Chi tiết giải pháp {proposal.solutionName}
                </button>
              </div>
            </div>
            
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
