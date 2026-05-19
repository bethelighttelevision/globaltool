"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { ArrowLeft, Video, Sparkles, CheckCircle2, AlertCircle, Copy, HelpCircle, DollarSign, Award, Target, Check, RefreshCw } from 'lucide-react';
import { generateAICentent } from '../actions/ai';

const FORMATS = [
  { id: 'longform', name: 'Long-form Video (3+ Min)', rpmMin: 2.00, rpmMax: 6.50 },
  { id: 'reels', name: 'Facebook Reels / Shorts', rpmMin: 0.40, rpmMax: 1.80 },
  { id: 'live', name: 'Live Video Broadcasts', rpmMin: 3.50, rpmMax: 9.00 },
  { id: 'posts', name: 'Text & Photo Posts', rpmMin: 0.15, rpmMax: 0.80 }
];

export default function FacebookMonetizationPage() {
  const [handle, setHandle] = useState('');
  const [followers, setFollowers] = useState<number | ''>('');
  const [viewMinutes, setViewMinutes] = useState<number | ''>('');
  const [format, setFormat] = useState('longform');
  
  // Slider Views State
  const [sliderViews, setSliderViews] = useState<number>(100000);
  
  // AI states
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentFollowers = Number(followers) || 0;
  const currentMinutes = Number(viewMinutes) || 0;
  const selectedFormat = FORMATS.find(f => f.id === format) || FORMATS[0];

  // Estimator logic
  const lowMonthlyEarnings = (sliderViews / 1000) * selectedFormat.rpmMin;
  const highMonthlyEarnings = (sliderViews / 1000) * selectedFormat.rpmMax;
  const lowYearlyEarnings = lowMonthlyEarnings * 12;
  const highYearlyEarnings = highMonthlyEarnings * 12;

  // Checklist logic
  const inStreamFollowersProgress = Math.min((currentFollowers / 5000) * 100, 100);
  const inStreamMinutesProgress = Math.min((currentMinutes / 60000) * 100, 100);

  const starsFollowersProgress = Math.min((currentFollowers / 1000) * 100, 100);
  const subsFollowersProgress = Math.min((currentFollowers / 10000) * 100, 100);

  const isInStreamEligible = currentFollowers >= 5000 && currentMinutes >= 60000;
  const isStarsEligible = currentFollowers >= 1000;
  const isSubsEligible = currentFollowers >= 10000;

  // Auto set slider views on follower update
  useEffect(() => {
    if (currentFollowers > 0) {
      const realisticViews = Math.max(1000, Math.min(5000000, Math.round(currentFollowers * 1.8)));
      setSliderViews(realisticViews);
    }
  }, [currentFollowers]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleAiAudit = async () => {
    if (!handle.trim()) {
      alert("Please enter your Facebook Page Name first!");
      return;
    }
    setIsLoading(true);
    setAiResult(null);

    try {
      const prompt = `Generate a Facebook Page Growth blueprint and monetization audit for the page named "${handle}".
      Primary Content Format: ${selectedFormat.name}.
      Metrics: Followers: ${currentFollowers}, 60-Day Active Video View Minutes: ${currentMinutes}.

      Provide a customized professional roadmap:
      1. eligibilityAdvice: Clear steps to achieve and maintain monetization status.
      2. engagementStrategy: Proven frameworks to boost video shares (critical for the FB algorithm in 2026).
      3. contentCalendar: Three high-performing video structure/reels ideas with strong 3-second hook setups.
      4. monetizationBoosters: Tailored non-ad monetization ideas (sponsorships, fan memberships, product tag loops).

      Format the response exactly as a JSON object with keys:
      {
        "eligibilityAdvice": "text content",
        "engagementStrategy": "text content",
        "contentCalendar": ["viral video idea 1", "viral video idea 2", "viral video idea 3"],
        "monetizationBoosters": ["booster 1", "booster 2", "booster 3"]
      }
      Only return valid JSON. Do not include markdown brackets or formatting.`;

      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      setAiResult(parsedData);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to generate Facebook Page audit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Facebook Monetization Checker" 
        description="Verify your page eligibility for Facebook In-Stream Ads and Stars, estimate CPM payouts based on content formats, and get a professional AI roadmap." 
        url="https://globalutilitytoolbox.com/facebook-monetization" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />

      {/* Hero Header */}
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(0, 113, 227, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Video size={44} color="#0071e3" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Facebook Monetization Checker</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
          Scan In-stream Ads eligibility milestones, evaluate format CPM revenue limits, and execute data-driven page audits.
        </p>

        {/* Dynamic Metric Form */}
        <div style={{ maxWidth: '850px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--accent)" /> Enter Facebook Page Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Page Name or Handle</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. MyCookingVlogs" 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Primary Video / Content Format</label>
              <select 
                className="input-field"
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                style={{ appearance: 'none', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
              >
                {FORMATS.map(f => (
                  <option key={f.id} value={f.id} style={{ background: '#121212', color: '#fff' }}>{f.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Page Followers</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 4200" 
                value={followers}
                onChange={(e) => setFollowers(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>60-Day View Minutes</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 45000" 
                value={viewMinutes}
                onChange={(e) => setViewMinutes(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
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
            {isLoading ? 'Assembling Viral Strategy...' : 'Generate AI Page Strategy Blueprint'}
          </button>
          {!handle && (
            <p style={{ fontSize: '12px', color: '#ffcc00', marginTop: '10px', textAlign: 'center' }}>
              * Enter your Page name to unlock full custom AI strategy recommendations.
            </p>
          )}
        </div>
      </div>

      {/* Checklist Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        
        {/* Panel 1: Strict Meta Eligibility Checklist */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#0071e3" />
            Meta Eligibility Program Checklist
          </h3>

          {/* In-Stream Ads */}
          <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>In-Stream Ads (On-Demand)</span>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Automated image/video ads during your public videos.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isInStreamEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isInStreamEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '10px'
              }}>
                {isInStreamEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>

            {/* progress */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
                <span>Followers: {currentFollowers.toLocaleString()} / 5,000</span>
                <span>{Math.round(inStreamFollowersProgress)}%</span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '2.5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${inStreamFollowersProgress}%`, background: '#0071e3', borderRadius: '2.5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
                <span>60-Day Viewed Minutes: {currentMinutes.toLocaleString()} / 60,000</span>
                <span>{Math.round(inStreamMinutesProgress)}%</span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '2.5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${inStreamMinutesProgress}%`, background: '#32d74b', borderRadius: '2.5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

          {/* Stars */}
          <div style={{ marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Facebook Stars tipping</span>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Receive fan tips during Reels, Live, and Videos.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isStarsEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isStarsEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '10px'
              }}>
                {isStarsEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
                <span>Followers: {currentFollowers.toLocaleString()} / 1,000</span>
                <span>{Math.round(starsFollowersProgress)}%</span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '2.5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${starsFollowersProgress}%`, background: '#ffcc00', borderRadius: '2.5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

          {/* Subscriptions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Fan Subscriptions</span>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Earn predictable monthly income from recurring supporters.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isSubsEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isSubsEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '10px'
              }}>
                {isSubsEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
                <span>Followers requirement: {currentFollowers.toLocaleString()} / 10,000</span>
                <span>{Math.round(subsFollowersProgress)}%</span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '2.5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${subsFollowersProgress}%`, background: '#cc2366', borderRadius: '2.5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Panel 2: Interactive Format RPM Payout Estimator */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={22} color="#32d74b" />
              Meta In-Stream Ad Estimator
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
              Based on standard 2026 Facebook RPM layouts. Adjust your page monthly monetized video/reels views below.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--muted)' }}>Projected Monthly Video Views:</span>
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

            {/* Format Meta */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Format Selected</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{selectedFormat.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Average RPM Range</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--success)' }}>${selectedFormat.rpmMin.toFixed(2)} - ${selectedFormat.rpmMax.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Est. Monthly Income</span>
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
              * Payouts depend strictly on viewer geography (traffic source), active engagement rates, and viewer ad interaction habits.
            </p>
          </div>

        </div>

      </div>

      {/* AI Strategy Blueprint */}
      {aiResult && (
        <div className="animate-slide-up" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(0, 113, 227, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Sparkles size={24} color="#0071e3" />
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>AI Page Growth & Monetization Blueprint</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Tailored optimization loops for @{handle}</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy(JSON.stringify(aiResult, null, 2), 'blueprint')}
                className="premium-button"
                style={{ padding: '10px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: '#fff' }}
              >
                {copiedType === 'blueprint' ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                {copiedType === 'blueprint' ? 'Copied' : 'Copy Blueprint'}
              </button>
            </div>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff' }}>
                  <Target size={18} color="var(--accent)" /> Monetization Road Gaps
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {aiResult.eligibilityAdvice}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--success)' }}>
                  <Award size={18} /> Algorithm Virality Hacks
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {aiResult.engagementStrategy}
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Content calendar outlines */}
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#ffcc00', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Video size={18} /> 3-Sec Hook Video Ideas (Content Calendar)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {aiResult.contentCalendar.map((item: string, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '14px' }}>0{i+1}.</span>
                      <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.4' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative earnings boost loops */}
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#cc2366', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={18} /> Revenue Multipliers
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {aiResult.monetizationBoosters.map((booster: string, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'rgba(204,35,102,0.1)', padding: '6px', borderRadius: '8px', color: '#cc2366', display: 'inline-flex' }}>
                        <Check size={14} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>Multiplier Loop 0{i + 1}</span>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>{booster}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SEO Articles */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#fff' }}>Cracking Facebook Page Monetization Regulations</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike other platforms, Facebook relies heavily on social networking loops. Post sharing is the strongest organic signal in Facebook&apos;s recommendation engine. To unlock **In-Stream Ads on Facebook**, creators must pass critical milestones including 5,000 followers and 60,000 active viewing minutes across their video portfolio in a 60-day window.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>Why Content Formats Dictate Facebook Revenue</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Advertiser budgets vary drastically depending on the video style. Three-minute long-form videos allow mid-roll and pre-roll video ads, producing standard RPM structures of $2 to $6. Facebook Reels rely on small, overlay banner ads, producing lower RPM values but gathering high-intensity viral distribution loops.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #0071e3' }}>
            <h4 style={{ marginTop: 0, color: '#0071e3', fontSize: '18px' }}>Pro Strategy: The First 3-Second Hook Rule</h4>
            <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
              Facebook users are rapid scrollers. If your video does not arrest the viewer&apos;s attention in the first 3 seconds, they will swipe away, collapsing your watch time metrics. Never start with long introductions; launch directly into the high-action climax or peak value proposition!
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>Alternative Revenue: Meta Stars & Fan Subscriptions</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Once you secure 1,000 loyal followers, you can activate Facebook Stars, enabling users to direct-tip you during broadcasts and reels. Additionally, setting up exclusive Fan Subscriptions (offering members-only badges, exclusive streams, or lifestyle chat rooms) generates highly consistent monthly income.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/facebook-monetization" />
    </div>
  );
}
