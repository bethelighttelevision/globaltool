"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { ArrowLeft, Play, Sparkles, CheckCircle2, AlertCircle, Copy, HelpCircle, DollarSign, Award, Target, Check, RefreshCw } from 'lucide-react';
import { generateAICentent } from '../actions/ai';

const CATEGORIES = [
  { id: 'finance', name: 'Finance & Investing', rpmMin: 12, rpmMax: 28 },
  { id: 'tech', name: 'Technology & Gadgets', rpmMin: 8, rpmMax: 18 },
  { id: 'gaming', name: 'Gaming', rpmMin: 1.5, rpmMax: 4.5 },
  { id: 'education', name: 'Education & Tutorials', rpmMin: 6, rpmMax: 15 },
  { id: 'entertainment', name: 'Entertainment & Comedy', rpmMin: 2.5, rpmMax: 6 },
  { id: 'vlogs', name: 'Lifestyle & Vlogs', rpmMin: 3.5, rpmMax: 8 },
  { id: 'beauty', name: 'Beauty & Fashion', rpmMin: 4, rpmMax: 10 },
  { id: 'kids', name: 'Kids & Family', rpmMin: 2, rpmMax: 5 },
  { id: 'music', name: 'Music & Art', rpmMin: 1.5, rpmMax: 4 }
];

