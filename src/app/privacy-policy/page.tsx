"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function PrivacyPolicy() {
  usePageMeta("Privacy Policy | ToolSnappy", "ToolSnappy privacy policy. Learn how we collect, use, and protect your personal data. We respect your privacy and comply with Google AdSense policies.");
  return (
    <div className="content-container" style={{ padding: '80px 24px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Shield size={32} color="var(--accent)" />
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ margin: 0 }}>Privacy Policy</h1>
        </div>
        
        <div className="article-content">
          <p>Last Updated: May 14, 2026</p>
          
          <h2>1. Introduction</h2>
          <p>Welcome to ToolSnappy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>

          <h2>2. Information We Collect</h2>
          <p>We do not require user accounts or store personal data like names or email addresses for the usage of our tools. However, we may collect certain information automatically when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics.</p>

          <h2>3. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. These are used primarily for Google AdSense to serve personalized ads based on your previous visits.</p>

          <h2>4. Third-Party Advertising</h2>
          <p>We use third-party advertising companies to serve ads when you visit the Website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>

          <h2>5. Data Security</h2>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

          <h2>6. Updates to This Policy</h2>
          <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible.</p>
        </div>
      </div>
    </div>
  );
}
