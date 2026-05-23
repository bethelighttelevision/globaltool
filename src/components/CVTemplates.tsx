import React from 'react';
import { User } from 'lucide-react';

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    website: string;
    photo?: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  skills: string[];
  summary: string;
}

interface TemplateProps {
  data: CVData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview modern-template" style={{ padding: '40px', backgroundColor: '#fff', color: '#333', minHeight: '1122px', position: 'relative' }}>
      <header style={{ borderBottom: '2px solid #2997ff', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', color: '#1d1d1f' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ margin: '5px 0 0', fontSize: '18px', color: '#2997ff', fontWeight: 500 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '12px', color: '#86868b' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div className="main-col">
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', color: '#2997ff', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Summary</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{data.summary || 'A brief summary of your professional background.'}</p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', color: '#2997ff', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Experience</h2>
            {data.experience.length > 0 ? data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{exp.position}</h3>
                  <span style={{ fontSize: '12px', color: '#86868b' }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>{exp.company}</div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No experience listed yet.</p>}
          </section>
        </div>

        <div className="sidebar-col">
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', color: '#2997ff', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Education</h2>
            {data.education.length > 0 ? data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{edu.degree}</h3>
                <div style={{ fontSize: '13px' }}>{edu.school}</div>
                <div style={{ fontSize: '12px', color: '#86868b' }}>{edu.year}</div>
              </div>
            )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No education listed yet.</p>}
          </section>

          <section>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', color: '#2997ff', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.length > 0 ? data.skills.map((skill, i) => (
                <span key={i} style={{ backgroundColor: '#f5f5f7', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{skill}</span>
              )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No skills listed yet.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview professional-template" style={{ padding: '50px', backgroundColor: '#fff', color: '#1d1d1f', minHeight: '1122px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontSize: '36px', letterSpacing: '2px', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ margin: '10px 0', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', color: '#666' }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '13px', color: '#666', marginTop: '10px' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '15px' }}>Professional Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.8' }}>{data.summary || 'A brief summary of your professional background.'}</p>
      </section>

      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '15px' }}>Work Experience</h2>
        {data.experience.length > 0 ? data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{exp.company}</h3>
              <span style={{ fontSize: '13px', color: '#666' }}>{exp.startDate} - {exp.endDate}</span>
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '10px' }}>{exp.position}</div>
            <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
          </div>
        )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No experience listed yet.</p>}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
          {data.education.length > 0 ? data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{edu.school}</h3>
              <div style={{ fontSize: '13px' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{edu.year}</div>
            </div>
          )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No education listed yet.</p>}
        </section>

        <section>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '15px' }}>Key Skills</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {data.skills.length > 0 ? data.skills.map((skill, i) => (
              <li key={i} style={{ fontSize: '13px', marginBottom: '5px' }}>{skill}</li>
            )) : <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#86868b' }}>No skills listed yet.</p>}
          </ul>
        </section>
      </div>
    </div>
  );
};

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview creative-template" style={{ display: 'flex', backgroundColor: '#fff', color: '#2d3436', minHeight: '1122px' }}>
      <aside style={{ width: '30%', backgroundColor: '#2d3436', color: '#fff', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', margin: '0 0 10px', color: '#00cec9' }}>{data.personalInfo.fullName || 'Name'}</h1>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#00cec9', marginBottom: '15px' }}>Contact</h2>
          <div style={{ fontSize: '12px', lineHeight: '2' }}>
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.address && <div>{data.personalInfo.address}</div>}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#00cec9', marginBottom: '15px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px', fontSize: '12px' }}>
              <div style={{ fontWeight: 600 }}>{edu.degree}</div>
              <div>{edu.school}</div>
              <div style={{ opacity: 0.7 }}>{edu.year}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#00cec9', marginBottom: '15px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '3px 7px', borderRadius: '15px', fontSize: '11px' }}>{skill}</span>
            ))}
          </div>
        </section>
      </aside>

      <main style={{ width: '70%', padding: '40px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', color: '#2d3436', borderLeft: '4px solid #00cec9', paddingLeft: '15px', marginBottom: '20px' }}>About Me</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.8' }}>{data.summary}</p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', color: '#2d3436', borderLeft: '4px solid #00cec9', paddingLeft: '15px', marginBottom: '20px' }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#00cec9' }}>{exp.position}</h3>
                <span style={{ fontSize: '12px', color: '#636e72' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>{exp.company}</div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

const EuropeanTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview european-template" style={{ padding: '40px', backgroundColor: '#fff', color: '#1a1a1a', minHeight: '1122px', fontFamily: '"Open Sans", sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '30px', borderBottom: '1px solid #004a99', paddingBottom: '30px', marginBottom: '30px' }}>
        <div style={{ width: '150px', height: '180px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {data.personalInfo.photo ? <img src={data.personalInfo.photo} alt={data.personalInfo.fullName + " profile photo"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={50} color="#ccc" />}
        </div>
        <div>
          <h1 style={{ margin: '0 0 5px', fontSize: '28px', color: '#004a99' }}>{data.personalInfo.fullName || 'Name'}</h1>
          <p style={{ margin: '0 0 15px', fontSize: '18px', fontWeight: 600 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            {data.personalInfo.email && <div><strong>Email:</strong> {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div><strong>Phone:</strong> {data.personalInfo.phone}</div>}
            {data.personalInfo.address && <div><strong>Address:</strong> {data.personalInfo.address}</div>}
          </div>
        </div>
      </div>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', color: '#004a99', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>Personal Summary</h2>
        <p style={{ fontSize: '13px', lineHeight: '1.6' }}>{data.summary}</p>
      </section>

      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', color: '#004a99', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>Work Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '150px 1fr', gap: '30px' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: 600 }}>{exp.startDate} - {exp.endDate}</div>
            <div>
              <h3 style={{ margin: '0 0 5px', fontSize: '15px', fontWeight: 700 }}>{exp.position}</h3>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>{exp.company}</div>
              <p style={{ fontSize: '13px', margin: 0, lineHeight: '1.5' }}>{exp.description}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section>
          <h2 style={{ fontSize: '16px', color: '#004a99', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{edu.degree}</div>
              <div style={{ fontSize: '13px' }}>{edu.school}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{edu.year}</div>
            </div>
          ))}
        </section>
        <section>
          <h2 style={{ fontSize: '16px', color: '#004a99', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ backgroundColor: '#f0f7ff', color: '#004a99', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', border: '1px solid #cce3ff' }}>{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const MiddleEastTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview middle-east-template" style={{ backgroundColor: '#fff', color: '#333', minHeight: '1122px' }}>
      <header style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 5px', fontSize: '32px', letterSpacing: '1px' }}>{data.personalInfo.fullName || 'Name'}</h1>
          <p style={{ margin: 0, fontSize: '18px', color: '#d4af37' }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        </div>
        <div style={{ width: '120px', height: '120px', border: '3px solid #d4af37', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {data.personalInfo.photo ? <img src={data.personalInfo.photo} alt={data.personalInfo.fullName + " profile photo"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={40} color="#666" />}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '40px', padding: '40px' }}>
        <aside style={{ width: '30%' }}>
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#d4af37', borderBottom: '2px solid #d4af37', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h2>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              {data.personalInfo.email && <div><strong>Email:</strong><br />{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div><strong>Phone:</strong><br />{data.personalInfo.phone}</div>}
              {data.personalInfo.address && <div><strong>Location:</strong><br />{data.personalInfo.address}</div>}
            </div>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#d4af37', borderBottom: '2px solid #d4af37', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h2>
            <ul style={{ paddingLeft: '15px', margin: 0 }}>
              {data.skills.map((skill, i) => (
                <li key={i} style={{ fontSize: '13px', marginBottom: '8px' }}>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#d4af37', borderBottom: '2px solid #d4af37', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{edu.degree}</div>
                <div style={{ fontSize: '12px' }}>{edu.school}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{edu.year}</div>
              </div>
            ))}
          </section>
        </aside>

        <main style={{ width: '70%' }}>
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>Executive Summary</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.8', textAlign: 'justify' }}>{data.summary}</p>
          </section>

          <section>
            <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '15px' }}>Professional Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{exp.position}</h3>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#d4af37' }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#666' }}>{exp.company}</div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview executive-template" style={{ padding: '60px', backgroundColor: '#fff', color: '#1a1a1a', minHeight: '1122px', border: '20px solid #f8f9fa' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '30px', marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '32px', fontFamily: 'serif', letterSpacing: '1px' }}>{data.personalInfo.fullName || 'Name'}</h1>
        <p style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', color: '#666' }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '13px', fontStyle: 'italic' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>Executive Profile</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.8', fontStyle: 'italic' }}>{data.summary}</p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>Professional Accomplishments</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{exp.company}</h3>
              <span style={{ fontSize: '12px', color: '#666' }}>{exp.startDate} - {exp.endDate}</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '10px' }}>{exp.position}</div>
            <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <section>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{edu.degree}</div>
              <div style={{ fontSize: '13px' }}>{edu.school}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{edu.year}</div>
            </div>
          ))}
        </section>
        <section>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>Core Competencies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {data.skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '13px', borderLeft: '2px solid #333', paddingLeft: '10px' }}>{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview minimalist-template" style={{ padding: '80px', backgroundColor: '#fff', color: '#000', minHeight: '1122px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '40px', fontWeight: 300, letterSpacing: '-1px' }}>{data.personalInfo.fullName || 'Name'}</h1>
        <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#666' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '50px' }}>
        <p style={{ fontSize: '15px', lineHeight: '1.6', fontWeight: 400 }}>{data.summary}</p>
      </section>

      <section style={{ marginBottom: '50px' }}>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '35px', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '40px' }}>
            <div style={{ fontSize: '13px', color: '#666' }}>{exp.startDate} – {exp.endDate}</div>
            <div>
              <h3 style={{ margin: '0 0 5px', fontSize: '16px', fontWeight: 600 }}>{exp.company}</h3>
              <div style={{ fontSize: '14px', marginBottom: '10px', color: '#333' }}>{exp.position}</div>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
        <section>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: '#999' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{edu.degree}</div>
              <div style={{ fontSize: '13px' }}>{edu.school}</div>
            </div>
          ))}
        </section>
        <section>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: '#999' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ fontSize: '13px' }}>{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview tech-template" style={{ display: 'flex', backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '1122px', border: '1px solid #1e293b' }}>
      <aside style={{ width: '35%', backgroundColor: '#1e293b', padding: '40px' }}>
        <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#334155', borderRadius: '16px', marginBottom: '30px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {data.personalInfo.photo ? <img src={data.personalInfo.photo} alt={data.personalInfo.fullName + " profile photo"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={60} color="#475569" />}
        </div>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '2px', marginBottom: '20px' }}>Contact</h2>
          <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.personalInfo.email && <div><div style={{ color: '#94a3b8', fontSize: '11px' }}>EMAIL</div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div><div style={{ color: '#94a3b8', fontSize: '11px' }}>PHONE</div>{data.personalInfo.phone}</div>}
            {data.personalInfo.address && <div><div style={{ color: '#94a3b8', fontSize: '11px' }}>LOCATION</div>{data.personalInfo.address}</div>}
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '2px', marginBottom: '20px' }}>Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>{skill}</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#334155', borderRadius: '2px' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: '#38bdf8', borderRadius: '2px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '2px', marginBottom: '20px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{edu.school}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{edu.year}</div>
            </div>
          ))}
        </section>
      </aside>

      <main style={{ width: '65%', padding: '60px' }}>
        <header style={{ marginBottom: '50px' }}>
          <h1 style={{ margin: '0 0 10px', fontSize: '42px', fontWeight: 800 }}>{data.personalInfo.fullName || 'Name'}</h1>
          <p style={{ margin: 0, fontSize: '20px', color: '#38bdf8', fontWeight: 500 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        </header>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>Profile</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#cbd5e1' }}>{data.summary}</p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>{exp.position}</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '15px' }}>{exp.company}</div>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#94a3b8', margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

const AcademicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview academic-template" style={{ padding: '60px', backgroundColor: '#fff', color: '#1a1a1a', minHeight: '1122px', fontFamily: '"Times New Roman", serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '32px', textTransform: 'uppercase' }}>{data.personalInfo.fullName || 'Name'}</h1>
        <div style={{ fontSize: '14px' }}>
          {data.personalInfo.address && <span>{data.personalInfo.address} | </span>}
          {data.personalInfo.email && <span>{data.personalInfo.email} | </span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', marginBottom: '15px' }}>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{edu.school}</strong>
              <span>{edu.year}</span>
            </div>
            <div>{edu.degree}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', marginBottom: '15px' }}>Professional Appointments</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{exp.company}</strong>
              <span>{exp.startDate} – {exp.endDate}</span>
            </div>
            <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.position}</div>
            <p style={{ fontSize: '14px', margin: 0 }}>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #000', marginBottom: '15px' }}>Research Interests & Skills</h2>
        <p style={{ fontSize: '14px', marginBottom: '15px' }}>{data.summary}</p>
        <div style={{ fontSize: '14px' }}>
          <strong>Skills: </strong> {data.skills.join(', ')}
        </div>
      </section>
    </div>
  );
};

