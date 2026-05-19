import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CVMaker from '../../components/CVMaker';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export const metadata = {
  title: 'Free Online CV Maker | Professional Resume Builder 2026',
  description: 'Create a professional CV in minutes with our free online CV maker. Choose from multiple templates, customize your layout, and download a high-quality PDF resume.',
  keywords: 'CV Maker, Resume Builder, Free CV Maker Online, Professional CV Templates, PDF Resume, 2026 Resume Trends',
};

export default function CVMakerPage() {
  return (
    <div className="content-container px-4 md:px-6 py-10">
      <SEO 
        toolName="Professional CV Maker" 
        description="Create a professional CV in minutes with our free online CV maker. Choose from multiple templates, customize your layout, and download a high-quality PDF resume." 
        url="https://globalutilitytoolbox.com/cv-maker" 
      />

      <div className="print-hidden">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
          <ArrowLeft size={16} /> Back to Tools
        </Link>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 className="gradient-text text-3xl md:text-5xl font-bold mb-4">Professional CV Maker</h1>
          <p className="text-base md:text-lg text-[var(--muted)] max-w-[800px] leading-relaxed">
            Stand out from the crowd with a premium, recruiter-approved CV. Our 2026 AI-ready templates are designed to pass ATS filters and impress hiring managers.
          </p>
        </div>
      </div>

      <CVMaker />
      
      <div className="print-hidden">
        <div className="mt-10">
          <AdSensePlaceholder type="mid-content" />
        </div>

        <RelatedTools currentPath="/cv-maker" />

        {/* SEO CONTENT SECTION */}
        <article className="article-content mt-16 md:mt-24 p-6 md:p-10 bg-[var(--card)] rounded-2xl border border-[var(--card-border)]">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-[var(--card-border)] pb-4 mb-8">
            How to Create a Winning CV in 2026
          </h2>
          
          <p>
            In today&apos;s competitive job market, your CV is more than just a list of your work history—it&apos;s your personal marketing document. With the rise of AI-driven recruitment and Applicant Tracking Systems (ATS), the way you structure and present your professional experience has never been more critical. Our <strong>Professional CV Maker</strong> is designed to help you navigate these challenges effortlessly.
          </p>

          <h3>1. Choosing the Right Template</h3>
          <p>
            Not all jobs require the same style of resume. A creative director might need a bold, visually striking layout, while a corporate lawyer should stick to something more traditional and streamlined. Our tool offers three distinct styles:
          </p>
          <ul>
            <li style={{ marginBottom: '10px' }}><strong>Modern:</strong> Best for tech, startup, and creative roles. Uses subtle color accents and a clean two-column layout.</li>
            <li style={{ marginBottom: '10px' }}><strong>Professional:</strong> The gold standard for corporate, legal, and executive positions. Focuses on clarity and hierarchy.</li>
            <li><strong>Creative:</strong> For those who want to make a statement. Features a sidebar and unique typography to showcase personality.</li>
          </ul>

          <h3>2. Optimizing for ATS (Applicant Tracking Systems)</h3>
          <p>
            Most medium to large companies use software to scan resumes for keywords before a human even sees them. To ensure your CV passes the &quot;bot test,&quot; you must use standard headings (like &quot;Experience&quot; and &quot;Education&quot;) and include relevant industry keywords. Our templates are pre-formatted to be ATS-friendly, ensuring your data is easily parsed by recruitment software.
          </p>

          <h3>3. Writing a Compelling Professional Summary</h3>
          <p>
            The summary is your &quot;elevator pitch.&quot; Instead of a generic objective statement, focus on your achievements and the value you bring. Use the <strong>Professional Summary</strong> section of our builder to highlight your years of experience, key specializations, and your most significant career win. Keep it between 3-5 sentences for maximum impact.
          </p>

          <h3>4. Quantifying Your Achievements</h3>
          <p>
            Recruiters love numbers. Instead of saying you &quot;managed a team,&quot; say you &quot;managed a team of 12 and increased productivity by 25% over 12 months.&quot; When filling out the <strong>Work Experience</strong> section in our CV maker, try to include metrics, percentages, and dollar amounts wherever possible to provide concrete proof of your success.
          </p>

          <h3>5. The Importance of Skills</h3>
          <p>
            The skills section is a quick reference for recruiters to see if you have the technical stack required for the role. In 2026, soft skills like &quot;Emotional Intelligence&quot; and &quot;Adaptability&quot; are just as important as technical skills like &quot;React&quot; or &quot;SQL.&quot; Use our tagging system to list your core competencies clearly.
          </p>

          <div className="glass-panel" style={{ padding: '30px', margin: '40px 0', borderLeft: '4px solid var(--accent)' }}>
            <h4 style={{ marginTop: 0 }}>Pro Tip: Customize for Every Job</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Never send the exact same CV to two different companies. Use our CV Maker to quickly tweak your professional summary and skills for each specific job description. This small effort significantly increases your chances of getting an interview.
            </p>
          </div>

          <h3>Why Use Our Free CV Builder?</h3>
          <p>
            Unlike other platforms that hide your download behind a paywall, our <strong>Free Online CV Maker</strong> provides a high-quality PDF export without any hidden fees. We believe that everyone deserves a professional-looking resume to help them land their dream job. Our tool is optimized for 2026 standards, ensuring your layout remains consistent across all devices and print formats.
          </p>

          <p>
            <em>Start building your professional future today. Simply fill in your details, choose a template, and download your recruiter-ready CV in seconds.</em>
          </p>
        </article>
      </div>
    </div>
  );
}
