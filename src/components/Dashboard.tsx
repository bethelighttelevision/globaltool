"use client";

import React from 'react';

interface DashboardProps {
  onSelectTool: (tool: string) => void;
}

export default function Dashboard({ onSelectTool }: DashboardProps) {
  return (
    <div className="animate-slide-up" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <section style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 className="gradient-text" style={{ fontSize: '64px', marginBottom: '16px', lineHeight: 1.1 }}>
          Precision Tools for<br />Modern Trading
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          High-performance, lightweight utility tools designed for accuracy and speed.
          Experience the next generation of financial calculation.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Profit Calculator Card */}
        <div className="glow-card" onClick={() => onSelectTool('calculator')} style={{ cursor: 'pointer' }}>
          <div style={{ 
            width: '48px', height: '48px', background: 'var(--accent-glow)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px', color: 'var(--accent)', fontSize: '24px'
          }}>
            📈
          </div>
          <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Profit Calculator</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            Advanced crypto and stock profit calculator with precise fee estimation and instant ROI tracking.
          </p>
          <div style={{ color: 'var(--accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Open Tool →
          </div>
        </div>

        {/* CV Maker Card */}
        <div className="glow-card" onClick={() => window.location.href = '/cv-maker'} style={{ cursor: 'pointer' }}>
          <div style={{ 
            width: '48px', height: '48px', background: 'var(--accent-glow)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px', color: 'var(--accent)', fontSize: '24px'
          }}>
            📄
          </div>
          <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Professional CV Maker</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            Create recruiter-approved CVs in minutes with modern templates and real-time preview.
          </p>
          <div style={{ color: 'var(--accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Open Tool →
          </div>
        </div>

      </div>
    </div>
  );
}
