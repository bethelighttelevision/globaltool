"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
export default function TermsOfService() {

  return (
    <div className="content-container" style={{ padding: '80px 24px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <FileText size={32} color="var(--accent)" />
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ margin: 0 }}>Terms of Service</h1>
        </div>

        <div className="article-content">
          <p>Last Updated: May 26, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using ToolSnappy, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily use the tools on ToolSnappy for personal, non-commercial transitory viewing only. You may not modify, copy, or redistribute the underlying code of these tools without explicit permission.</p>

          <h2>3. Disclaimer</h2>
          <p>The materials on ToolSnappy are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2>4. Financial Disclaimer</h2>
          <p>ToolSnappy provides financial calculators, tax estimators, salary calculators, retirement calculators, and crypto profit tools for informational and educational purposes only. They are not intended as financial, tax, investment, or legal advice. You should consult a qualified professional for advice specific to your situation. Results from these tools are estimates and should not be relied upon for making financial decisions. We make no guarantees regarding the accuracy, completeness, or timeliness of the calculations.</p>

          <h2>5. AI Content Disclaimer</h2>
          <p>ToolSnappy offers tools that assist with text refinement and content improvement. Output from these tools should be reviewed and edited by a human before publication. We make no claims about the originality, accuracy, or suitability of generated content. Users are responsible for verifying all content produced using our tools.</p>

          <h2>6. Limitations</h2>
          <p>In no event shall ToolSnappy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on our website.</p>

          <h2>7. Third-Party Content</h2>
          <p>Our tools may display data or links from third-party sources. We do not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services.</p>

          <h2>8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
}

