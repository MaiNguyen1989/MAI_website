'use client';

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Post } from '@/types';
import { initialPosts } from '@/lib/mockData';

export default function BlogPage() {
  const [posts] = useLocalStorage<Post[]>('mai_posts', initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Check URL query filter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const filter = params.get('filter');
      if (filter === 'Podcasts') {
        setActiveCategory('Podcasts');
      } else if (filter) {
        setActiveCategory(filter);
      }
    }
  }, []);

  // Auto open post from query param
  useEffect(() => {
    if (posts && posts.length > 0 && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('post');
      if (postId) {
        const found = posts.find(p => p.id === postId);
        if (found) {
          setSelectedPost(found);
        }
      }
    }
  }, [posts]);

  useEffect(() => {
    if (!posts) return;
    
    let filtered = [...posts];
    if (activeCategory === 'Podcasts') {
      filtered = posts.filter(p => p.type === 'podcast');
    } else if (activeCategory !== 'all') {
      filtered = posts.filter(p => p.category === activeCategory);
    }
    setFilteredPosts(filtered);
  }, [posts, activeCategory]);

  const categories = [
    { label: 'Tất cả', val: 'all' },
    { label: 'Xu hướng Ngành', val: 'Xu hướng Ngành' },
    { label: 'Công nghệ Quản trị', val: 'Công nghệ Quản trị' },
    { label: 'Khai phóng Tâm trí', val: 'Khai phóng Tâm trí' },
    { label: 'Báo cáo Độc quyền', val: 'Báo cáo Độc quyền' },
    { label: 'Podcasts', val: 'Podcasts' },
  ];

  return (
    <div id="view-blog" className="view-content">
      <section className="py-12 px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2">
              Thought Leadership
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-primary font-medium">Tầm Nhìn &amp; Tư Duy Quản Trị</h1>
            <p className="font-body text-sm text-secondary mt-2">
              Nơi chia sẻ góc nhìn sâu sắc về Mindful Leadership và Data-driven trong ngành Bảo hiểm.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-surface-container pb-6" id="blog-filters">
            {categories.map((cat) => (
              <button
                key={cat.val}
                onClick={() => {
                  setActiveCategory(cat.val);
                  // Update URL parameter without reloading
                  const url = new URL(window.location.href);
                  if (cat.val === 'all') {
                    url.searchParams.delete('filter');
                  } else {
                    url.searchParams.set('filter', cat.val);
                  }
                  window.history.pushState(null, '', url.toString());
                }}
                className={`filter-btn px-4 py-2 text-xs font-label font-bold uppercase tracking-wider rounded-sm transition-all border ${
                  activeCategory === cat.val
                    ? 'bg-heritage-maroon text-zen-white border-heritage-maroon'
                    : 'border-surface-container text-secondary hover:border-heritage-maroon hover:text-heritage-maroon'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
            {filteredPosts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-secondary font-body">
                Không tìm thấy bài viết nào trong danh mục này.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    const url = new URL(window.location.href);
                    url.searchParams.set('post', post.id);
                    window.history.pushState(null, '', url.toString());
                  }}
                  className="space-y-4 cursor-pointer group bg-zen-white p-4 border border-surface-container rounded hover:border-heritage-maroon transition-soft shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-container-high rounded-sm">
                    <img
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-soft"
                      src={post.image}
                    />
                  </div>
                  <span className="font-label text-xs font-semibold text-heritage-maroon uppercase tracking-widest block">
                    {post.category} - {post.type.toUpperCase()}
                  </span>
                  <h3 className="font-headline text-2xl leading-tight hover:text-heritage-maroon transition-colors italic text-primary">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-secondary line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* MODAL: CHI TIẾT BÀI VIẾT BLOG */}
      {selectedPost && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedPost(null);
              const url = new URL(window.location.href);
              url.searchParams.delete('post');
              window.history.pushState(null, '', url.toString());
            }
          }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4"
        >
          <div className="bg-zen-white max-w-[800px] w-full rounded-lg shadow-xl overflow-hidden border border-surface-container transition-all relative">
            <div className="h-64 md:h-80 overflow-hidden relative bg-surface-container">
              <img className="w-full h-full object-cover" src={selectedPost.image} alt={selectedPost.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-zen-white space-y-2">
                <span className="font-label text-xs font-bold uppercase tracking-widest bg-heritage-maroon px-2 py-1 rounded">
                  {selectedPost.category} - {selectedPost.type.toUpperCase()}
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  const link = `${window.location.origin}/blog?post=${selectedPost.id}`;
                  navigator.clipboard.writeText(link)
                    .then(() => alert('Đã copy link bài viết để chia sẻ!'))
                    .catch(err => {
                      console.error('Không thể copy: ', err);
                      alert('Không thể copy link tự động. Link bài viết: ' + link);
                    });
                }}
                className="absolute top-4 left-4 bg-black/50 hover:bg-black/80 text-zen-white px-3 py-2 flex items-center gap-1 text-xs font-label font-bold uppercase tracking-wider rounded transition-colors animate-fade-in"
                title="Sao chép liên kết bài viết để chia sẻ"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                Sao chép liên kết
              </button>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  const url = new URL(window.location.href);
                  url.searchParams.delete('post');
                  window.history.pushState(null, '', url.toString());
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-zen-white w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                title="Đóng"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 md:p-10 space-y-6 max-h-[50vh] overflow-y-auto">
              <div
                className="font-body text-base text-secondary leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Anchor CTA */}
              <div className="border border-heritage-maroon/20 bg-heritage-maroon/5 p-6 rounded-lg text-center space-y-4 mt-8">
                <h4 className="font-headline text-lg font-bold text-primary">Hệ thống của bạn có đang gặp phải tình trạng này?</h4>
                <p className="font-body text-xs text-secondary">Hãy thử chẩn đoán sức khỏe hệ thống doanh nghiệp hoặc kỹ năng của bạn ngay sau 5 phút.</p>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    window.location.href = '/diagnose';
                  }}
                  className="bg-heritage-maroon text-zen-white px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm active:scale-95 shadow-sm"
                >
                  Bắt đầu chẩn đoán ngay (Free)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