const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview elegant-template" style={{ padding: '60px', backgroundColor: '#fff', color: '#2c3e50', minHeight: '1122px', border: '1px solid #ecf0f1' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '36px', fontWeight: 300, color: '#2980b9' }}>{data.personalInfo.fullName || 'Name'}</h1>
        <p style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#95a5a6' }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
      </header>

      <div style={{ display: 'flex', gap: '60px' }}>
        <div style={{ flex: 2 }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: '#2980b9', marginBottom: '20px', borderBottom: '2px solid #3498db', display: 'inline-block' }}>Profile</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>{data.summary}</p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: '#2980b9', marginBottom: '20px', borderBottom: '2px solid #3498db', display: 'inline-block' }}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '30px' }}>
                <h3 style={{ margin: '0 0 5px', fontSize: '16px', fontWeight: 600 }}>{exp.position}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#7f8c8d', marginBottom: '10px' }}>
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div style={{ flex: 1 }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: '#2980b9', marginBottom: '20px', borderBottom: '2px solid #3498db', display: 'inline-block' }}>Details</h2>
            <div style={{ fontSize: '13px', lineHeight: '2' }}>
              {data.personalInfo.email && <div><strong>E:</strong> {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div><strong>P:</strong> {data.personalInfo.phone}</div>}
              {data.personalInfo.address && <div><strong>A:</strong> {data.personalInfo.address}</div>}
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', color: '#2980b9', marginBottom: '20px', borderBottom: '2px solid #3498db', display: 'inline-block' }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px', fontSize: '13px' }}>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div>{edu.school}</div>
                <div style={{ color: '#95a5a6' }}>{edu.year}</div>
              </div>
            ))}
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: '#2980b9', marginBottom: '20px', borderBottom: '2px solid #3498db', display: 'inline-block' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ fontSize: '12px', padding: '3px 8px', border: '1px solid #3498db', borderRadius: '3px' }}>{skill}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const AtsOptimizedTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview ats-template" style={{ padding: '40px', backgroundColor: '#fff', color: '#000', minHeight: '1122px', fontFamily: '"Arial", "Helvetica", sans-serif', fontSize: '12px', lineHeight: '1.4' }}>
      <header style={{ borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 700, letterSpacing: '0.5px' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 500 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', color: '#333' }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #999', paddingBottom: '3px', marginBottom: '10px' }}>Professional Summary</h2>
        <p style={{ fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{data.summary || 'A brief summary of your professional background.'}</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #999', paddingBottom: '3px', marginBottom: '10px' }}>Experience</h2>
        {data.experience.length > 0 ? data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '13px' }}>
              <span>{exp.company}</span>
              <span>{exp.startDate} – {exp.endDate}</span>
            </div>
            <div style={{ fontStyle: 'italic', marginBottom: '4px', fontSize: '12px' }}>{exp.position}</div>
            <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>{exp.description}</p>
          </div>
        )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No experience listed yet.</p>}
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #999', paddingBottom: '3px', marginBottom: '10px' }}>Education</h2>
        {data.education.length > 0 ? data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px' }}>{edu.school}</div>
            <div style={{ fontSize: '12px' }}>{edu.degree} • {edu.year}</div>
          </div>
        )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No education listed yet.</p>}
      </section>

      <section>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #999', paddingBottom: '3px', marginBottom: '10px' }}>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {data.skills.length > 0 ? data.skills.map((skill, i) => (
            <span key={i} style={{ fontSize: '11px', padding: '2px 8px', border: '1px solid #ccc', borderRadius: '2px' }}>{skill}</span>
          )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No skills listed yet.</p>}
        </div>
      </section>
    </div>
  );
};

const ModernDarkTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-preview dark-template" style={{ padding: '45px', backgroundColor: '#111827', color: '#e5e7eb', minHeight: '1122px' }}>
      <header style={{ marginBottom: '35px' }}>
        <h1 style={{ margin: '0 0 6px', fontSize: '34px', fontWeight: 800, background: 'linear-gradient(135deg, #818cf8, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ margin: '0 0 14px', fontSize: '16px', color: '#a5b4fc', fontWeight: 500 }}>{data.personalInfo.jobTitle || 'Job Title'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#9ca3af' }}>
          {data.personalInfo.email && <span style={{ background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span style={{ background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span style={{ background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{data.personalInfo.address}</span>}
        </div>
      </header>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#818cf8', marginBottom: '14px', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>About</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#d1d5db', margin: 0 }}>{data.summary || 'A brief summary of your professional background.'}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#818cf8', marginBottom: '14px', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>Experience</h2>
        {data.experience.length > 0 ? data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px', padding: '16px', background: 'rgba(31,41,55,0.5)', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f9fafb' }}>{exp.position}</h3>
              <span style={{ fontSize: '12px', color: '#818cf8' }}>{exp.startDate} - {exp.endDate}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#a5b4fc', marginBottom: '8px' }}>{exp.company}</div>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#9ca3af', margin: 0 }}>{exp.description}</p>
          </div>
        )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No experience listed yet.</p>}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#818cf8', marginBottom: '14px', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>Education</h2>
          {data.education.length > 0 ? data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px', padding: '12px', background: 'rgba(31,41,55,0.3)', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#f9fafb' }}>{edu.school}</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', color: '#818cf8' }}>{edu.year}</div>
            </div>
          )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No education listed yet.</p>}
        </section>
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#818cf8', marginBottom: '14px', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.skills.length > 0 ? data.skills.map((skill, i) => (
              <span key={i} style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, border: '1px solid rgba(99,102,241,0.2)' }}>{skill}</span>
            )) : <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>No skills listed yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export const Templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  european: EuropeanTemplate,
  middleEast: MiddleEastTemplate,
  executive: ExecutiveTemplate,
  minimalist: MinimalistTemplate,
  tech: TechTemplate,
  academic: AcademicTemplate,
  elegant: ElegantTemplate,
  atsOptimized: AtsOptimizedTemplate,
  modernDark: ModernDarkTemplate,
};
