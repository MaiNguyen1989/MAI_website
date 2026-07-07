export interface Question {
  id: string;
  axis: 'mindful' | 'action' | 'tech';
  text: string;
  minLabel: string;
  maxLabel: string;
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
  mindful: number | string;
  action: number | string;
  tech: number | string;
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
