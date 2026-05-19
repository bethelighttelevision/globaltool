"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { ArrowLeft, Camera, Sparkles, CheckCircle2, AlertCircle, Copy, HelpCircle, DollarSign, Award, Target, Check, RefreshCw } from 'lucide-react';
import { generateAICentent } from '../actions/ai';

const NICHES = [
  { id: 'tech', name: 'Technology & Business', baselineER: 2.2 },
  { id: 'fashion', name: 'Fashion & Beauty', baselineER: 3.5 },
  { id: 'travel', name: 'Travel & Lifestyle', baselineER: 3.0 },
  { id: 'fitness', name: 'Fitness & Health', baselineER: 2.8 },
  { id: 'gaming', name: 'Gaming & Streaming', baselineER: 4.0 },
  { id: 'food', name: 'Food & Cooking', baselineER: 3.2 },
  { id: 'art', name: 'Art & Photography', baselineER: 3.8 },
  { id: 'memes', name: 'Entertainment & Memes', baselineER: 5.5 }
];

export default function InstagramMonetizationPage() {
  const [handle, setHandle] = useState('');
  const [followers, setFollowers] = useState<number | ''>('');
  const [likes, setLikes] = useState<number | ''>('');
  const [comments, setComments] = useState<number | ''>('');
  const [niche, setNiche] = useState('travel');
  
  // Dynamic brand rate state
  const [sliderFollowers, setSliderFollowers] = useState<number>(10000);
  const [customER, setCustomER] = useState<number>(3.5);
  
  // AI states
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentFollowers = Number(followers) || 0;
  const currentLikes = Number(likes) || 0;
  const currentComments = Number(comments) || 0;
  const selectedNiche = NICHES.find(n => n.id === niche) || NICHES[1];

  // Calculated Engagement Rate (ER)
  const calculatedER = currentFollowers > 0 
    ? ((currentLikes + currentComments) / currentFollowers) * 100 
    : 0;

  // Engagement Quality Classification
  const getERBadgeInfo = (erValue: number) => {
    if (erValue === 0) return { label: 'No Data', color: 'var(--muted)' };
    if (erValue < 1) return { label: 'Poor (Low Reach)', color: '#ff3b30' };
    if (erValue < 3) return { label: 'Average', color: '#ffcc00' };
    if (erValue < 6) return { label: 'Good (Healthy)', color: '#0071e3' };
    return { label: 'Excellent (Highly Active)', color: '#32d74b' };
  };

  const badgeInfo = getERBadgeInfo(calculatedER || customER);

  // Dynamic Payout Formulas based on followers and engagement quality multiplier
  const calculateRates = (followerCount: number, erRate: number) => {
    const engagementMultiplier = Math.max(0.5, Math.min(2.5, erRate / 3.0));
    return {
      reelMin: followerCount * 0.008 * engagementMultiplier,
      reelMax: followerCount * 0.020 * engagementMultiplier,
      postMin: followerCount * 0.005 * engagementMultiplier,
      postMax: followerCount * 0.015 * engagementMultiplier,
      storyMin: followerCount * 0.002 * engagementMultiplier,
      storyMax: followerCount * 0.006 * engagementMultiplier,
    };
  };

  const activeRates = calculateRates(
    currentFollowers || sliderFollowers,
    calculatedER || customER
  );

  // Interactive Checklist Progress
  const subFollowersProgress = Math.min((currentFollowers / 10000) * 100, 100);
  const marketplaceProgress = Math.min((currentFollowers / 10000) * 100, 100);
  const erProgress = Math.min((calculatedER / 2.5) * 100, 100);

  const isSubsEligible = currentFollowers >= 10000;
  const isBadgesEligible = currentFollowers >= 10000;
  const isMarketplaceEligible = currentFollowers >= 10000 && calculatedER >= 2.5;

  // Sync inputs dynamically
  useEffect(() => {
    if (currentFollowers > 0) {
      setSliderFollowers(currentFollowers);
    }
  }, [currentFollowers]);

  useEffect(() => {
    if (calculatedER > 0) {
      setCustomER(calculatedER);
    }
  }, [calculatedER]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleAiAudit = async () => {
    if (!handle.trim()) {
      alert("Please enter your Instagram Username first!");
      return;
    }
    setIsLoading(true);
    setAiResult(null);

    const erToPass = calculatedER || customER;

    try {
      const prompt = `Generate an Instagram Creator optimization audit and brand deal pitch blueprint for the username "${handle}".
      Niche Category: ${selectedNiche.name}.
      Metrics: Followers: ${currentFollowers || sliderFollowers}, Engagement Rate: ${erToPass.toFixed(2)}% (Likes: ${currentLikes}, Comments: ${currentComments}).

      Provide a customized professional creator strategy:
      1. profileAudit: Tailored suggestions on how to optimize their Instagram Bio, highlights layout, and feed aesthetics for brand appeal.
      2. engagementBoosters: Three actionable, highly specific tactics to improve their current engagement rate on Reels and carousel posts.
      3. brandPitchEmail: A professional, copyable brand sponsorship pitch email template that leverages their metrics (Followers and Engagement Rate) and niche value.
      4. contentHookStrategies: Three highly viral Reels hooks tailored for this niche to arrest attention in the first 2 seconds.

      Format the response exactly as a JSON object with keys:
      {
        "profileAudit": "text content",
        "engagementBoosters": ["tactic 1", "tactic 2", "tactic 3"],
        "brandPitchEmail": "full email template content with brackets",
        "contentHookStrategies": ["hook 1", "hook 2", "hook 3"]
      }
      Only return valid JSON. Do not include markdown brackets.`;

      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      setAiResult(parsedData);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to generate your Instagram strategic audit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Instagram Monetization Checker" 
        description="Calculate your exact Instagram engagement rate, estimate brand sponsorship rates for reels, stories, and posts, and receive a professional AI media kit blueprint." 
        url="https://globalutilitytoolbox.com/instagram-monetization" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />

      {/* Hero Header */}
      <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(204, 35, 102, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <Camera size={44} color="#cc2366" strokeWidth={1.5} />
        </div>
        <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Instagram Monetization Checker</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
          Evaluate your engagement rate quality, calculate real market pricing for brand sponsorships, and generate pitch contracts.
        </p>

        {/* Dynamic Multi-Input Form */}
        <div style={{ maxWidth: '850px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)', textAlign: 'left' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--accent)" /> Enter Instagram Account Diagnostics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Instagram Username</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. TechTravelVibe" 
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Account Category / Niche</label>
              <select 
                className="input-field"
                value={niche} 
                onChange={(e) => setNiche(e.target.value)}
                style={{ appearance: 'none', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
              >
                {NICHES.map(n => (
                  <option key={n.id} value={n.id} style={{ background: '#121212', color: '#fff' }}>{n.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Followers</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 15000" 
                value={followers}
                onChange={(e) => setFollowers(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Average Likes per Post</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 450" 
                value={likes}
                onChange={(e) => setLikes(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>Average Comments per Post</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 25" 
                value={comments}
                onChange={(e) => setComments(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
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
            {isLoading ? 'Scanning Account History...' : 'Generate AI Sponsorship Media Kit'}
          </button>
          {!handle && (
            <p style={{ fontSize: '12px', color: '#ffcc00', marginTop: '10px', textAlign: 'center' }}>
              * Enter your IG username to customize the AI strategic brand pitches.
            </p>
          )}
        </div>
      </div>

      {/* Checklist & Calculations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        
        {/* Panel 1: Dynamic Engagement & Features Checklist */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#cc2366" />
            Instagram Feature Scan
          </h3>

          {/* Engagement Rate Quality Status */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--card-border)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Engagement Rate Quality</span>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: badgeInfo.color }}>
                {(calculatedER || customER).toFixed(2)}%
              </div>
            </div>
            <span className="tag-badge" style={{ color: badgeInfo.color, borderColor: badgeInfo.color, fontSize: '11px' }}>
              {badgeInfo.label}
            </span>
          </div>

          {/* Subscriptions */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Instagram Subscriptions</span>
                <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Charge fans a monthly fee for exclusive posts & reels.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isSubsEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isSubsEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '9px'
              }}>
                {isSubsEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
              <span>Followers requirement: {currentFollowers.toLocaleString()} / 10,000</span>
              <span>{Math.round(subFollowersProgress)}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${subFollowersProgress}%`, background: '#cc2366', borderRadius: '2px', transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Live Badges */}
          <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Badges in Live Broadcasts</span>
                <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Enables live fans to purchase visual badges to tip you.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isBadgesEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isBadgesEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '9px'
              }}>
                {isBadgesEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
              <span>Followers requirement: {currentFollowers.toLocaleString()} / 10,000</span>
              <span>{Math.round(subFollowersProgress)}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${subFollowersProgress}%`, background: '#0071e3', borderRadius: '2px', transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Creator Marketplace */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Meta Creator Marketplace</span>
                <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Join the official registry for brands to discover your profile.</p>
              </div>
              <span className={`tag-badge`} style={{
                color: isMarketplaceEligible ? 'var(--success)' : '#ffcc00',
                borderColor: isMarketplaceEligible ? 'var(--success)' : '#ffcc00',
                fontSize: '9px'
              }}>
                {isMarketplaceEligible ? 'Eligible' : 'In Progress'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
              <span>Followers & Eng. Quality (Min 2.5%):</span>
              <span>{isMarketplaceEligible ? 'Passed' : 'Pending'}</span>
            </div>
          </div>

        </div>

        {/* Panel 2: Brand Deal Pricing Valuation Calculator */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={22} color="#32d74b" />
              Sponsorship Rate Calculator
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
              These estimations represent baseline rates you should charge brands per sponsor campaign based on your metrics and ER quality.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--muted)' }}>Projected Account Size:</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent)' }}>{sliderFollowers.toLocaleString()} followers</span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={500000} 
                step={2500}
                value={sliderFollowers} 
                onChange={(e) => setSliderFollowers(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                <span>1K followers</span>
                <span>500K followers</span>
              </div>
            </div>
          </div>

          {/* Rate grids */}
          <div>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
              Estimated Payouts Per Format
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Instagram Reel</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                  ${Math.round(activeRates.reelMin)} - ${Math.round(activeRates.reelMax)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>In-Feed Photo/Carousel</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                  ${Math.round(activeRates.postMin)} - ${Math.round(activeRates.postMax)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Instagram Story (with link tag)</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--success)' }}>
                  ${Math.round(activeRates.storyMin)} - ${Math.round(activeRates.storyMax)}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '20px', fontStyle: 'italic', margin: '20px 0 0' }}>
              * High niche relevance (e.g. high ticket travel/finance products) can double these rates.
            </p>
          </div>

        </div>

      </div>

      {/* AI Strategy Coach results */}
      {aiResult && (
        <div className="animate-slide-up" style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(204, 35, 102, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Sparkles size={24} color="#cc2366" />
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>AI Instagram Creator Strategy Coach</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Optimization loop and brand Pitch kit for @{handle}</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy(JSON.stringify(aiResult, null, 2), 'coach')}
                className="premium-button"
                style={{ padding: '10px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: '#fff' }}
              >
                {copiedType === 'coach' ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                {copiedType === 'coach' ? 'Copied' : 'Copy Full Output'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              
              {/* Left Side (Bio and Tactics) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Profile Audit */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff' }}>
                    <Target size={18} color="var(--accent)" /> Bio & Feed Aesthetics Audit
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {aiResult.profileAudit}
                  </p>
                </div>

                {/* Engagement Boosters */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--success)' }}>
                    <Award size={18} /> Engagement Boosting Tactics
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {aiResult.engagementBoosters.map((tactic: string, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '14px' }}>0{i+1}.</span>
                        <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>{tactic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reels Hooks */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#ffcc00' }}>
                    <Camera size={18} /> Viral Reels Hooks (0-2 Sec Rule)
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {aiResult.contentHookStrategies.map((hook: string, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '14px' }}>{i+1}.</span>
                        <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>{hook}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side (Copyable Pitch Email) */}
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#cc2366', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} /> Copyable Brand Pitch Email Template
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px' }}>
                    A professional email pitch specifically optimized with your followers and engagement rate metrics. Copy it and customize the bracket fields before mailing brands!
                  </p>
                  
                  <textarea 
                    readOnly
                    value={aiResult.brandPitchEmail}
                    style={{ width: '100%', height: '320px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', color: 'var(--muted)', fontSize: '13px', fontFamily: 'monospace', resize: 'none', lineHeight: '1.5' }}
                  />
                </div>

                <button 
                  onClick={() => handleCopy(aiResult.brandPitchEmail, 'email')}
                  className="premium-button"
                  style={{ width: '100%', padding: '14px', marginTop: '20px', background: '#cc2366', border: 'none' }}
                >
                  {copiedType === 'email' ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
                  &nbsp; {copiedType === 'email' ? 'Pitch Kit Copied!' : 'Copy Brand Pitch Email'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SEO Articles */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#fff' }}>Demystifying Instagram Engagement Rate Formulas</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Engagement Rate (ER) is the most critical metric brands evaluate before offering sponsorships. Having 100,000 followers with low likes yields a poor ER, indicating low active reach. In contrast, micro-creators with 5,000 followers but high comments yield robust ER scores of 5%–10%+, making them highly premium targets for advertiser conversions.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>How to Price Your Instagram Reels and Stories</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Pricing is calculated based on baseline CPM values ($10–$25 per 1,000 followers) adjusted heavily by engagement quality. Because Reels are pushed to non-followers via recommendations, they command the highest payouts. In-feed posts offer stable grid placement, while Stories are perfect for direct swipe-up or link stickers to cross-sell.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #cc2366' }}>
            <h4 style={{ marginTop: 0, color: '#cc2366', fontSize: '18px' }}>Pro Strategy: Pitching with Media Kits</h4>
            <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
              When contacting brands, do not just request products or freebies. Present a clean, numbers-focused pitch email showing your audience distribution and engagement scores. Quantify how your community aligns with the brand&apos;s target demographic to negotiate professional financial sponsorships.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px', color: '#fff' }}>Accessing Meta Creator Subscriptions</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Once you cross 10,000 followers, you can active direct user monetization options via Instagram. Creators can run members-only reels, exclusive story circles, and custom subscriber chat rooms, providing recurring, monthly income straight from fans.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/instagram-monetization" />
    </div>
  );
}
