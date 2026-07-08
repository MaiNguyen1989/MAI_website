import { createClient } from '@supabase/supabase-js';

// Gán placeholder mặc định để tránh lỗi crash build (prerender error) của Next.js khi chưa cấu hình biến môi trường trên Vercel.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials are missing. Using placeholder values for build-time rendering.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
