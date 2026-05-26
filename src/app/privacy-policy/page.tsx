"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
export default function PrivacyPolicy() {

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
          <p>Last Updated: May 26, 2026</p>

          <h2>1. Introduction</h2>
          <p>Welcome to ToolSnappy (toolsnappy.com). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

          <h2>2. Data Controller</h2>
          <p>ToolSnappy is operated by an individual creator. If you have any questions about this policy, please contact us at contact@toolsnappy.com.</p>

          <h2>3. Information We Collect</h2>
          <p><strong>Automatically Collected Data:</strong> When you visit our site, we may automatically collect certain information including your IP address, browser type and version, operating system, referring URLs, pages viewed, and the dates/times of your visits. This data is collected via cookies and similar tracking technologies.</p>
          <p><strong>Tool Usage Data:</strong> Our tools process data locally in your browser. We do not upload, store, or retain any files, text, or images you process using our tools. All processing happens client-side unless explicitly stated otherwise.</p>
          <p><strong>Contact Form Data:</strong> If you contact us via our form, we collect your name, email address, and message. This data is used solely to respond to your inquiry and is retained for up to 12 months.</p>

          <h2>4. Google Analytics</h2>
          <p>We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information such as how often users visit, what pages they visit, and what other sites they used prior to coming to our site. We use this data to improve our content and user experience. Google Analytics collects only the IP address assigned to you on the date you visit, not your name or identifying information. We do not combine the information collected through Google Analytics with personally identifiable information. Google's ability to use and share information collected by Google Analytics is restricted by the Google Analytics Terms of Use and the Google Privacy Policy. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.</p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic site functionality and security.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site via Google Analytics.</li>
            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve personalized ads based on your browsing history and interests.</li>
          </ul>
          <p>You can control cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking certain cookies may affect site functionality.</p>

          <h2>6. Third-Party Advertising (Google AdSense)</h2>
          <p>We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites on the internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites. You may opt out of personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads. Alternatively, you can opt out of third-party vendor cookies by visiting the Network Advertising Initiative opt-out page at https://optout.networkadvertising.org.</p>

          <h2>7. Google AdSense & Personalized Ads</h2>
          <p>We display ads through Google AdSense. AdSense may use cookies to serve more relevant ads across the web and limit how often a given ad is shown to you. We have implemented Google AdSense on our site. As part of Google AdSense, we and third-party vendors, including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) together to inform, optimize, and serve ads based on your past visits to our website. You can opt out of the use of the DoubleClick cookie for interest-based advertising by visiting the Ads Preference Manager at https://www.google.com/ads/preferences.</p>

          <h2>8. Your Privacy Rights (GDPR)</h2>
          <p>If you are a resident of the European Economic Area (EEA), you have the following data protection rights:</p>
          <ul>
            <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data.</li>
            <li><strong>Right to Erasure:</strong> You can request deletion of your personal data under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You can request restriction of processing your data.</li>
            <li><strong>Right to Data Portability:</strong> You can request transfer of your data to another organization.</li>
            <li><strong>Right to Object:</strong> You can object to processing of your personal data.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at contact@toolsnappy.com. We will respond to your request within 30 days.</p>

          <h2>9. Your Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
          <ul>
            <li><strong>Right to Know:</strong> You can request disclosure of the categories and specific pieces of personal data we have collected about you.</li>
            <li><strong>Right to Delete:</strong> You can request deletion of personal data we have collected from you.</li>
            <li><strong>Right to Opt-Out:</strong> You can opt out of the sale of your personal data. We do not sell personal data.</li>
            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
          </ul>
          <p>To exercise your CCPA rights, please contact us at contact@toolsnappy.com.</p>

          <h2>10. Data Retention</h2>
          <p>We retain automatically collected data (analytics and advertising data) for up to 26 months. Contact form submissions are retained for up to 12 months. We delete or anonymize data when it is no longer needed for the purposes described in this policy.</p>

          <h2>11. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your data. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>

          <h2>12. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies.</p>

          <h2>13. Children Privacy</h2>
          <p>Our services are not directed to children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately.</p>

          <h2>14. Changes to This Policy</h2>
          <p>We may update this privacy policy periodically. Changes will be posted on this page with an updated date. We encourage you to review this policy regularly.</p>

          <h2>15. Contact</h2>
          <p>For questions about this privacy policy or to exercise your data rights, contact us at:</p>
          <p>Email: contact@toolsnappy.com</p>
          <p>Website: https://www.toolsnappy.com/contact</p>
        </div>
      </div>
    </div>
  );
}

