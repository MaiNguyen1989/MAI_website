export interface QuizOption {
  label: string;      // A, B, C, D, E
  text: string;       // Mô tả đáp án
  weight: number;     // Trọng số điểm (1-5)
  stage?: string;     // Nhãn giai đoạn (G1-G4 hoặc L1-L5)
}

export interface Question {
  id: string;
  text: string;
  options: QuizOption[];
  axis?: 'L' | 'P' | 'I' | 'S'; // Chỉ dùng cho Leader để tính 4 trục LPIS
}

export interface QuizQuestionsConfig {
  leader: Question[];
  agent: Question[];
}

export interface Post {
  id: string;
  title: string;
  category: string;
  type: 'blog' | 'podcast';
  summary: string;
  content: string;
  image: string;
}

export interface LeadScores {
  mindful?: number | string;
  action?: number | string;
  tech?: number | string;
  l?: number | string;
  p?: number | string;
  i?: number | string;
  s?: number | string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  scores: LeadScores;
  date: string;
}
