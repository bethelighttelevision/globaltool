'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Search, ArrowRight, BookOpen, Clock, X, ListFilter, CalendarDays } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category?: string;
}

interface BlogListClientProps {
  posts: Post[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  // Categories list
  const categories = useMemo(() => {
    const allCats = posts.map(p => p.category || 'General');
    const uniqueCats = Array.from(new Set(allCats)).filter(Boolean);
    return ['All', ...uniqueCats];
  }, [posts]);

  // Color mapper for categories
  const getCategoryStyles = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('seo')) {
      return {
        bg: 'rgba(41, 151, 255, 0.1)',
        color: '#2997ff',
        border: 'rgba(41, 151, 255, 0.2)'
      };
    }
    if (cat.includes('design') || cat.includes('graphic')) {
      return {
        bg: 'rgba(191, 90, 242, 0.1)',
        color: '#bf5af2',
        border: 'rgba(191, 90, 242, 0.2)'
      };
    }
    if (cat.includes('finance') || cat.includes('crypto')) {
      return {
        bg: 'rgba(48, 209, 88, 0.1)',
        color: '#30d158',
        border: 'rgba(48, 209, 88, 0.2)'
      };
    }
    if (cat.includes('social') || cat.includes('media') || cat.includes('youtube') || cat.includes('instagram')) {
      return {
        bg: 'rgba(255, 159, 10, 0.1)',
        color: '#ff9f0a',
        border: 'rgba(255, 159, 10, 0.2)'
      };
    }
    return {
      bg: 'rgba(255, 214, 10, 0.1)',
      color: '#ffd60a',
      border: 'rgba(255, 214, 10, 0.2)'
    };
  };

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase());
        
        const postCat = post.category || 'General';
        const matchesCategory = selectedCategory === 'All' || postCat === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchQuery, selectedCategory, sortBy]);

  // Featured Post - Get the latest post in the current filtered category, or the absolute latest
  const featuredPost = useMemo(() => {
    if (searchQuery || selectedCategory !== 'All') {
      return null; // Don't show featured post when searching or filtering to keep layout clean
    }
    return posts[0] || null;
  }, [posts, searchQuery, selectedCategory]);

  // Regular grid posts (exclude the featured post to avoid duplicates!)
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredAndSortedPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredAndSortedPosts;
  }, [filteredAndSortedPosts, featuredPost]);

  // Calculate reading time helper
  const calculateReadingTime = (content: string) => {
    const words = content ? content.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div style={{ marginTop: '30px' }}>
      {/* Search and Filters Navigation */}
      <div className="glass-panel" style={{ 
        padding: '24px', 
        marginBottom: '48px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        borderRadius: '24px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Search Input and Sort Select */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px', 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search bar */}
          <div style={{ 
            position: 'relative', 
            flex: '1', 
            minWidth: '280px' 
          }}>
            <Search size={18} color="var(--muted)" style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search articles, guides, strategies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-input"
              style={{
                paddingLeft: '48px',
                paddingRight: searchQuery ? '40px' : '16px',
                fontSize: '15px'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                  borderRadius: '50%',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ListFilter size={16} color="var(--muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--card-border)',
                color: 'var(--foreground)',
                padding: '10px 16px',
                borderRadius: '12px',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
            >
              <option value="latest" style={{ background: '#0d0d0f' }}>Newest First</option>
              <option value="oldest" style={{ background: '#0d0d0f' }}>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '20px'
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const style = getCategoryStyles(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: isActive ? style.color : 'rgba(255, 255, 255, 0.08)',
                  background: isActive ? style.bg : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? style.color : 'var(--muted)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? `0 0 16px ${style.bg}` : 'none',
                  transform: isActive ? 'scale(1.03)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Post (Full-width, Modern Layout) */}
      {featuredPost && (
        <div style={{ marginBottom: '56px' }}>
          <Link href={`/blog/${featuredPost.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="glass-panel" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '0', 
              padding: '0', 
              overflow: 'hidden',
              borderRadius: '28px',
              border: '1px solid var(--card-border)'
            }}>
              {/* Image side */}
              <div style={{ 
                height: '100%', 
                minHeight: '340px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} 
                  className="featured-image-hover"
                />
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  zIndex: 2
                }}>
                  <span style={{
                    background: getCategoryStyles(featuredPost.category || 'General').bg,
                    color: getCategoryStyles(featuredPost.category || 'General').color,
                    border: `1px solid ${getCategoryStyles(featuredPost.category || 'General').border}`,
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {featuredPost.category || 'General'}
                  </span>
                </div>
                {/* Visual overlay gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                  pointerEvents: 'none'
                }}></div>
              </div>

              {/* Text side */}
              <div style={{ 
                padding: '44px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                background: 'rgba(15, 15, 18, 0.3)'
              }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '13px', color: 'var(--muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="var(--accent)" /> {featuredPost.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--accent)" /> {calculateReadingTime(featuredPost.content)}
                  </span>
                </div>
                
                <h2 style={{ 
                  fontSize: 'clamp(24px, 4vw, 36px)', 
                  color: '#fff', 
                  marginBottom: '16px', 
                  lineHeight: 1.25,
                  fontWeight: '700',
                  letterSpacing: '-0.02em'
                }} className="title-gradient-hover">
                  {featuredPost.title}
                </h2>
                
                <p style={{ 
                  color: 'var(--muted)', 
                  fontSize: '16px', 
                  lineHeight: 1.6, 
                  marginBottom: '28px' 
                }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ 
                  marginTop: 'auto',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent) 0%, #1a5ab5 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(41, 151, 255, 0.3)'
                    }}>
                      TS
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: 'var(--foreground)' }}>ToolSnappy Team</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)' }}>Editorial Board</p>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: 'var(--accent)', 
                    fontWeight: '700',
                    fontSize: '15px'
                  }} className="read-article-link">
                    Read Featured <ArrowRight size={18} className="arrow-icon-shift" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <style jsx global>{`
            .featured-image-hover {
              transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            .glass-panel:hover .featured-image-hover {
              transform: scale(1.04) rotate(0.5deg);
            }
            .title-gradient-hover {
              transition: color 0.3s;
            }
            .glass-panel:hover .title-gradient-hover {
              color: var(--accent) !important;
            }
            .arrow-icon-shift {
              transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .glass-panel:hover .arrow-icon-shift {
              transform: translateX(6px);
            }
          `}</style>
        </div>
      )}

      {/* Grid of Other Articles */}
      {gridPosts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {gridPosts.map((post) => {
            const catStyle = getCategoryStyles(post.category || 'General');
            return (
              <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none', display: 'flex' }}>
                <div className="glass-panel" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  padding: '0', 
                  overflow: 'hidden',
                  borderRadius: '24px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(28, 28, 30, 0.3)'
                }}>
                  {/* Card Image */}
                  <div style={{ 
                    height: '210px', 
                    width: '100%', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }} 
                      className="card-image-hover"
                    />
                    {/* Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      zIndex: 2
                    }}>
                      <span style={{
                        background: catStyle.bg,
                        color: catStyle.color,
                        border: `1px solid ${catStyle.border}`,
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backdropFilter: 'blur(8px)'
                      }}>
                        {post.category || 'General'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ 
                    padding: '24px', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>
                    {/* Date and Reading Time */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '14px', 
                      marginBottom: '14px', 
                      fontSize: '12px', 
                      color: 'var(--muted)' 
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarDays size={13} color="var(--accent)" /> {post.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="var(--accent)" /> {calculateReadingTime(post.content)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ 
                      fontSize: '19px', 
                      color: '#fff', 
                      marginBottom: '10px', 
                      lineHeight: 1.4,
                      fontWeight: '600',
                      letterSpacing: '-0.01em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '52px' // Restricts size to exactly 2 lines for perfect symmetry
                    }} className="title-gradient-hover">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{ 
                      color: 'var(--muted)', 
                      fontSize: '14px', 
                      lineHeight: 1.6, 
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '66px' // Clean uniform height
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div style={{ 
                      marginTop: 'auto', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      paddingTop: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: 'var(--muted)',
                          border: '1px solid var(--card-border)'
                        }}>
                          T
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--muted)' }}>Editorial</span>
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px', 
                        color: 'var(--accent)', 
                        fontWeight: '600', 
                        fontSize: '13px' 
                      }}>
                        Read Guide <ArrowRight size={14} className="arrow-icon-shift" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <style jsx global>{`
            .card-image-hover {
              transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            .glass-panel:hover .card-image-hover {
              transform: scale(1.05);
            }
          `}</style>
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel" style={{ 
          padding: '60px 24px', 
          textAlign: 'center',
          borderRadius: '24px',
          border: '1px solid var(--card-border)'
        }}>
          <BookOpen size={48} color="var(--muted)" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '8px' }}>No Guides Found</h3>
          <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto 24px', fontSize: '15px' }}>
            We couldn&rsquo;t find any articles matching &ldquo;{searchQuery}&rdquo; in the category &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button 
            className="premium-button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            style={{ padding: '10px 24px', fontSize: '14px' }}
          >
            Clear Filters & Search
          </button>
        </div>
      )}
    </div>
  );
}
