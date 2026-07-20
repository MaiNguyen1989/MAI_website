'use client';

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Lead, Post, QuizQuestionsConfig, Question } from '@/types';
import { initialLeads, initialPosts, initialQuestions } from '@/lib/mockData';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'posts' | 'quiz'>('overview');

  // Check current session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsLocked(false);
        } else {
          setIsLocked(true);
        }
      } catch (err) {
        console.error('Lỗi check session:', err);
      } finally {
        setIsLoadingAuth(false);
      }
    }
    checkSession();
  }, []);

  // Load data from States instead of LocalStorage
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [questions, setQuestions] = useState<any>(initialQuestions);

  // Date and time display
  const [currentTime, setCurrentTime] = useState('');

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (postsError) throw postsError;
        if (postsData && postsData.length > 0) {
          setPosts(postsData as Post[]);
        } else {
          setPosts(initialPosts);
        }

        // Fetch leads
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (leadsError) throw leadsError;
        if (leadsData && leadsData.length > 0) {
          setLeads(leadsData as Lead[]);
        } else {
          setLeads(initialLeads);
        }

        // Vì câu hỏi trắc nghiệm mới được lưu tĩnh ở frontend, ta sử dụng trực tiếp initialQuestions
        setQuestions(initialQuestions);
      } catch (err) {
        console.error('Lỗi khi load dữ liệu CMS từ Supabase:', err);
        // Fallback về mock data nếu Supabase chưa cấu hình
        setPosts(initialPosts);
        setLeads(initialLeads);
        setQuestions(initialQuestions);
      }
    }
    loadData();
  }, []);

  // Post form states
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postFormData, setPostFormData] = useState({
    title: '',
    category: 'Xu hướng Ngành',
    type: 'blog' as 'blog' | 'podcast',
    summary: '',
    content: '',
    image: ''
  });

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setPostFormData({
      title: post.title,
      category: post.category,
      type: post.type,
      summary: post.summary,
      content: post.content.replace(/<br\s*\/?>/gi, '\n'),
      image: post.image || ''
    });
    setIsPostFormOpen(true);
  };

  const handleCopyLink = (postId: string) => {
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}/blog?post=${postId}`;
      navigator.clipboard.writeText(link)
        .then(() => alert('Đã copy link bài viết vào clipboard!'))
        .catch(err => {
          console.error('Không thể copy: ', err);
          alert('Không thể copy link tự động. Link bài viết: ' + link);
        });
    }
  };

  // Quiz config editing states
  const [localQuestions, setLocalQuestions] = useState<any>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleDateString('vi-VN'));
    if (questions) {
      setLocalQuestions(JSON.parse(JSON.stringify(questions))); // deep clone
    }
  }, [questions]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoadingAuth(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.session) {
        setIsLocked(false);
        setPassword('');
      }
    } catch (err) {
      console.error('Đăng nhập thất bại:', err);
      setAuthError('Email hoặc mật khẩu không chính xác.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLocked(true);
      setActiveTab('overview');
    } catch (err) {
      console.error('Đăng xuất thất bại:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa lead này không?')) {
      try {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);
        if (error) throw error;
        setLeads(leads.filter(l => l.id !== id));
      } catch (err) {
        console.error('Lỗi khi xóa lead:', err);
        alert('Không thể xóa lead trên Supabase: ' + (err as Error).message);
      }
    }
  };

  const handleExportLeads = () => {
    if (leads.length === 0) {
      alert('Không có dữ liệu để xuất file!');
      return;
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
    csvContent += 'Họ và tên,Số điện thoại,Email,Công ty,Vai trò,Điểm Tỉnh thức,Điểm Hành động,Điểm Công nghệ,Thời gian\n';

    leads.forEach(l => {
      csvContent += `"${l.name}","${l.phone}","${l.email}","${l.company}","${l.role}","${l.scores.mindful}","${l.scores.action}","${l.scores.tech}","${l.date}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MAI_Leads_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này khỏi hệ thống?')) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);
        if (error) throw error;
        setPosts(posts.filter(p => p.id !== id));
      } catch (err) {
        console.error('Lỗi khi xóa bài viết:', err);
        alert('Không thể xóa bài viết trên Supabase: ' + (err as Error).message);
      }
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    let image = postFormData.image;
    if (!image) {
      image = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800';
    }

    if (editingPostId) {
      const updatedPost = {
        title: postFormData.title,
        category: postFormData.category,
        type: postFormData.type,
        summary: postFormData.summary,
        content: postFormData.content.replace(/\n/g, '<br/>'),
        image
      };

      try {
        const { error } = await supabase
          .from('posts')
          .update(updatedPost)
          .eq('id', editingPostId);
        if (error) throw error;

        const updatedPosts = posts.map((p) => {
          if (p.id === editingPostId) {
            return {
              ...p,
              ...updatedPost
            };
          }
          return p;
        });
        setPosts(updatedPosts);
        setEditingPostId(null);
        alert('Bài viết/Podcast đã được cập nhật thành công trên Supabase!');
      } catch (err) {
        console.error('Lỗi khi cập nhật bài viết:', err);
        alert('Lỗi cập nhật bài viết: ' + (err as Error).message);
      }
    } else {
      const newPost: Post = {
        id: 'p-' + Date.now(),
        title: postFormData.title,
        category: postFormData.category,
        type: postFormData.type,
        summary: postFormData.summary,
        content: postFormData.content.replace(/\n/g, '<br/>'),
        image
      };

      try {
        const { error } = await supabase
          .from('posts')
          .insert(newPost);
        if (error) throw error;

        setPosts([newPost, ...posts]);
        alert('Bài viết/Podcast đã được đăng xuất bản thành công và hiện ngay trên Blog!');
      } catch (err) {
        console.error('Lỗi khi đăng bài viết:', err);
        alert('Lỗi đăng bài viết: ' + (err as Error).message);
      }
    }

    setIsPostFormOpen(false);
    setPostFormData({
      title: '',
      category: 'Xu hướng Ngành',
      type: 'blog',
      summary: '',
      content: '',
      image: ''
    });
  };

  const handleUpdateQuizField = (role: 'leader' | 'agent', index: number, field: string, value: string) => {
    if (!localQuestions) return;
    const updated = { ...localQuestions };
    if (updated[role] && updated[role][index]) {
      updated[role][index] = {
        ...updated[role][index],
        [field]: value
      };
      setLocalQuestions(updated);
    }
  };

  const handleSaveQuizConfig = async () => {
    alert('Chức năng chỉnh sửa câu hỏi trực tiếp trên CMS tạm thời bị khóa do cấu trúc câu hỏi mới (chọn đáp án trắc nghiệm) được thiết lập tĩnh ở Frontend để tối ưu hiệu năng.');
  };

  const handleResetQuizConfig = async () => {
    alert('Hệ thống câu hỏi trắc nghiệm mặc định đã được lưu tĩnh tại mã nguồn Frontend.');
  };

  // Stats calculation
  const totalLeads = leads?.length || 0;
  const totalPosts = posts?.length || 0;

  const getRoleRatio = () => {
    if (!leads || leads.length === 0) return '0 / 0';
    const leaderCount = leads.filter(l => l.role.includes('Quản lý') || l.role.includes('leader') || l.role.includes('Executive')).length;
    const agentCount = leads.length - leaderCount;
    return `${leaderCount} Leader / ${agentCount} Advisor`;
  };

  if (isLocked) {
    return (
      <div id="admin-lock" className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-low px-4">
        <div className="max-w-[400px] w-full bg-zen-white border border-surface-container p-8 text-center space-y-6 rounded-lg shadow-sm">
          <span className="material-symbols-outlined text-[64px] text-heritage-maroon">
            admin_panel_settings
          </span>
          <div className="space-y-2">
            <h2 className="font-display text-3xl text-primary font-bold">Bảng Điều Khiển CMS</h2>
            <p className="font-body text-xs text-secondary leading-relaxed">
              Khu vực dành riêng cho nhân sự truyền thông MAI Institute. Vui lòng đăng nhập để tiếp tục.
            </p>
          </div>

          {isLoadingAuth && !email ? (
            <div className="py-6 text-center text-xs text-secondary font-label">
              <div className="w-8 h-8 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Đang kiểm tra phiên làm việc...
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {authError && (
                <div className="text-red-700 bg-red-50 text-xs p-3 rounded border border-red-200 font-body text-center">
                  {authError}
                </div>
              )}
              <div className="space-y-1">
                <label className="font-label text-[10px] font-semibold text-secondary uppercase tracking-wider block">Email Admin</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon outline-none bg-background font-body"
                  placeholder="admin@maiinstitute.com"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-[10px] font-semibold text-secondary uppercase tracking-wider block">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon outline-none bg-background font-body"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full bg-heritage-maroon text-zen-white py-3.5 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded shadow active:scale-[0.98] disabled:opacity-50"
              >
                {isLoadingAuth ? 'Đang xác thực...' : 'Đăng nhập'}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-surface-container/60">
            <a
              href="/"
              className="text-secondary hover:text-heritage-maroon font-label text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Quay lại Trang chủ
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-workspace" className="min-h-screen flex bg-surface-container-low text-on-surface">
      {/* SIDEBAR */}
      <aside className="w-64 bg-primary text-zen-white flex flex-col justify-between fixed h-full z-20">
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <img
              alt="MAI Logo"
              className="h-8 w-auto object-contain bg-zen-white rounded p-1"
              src="/images/MAI_Logo.png"
            />
            <span className="font-headline text-xl font-bold tracking-tight">MAI CMS</span>
          </div>

          {/* Navigation links */}
          <nav className="px-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left font-label text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-white/10 text-zen-white' : 'text-white/60 hover:text-zen-white hover:bg-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left font-label text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === 'leads' ? 'bg-white/10 text-zen-white' : 'text-white/60 hover:text-zen-white hover:bg-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">people</span>
              Quản lý Leads
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left font-label text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === 'posts' ? 'bg-white/10 text-zen-white' : 'text-white/60 hover:text-zen-white hover:bg-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">post_add</span>
              Đăng bài &amp; Podcast
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left font-label text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === 'quiz' ? 'bg-white/10 text-zen-white' : 'text-white/60 hover:text-zen-white hover:bg-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings_accessibility</span>
              Cấu hình Quiz
            </button>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-heritage-maroon flex items-center justify-center text-xs font-bold text-zen-white border border-white/20">
              M
            </div>
            <div>
              <div className="text-xs font-bold font-label">Mai Nguyễn</div>
              <div className="text-[10px] text-white/50">Admin</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="flex-1 text-center py-2 border border-white/20 hover:bg-white/10 rounded text-[10px] font-label font-bold uppercase tracking-wider transition-all"
            >
              Trang chủ
            </a>
            <button
              onClick={handleLogout}
              className="flex-1 text-center py-2 bg-red-700/80 hover:bg-red-800 rounded text-[10px] font-label font-bold uppercase tracking-wider transition-all"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-zen-white border-b border-surface-container py-4 px-8 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h1 className="font-headline text-2xl font-bold text-primary">
            {activeTab === 'overview' && 'Tổng quan hệ thống'}
            {activeTab === 'leads' && 'Quản lý thông tin Leads'}
            {activeTab === 'posts' && 'Quản lý Bài viết & Podcasts'}
            {activeTab === 'quiz' && 'Cấu hình Câu hỏi Chẩn đoán'}
          </h1>
          <div className="flex items-center gap-4 text-xs font-label text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Hệ thống đang chạy
            </span>
            <span className="border-l border-surface-container pl-4">{currentTime}</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div id="tab-content-overview" className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zen-white border border-surface-container p-6 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider font-label">Tổng số Leads</span>
                    <h3 className="text-3xl font-bold font-label text-primary">{totalLeads}</h3>
                    <p className="text-[10px] text-green-700 font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">trending_up</span> Dữ liệu thời gian thực
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[48px] text-heritage-maroon/20">people</span>
                </div>
                <div className="bg-zen-white border border-surface-container p-6 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider font-label">Bài viết &amp; Podcast</span>
                    <h3 className="text-3xl font-bold font-label text-primary">{totalPosts}</h3>
                    <p className="text-[10px] text-secondary font-semibold">Tự động đồng bộ ra trang chủ</p>
                  </div>
                  <span className="material-symbols-outlined text-[48px] text-heritage-maroon/20">newspaper</span>
                </div>
                <div className="bg-zen-white border border-surface-container p-6 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider font-label">Phân luồng đối tượng</span>
                    <h3 className="text-base font-bold font-label text-primary pt-1">{getRoleRatio()}</h3>
                    <p className="text-[10px] text-secondary font-semibold">Tỉ lệ đăng ký chẩn đoán</p>
                  </div>
                  <span className="material-symbols-outlined text-[48px] text-heritage-maroon/20">donut_large</span>
                </div>
              </div>

              {/* Recent Leads Table */}
              <div className="bg-zen-white border border-surface-container rounded-lg shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline text-lg font-bold text-primary">Khách hàng mới đăng ký gần đây</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-0.5"
                  >
                    Xem tất cả <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-surface-container rounded-lg">
                  <table className="w-full text-left text-sm font-body border-collapse">
                    <thead>
                      <tr className="bg-paper-grey/60 border-b border-surface-container text-xs font-label font-bold uppercase tracking-wider text-secondary">
                        <th className="p-4">Họ và tên</th>
                        <th className="p-4">Số điện thoại</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Công ty</th>
                        <th className="p-4 text-center">Điểm (M/A/T)</th>
                        <th className="p-4">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center p-6 text-secondary">
                            Chưa có dữ liệu khách hàng đăng ký.
                          </td>
                        </tr>
                      ) : (
                        leads.slice(0, 3).map((l) => (
                          <tr key={l.id} className="border-b border-surface-container hover:bg-background/25">
                            <td className="p-4 font-semibold text-primary">{l.name}</td>
                            <td className="p-4">{l.phone}</td>
                            <td className="p-4 text-xs">{l.email}</td>
                            <td className="p-4 text-xs">{l.company}</td>
                            <td className="p-4 text-center text-xs font-semibold text-heritage-maroon">
                              {l.scores.mindful}/{l.scores.action}/{l.scores.tech}
                            </td>
                            <td className="p-4 text-xs">{l.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LEADS */}
          {activeTab === 'leads' && (
            <div id="admin-tab-leads" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline text-xl font-bold text-primary">Danh sách Leads thu thập</h3>
                <button
                  onClick={handleExportLeads}
                  className="bg-heritage-maroon text-zen-white px-4 py-2 text-xs font-label font-bold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1.5 rounded-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span> Xuất File Excel/CSV
                </button>
              </div>

              <div className="overflow-x-auto border border-surface-container rounded-lg bg-zen-white shadow-sm">
                <table className="w-full text-left text-sm font-body border-collapse">
                  <thead>
                    <tr className="bg-paper-grey/60 border-b border-surface-container text-xs font-label font-bold uppercase tracking-wider text-secondary">
                      <th className="p-4">Họ và tên</th>
                      <th className="p-4">Số điện thoại</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Công ty</th>
                      <th className="p-4">Vai trò</th>
                      <th className="p-4 text-center">Điểm (M/A/T)</th>
                      <th className="p-4">Thời gian</th>
                      <th className="p-4 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center p-6 text-secondary">
                          Chưa có thông tin khách hàng đăng ký trắc nghiệm.
                        </td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id} className="border-b border-surface-container hover:bg-background/20">
                          <td className="p-4 font-semibold text-primary">{l.name}</td>
                          <td className="p-4">{l.phone}</td>
                          <td className="p-4 text-xs">{l.email}</td>
                          <td className="p-4 text-xs">{l.company}</td>
                          <td className="p-4 text-xs font-bold">{l.role}</td>
                          <td className="p-4 text-center text-xs font-semibold text-heritage-maroon">
                            {l.scores.mindful}/{l.scores.action}/{l.scores.tech}
                          </td>
                          <td className="p-4 text-xs">{l.date}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteLead(l.id)}
                              className="text-red-700 hover:text-red-950 font-semibold text-xs uppercase tracking-wider"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: POSTS */}
          {activeTab === 'posts' && (
            <div id="admin-tab-posts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline text-xl font-bold text-primary">Quản lý bài viết &amp; podcasts</h3>
                {!isPostFormOpen && (
                  <button
                    onClick={() => setIsPostFormOpen(true)}
                    className="bg-heritage-maroon text-zen-white px-4 py-2 text-xs font-label font-bold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1 rounded-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span> Viết bài mới
                  </button>
                )}
              </div>

              {/* Form bài viết mới */}
              {isPostFormOpen ? (
                <div className="bg-paper-grey/30 border border-surface-container rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-surface-container/60 pb-3">
                    <h4 className="font-headline text-lg font-bold text-primary">
                      {editingPostId ? 'Chỉnh Sửa Bài Viết / Podcast' : 'Tạo Bài Viết / Podcast Mới'}
                    </h4>
                    <button
                      onClick={() => {
                        setIsPostFormOpen(false);
                        setEditingPostId(null);
                        setPostFormData({
                          title: '',
                          category: 'Xu hướng Ngành',
                          type: 'blog',
                          summary: '',
                          content: '',
                          image: ''
                        });
                      }}
                      className="text-secondary hover:text-primary font-label text-xs font-bold uppercase tracking-wider"
                    >
                      Hủy bỏ
                    </button>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Tiêu đề</label>
                        <input
                          type="text"
                          required
                          value={postFormData.title}
                          onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                          className="w-full border border-surface-container rounded px-3 py-2 text-sm outline-none focus:border-heritage-maroon bg-background"
                          placeholder="Nhập tiêu đề bài viết..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Danh mục</label>
                        <select
                          value={postFormData.category}
                          onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                          className="w-full border border-surface-container rounded px-3 py-2 text-sm outline-none focus:border-heritage-maroon bg-zen-white"
                        >
                          <option value="Xu hướng Ngành">Xu hướng Ngành</option>
                          <option value="Công nghệ Quản trị">Công nghệ Quản trị</option>
                          <option value="Khai phóng Tâm trí">Khai phóng Tâm trí</option>
                          <option value="Báo cáo Độc quyền">Báo cáo Độc quyền</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Dạng bài</label>
                        <select
                          value={postFormData.type}
                          onChange={(e) => setPostFormData({ ...postFormData, type: e.target.value as 'blog' | 'podcast' })}
                          className="w-full border border-surface-container rounded px-3 py-2 text-sm outline-none focus:border-heritage-maroon bg-zen-white"
                        >
                          <option value="blog">Blog Bài viết</option>
                          <option value="podcast">Podcast Âm thanh</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Link ảnh Thumbnail (Tùy chọn)</label>
                        <input
                          type="url"
                          value={postFormData.image}
                          onChange={(e) => setPostFormData({ ...postFormData, image: e.target.value })}
                          className="w-full border border-surface-container rounded px-3 py-2 text-sm outline-none focus:border-heritage-maroon bg-background"
                          placeholder="https://unsplash.com/... (để trống sẽ dùng ảnh mẫu)"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Tóm tắt ngắn</label>
                      <input
                        type="text"
                        required
                        value={postFormData.summary}
                        onChange={(e) => setPostFormData({ ...postFormData, summary: e.target.value })}
                        className="w-full border border-surface-container rounded px-3 py-2 text-sm outline-none focus:border-heritage-maroon bg-background"
                        placeholder="Mô tả ngắn hiển thị ở trang ngoài..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Nội dung chi tiết (Chấp nhận thẻ HTML cơ bản)</label>
                      <textarea
                        rows={6}
                        required
                        value={postFormData.content}
                        onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                        className="w-full border border-surface-container rounded p-3 text-sm outline-none focus:border-heritage-maroon bg-background font-body"
                        placeholder="Nhập nội dung bài viết. Bạn có thể sử dụng các thẻ HTML như <strong>, <ol>, <li> để trình bày..."
                      />
                    </div>
                    <div className="flex gap-4 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsPostFormOpen(false);
                          setEditingPostId(null);
                          setPostFormData({
                            title: '',
                            category: 'Xu hướng Ngành',
                            type: 'blog',
                            summary: '',
                            content: '',
                            image: ''
                          });
                        }}
                        className="border border-surface-container px-6 py-3 font-label text-xs font-bold uppercase tracking-wider text-secondary rounded hover:bg-background transition-all"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-heritage-maroon text-zen-white px-8 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded shadow"
                      >
                        {editingPostId ? 'Lưu thay đổi' : 'Xuất bản ngay'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div id="admin-posts-list-box" className="space-y-4">
                  <div className="overflow-x-auto border border-surface-container rounded-lg bg-zen-white shadow-sm">
                    <table className="w-full text-left text-sm font-body border-collapse">
                      <thead>
                        <tr className="bg-paper-grey/60 border-b border-surface-container text-xs font-label font-bold uppercase tracking-wider text-secondary">
                          <th className="p-4">Hình ảnh</th>
                          <th className="p-4">Tiêu đề</th>
                          <th className="p-4">Danh mục</th>
                          <th className="p-4">Dạng</th>
                          <th className="p-4 text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center p-6 text-secondary">
                              Không có bài viết nào trên hệ thống.
                            </td>
                          </tr>
                        ) : (
                          posts.map((p) => (
                            <tr key={p.id} className="border-b border-surface-container hover:bg-background/20">
                              <td className="p-4">
                                <img
                                  src={p.image}
                                  className="w-12 h-10 object-cover rounded-sm border border-surface-container"
                                  alt="Thumbnail"
                                />
                              </td>
                              <td className="p-4 font-semibold text-primary max-w-[300px] truncate">{p.title}</td>
                              <td className="p-4 text-xs font-semibold uppercase tracking-wider">{p.category}</td>
                              <td className="p-4 text-xs uppercase font-bold">{p.type}</td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center gap-4">
                                  <button
                                    type="button"
                                    onClick={() => handleCopyLink(p.id)}
                                    className="text-primary hover:text-heritage-maroon font-semibold text-xs uppercase tracking-wider flex items-center gap-1"
                                    title="Copy Link để chia sẻ"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Copy Link
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleEditPost(p)}
                                    className="text-blue-700 hover:text-blue-900 font-semibold text-xs uppercase tracking-wider flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                    Sửa
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePost(p.id)}
                                    className="text-red-700 hover:text-red-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                    Xóa
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: QUIZ CONFIG */}
          {activeTab === 'quiz' && (
            <div id="admin-tab-quiz" className="bg-zen-white border border-surface-container rounded-lg p-8 shadow-sm text-center space-y-4">
              <span className="material-symbols-outlined text-[64px] text-heritage-maroon/60">settings_accessibility</span>
              <h3 className="font-headline text-xl font-bold text-primary">Cấu hình Hệ thống Trắc nghiệm</h3>
              <p className="font-body text-sm text-secondary max-w-lg mx-auto">
                Hiện tại, hệ thống câu hỏi trắc nghiệm chọn đáp án định hướng (TVV & Quản lý) đã được chuyển sang cấu hình tĩnh tại mã nguồn Frontend để tối ưu hóa hiệu năng, tốc độ tải trang nhanh và đồng bộ hóa các option đáp án chi tiết.
              </p>
              <div className="pt-2">
                <span className="inline-block bg-heritage-maroon/5 border border-heritage-maroon/20 text-heritage-maroon text-xs font-semibold px-4 py-2 rounded-full font-label uppercase tracking-wider">
                  Quản lý tĩnh ở file: mockData.ts
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
