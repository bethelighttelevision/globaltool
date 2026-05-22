"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Zap, Users, Shield, Mail, ExternalLink } from 'lucide-react';

const stats = [
  { icon: Zap, value: '30+', label: 'Free Tools' },
  { icon: Globe, value: '50K+', label: 'Monthly Visitors' },
  { icon: Users, value: '10K+', label: 'Active Users' },
  { icon: Shield, value: '100%', label: 'Free Forever' },
];

const values = [
  {
    title: 'Free for Everyone',
    desc: 'No hidden charges, no premium tiers, no credit card required. Every tool on ToolSnappy is completely free to use.',
  },
  {
    title: 'Privacy First',
    desc: 'We do not store your images, files, or personal data. Everything is processed in your browser or deleted immediately.',
  },
  {
    title: 'No Sign-Up Required',
    desc: 'Use any tool instantly without creating an account. No email verification, no passwords to remember.',
  },
  {
    title: 'Built for Creators',
    desc: 'Every tool is designed with digital creators, small business owners, and freelancers in mind.',
  },
];

export default function AboutUs() {
  return (
    <div className="content-container" style={{ padding: '80px 24px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {/* Hero Section */}
      <div className="glass-panel animate-slide-up" style={{ padding: '48px 32px', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          <Globe size={40} color="var(--accent)" />
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ margin: 0 }}>About ToolSnappy</h1>
        </div>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
          We believe professional-grade digital tools should be accessible to everyone — not locked behind expensive subscriptions.
        </p>
      </div>

      {/* Our Story */}
      <div className="glass-panel animate-slide-up" style={{ padding: '40px 32px', marginBottom: '40px' }}>
        <h2 className="text-2xl font-bold" style={{ marginBottom: '20px' }}>Our Story</h2>
        <div className="article-content">
          <p>
            ToolSnappy was born from a simple frustration: as digital creators and small business owners, we were tired of juggling dozens of different tools, creating accounts everywhere, and paying for subscriptions we barely used. Every task required a different website, a different login, and another monthly bill.
          </p>
          <p>
            So we built something better. A single place where anyone can access professional-quality utility tools — for free, without sign-up, without limits.
          </p>
          <p>
            What started as a collection of a few basic utilities has grown into a comprehensive suite of 30+ tools serving thousands of users worldwide. From background removal to SEO analysis, crypto profit calculations to video downloads, we cover the tools that digital creators actually need every day.
          </p>
          <p>
            Our mission is simple: democratize access to professional digital tools. Whether you are a freelancer in New York, a small business owner in London, or a content creator in Berlin, ToolSnappy gives you the tools you need to succeed — without asking for a credit card.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel animate-slide-up" style={{ padding: '32px 24px', textAlign: 'center', animationDelay: `${i * 0.1}s` }}>
            <stat.icon size={36} color="var(--accent)" style={{ marginBottom: '12px' }} />
            <div className="gradient-text text-3xl font-bold" style={{ marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Our Values */}
      <div className="glass-panel animate-slide-up" style={{ padding: '40px 32px', marginBottom: '40px' }}>
        <h2 className="text-2xl font-bold" style={{ marginBottom: '24px' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {values.map((v, i) => (
            <div key={i} className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="font-bold" style={{ marginBottom: '8px', fontSize: '18px' }}>{v.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="glass-panel animate-slide-up" style={{ padding: '40px 32px', textAlign: 'center' }}>
        <Mail size={36} color="var(--accent)" style={{ marginBottom: '16px' }} />
        <h2 className="text-2xl font-bold" style={{ marginBottom: '12px' }}>Get in Touch</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
          Have a suggestion, feedback, or just want to say hello? We would love to hear from you.
        </p>
        <Link href="/contact" className="premium-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Mail size={18} /> Contact Us
        </Link>
      </div>
    </div>
  );
}
