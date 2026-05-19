"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Calculator as CalcIcon } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30); // years

  const calculateMonthlyPayment = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - (homePrice - downPayment);

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Professional Mortgage & Home Loan Calculator" 
        description="Plan your dream home with our advanced Mortgage Calculator. Calculate monthly payments, interest rates, and total loan costs instantly." 
        url="https://toolsnappy.com/mortgage-calculator" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
            <Home size={40} color="#32d74b" />
          </div>
          <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Mortgage Calculator</h1>
          <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Estimate your monthly mortgage payments and explore different financing scenarios for your next home.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          <div className="glass-panel" style={{ padding: '32px', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CalcIcon size={20} color="#32d74b" /> Property Details
            </h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Home Price ($)</label>
              <input 
                type="number" 
                value={homePrice} 
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="premium-input"
                style={{ width: '100%', fontSize: '18px' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Down Payment ($)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="premium-input"
                style={{ width: '100%', fontSize: '18px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Interest Rate (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="premium-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Loan Term (Years)</label>
                <select 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="premium-input"
                  style={{ width: '100%', background: '#000', color: '#fff', border: '1px solid var(--card-border)' }}
                >
                  <option value={30} style={{ background: '#000' }}>30 Years</option>
                  <option value={20} style={{ background: '#000' }}>20 Years</option>
                  <option value={15} style={{ background: '#000' }}>15 Years</option>
                  <option value={10} style={{ background: '#000' }}>10 Years</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '32px', textAlign: 'center', background: 'rgba(50, 215, 75, 0.05)', border: '1px solid rgba(50, 215, 75, 0.2)' }}>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>MONTHLY REPAYMENT</p>
              <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: '#32d74b' }}>${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>TOTAL INTEREST</p>
                <h4 style={{ fontSize: '20px' }}>${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
              </div>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>TOTAL COST</p>
                <h4 style={{ fontSize: '20px' }}>${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Mastering Your Home Financing with Our Mortgage Calculator</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Buying a home is likely the largest financial commitment you will ever make. Our <strong>Professional Mortgage Calculator</strong> empowers you to enter negotiations with banks and lenders from a position of knowledge. By adjusting the interest rate and down payment, you can see exactly how much house you can afford without stretching your finances to the breaking point.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>What Makes Up Your Monthly Mortgage Payment?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A standard mortgage payment consists of four main elements, often referred to as PITI: Principal, Interest, Taxes, and Insurance. While our calculator focuses on the Principal and Interest (P&amp;I), it provides the foundational data you need to estimate your total housing budget.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tips for Getting a Lower Interest Rate</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Improve Your Credit Score:</strong> A higher score often qualifies you for the lowest market rates.</li>
            <li style={{ marginBottom: '12px' }}><strong>Larger Down Payment:</strong> Aim for 20% to avoid Private Mortgage Insurance (PMI) costs.</li>
            <li style={{ marginBottom: '12px' }}><strong>Shop Around:</strong> Compare rates from traditional banks and online mortgage lenders.</li>
          </ul>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      
      <RelatedTools currentPath="/mortgage-calculator" />
    </div>
  );
}
