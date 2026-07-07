import { Question, Post, Lead } from '../types';

export const initialQuestions: { leader: Question[]; agent: Question[] } = {
  leader: [
    { id: 'l1', axis: 'action', text: 'Tỷ lệ đại lý hoạt động (Active Ratio) trong đội ngũ của bạn hiện tại là bao nhiêu?', minLabel: 'Dưới 20%', maxLabel: 'Trên 60%' },
    { id: 'l2', axis: 'tech', text: 'Mức độ tự động hóa các quy trình họp hành, đào tạo và báo cáo qua công nghệ trong đội ngũ:', minLabel: 'Thủ công hoàn toàn', maxLabel: 'Tự động hóa 100%' },
    { id: 'l3', axis: 'mindful', text: 'Mức độ bền bỉ, gắn kết và hạn chế stress/rụng nhân sự ở các vị trí nòng cốt:', minLabel: 'Rất kém/Stress nhiều', maxLabel: 'Bền bỉ/Tinh thần tỉnh thức' },
    { id: 'l4', axis: 'action', text: 'Kỹ năng coaching, truyền cảm hứng và đồng hành thấu hiểu cùng đội ngũ của bạn:', minLabel: 'Chỉ áp doanh số', maxLabel: 'Coaching thấu cảm' },
    { id: 'l5', axis: 'tech', text: 'Mức độ sử dụng dữ liệu thực tế (data-driven) để quản trị và ra quyết định thay vì cảm tính:', minLabel: 'Cảm tính hoàn toàn', maxLabel: 'Dữ liệu thời gian thực' }
  ],
  agent: [
    { id: 'a1', axis: 'action', text: 'Khả năng duy trì nguồn khách hàng tiềm năng mới một cách chủ động và ổn định:', minLabel: 'Thường xuyên cạn kiệt', maxLabel: 'Nguồn khách hàng vô tận' },
    { id: 'a2', axis: 'tech', text: 'Mức độ ứng dụng công cụ số/phần mềm để quản lý phễu khách hàng và lịch sử làm việc:', minLabel: 'Ghi sổ tay/Nhớ tay', maxLabel: 'CRM/App chuyên nghiệp' },
    { id: 'a3', axis: 'mindful', text: 'Sự điềm tĩnh, tự tin và bình yên tinh thần khi đối mặt với những lời từ chối của khách hàng:', minLabel: 'Dễ nản lòng/Stress', maxLabel: 'Điềm tĩnh/Tỉnh thức' },
    { id: 'a4', axis: 'action', text: 'Kỹ năng cố vấn giải pháp tài chính cá nhân hóa và chốt hợp đồng dựa trên sự thấu cảm:', minLabel: 'Cố bán theo bản năng', maxLabel: 'Cố vấn tài chính tinh tế' },
    { id: 'a5', axis: 'mindful', text: 'Sự cam kết tư vấn đúng nhu cầu thực tế của khách hàng thay vì chạy theo hoa hồng sản phẩm:', minLabel: 'Chỉ quan tâm doanh số', maxLabel: 'Cam kết đặt khách hàng lên hàng đầu' }
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
