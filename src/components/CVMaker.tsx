'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Plus, Trash2, ChevronRight, ChevronLeft, Layout, User, Briefcase, GraduationCap, Code, FileText, Sparkles, Save, Award, AlertCircle } from 'lucide-react';
import { CVData, Templates } from './CVTemplates';

const STORAGE_KEY = 'toolsnappy_cv_data';

const defaultData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    website: '',
    photo: '',
  },
  experience: [],
  education: [],
  skills: [],
  summary: '',
};

const initialData: CVData = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.personalInfo) return parsed;
    }
  } catch {}
  return defaultData;
})();

type Step = 'template' | 'personal' | 'experience' | 'education' | 'skills' | 'summary';

function calculateAtsScore(data: CVData): { score: number; details: { label: string; pass: boolean; tip: string }[] } {
  const details: { label: string; pass: boolean; tip: string }[] = [];
  let score = 0;

  if (data.personalInfo.fullName) { score += 5; details.push({ label: 'Full name provided', pass: true, tip: '' }); }
  else { details.push({ label: 'Full name provided', pass: false, tip: 'Recruiters need your name at the top.' }); }

  if (data.personalInfo.email) { score += 5; details.push({ label: 'Email included', pass: true, tip: '' }); }
  else { details.push({ label: 'Email included', pass: false, tip: 'Include a professional email address.' }); }

  if (data.personalInfo.phone) { score += 5; details.push({ label: 'Phone included', pass: true, tip: '' }); }
  else { details.push({ label: 'Phone included', pass: false, tip: 'Add your phone number for calls.' }); }

  if (data.summary.length > 50) { score += 10; details.push({ label: 'Professional summary (50+ chars)', pass: true, tip: '' }); }
  else { score += 2; details.push({ label: 'Professional summary (50+ chars)', pass: false, tip: 'A strong summary increases interview chances by 40%.' }); }

  const expCount = data.experience.length;
  if (expCount >= 2) { score += 15; details.push({ label: '2+ work experiences listed', pass: true, tip: '' }); }
  else if (expCount === 1) { score += 7; details.push({ label: 'Work experience listed', pass: true, tip: 'Add more positions if available.' }); }
  else { details.push({ label: 'Work experience listed', pass: false, tip: 'List at least your most recent role.' }); }

  const hasDetails = data.experience.some(e => e.description.length > 30);
  if (hasDetails) { score += 10; details.push({ label: 'Experience descriptions with details', pass: true, tip: '' }); }
  else if (expCount > 0) { score += 3; details.push({ label: 'Experience descriptions with details', pass: false, tip: 'Add achievements with numbers and metrics.' }); }

  if (data.education.length > 0) { score += 10; details.push({ label: 'Education section filled', pass: true, tip: '' }); }
  else { details.push({ label: 'Education section filled', pass: false, tip: 'Include your highest degree at minimum.' }); }

  if (data.skills.length >= 5) { score += 10; details.push({ label: '5+ skills listed', pass: true, tip: '' }); }
  else if (data.skills.length > 0) { score += 5; details.push({ label: 'Skills listed', pass: true, tip: 'Add more relevant skills (aim for 5-10).' }); }
  else { details.push({ label: 'Skills listed', pass: false, tip: 'Skills are highly weighted by ATS systems.' }); }

  const totalChars = data.summary.length + data.experience.reduce((a, e) => a + e.description.length, 0);
  if (totalChars > 500) { score += 10; details.push({ label: 'Sufficient content depth', pass: true, tip: '' }); }
  else { score += 3; details.push({ label: 'Sufficient content depth', pass: false, tip: 'Aim for 400-800 words of relevant experience.' }); }

  const hasNumbers = data.experience.some(e => /\d+/.test(e.description));
  if (hasNumbers) { score += 10; details.push({ label: 'Quantified achievements (numbers)', pass: true, tip: '' }); }
  else { score += 2; details.push({ label: 'Quantified achievements (numbers)', pass: false, tip: 'Use metrics like increased sales by 20%.' }); }

  const actionWords = ['managed', 'led', 'developed', 'created', 'improved', 'increased', 'reduced', 'achieved', 'implemented', 'launched'];
  const hasAction = data.experience.some(e => actionWords.some(w => e.description.toLowerCase().includes(w)));
  if (hasAction) { score += 10; details.push({ label: 'Strong action verbs used', pass: true, tip: '' }); }
  else { score += 3; details.push({ label: 'Strong action verbs used', pass: false, tip: 'Start bullets with action words like Led or Developed.' }); }

  if (data.personalInfo.jobTitle) { score += 5; details.push({ label: 'Job title listed', pass: true, tip: '' }); }
  else { details.push({ label: 'Job title listed', pass: false, tip: 'Add your target/current job title.' }); }

  if (data.personalInfo.fullName && data.personalInfo.email && data.experience.length > 0 && data.skills.length > 0 && data.summary.length > 30) {
    score += 5; details.push({ label: 'All critical sections complete', pass: true, tip: '' });
  } else {
    details.push({ label: 'All critical sections complete', pass: false, tip: 'Fill in name, email, experience, skills, and summary.' });
  }

  return { score: Math.min(100, score), details };
}

