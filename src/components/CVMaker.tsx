'use client';

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, ChevronRight, ChevronLeft, Layout, User, Briefcase, GraduationCap, Code, FileText } from 'lucide-react';
import { CVData, Templates } from './CVTemplates';

const initialData: CVData = {
  personalInfo: {
    fullName: 'Salem Ali',
    email: 'salem.ali@example.com',
    phone: '+971 50 123 4567',
    address: 'Dubai, UAE',
    jobTitle: 'Retail Sales Executive',
    website: '',
    photo: '',
  },
  experience: [
    { 
      company: 'Global Retail Group', 
      position: 'Senior Sales Executive', 
      startDate: 'Jan 2021', 
      endDate: 'Present', 
      description: 'Increased monthly sales by 15% through effective upselling and cross-selling. Managed a team of 5 sales associates.' 
    }
  ],
  education: [
    { school: 'United Arab Emirates University', degree: 'B.A. Business Administration', year: '2016 - 2020' }
  ],
  skills: ['Customer Service', 'Sales Management', 'Inventory Control', 'Communication'],
  summary: 'Customer-focused Sales & Retail professional with over 5 years of experience in high-end retail environments. Proven track record of exceeding sales targets and delivering exceptional customer service.',
};

type Step = 'template' | 'personal' | 'experience' | 'education' | 'skills' | 'summary';

export default function CVMaker() {
  const [data, setData] = useState<CVData>(initialData);
  const [activeStep, setActiveStep] = useState<Step>('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof Templates>('modern');
  const [skillInput, setSkillInput] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const steps: { id: Step; label: string; icon: any }[] = [
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

  const handlePrint = () => {
    window.print();
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
      </div>

      {/* CENTER: FORM SIDE */}
      <div className="cv-form print-hidden glass-panel" style={{ flex: '1 1 500px', padding: '50px 40px', minHeight: '800px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>{stepMeta[activeStep].title}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{stepMeta[activeStep].sub}</p>
        </div>

        <div className="step-content" style={{ flex: 1 }}>
          {activeStep === 'template' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
                {(Object.keys(Templates) as Array<keyof typeof Templates>).map(t => (
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '30px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px dashed var(--card-border)' }}>
                      {data.personalInfo.photo ? <img src={data.personalInfo.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="var(--muted)" />}
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
                <div style={{ gridColumn: 'span 2' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
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
                    <div style={{ gridColumn: 'span 2' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
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
                <label className="label-text">Summary Text</label>
                <textarea
                  className="premium-input"
                  value={data.summary}
                  onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Focus on your most relevant achievements..."
                  style={{ height: '250px', resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--card-border)' }}>
          <button
            onClick={() => {
              const currentIndex = steps.findIndex(s => s.id === activeStep);
              if (currentIndex > 0) setActiveStep(steps[currentIndex - 1].id);
            }}
            disabled={activeStep === steps[0].id}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'rgba(255,255,255,0.03)',
              color: '#fff',
              cursor: 'pointer',
              opacity: activeStep === steps[0].id ? 0.3 : 1,
              transition: 'all 0.3s'
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {activeStep === steps[steps.length - 1].id ? (
            <button 
              onClick={handlePrint} 
              className="no-print" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid var(--accent)',
                background: 'rgba(41, 151, 255, 0.1)',
                color: 'var(--accent)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: 600
              }}
            >
              <Download size={20} /> Download PDF
            </button>
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
      <div className="preview-container" style={{ flex: '0 0 500px', position: 'sticky', top: '20px', height: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="print-hidden" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '13px', 
            color: 'var(--accent)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            fontWeight: 700,
            background: 'rgba(41, 151, 255, 0.1)',
            padding: '8px 20px',
            borderRadius: '20px',
            border: '1px solid rgba(41, 151, 255, 0.2)'
          }}>
            Live Preview
          </span>
        </div>
        <div 
          className="glass-panel cv-print-container" 
          style={{ 
            padding: '0', 
            overflow: 'hidden', 
            transform: 'scale(0.6)', 
            transformOrigin: 'top center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            marginBottom: '-450px', // Adjusted for 0.6 scale (1122 - 1122*0.6 = 448)
            width: '210mm',
            height: '297mm',
            background: '#fff'
          }}
        >
          <div id="cv-preview-root" ref={previewRef} style={{ width: '100%', height: '100%' }}>
            <SelectedTemplateComponent data={data} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          /* Hide all explicitly marked elements */
          .print-hidden, header, nav, footer, .ad-container, iframe {
            display: none !important;
          }

          /* Ensure the body and html have white backgrounds */
          body, html {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            color: black !important;
          }

          /* Remove all layout from the wrapper so the preview can fill the page */
          .cv-maker-wrapper, .preview-container {
            display: block !important;
            position: static !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          /* Strip the 0.7 scale and margins so the CV prints full size */
          .preview-container .glass-panel {
            transform: scale(1) !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            width: 210mm !important;
            height: auto !important;
            background: white !important;
            position: static !important;
          }

          #cv-preview-root {
            width: 210mm !important;
            height: auto !important;
            display: block !important;
            background: white !important;
            position: static !important;
          }

          .cv-preview {
            width: 210mm !important;
            min-height: 297mm !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .cv-maker-wrapper {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cv-sidebar {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
            width: 100% !important;
            flex: 0 0 auto !important;
            position: static !important;
            padding: 15px !important;
            overflow: visible !important;
          }
          .cv-sidebar button {
            width: 100% !important;
            height: 45px !important;
            margin: 0 !important;
            border-radius: 12px !important;
          }
          .cv-form {
            width: 100% !important;
            flex: 1 1 auto !important;
            padding: 20px !important;
          }
          .preview-container {
            width: 100% !important;
            flex: 1 1 auto !important;
            position: static !important;
            overflow: hidden !important;
            padding-bottom: 20px !important;
            display: flex !important;
            justify-content: center !important;
          }
          .cv-print-container {
            transform: scale(0.7) !important;
            transform-origin: top center !important;
            margin-bottom: -330px !important;
            margin-left: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .cv-print-container {
            transform: scale(0.48) !important;
            transform-origin: top center !important;
            margin-bottom: -550px !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
