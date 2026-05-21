"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send, CheckCircle2 } from 'lucide-react';
export default function ContactUs() {

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="content-container" style={{ padding: '80px 24px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '40px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Mail size={32} color="var(--accent)" />
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ margin: 0 }}>Contact Us</h1>
          </div>

          <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', marginBottom: '40px', lineHeight: 1.6 }}>
            Have a suggestion for a new tool? Found a bug? Or just want to say hi? Reach out to us and we&apos;ll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', background: 'rgba(50, 215, 75, 0.05)', borderColor: 'var(--success)' }}>
              <CheckCircle2 size={48} color="var(--success)" style={{ marginBottom: '16px' }} />
              <h2 style={{ marginBottom: '8px' }}>Message Received!</h2>
              <p style={{ color: 'var(--muted)' }}>Thank you for reaching out. Our team has been notified.</p>
              <button className="premium-button" onClick={() => setSubmitted(false)} style={{ marginTop: '24px' }}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label className="label-text">Your Name</label>
                  <input type="text" className="input-field" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="label-text">Email Address</label>
                  <input type="email" className="input-field" placeholder="john@example.com" required />
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label className="label-text">Message</label>
                <textarea className="input-field" placeholder="How can we help you?" style={{ height: '150px', resize: 'none' }} required></textarea>
              </div>

              <button type="submit" className="premium-button" style={{ width: '100%', fontSize: '18px' }} disabled={sending}>
                {sending ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </button>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '16px', textAlign: 'center' }}>
                By submitting, you agree to our{' '}
                <Link href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

