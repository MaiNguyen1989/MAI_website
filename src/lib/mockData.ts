import { Question, Post, Lead } from '../types';

import { Question, Post, Lead } from '../types';

export const initialQuestions: { leader: Question[]; agent: Question[] } = {
  leader: [
    {
      id: 'l1',
      axis: 'L',
      text: 'Câu hỏi nào bạn thường tự hỏi mình nhất mỗi khi bắt đầu ngày mới?',
      options: [
        { label: 'A', text: 'Hôm nay mình cần làm gì để bán hàng tốt hơn hoặc hoàn thành việc cá nhân?', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Hôm nay đội nhóm của mình cần làm gì để hoạt động ra doanh số, "đúng - đủ - đều"?', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Hôm nay mình cần coaching cho trưởng nhóm nào để họ tự dẫn dắt đội tốt hơn?', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Hệ thống vận hành của mình đang gặp điểm nghẽn nào cần cải tiến bằng quy trình/dữ liệu?', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Mình cần kiến tạo môi trường hay văn hóa gì hôm nay để hệ thống tự phát triển dài hạn?', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l2',
      axis: 'P',
      text: 'Khi kết quả kinh doanh của toàn đội không đạt chỉ tiêu, phản ứng đầu tiên của bạn là gì?',
      options: [
        { label: 'A', text: 'Tự nỗ lực bán cá nhân nhiều hơn để bù đắp doanh số cho cả đội.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Tập hợp đội nhóm lại, đôn đốc, thúc đẩy hoạt động và trực tiếp đi hỗ trợ TVV chốt sales.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Làm việc ngay với các trưởng nhóm (UM/SUM) dưới quyền để xem họ đang gặp khó khăn gì trong quản trị.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Mở Dashboard lên xem dữ liệu phễu tuyển dụng/hoạt động để tìm ra chính xác lỗi nằm ở quy trình nào.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Đánh giá lại xem văn hóa học tập, năng lượng và môi trường phát triển chung của hệ sinh thái có đang bị nghẽn không.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l3',
      axis: 'I',
      text: 'Phần lớn thời gian làm việc trong tuần của bạn hiện nay đang dành cho việc gì?',
      options: [
        { label: 'A', text: 'Hoàn thành chỉ tiêu doanh số cá nhân và xử lý các sự vụ riêng.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Giao việc, kiểm tra hoạt động, hỗ trợ từng TVV thiết kế giải pháp và chốt hợp đồng.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Coaching, đào tạo năng lực quản lý và quy hoạch đội ngũ kế cận cho các trưởng nhóm.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Chuẩn hóa quy trình (SOP), xây dựng Dashboard, tối ưu hóa phễu tuyển dụng bằng dữ liệu.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Thiết kế chiến lược dài hạn, xây dựng văn hóa tổ chức và ứng dụng các công cụ tương lai (như AI, hệ sinh thái học tập).', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l4',
      axis: 'L',
      text: 'Khi một TVV cấp dưới gặp khó khăn trong công việc, cách xử lý của bạn là:',
      options: [
        { label: 'A', text: 'Chia sẻ kinh nghiệm cá nhân và bảo họ cứ làm y hệt như mình từng làm.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Trực tiếp xắn tay vào giải quyết thay hoặc đi gặp khách hàng cùng họ để gỡ rối.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Hướng dẫn Trưởng nhóm trực tiếp của TVV đó cách làm việc/coaching lại cho nhân sự.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Xem xét xem hệ thống huấn luyện hoặc quy trình tư vấn hiện tại có đang thiếu công cụ hỗ trợ họ không.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Sử dụng các bộ câu hỏi phản tư sâu để giúp họ tự nhìn nhận lại tư duy làm nghề và động lực nội tại.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l5',
      axis: 'S',
      text: 'Hoạt động tuyển dụng của đội ngũ đang được vận hành theo cách nào?',
      options: [
        { label: 'A', text: 'Chưa tập trung tuyển, chủ yếu vẫn là bản thân tự làm nghề.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Bạn tự đi tuyển đều đặn như một trách nhiệm cá nhân để tăng quy mô nhóm.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Bạn tập trung thúc đẩy và chuyển giao kỹ năng để các trưởng nhóm tự biết cách đi tuyển dụng.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Đã có phễu tuyển dụng chuẩn hóa (Recruitment Funnel) và đánh giá ứng viên bằng dữ liệu thực tế.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Xây dựng được một hệ sinh thái thu hút nhân tài tự nhiên thông qua thương hiệu và văn hóa của tổ chức.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l6',
      axis: 'I',
      text: 'Nếu bạn vắng mặt hoặc không trực tiếp tham gia điều hành công việc trong 1 tháng, hệ thống kinh doanh của bạn sẽ ra sao?',
      options: [
        { label: 'A', text: 'Đóng băng hoàn toàn vì bạn là nguồn tạo ra kết quả chính.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Đi xuống rõ rệt vì thiếu người đôn đốc, nhắc nhở và giải quyết sự vụ hàng ngày.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Sụt giảm nhẹ nhưng các trưởng nhóm vẫn tự vận hành được nhịp làm việc của nhóm họ.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Vẫn chạy ổn định vì mọi quy trình, KPI và Dashboard quản trị đã được chuẩn hóa, tự động vận hành.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Vẫn phát triển tốt, thậm chí tự sản sinh ra những thế hệ lãnh đạo mới nhờ văn hóa tự vận hành đã thấm sâu.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l7',
      axis: 'P',
      text: 'Chỉ số quan trọng nhất mà bạn dùng để đo lường sự thành công của mình mỗi tháng là gì?',
      options: [
        { label: 'A', text: 'Doanh số cá nhân và thu nhập mang về từ việc tự bán.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Tổng doanh số của toàn đội và tỷ lệ TVV hoạt động trong tháng.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Số lượng trưởng nhóm (Leader) mới thăng cấp hoặc số người biết tự quản trị.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Sự ổn định của các chỉ số hệ thống và hiệu suất tối ưu trên từng quy trình.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Sức khỏe của văn hóa tổ chức và số lượng nhà lãnh đạo thế hệ kế thừa xuất hiện liên tục.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l8',
      axis: 'S',
      text: 'Cách bạn đưa ra các quyết định hoặc chiến lược cho đội ngũ dựa vào điều gì?',
      options: [
        { label: 'A', text: 'Dựa hoàn toàn vào kinh nghiệm thực chiến và cảm hứng cá nhân.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Dựa vào các chương trình thi đua của công ty và cảm nhận về năng lượng của đội nhóm.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Dựa vào năng lực thực tế và lộ trình phát triển riêng của từng trưởng nhóm cốt cận.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Nói chuyện bằng con số, quản trị hoàn toàn bằng dữ liệu dài hạn và Dashboard kiểm soát.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Dựa trên tầm nhìn 3-5 năm về việc xây dựng một môi trường phát triển bền vững cho con người.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l9',
      axis: 'P',
      text: 'Sai lầm hoặc rào cản lớn nhất mà bạn đang cố gắng rũ bỏ ở hiện tại là gì?',
      options: [
        { label: 'A', text: 'Chờ đợi sự thúc đẩy từ quản lý cấp cao hoặc làm việc theo cảm hứng.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Ôm đồm làm thay việc của TVV, chưa nỡ buông tay để họ tự ngã và trưởng thành.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Vẫn sa đà vào việc quản lý chi tiết từng TVV thay vì tập trung phát triển năng lực cho trưởng nhóm.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Thỉnh thoảng vẫn xử lý sự vụ theo cảm tính thay vì bám sát vào hệ thống và quy trình chuẩn.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Đôi khi sa vào thiết kế các hệ thống quá vĩ mô mà quên mất việc làm đơn giản hóa để nhân bản dễ dàng.', weight: 5, stage: 'L5' }
      ]
    },
    {
      id: 'l10',
      axis: 'L',
      text: 'Bạn mong muốn để lại "di sản" gì lớn nhất sau hành trình làm lãnh đạo của mình?',
      options: [
        { label: 'A', text: 'Danh hiệu cá nhân xuất sắc và một nền tảng kỹ năng thực chiến tốt.', weight: 1, stage: 'L1' },
        { label: 'B', text: 'Một đội ngũ bán hàng thiện chiến, luôn đạt mục tiêu doanh số cao.', weight: 2, stage: 'L2' },
        { label: 'C', text: 'Tạo ra một thế hệ những người trưởng nhóm biết chủ động xây đội ngũ.', weight: 3, stage: 'L3' },
        { label: 'D', text: 'Một cỗ máy kinh doanh ổn định, bài bản, vận hành trơn tru không phụ thuộc cá nhân.', weight: 4, stage: 'L4' },
        { label: 'E', text: 'Một hệ sinh thái nhân văn, nơi con người tự tìm thấy động lực phát triển ngay cả khi không còn bạn dẫn dắt.', weight: 5, stage: 'L5' }
      ]
    }
  ],
  agent: [
    {
      id: 'a1',
      text: 'Điều đầu tiên bạn nghĩ đến khi bắt đầu một tháng làm việc mới là gì?',
      options: [
        { label: 'A', text: 'Tháng này mình có ký được hợp đồng nào không, có nên đi tiếp không?', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Làm sao để đạt đủ chỉ tiêu/doanh số để có thu nhập ổn định tháng này?', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Lịch hẹn và kế hoạch hoạt động "đúng - đủ - đều" của mình tuần này thế nào?', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Tháng này có bao nhiêu khách hàng cũ cần chăm sóc, và làm sao để tối ưu nguồn khách giới thiệu (Referral)?', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a2',
      text: 'Nguồn khách hàng hiện tại của bạn chủ yếu đến từ đâu?',
      options: [
        { label: 'A', text: 'Người thân, bạn bè thân thiết hoặc do quản lý hỗ trợ tiếp cận ban đầu.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Tự đi tìm kiếm qua data, mạng xã hội, nỗ lực tìm khách mới mỗi ngày.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Từ phễu khách hàng tự chủ động xây dựng và vận hành theo lịch trình kỷ luật.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Phần lớn đến từ khách hàng cũ quay lại hoặc được khách hàng cũ giới thiệu người mới.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a3',
      text: 'Khi gặp một tuần liên tiếp bị khách hàng từ chối, phản ứng thực tế của bạn là:',
      options: [
        { label: 'A', text: 'Hoang mang, mất tự tin và tự hỏi mình có thực sự hợp với nghề này không.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Lo lắng vì ảnh hưởng thu nhập, cố gắng tìm mọi cách để chốt bằng được một case để bù lại.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Bình tĩnh xem lại nhật ký hoạt động, tự đánh giá tỷ lệ chuyển đổi và tiếp tục làm đúng quy trình.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Nhìn nhận đó là xác suất bình thường, tập trung nâng cao trải nghiệm/thương hiệu cá nhân để hút khách dài hạn.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a4',
      text: 'Bạn quản lý thời gian làm việc hàng ngày của mình như thế nào?',
      options: [
        { label: 'A', text: 'Đến đâu làm đến đó, chủ yếu phụ thuộc vào lịch họp của văn phòng hoặc khi có quản lý nhắc nhở.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Tập trung toàn lực vào những ngày cuối tháng hoặc những lúc cần chạy đua doanh số.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Có lịch làm việc cố định theo tuần/tháng, tự giác đi gặp khách mà không cần ai thúc đẩy.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Vận hành công việc theo mô hình kinh doanh cá nhân bài bản, cân bằng giữa tìm khách mới và giữ khách cũ.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a5',
      text: 'Nếu trong vòng 3 tháng tới bạn không chủ động đi tìm khách hàng mới, công việc của bạn sẽ ra sao?',
      options: [
        { label: 'A', text: 'Chắc chắn sẽ đóng băng hoàn toàn vì chưa có nguồn khách ổn định.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Doanh số sẽ sụt giảm nghiêm trọng ngay lập tức vì thu nhập phụ thuộc vào nỗ lực tìm kiếm mỗi ngày.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Vẫn duy trì được nhịp hoạt động đều đặn nhờ vào thói quen và quy trình tự quản trị đã xây dựng.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Vẫn ổn định nhờ hệ thống khách hàng cũ tái tục và nguồn khách hàng tự động giới thiệu đến.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a6',
      text: 'Vai trò của người Quản lý đối với công việc hiện tại của bạn là gì?',
      options: [
        { label: 'A', text: 'Là chỗ dựa lớn nhất, giúp bạn củng cố niềm tin và định hướng từng bước đi ban đầu.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Là người hỗ trợ giải quyết các ca khó hoặc thúc đẩy thi đua để có động lực ra doanh số.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Là người đồng hành trao đổi chiến lược, bạn hoàn toàn tự chủ công việc mà không cần họ giám sát.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Là đối tác cùng nhìn nhận về xu hướng dài hạn và xây dựng tài sản khách hàng bền vững.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a7',
      text: 'Khi nói về quy trình tư vấn sản phẩm cho khách hàng:',
      options: [
        { label: 'A', text: 'Bạn vẫn đang học cách hiểu sâu về sản phẩm và con đường phát triển nghề nghiệp.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Bạn đã tư vấn được nhưng kết quả kinh doanh còn lên xuống thất thường, chưa ổn định.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Bạn đã chuẩn hóa được quy trình tư vấn riêng của mình và thực hiện nó một cách kỷ luật.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Quy trình của bạn tập trung vào việc trao giá trị lâu dài và định vị thương hiệu cá nhân trong lòng khách hàng.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a8',
      text: 'Động lực lớn nhất giữ bạn lại với nghề bảo hiểm ở thời điểm này là gì?',
      options: [
        { label: 'A', text: 'Muốn chứng minh bản thân làm được, kiếm được những khoản thu nhập/hợp đồng đầu tiên.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Cần một nguồn thu nhập ổn định hàng tháng để trang trải cuộc sống và yên tâm theo nghề.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Sự yêu thích cảm giác tự do, tự làm chủ công việc và làm chủ chính mình.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Mong muốn gắn bó lâu dài (5-10 năm), biến nghề này thành sự nghiệp bền vững.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a9',
      text: 'Mức độ tự học và nâng cao năng lực của bạn hiện nay thế nào?',
      options: [
        { label: 'A', text: 'Chủ yếu tham gia các lớp bắt buộc của công ty và học từ trải nghiệm thực tế của người đi trước.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Học khi thấy mình đang thiếu kỹ năng chốt sales hoặc khi gặp ca khách hàng khó.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Chủ động lên kế hoạch nâng cao kiến thức (tài chính, y tế...) theo tháng/quý để phục vụ công việc.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Học tập liên tục để xây dựng hệ thống kiến thức chuyên sâu, nâng tầm uy tín cá nhân trên thị trường.', weight: 4, stage: 'G4' }
      ]
    },
    {
      id: 'a10',
      text: 'Bạn định nghĩa thế nào là một TVV thành công?',
      options: [
        { label: 'A', text: 'Là người vượt qua được giai đoạn đầu, có hợp đồng và tin tưởng vào giá trị của bảo hiểm.', weight: 1, stage: 'G1' },
        { label: 'B', text: 'Là người có thu nhập đều đặn hàng tháng và "sống khỏe" được với nghề.', weight: 2, stage: 'G2' },
        { label: 'C', text: 'Là người hoàn toàn làm chủ thời gian, công việc và duy trì kỷ luật tự giác.', weight: 3, stage: 'G3' },
        { label: 'D', text: 'Là người xây dựng được một cộng đồng khách hàng trung thành và để lại di sản bền vững.', weight: 4, stage: 'G4' }
      ]
    }
  ]
};

export const initialPosts: Post[] = [
  {
    id: 'p1',
    title: 'Mindful Leadership in Tech Era: Khi công nghệ cần sự tỉnh thức',
    category: 'Khai phóng Tâm trí',
    type: 'podcast',
    summary: 'Làm thế nào để duy trì sự kết nối giữa người với người trong một thế giới tràn ngập AI và tự động hóa?',
    content: `Thời đại công nghệ số bùng nổ mang đến những công cụ tự động hóa vô cùng mạnh mẽ cho ngành bảo hiểm nhân thọ. Tuy nhiên, nó cũng mang lại một áp lực vô hình cho cả quản lý và đại lý. Những con số chỉ tiêu, những thông báo tin nhắn liên tục dễ khiến con người rơi vào trạng thái quá tải nhận thức và kiệt sức tinh thần.<br/><br/>
              <strong>Mindful Leadership (Lãnh đạo tỉnh thức)</strong> không phải là trốn tránh công nghệ hay rút lui về rừng núi. Đó là khả năng giữ cho tâm trí điềm tĩnh, sáng suốt ngay giữa guồng quay hối hả của công việc. Khi một người lãnh đạo có sự tỉnh thức, họ đưa ra quyết định không dựa trên sự nóng giận hay áp lực tức thời, mà dựa trên sự thấu hiểu sâu sắc và dữ liệu chuẩn xác.<br/><br/>
              Việc kết hợp Mindful với Action - sự tỉnh thức kết hợp cùng hành động thực tế và công nghệ - chính là chìa khóa để xây dựng một đội ngũ bền bỉ. Công nghệ giải phóng sức lao động chân tay, còn sự tỉnh thức gắn kết con người với con người. Đó chính là triết lý cốt lõi mà MAI Institute muốn truyền tải đến các thế hệ nhà quản lý bảo hiểm nhân thọ thế hệ mới.`,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    title: 'Tư vấn bảo hiểm trong thời đại số: Từ bán hàng đến cố vấn',
    category: 'Xu hướng Ngành',
    type: 'blog',
    summary: 'Tại sao những đại lý tư vấn dựa trên sự thấu cảm lại đang thắng thế trước những "cỗ máy bán hàng" truyền thống.',
    content: `Khách hàng ngày nay thông minh hơn, có nhiều nguồn thông tin hơn và cũng hoài nghi hơn bao giờ hết. Những bài bán hàng truyền thống theo kiểu chèo kéo, ép buộc hay dùng các tiểu xảo tâm lý đã không còn hiệu quả. Thay vào đó, khách hàng tìm kiếm những người cố vấn thực thụ - những người có thể ngồi xuống, lắng nghe nỗi lo lắng của họ và thiết kế một giải pháp tài chính thực sự phù hợp.<br/><br/>
              Để chuyển đổi từ "người bán hàng" sang "nhà cố vấn tài chính", tư vấn viên cần trang bị hai yếu tố:
              <ol class="list-decimal pl-6 my-4 space-y-2">
                  <li><strong>Sự thấu cảm sâu sắc (Mindful):</strong> Lắng nghe tích cực, hiểu được hoàn cảnh và nhu cầu của khách hàng trước khi đề xuất bất kỳ giải pháp nào.</li>
                  <li><strong>Năng lực chuyên môn sắc bén (Action):</strong> Hiểu rõ sản phẩm, có kỹ năng phân tích tài chính và ứng dụng công nghệ để quản lý khách hàng chuyên nghiệp.</li>
              </ol>
              Tại MAI Institute, quy trình tư vấn tinh hoa được xây dựng trên sự tôn trọng khách hàng và tính minh bạch tuyệt đối. Sự chuyên nghiệp này không chỉ giúp đại lý chốt hợp đồng tự nhiên mà còn tạo dựng uy tín bền vững, mang lại nguồn khách hàng giới thiệu chất lượng cao.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    title: 'Xây dựng "Hệ thống niềm tin" trong quản trị đội ngũ Agency',
    category: 'Công nghệ Quản trị',
    type: 'blog',
    summary: 'Bí quyết duy trì sự bền bỉ và cam kết của đội ngũ thông qua các giá trị văn hóa và đo lường dữ liệu chuẩn xác.',
    content: `Thách thức lớn nhất của một Agency Leader trong ngành bảo hiểm không phải là tuyển dụng, mà là giữ chân và kích hoạt đội ngũ. Tỷ lệ rụng nhân sự (turnover rate) cao thường đến từ việc đại lý mới thiếu sự hỗ trợ, cảm thấy lạc lõng và bị áp lực doanh số đè nặng mà không có lộ trình phát triển rõ ràng.<br/><br/>
              Để giải quyết tận gốc vấn đề này, nhà quản trị cần xây dựng một <strong>Hệ thống niềm tin</strong> dựa trên hai trụ cột:
              <br/><br/>
              <strong>1. Đo lường bằng dữ liệu thực tế (Data-driven):</strong> Không chỉ nhìn vào kết quả doanh số cuối tháng, mà phải theo dõi các chỉ số hoạt động hàng ngày (Active Ratio, số cuộc gọi, số cuộc gặp). Việc này giúp phát hiện sớm lỗ hổng của từng đại lý để hỗ trợ kịp thời trước khi họ nản lòng.
              <br/><br/>
              <strong>2. Văn hóa thấu cảm và tỉnh thức:</strong> Tạo ra môi trường làm việc cởi mở, nơi mọi người được lắng nghe và tôn trọng. Những buổi coaching 1-1 chất lượng sẽ giúp giải tỏa stress và tái tạo năng lượng hoạt động cho đội ngũ.<br/><br/>
              Sự kết hợp giữa số liệu khoa học và văn hóa tỉnh thức tạo nên một hệ thống quản trị vững chắc, giúp đội ngũ tự vận hành hiệu quả và gắn kết bền lâu.`,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialLeads: Lead[] = [
  { id: 'l-mock-1', name: 'Nguyễn Minh Anh', phone: '0912345678', email: 'minhanh.nguyen@gmail.com', company: 'Manulife Việt Nam', role: 'Giám đốc Vùng & Agency Leader', scores: { mindful: 8, action: 5, tech: 4 }, date: '2026-06-12 14:32' },
  { id: 'l-mock-2', name: 'Trần Thị Thu Thảo', phone: '0987654321', email: 'thuthao.t@prudential.com.vn', company: 'Prudential Việt Nam', role: 'Đại lý', scores: { mindful: 5, action: 7, tech: 8 }, date: '2026-06-13 09:15' }
];