export default function CVMaker() {
  const [data, setData] = useState<CVData>(initialData);
  const [activeStep, setActiveStep] = useState<Step>('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof Templates>('modern');
  const [skillInput, setSkillInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAts, setShowAts] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const atsScore = calculateAtsScore(data);
  const allTemplates = Object.keys(Templates) as (keyof typeof Templates)[];

  useEffect(() => {
    saveTimerRef.current = setInterval(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }, 3000);
    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };
  }, [data]);

  const exportPdf = useCallback(async () => {
    setDownloadStatus('generating');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      const previewEl = previewRef.current;
      if (!previewEl) return;
      const canvas = await html2canvas(previewEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = 297;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${data.personalInfo.fullName || 'CV'}_ToolSnappy.pdf`);
      setDownloadStatus('done');
      setTimeout(() => setDownloadStatus('idle'), 2000);
    } catch (err) {
      setDownloadStatus('idle');
    }
  }, [data]);

  const generateAISummary = useCallback(async () => {
    if (data.experience.length === 0 && data.skills.length === 0) return;
    setIsGenerating(true);
    const expText = data.experience.map(e => `- ${e.position} at ${e.company} (${e.startDate}-${e.endDate}): ${e.description}`).join('\n');
    const skillsText = data.skills.join(', ');
    const prompt = `Write a professional CV summary (3-4 sentences) for a ${data.personalInfo.jobTitle || 'professional'}.

Experience:
${expText || 'No experience listed yet.'}

Skills: ${skillsText || 'Not specified.'}

Requirements:
- First-person, professional tone
- Highlight key achievements and years of experience
- Mention top skills
- Keep it under 100 words
- Do not use placeholders or generic phrases`;
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const { text: result }: { text: string } = await res.json();
        const cleaned = result.replace(/^["']|["']$/g, '').trim();
        if (cleaned.length > 20) {
          setData(prev => ({ ...prev, summary: cleaned }));
        }
      }
    } catch {}
  }, [data]);

  const resetAll = () => {
    setData(defaultData);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const steps: { id: Step; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'template', label: 'Template', icon: Layout },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'summary', label: 'Summary', icon: FileText },
  ];

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        setData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const SelectedTemplateComponent = Templates[selectedTemplate];

  const stepMeta = {
    template: { title: 'Which template describes you best?', sub: 'Choose a design that fits your industry.' },
    personal: { title: 'How do you want recruiters to contact you?', sub: 'Include your full name and at least email or phone number.' },
    experience: { title: 'Tell us about your work history', sub: 'Start with your most recent position.' },
    education: { title: 'Where did you study?', sub: 'Include your degrees and certifications.' },
    skills: { title: 'What are your top skills?', sub: 'Add skills that make you stand out.' },
    summary: { title: 'Summarize your career in a few sentences', sub: 'This is your elevator pitch to recruiters.' }
  };

  return (
    <div className="cv-maker-wrapper" style={{ display: 'flex', gap: '30px', minHeight: '800px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* SIDEBAR NAVIGATION */}
      <div className="cv-sidebar print-hidden glass-panel" style={{ flex: '0 0 80px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 10px', position: 'sticky', top: '20px' }}>
        {steps.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            title={step.label}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: activeStep === step.id ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
              color: activeStep === step.id ? '#fff' : 'var(--muted)',
              border: '1px solid var(--card-border)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              margin: '0 auto'
            }}
          >
            <step.icon size={20} />
          </button>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
          <button
            onClick={() => setShowAts(!showAts)}
            title="ATS Score"
            style={{
              width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: showAts ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
              color: showAts ? '#fff' : 'var(--muted)', border: '1px solid var(--card-border)', cursor: 'pointer', margin: '0 auto'
            }}
          >
            <Award size={20} />
          </button>
        </div>
      </div>

      {/* CENTER: FORM SIDE */}
      <div className="cv-form print-hidden glass-panel" style={{ flex: '1 1 500px', padding: '50px 40px', minHeight: '800px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>{stepMeta[activeStep].title}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{stepMeta[activeStep].sub}</p>
        </div>

        {showAts && (
          <div className="animate-fade-in" style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="var(--accent)" /> ATS Resume Score
              </h3>
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="var(--card-border)" strokeWidth="5" />
                  <circle cx="30" cy="30" r="26" fill="none" stroke={atsScore.score >= 70 ? '#32d74b' : atsScore.score >= 40 ? '#ff9f0a' : '#ff3b30'} strokeWidth="5" strokeDasharray={`${(atsScore.score / 100) * 163} 163`} transform="rotate(-90 30 30)" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 800, fontSize: '18px', color: atsScore.score >= 70 ? '#32d74b' : atsScore.score >= 40 ? '#ff9f0a' : '#ff3b30' }}>{atsScore.score}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {atsScore.details.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', padding: '4px 0' }}>
                  {d.pass ? <span style={{ color: '#32d74b', flexShrink: 0 }}>✓</span> : <span style={{ color: '#ff9f0a', flexShrink: 0 }}>○</span>}
                  <span style={{ color: d.pass ? 'var(--muted)' : '#ff9f0a' }}>{d.label}</span>
                  {!d.pass && d.tip && <span style={{ color: 'var(--muted)', fontSize: '12px', marginLeft: '4px' }}>— {d.tip}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="step-content" style={{ flex: 1 }}>
          {activeStep === 'template' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
                {allTemplates.map(t => (
                  <div
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    style={{
                      padding: '12px',
                      borderRadius: '20px',
                      border: `2px solid ${selectedTemplate === t ? 'var(--accent)' : 'var(--card-border)'}`,
                      cursor: 'pointer',
                      textAlign: 'center',
                      background: selectedTemplate === t ? 'rgba(41, 151, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {/* MINIATURE SKELETON PREVIEW */}
                    <div style={{ 
                      height: '180px', 
                      background: '#fff', 
                      borderRadius: '12px', 
                      marginBottom: '15px', 
                      padding: '12px',
                      display: 'flex',
                      flexDirection: t === 'european' || t === 'middleEast' || t === 'tech' || t === 'creative' ? 'row' : 'column',
                      gap: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      border: '1px solid #eee'
                    }}>
                      {/* Sidebar Templates */}
                      {(t === 'european' || t === 'middleEast' || t === 'tech' || t === 'creative') && (
                        <div style={{ width: '35%', height: '100%', background: t === 'tech' ? '#1e293b' : t === 'middleEast' ? '#c5a059' : t === 'european' ? '#2563eb' : '#333', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 5px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', margin: '0 auto' }}></div>
                          <div style={{ width: '80%', height: '3px', background: 'rgba(255,255,255,0.2)', margin: '0 auto' }}></div>
                          <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.1)', margin: '0 auto' }}></div>
                        </div>
                      )}
                      {/* Main Content */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ width: '70%', height: '10px', background: t === 'professional' || t === 'executive' ? '#333' : '#e2e8f0', borderRadius: '2px' }}></div>
                        <div style={{ width: '100%', height: '2px', background: '#f1f5f9' }}></div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ width: '100%', height: '2px', background: '#f1f5f9' }}></div>
                          <div style={{ width: '90%', height: '2px', background: '#f1f5f9' }}></div>
                          <div style={{ width: '95%', height: '2px', background: '#f1f5f9' }}></div>
                        </div>
                        <div style={{ width: '60%', height: '8px', background: '#e2e8f0', borderRadius: '2px', marginTop: '5px' }}></div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ width: '100%', height: '2px', background: '#f1f5f9' }}></div>
                          <div style={{ width: '85%', height: '2px', background: '#f1f5f9' }}></div>
                        </div>
                      </div>
                    </div>
                    <span style={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '0.05em' }}>{t.replace(/([A-Z])/g, ' $1')}</span>
                    {selectedTemplate === t && (
                      <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '24px', height: '24px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '2px solid #111' }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStep === 'personal' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 flex items-center gap-6 p-5 rounded-2xl border border-[var(--card-border)] bg-[rgba(255,255,255,0.02)]">
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px dashed var(--card-border)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {data.personalInfo.photo ? <img src={data.personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="var(--muted)" />}
                    </div>
                    <label style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--accent)', padding: '6px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
                      <Plus size={16} />
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px' }}>Profile Photo</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>Recommended: Square image, max 2MB.</p>
                  </div>
                </div>
                <div>
                  <label className="label-text">First & Last Name</label>
                  <input className="premium-input" name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="Salem Ali" />
                </div>
                <div>
                  <label className="label-text">Job Title</label>
                  <input className="premium-input" name="jobTitle" value={data.personalInfo.jobTitle} onChange={handlePersonalInfoChange} placeholder="Retail Sales Executive" />
                </div>
                <div>
                  <label className="label-text">Email Address</label>
                  <input className="premium-input" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="salem.ali@example.com" />
                </div>
                <div>
                  <label className="label-text">Phone Number</label>
                  <input className="premium-input" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="+971 50 123 4567" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="label-text">Full Address</label>
                  <input className="premium-input" name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} placeholder="Dubai, United Arab Emirates" />
                </div>
              </div>
            </div>
          )}

          {activeStep === 'experience' && (
            <div className="animate-fade-in">
              {data.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '30px', padding: '30px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', position: 'relative' }}>
                  <button onClick={() => removeExperience(index)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255, 68, 68, 0.1)', border: 'none', color: '#ff4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="label-text">Company Name</label>
                      <input className="premium-input" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="e.g. Google" />
                    </div>
                    <div>
                      <label className="label-text">Job Title</label>
                      <input className="premium-input" name="position" value={exp.position} onChange={(e) => handleExperienceChange(index, e)} placeholder="e.g. Sales Manager" />
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label className="label-text">Start Date</label>
                        <input className="premium-input" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="MM/YYYY" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="label-text">End Date</label>
                        <input className="premium-input" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="Present" />
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="label-text">Main Duties</label>
                      <textarea
                        className="premium-input"
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Describe your achievements..."
                        style={{ height: '120px', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addExperience} className="premium-button" style={{ width: '100%', borderStyle: 'dashed', background: 'none' }}>
                <Plus size={18} /> Add another position
              </button>
            </div>
          )}

          {activeStep === 'education' && (
            <div className="animate-fade-in">
              {data.education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '30px', padding: '30px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', position: 'relative' }}>
                  <button onClick={() => removeEducation(index)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255, 68, 68, 0.1)', border: 'none', color: '#ff4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="label-text">School / University</label>
                      <input className="premium-input" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} placeholder="Harvard University" />
                    </div>
                    <div>
                      <label className="label-text">Degree</label>
                      <input className="premium-input" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="B.S. Computer Science" />
                    </div>
                    <div>
                      <label className="label-text">Graduation Year</label>
                      <input className="premium-input" name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} placeholder="2020" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addEducation} className="premium-button" style={{ width: '100%', borderStyle: 'dashed', background: 'none' }}>
                <Plus size={18} /> Add another education entry
              </button>
            </div>
          )}

          {activeStep === 'skills' && (
            <div className="animate-fade-in">
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
                <label className="label-text">Type a skill and press Enter</label>
                <input
                  className="premium-input"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="e.g. Project Management, React, Sales..."
                  style={{ marginBottom: '20px' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {data.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        background: 'rgba(41, 151, 255, 0.1)',
                        border: '1px solid rgba(41, 151, 255, 0.2)',
                        color: 'var(--accent)',
                        fontSize: '14px',
                        fontWeight: 600
                      }}
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        <Trash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 'summary' && (
            <div className="animate-fade-in">
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label className="label-text" style={{ margin: 0 }}>Professional Summary</label>
                  <button
                    onClick={generateAISummary}
                    disabled={isGenerating}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                      borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)',
                      background: 'rgba(99,102,241,0.1)', color: 'var(--accent)',
                      cursor: isGenerating ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600,
                      opacity: isGenerating ? 0.6 : 1
                    }}
                  >
                    <Sparkles size={16} /> {isGenerating ? 'Generating...' : 'AI Write Summary'}
                  </button>
                </div>
                <textarea
                  className="premium-input"
                  value={data.summary}
                  onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Your professional summary — describe your career highlights, key skills, and what you bring to a role."
                  style={{ height: '250px', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: data.summary.length > 50 ? 'var(--muted)' : '#ff9f0a' }}>
                    {data.summary.length} characters {data.summary.length < 50 ? '(aim for 50+)' : ''}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === activeStep);
                if (currentIndex > 0) setActiveStep(steps[currentIndex - 1].id);
              }}
              disabled={activeStep === steps[0].id}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                borderRadius: '12px', border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.03)', color: '#fff', cursor: 'pointer',
                opacity: activeStep === steps[0].id ? 0.3 : 1, transition: 'all 0.3s'
              }}
            >
              <ChevronLeft size={20} /> Back
            </button>
            {activeStep !== steps[0].id && activeStep !== steps[steps.length - 1].id && (
              <button onClick={() => setActiveStep('template')} style={{ background: 'none', border: '1px solid var(--card-border)', color: 'var(--muted)', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px' }}>
                <Layout size={16} />
              </button>
            )}
          </div>
          
          {activeStep === steps[steps.length - 1].id ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={exportPdf}
                disabled={downloadStatus === 'generating'}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 32px',
                  borderRadius: '12px', border: 'none',
                  background: downloadStatus === 'done' ? '#32d74b' : 'var(--accent)',
                  color: '#fff', cursor: downloadStatus === 'generating' ? 'not-allowed' : 'pointer',
                  fontWeight: 600, fontSize: '15px', transition: 'all 0.3s',
                  opacity: downloadStatus === 'generating' ? 0.7 : 1
                }}
              >
                {downloadStatus === 'generating' ? <>Generating PDF...</> : downloadStatus === 'done' ? <>✓ PDF Saved</> : <><Download size={20} /> Download PDF</>}
              </button>
              <button
                onClick={() => setShowAts(!showAts)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--card-border)', background: showAts ? 'rgba(41,151,255,0.1)' : 'rgba(255,255,255,0.03)', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
              >
                <Award size={18} /> Score
              </button>
              <button onClick={resetAll} style={{ background: 'rgba(255,68,68,0.1)', border: 'none', color: '#ff4444', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px' }} title="Reset All">
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === activeStep);
                if (currentIndex < steps.length - 1) setActiveStep(steps[currentIndex + 1].id);
              }}
              className="premium-button"
              style={{ padding: '12px 40px' }}
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: PREVIEW SIDE */}
      <div className="preview-container">
        <div className="print-hidden" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <span style={{ 
            fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700,
            background: 'rgba(41, 151, 255, 0.1)', padding: '8px 20px', borderRadius: '20px', border: '1px solid rgba(41, 151, 255, 0.2)'
          }}>
            Live Preview — A4
          </span>
        </div>
        <div className="glass-panel cv-paper">
          <div id="cv-preview-root" ref={previewRef}>
            <SelectedTemplateComponent data={data} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .preview-container {
          flex: 0 0 500px;
          position: sticky;
          top: 20px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cv-paper {
          padding: 0;
          overflow: hidden;
          transform: scale(0.6);
          transform-origin: top center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          margin-bottom: -450px;
          width: 794px;
          min-height: 1123px;
          background: #fff;
          transition: all 0.3s ease;
        }
        @media (max-width: 1300px) {
          .preview-container { flex: 0 0 400px; }
          .cv-paper { transform: scale(0.48) !important; margin-bottom: -590px !important; }
        }
        @media (max-width: 1024px) {
          .cv-maker-wrapper { flex-direction: column !important; flex-wrap: nowrap !important; align-items: center !important; }
          .cv-sidebar { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; width: 100% !important; flex: 0 0 auto !important; position: static !important; padding: 15px !important; overflow: visible !important; }
          .cv-sidebar button { width: 100% !important; height: 45px !important; margin: 0 !important; border-radius: 12px !important; }
          .cv-form { width: 100% !important; flex: 1 1 auto !important; padding: 20px !important; }
          .preview-container { width: 100% !important; max-width: 100% !important; flex: 1 1 auto !important; position: relative !important; overflow: hidden !important; display: block !important; }
          .cv-paper { position: absolute !important; left: 50% !important; top: 60px !important; transform-origin: top center !important; margin: 0 !important; }
        }
        @media (max-width: 1024px) { .preview-container { height: 1100px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.85) !important; } }
        @media (max-width: 768px) { .preview-container { height: 960px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.75) !important; } }
        @media (max-width: 600px) { .preview-container { height: 780px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.6) !important; } }
        @media (max-width: 480px) { .preview-container { height: 660px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.5) !important; } }
        @media (max-width: 400px) { .preview-container { height: 600px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.45) !important; } }
        @media (max-width: 360px) { .preview-container { height: 550px !important; } .cv-paper { transform: translate(-50%, 0) scale(0.4) !important; } }
      `}</style>
    </div>
  );
}
