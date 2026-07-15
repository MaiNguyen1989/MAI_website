-- 1. TẠO BẢNG POSTS (Bài viết & Podcasts)
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'podcast')),
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt Row Level Security (RLS) cho posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Chính sách RLS cho posts:
-- Cho phép mọi người (độc giả) đọc bài viết
CREATE POLICY "Allow public read posts" ON public.posts
    FOR SELECT USING (true);

-- Cho phép tất cả các thao tác của Admin (tạm thời cho phép full access để CMS Admin Client thao tác bằng Anon Key)
CREATE POLICY "Allow admin manage posts" ON public.posts
    FOR ALL USING (true) WITH CHECK (true);


-- 2. TẠO BẢNG LEADS (Thông tin khách hàng chẩn đoán)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    scores JSONB NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt RLS cho leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Chính sách RLS cho leads:
-- Cho phép bất kỳ ai (khách làm test) cũng có thể insert lead mới
CREATE POLICY "Allow public insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Cho phép Admin xem và quản lý danh sách leads
CREATE POLICY "Allow admin manage leads" ON public.leads
    FOR ALL USING (true) WITH CHECK (true);


-- 3. TẠO BẢNG QUESTIONS (Cấu hình câu hỏi trắc nghiệm)
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('leader', 'agent')),
    axis TEXT NOT NULL CHECK (axis IN ('action', 'tech', 'mindful')),
    text TEXT NOT NULL,
    min_label TEXT NOT NULL,
    max_label TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt RLS cho questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Chính sách RLS cho questions:
-- Cho phép mọi người đọc danh sách câu hỏi để làm bài test
CREATE POLICY "Allow public read questions" ON public.questions
    FOR SELECT USING (true);

-- Cho phép Admin quản lý câu hỏi
CREATE POLICY "Allow admin manage questions" ON public.questions
    FOR ALL USING (true) WITH CHECK (true);


-- ==========================================
-- CHÈN DỮ LIỆU MẪU BAN ĐẦU (INITIAL SEED DATA)
-- ==========================================