export default function YoutubeMonetizationPage() {
  const [handle, setHandle] = useState('');
  const [subscribers, setSubscribers] = useState<number | ''>('');
  const [watchHours, setWatchHours] = useState<number | ''>('');
  const [shortsViews, setShortsViews] = useState<number | ''>('');
  const [category, setCategory] = useState('tech');
  
  // Interactive Slider State
  const [sliderViews, setSliderViews] = useState<number>(100000);
  
  // States for AI Strategy
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  
  // Derived local calculations
  const currentSubs = Number(subscribers) || 0;
  const currentHours = Number(watchHours) || 0;
  const currentShorts = Number(shortsViews) || 0;
  const selectedCat = CATEGORIES.find(c => c.id === category) || CATEGORIES[1];

  // Estimated Revenue Calculations
  const lowMonthlyEarnings = (sliderViews / 1000) * selectedCat.rpmMin;
  const highMonthlyEarnings = (sliderViews / 1000) * selectedCat.rpmMax;
  const lowYearlyEarnings = lowMonthlyEarnings * 12;
  const highYearlyEarnings = highMonthlyEarnings * 12;

  // Checklist Calculations
  const tier1SubsProgress = Math.min((currentSubs / 500) * 100, 100);
  const tier1HoursProgress = Math.min((currentHours / 3000) * 100, 100);
  const tier1ShortsProgress = Math.min((currentShorts / 3000000) * 100, 100);

  const tier2SubsProgress = Math.min((currentSubs / 1000) * 100, 100);
  const tier2HoursProgress = Math.min((currentHours / 4000) * 100, 100);
  const tier2ShortsProgress = Math.min((currentShorts / 10000000) * 100, 100);

  const isTier1Eligible = currentSubs >= 500 && (currentHours >= 3000 || currentShorts >= 3000000);
  const isTier2Eligible = currentSubs >= 1000 && (currentHours >= 4000 || currentShorts >= 10000000);

  // Dynamic suggestion when inputs change
  useEffect(() => {
    if (currentSubs > 0) {
      // Scale default monthly views slider based on channel size realistically
      const realisticViews = Math.max(1000, Math.min(5000000, Math.round(currentSubs * 1.5)));
      setSliderViews(realisticViews);
    }
  }, [currentSubs]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleAiAudit = async () => {
    if (!handle.trim()) {
      alert("Please enter your Channel Name or Handle first!");
      return;
    }
    setIsLoading(true);
    setAiResult(null);

    try {
      const prompt = `Generate a YouTube Monetization audit and growth roadmap for the channel named "${handle}" in the category "${selectedCat.name}".
      Metrics: Subscribers: ${currentSubs}, Watch Hours: ${currentHours}, Shorts Views: ${currentShorts}.
      
      Provide a highly customized professional assessment:
      1. statusAnalysis: Clean evaluation of their monetization standing and exact steps to bridge the gap.
      2. brandRates: Estimated sponsorship fees they can charge brands based on their stats (dedicated video, integrated shoutout, and sponsored Shorts).
      3. revenueStreams: Three personalized alternative monetization ideas perfect for this specific niche (e.g. memberships, course, specific affiliate types).
      4. highRpmTopics: Three highly viral, high-paying video content topics in this niche to maximize their RPM.
      
      Format the response exactly as a JSON object with keys:
      {
        "statusAnalysis": "text content",
        "brandRates": {
          "dedicated": "dollar rate or range",
          "integrated": "dollar rate or range",
          "short": "dollar rate or range"
        },
        "revenueStreams": ["idea 1", "idea 2", "idea 3"],
        "highRpmTopics": ["topic 1", "topic 2", "topic 3"]
      }
      Only return valid JSON. Do not include any markdown backticks.`;

      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      setAiResult(parsedData);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to generate your AI monetization audit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="YouTube Monetization Checker" 
        description="Check your channel eligibility for YouTube Partner Program (YPP), estimate monthly AdSense RPM revenue, and run a custom AI strategy audit." 
        url="https://globalutilitytoolbox.com/youtube-monetization" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />

      {/* Hero Header */}
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 0, 0, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Play size={44} color="#ff0000" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>YouTube Monetization Checker</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
          Analyze YPP partner thresholds, estimate dynamic CPM earnings, and receive tailored optimization tips for your niche in 2026.
        </p>

        {/* Dynamic Multi-Input Form */}
        <div style={{ maxWidth: '850px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--accent)" /> Enter Channel Diagnostic Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Channel Handle / Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. TechTechIndia or @MyChannel" 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Channel Category / Niche</label>
              <select 
                className="input-field"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ appearance: 'none', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id} style={{ background: '#121212', color: '#fff' }}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Current Subscribers</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 750" 
                value={subscribers}
                onChange={(e) => setSubscribers(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Watch Hours (Past 365 Days)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 2800" 
                value={watchHours}
                onChange={(e) => setWatchHours(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Shorts Views (Past 90 Days)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 150000" 
                value={shortsViews}
                onChange={(e) => setShortsViews(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

          </div>

          <button 
            className="premium-button"
            onClick={handleAiAudit}
            disabled={isLoading || !handle}
            style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {isLoading ? 'Running Intelligent Diagnostics...' : 'Generate AI Monetization Strategy'}
          </button>
          {!handle && (
            <p style={{ fontSize: '12px', color: '#ffcc00', marginTop: '10px', textAlign: 'center' }}>
              * Enter your channel handle/name to enable custom AI Strategic Audits.
            </p>
          )}
        </div>
      </div>

      {/* Grid: Eligibility Tiers & Dynamic RPM Earnings Estimator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        
        {/* Panel 1: Strict YPP Eligibility Standards */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#ff0000" />
            YPP Eligibility Checklist
          </h3>

          {/* Tier 1 - Fan Funding */}
          <div style={{ marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Tier 1: Fan Funding & Shopping</span>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Super Chats, Memberships, and Product Shopping</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isTier1Eligible ? 'var(--success)' : '#ffcc00',
                borderColor: isTier1Eligible ? 'var(--success)' : '#ffcc00',
                fontSize: '10px'
              }}>
                {isTier1Eligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>

            {/* Sub progress */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>Subscribers: {currentSubs.toLocaleString()} / 500</span>
                <span>{Math.round(tier1SubsProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${tier1SubsProgress}%`, background: '#ff0000', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Watch hours / Shorts progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>Watch Hours: {currentHours.toLocaleString()} / 3,000</span>
                <span>{Math.round(tier1HoursProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${tier1HoursProgress}%`, background: '#32d74b', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>OR Shorts Views: {currentShorts.toLocaleString()} / 3M</span>
                <span>{Math.round(tier1ShortsProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${tier1ShortsProgress}%`, background: '#0071e3', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

          {/* Tier 2 - AdSense & Premium Revenue */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Tier 2: AdSense Video Ad Revenue</span>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Watch Page Ads, Premium Income & Feed Ads</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isTier2Eligible ? 'var(--success)' : '#ffcc00',
                borderColor: isTier2Eligible ? 'var(--success)' : '#ffcc00',
                fontSize: '10px'
              }}>
                {isTier2Eligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>

            {/* Sub progress */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>Subscribers: {currentSubs.toLocaleString()} / 1,000</span>
                <span>{Math.round(tier2SubsProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${tier2SubsProgress}%`, background: '#ff0000', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Watch hours / Shorts progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>Watch Hours: {currentHours.toLocaleString()} / 4,000</span>
                <span>{Math.round(tier2HoursProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${tier2HoursProgress}%`, background: '#32d74b', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>OR Shorts Views: {currentShorts.toLocaleString()} / 10M</span>
                <span>{Math.round(tier2ShortsProgress)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${tier2ShortsProgress}%`, background: '#0071e3', borderRadius: '3px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Panel 2: Interactive AdSense RPM Estimator */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={22} color="#32d74b" />
              AdSense Earnings Estimator
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
              Estimated revenue calculations based on live 2026 industry benchmarks. Adjust your projected monthly video views below.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--muted)' }}>Projected Monthly Views:</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent)' }}>{sliderViews.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={5000000} 
                step={5000}
                value={sliderViews} 
                onChange={(e) => setSliderViews(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                <span>1K views</span>
                <span>5M views</span>
              </div>
            </div>

            {/* Category Meta */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Target Niche Selected</span>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{selectedCat.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Estimated RPM Range</span>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--success)' }}>${selectedCat.rpmMin.toFixed(2)} - ${selectedCat.rpmMax.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Est. Monthly AdSense</span>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                  ${Math.round(lowMonthlyEarnings).toLocaleString()} - ${Math.round(highMonthlyEarnings).toLocaleString()}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Est. Annual Revenue</span>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success)' }}>
                  ${Math.round(lowYearlyEarnings).toLocaleString()} - ${Math.round(highYearlyEarnings).toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '16px', fontStyle: 'italic' }}>
              * Actual AdSense revenues depend heavily on viewer geography (traffic source), session duration, and overall video watch completion metrics.
            </p>
          </div>

        </div>

      </div>

      {/* AI Performance Audit results */}
      {aiResult && (
        <div className="animate-slide-up" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(255, 204, 0, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Sparkles size={24} color="#ffcc00" />
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>AI Performance & Monetization Audit</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Strategic evaluation for @{handle}</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy(JSON.stringify(aiResult, null, 2), 'audit')}
                className="premium-button"
                style={{ padding: '10px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: '#fff' }}
              >
                {copiedType === 'audit' ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                {copiedType === 'audit' ? 'Copied' : 'Copy Audit Output'}
              </button>
            </div>

            {/* Checklist evaluation */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff' }}>
                <Target size={18} color="var(--accent)" /> Eligibility Standing Analysis
              </h4>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                {aiResult.statusAnalysis}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Card 1: Brand Pitch Valuation Rates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} /> Estimated Brand Sponsorship Rates
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '10px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Dedicated Video</span>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{aiResult.brandRates.dedicated}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '10px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Integrated Shoutout</span>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{aiResult.brandRates.integrated}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Sponsored Shorts</span>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{aiResult.brandRates.short}</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: High RPM Video Topics */}
                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} /> Recommended High RPM Video Topics
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {aiResult.highRpmTopics.map((topic: string, index: number) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '14px' }}>0{index + 1}.</span>
                        <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.4' }}>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Alternative Revenue Ideas */}
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#ffcc00', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Alternative Niche Income Streams
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {aiResult.revenueStreams.map((stream: string, index: number) => (
                    <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'rgba(255,204,0,0.1)', padding: '6px', borderRadius: '8px', color: '#ffcc00', display: 'inline-flex' }}>
                        <Check size={14} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Revenue Source 0{index + 1}</span>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>{stream}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SEO Articles Section */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#fff' }}>Understanding YouTube Monetization Rules in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            YouTube monetization rules are divided into two main partner milestones. Meeting the first tier unlocks community support mechanisms, whereas crossing the second tier initiates AdSense revenue collection from video views. Our <strong>YouTube Monetization Checker</strong> offers real-time checks to trace how close you are to these crucial checkpoints.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>Maximizing Your Channel CPM and RPM</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            RPM (Revenue Per Mille) represents the actual earnings you receive per 1,000 views after YouTube&apos;s cut. RPM varies significantly by niche. High CPM niches like **Finance, Cryptocurrency, and Enterprise Software** pull high-bidding advertisers, boosting creator RPMs to ranges like $15–$30+. Creative niches like **Gaming and Music** rely on higher volume traffic with average RPMs of $1.50–$4.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #ff0000' }}>
            <h4 style={{ marginTop: 0, color: '#ff0000', fontSize: '18px' }}>Pro Strategy: Diversified Creator Income</h4>
            <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
              Top creators do not rely solely on YouTube AdSense. Incorporating brand sponsorships, digital product downloads, and members-only clubs ensures high, stable revenues even when video view counts experience seasonal drops.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>Sponsorship Valuation for Micro-Creators</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Even if you have fewer than 10,000 subscribers, brands are actively searching for micro-influencers with highly engaged, targeted communities. Dedicated videos generally yield flat payouts calculated based on average video views and niche value, while sponsored integrations (30–60 second shoutouts) allow stable cross-selling.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/youtube-monetization" />
    </div>
  );
}
