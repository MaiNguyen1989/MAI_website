import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAI Institute | Mindful Action for Elite Executives',
  description: 'Học viện tối ưu hóa hiệu suất toàn diện dành riêng cho Nhà lãnh đạo Bảo hiểm Nhân thọ thế hệ mới. Ứng dụng Zen vào thực thi chiến lược.',
  keywords: 'MAI Institute, Mindful Action, Bảo hiểm nhân thọ, Lãnh đạo tỉnh thức, Quản trị dữ liệu, Executive Suite, Professional Suite',
  openGraph: {
    title: 'MAI Institute | Mindful Action for Elite Executives',
    description: 'Học viện tối ưu hóa hiệu suất toàn diện dành riêng cho Nhà lãnh đạo Bảo hiểm Nhân thọ thế hệ mới.',
    type: 'website',
    locale: 'vi_VN',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface selection:bg-heritage-maroon/10 antialiased">
        {children}
      </body>
    </html>
  );
}
