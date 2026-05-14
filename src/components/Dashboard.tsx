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

        {/* Tax Estimator Card */}
        <div className="glow-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <div style={{ 
            width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px', fontSize: '24px'
          }}>
            ⚖️
          </div>
          <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Tax Estimator</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            Coming Soon: Real-time global tax estimation for digital assets and capital gains.
          </p>
        </div>

        {/* Unit Converter Card */}
        <div className="glow-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <div style={{ 
            width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', 
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px', fontSize: '24px'
          }}>
            ⚡
          </div>
          <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Unit Converter</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            Coming Soon: Lightning fast converter for complex engineering and financial units.
          </p>
        </div>

      </div>
    </div>
  );
}