-- Chèn dữ liệu bài viết mẫu
INSERT INTO public.posts (id, title, category, type, summary, content, image)
VALUES 
(
    'p1', 
    'Mindful Leadership in Tech Era: Khi công nghệ cần sự tỉnh thức', 
    'Khai phóng Tâm trí', 
    'podcast', 
    'Làm thế nào để duy trì sự kết nối giữa người với người trong một thế giới tràn ngập AI và tự động hóa?', 
    'Thời đại công nghệ số bùng nổ mang đến những công cụ tự động hóa vô cùng mạnh mẽ cho ngành bảo hiểm nhân thọ. Tuy nhiên, nó cũng mang lại một áp lực vô hình cho cả quản lý và đại lý. Những con số chỉ tiêu, những thông báo tin nhắn liên tục dễ khiến con người rơi vào trạng thái quá tải nhận thức và kiệt sức tinh thần.<br/><br/><strong>Mindful Leadership (Lãnh đạo tỉnh thức)</strong> không phải là trốn tránh công nghệ hay rút lui về rừng núi. Đó là khả năng giữ cho tâm trí điềm tĩnh, sáng suốt ngay giữa guồng quay hối hả của công việc. Khi một người lãnh đạo có sự tỉnh thức, họ đưa ra quyết định không dựa trên sự nóng giận hay áp lực tức thời, mà dựa trên sự thấu hiểu sâu sắc và dữ liệu chuẩn xác.<br/><br/>Việc kết hợp Mindful với Action - sự tỉnh thức kết hợp cùng hành động thực tế và công nghệ - chính là chìa khóa để xây dựng một đội ngũ bền bỉ. Công nghệ giải phóng sức lao động chân tay, còn sự tỉnh thức gắn kết con người với con người. Đó chính là triết lý cốt lõi mà MAI Institute muốn truyền tải đến các thế hệ nhà quản lý bảo hiểm nhân thọ thế hệ mới.', 
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
),
(
    'p2', 
    'Tư vấn bảo hiểm trong thời đại số: Từ bán hàng đến cố vấn', 
    'Xu hướng Ngành', 
    'blog', 
    'Tại sao những đại lý tư vấn dựa trên sự thấu cảm lại đang thắng thế trước những "cỗ máy bán hàng" truyền thống.', 
    'Khách hàng ngày nay thông minh hơn, có nhiều nguồn thông tin hơn và cũng hoài nghi hơn bao giờ hết. Những bài bán hàng truyền thống theo kiểu chèo kéo, ép buộc hay dùng các tiểu xảo tâm lý đã không còn hiệu quả. Thay vào đó, khách hàng tìm kiếm những người cố vấn thực thụ - những người có thể ngồi xuống, lắng nghe nỗi lo lắng của họ và thiết kế một giải pháp tài chính thực sự phù hợp.<br/><br/>Để chuyển đổi từ "người bán hàng" sang "nhà cố vấn tài chính", tư vấn viên cần trang bị hai yếu tố:<ol class="list-decimal pl-6 my-4 space-y-2"><li><strong>Sự thấu cảm sâu sắc (Mindful):</strong> Lắng nghe tích cực, hiểu được hoàn cảnh và nhu cầu của khách hàng trước khi đề xuất bất kỳ giải pháp nào.</li><li><strong>Năng lực chuyên môn sắc bén (Action):</strong> Hiểu rõ sản phẩm, có kỹ năng phân tích tài chính và ứng dụng công nghệ để quản lý khách hàng chuyên nghiệp.</li></ol>Tại MAI Institute, quy trình tư vấn tinh hoa được xây dựng trên sự tôn trọng khách hàng và tính minh bạch tuyệt đối. Sự chuyên nghiệp này không chỉ giúp đại lý chốt hợp đồng tự nhiên mà còn tạo dựng uy tín bền vững, mang lại nguồn khách hàng giới thiệu chất lượng cao.', 
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
),
(
    'p3', 
    'Xây dựng "Hệ thống niềm tin" trong quản trị đội ngũ Agency', 
    'Công nghệ Quản trị', 
    'blog', 
    'Bí quyết duy trì sự bền bỉ và cam kết của đội ngũ thông qua các giá trị văn hóa và đo lường dữ liệu chuẩn xác.', 
    'Thách thức lớn nhất của một Agency Leader trong ngành bảo hiểm không phải là tuyển dụng, mà là giữ chân và kích hoạt đội ngũ. Tỷ lệ rụng nhân sự (turnover rate) cao thường đến từ việc đại lý mới thiếu sự hỗ trợ, cảm thấy lạc lõng và bị áp lực doanh số đè nặng mà không có lộ trình phát triển rõ ràng.<br/><br/>Để giải quyết tận gốc vấn đề này, nhà quản trị cần xây dựng một <strong>Hệ thống niềm tin</strong> dựa trên hai trụ cột:<br/><br/><strong>1. Đo lường bằng dữ liệu thực tế (Data-driven):</strong> Không chỉ nhìn vào kết quả doanh số cuối tháng, mà phải theo dõi các chỉ số hoạt động hàng ngày (Active Ratio, số cuộc gọi, số cuộc gặp). Việc này giúp phát hiện sớm lỗ hổng của từng đại lý để hỗ trợ kịp thời trước khi họ nản lòng.<br/><br/><strong>2. Văn hóa thấu cảm và tỉnh thức:</strong> Tạo ra môi trường làm việc cởi mở, nơi mọi người được lắng nghe và tôn trọng. Những buổi coaching 1-1 chất lượng sẽ giúp giải tỏa stress và tái tạo năng lượng hoạt động cho đội ngũ.<br/><br/>Sự kết hợp giữa số liệu khoa học và văn hóa tỉnh thức tạo nên một hệ thống quản trị vững chắc, giúp đội ngũ tự vận hành hiệu quả và gắn kết bền lâu.', 
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
)
ON CONFLICT (id) DO NOTHING;


-- Bảng questions sẽ không seed dữ liệu tĩnh vì câu hỏi trắc nghiệm đã được chuyển sang quản trị ở frontend Next.js.


-- Chèn dữ liệu leads mẫu
INSERT INTO public.leads (id, name, phone, email, company, role, scores, date)
VALUES
('l-mock-1', 'Nguyễn Minh Anh', '0912345678', 'minhanh.nguyen@gmail.com', 'Manulife Việt Nam', 'Giám đốc Vùng & Agency Leader', '{"mindful": 8, "action": 5, "tech": 4}'::jsonb, '2026-06-12 14:32'),
('l-mock-2', 'Trần Thị Thu Thảo', '0987654321', 'thuthao.t@prudential.com.vn', 'Prudential Việt Nam', 'Đại lý', '{"mindful": 5, "action": 7, "tech": 8}'::jsonb, '2026-06-13 09:15')
ON CONFLICT (id) DO NOTHING;
