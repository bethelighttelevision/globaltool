"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Car, Calculator as CalcIcon } from 'lucide-react';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';

export default function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(60); // months

  const calculateEMI = () => {
    const loanAmount = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return isNaN(emi) ? 0 : emi;
  };

  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * loanTerm;
  const totalInterest = totalPayment - (carPrice - downPayment);

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="Professional Car Loan EMI Calculator" 
        description="Calculate your monthly car loan payments (EMI), total interest, and total cost with our free car finance tool. Plan your auto loan smarter." 
        url="https://toolsnappy.com/car-loan-calculator" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="glass-panel animate-slide-up" style={{ padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '20px', marginBottom: '24px' }}>
            <Car size={40} color="#32d74b" />
          </div>
          <h1 className="gradient-text text-3xl sm:text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px', letterSpacing: '-0.02em' }}>Car Loan EMI Calculator</h1>
          <p className="text-base sm:text-lg" style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Plan your vehicle purchase with our professional finance tool. Calculate monthly installments and interest instantly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          <div className="glass-panel" style={{ padding: '32px', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CalcIcon size={20} color="#32d74b" /> Loan Details
            </h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Car Price ($)</label>
              <input 
                type="number" 
                value={carPrice} 
                onChange={(e) => setCarPrice(Number(e.target.value))}
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
                  step="0.1"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="premium-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--muted)', fontSize: '14px' }}>Loan Term (Months)</label>
                <input 
                  type="number" 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="premium-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '32px', textAlign: 'center', background: 'rgba(50, 215, 75, 0.05)', border: '1px solid rgba(50, 215, 75, 0.2)' }}>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>MONTHLY PAYMENT (EMI)</p>
              <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: '#32d74b' }}>${monthlyEMI.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>TOTAL INTEREST</p>
                <h4 style={{ fontSize: '20px' }}>${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
              </div>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '4px' }}>TOTAL PAYMENT</p>
                <h4 style={{ fontSize: '20px' }}>${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Comprehensive Car Loan EMI Calculator Guide</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Financing a vehicle is one of the most significant financial decisions for many households. Our professional <strong>Car Loan EMI Calculator</strong> is designed to provide you with transparency and clarity before you visit a dealership. By understanding the components of your monthly payment—principal and interest—you can negotiate better terms and choose a car that fits your budget.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Key Components of an Auto Loan</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '32px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Vehicle Price:</strong> The total cost of the car, including taxes and dealer fees.</li>
            <li style={{ marginBottom: '12px' }}><strong>Down Payment:</strong> The upfront amount you pay. A higher down payment reduces your loan amount and monthly EMI.</li>
            <li style={{ marginBottom: '12px' }}><strong>Interest Rate (APR):</strong> The cost of borrowing money. Even a 1% difference can save thousands over several years.</li>
            <li style={{ marginBottom: '12px' }}><strong>Loan Tenure:</strong> The duration of the loan. While longer terms lower your monthly payment, they increase total interest paid.</li>
          </ul>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Save Money on Your Car Loan</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            To get the best deal, try to keep your loan term under 60 months and put down at least 20% of the car&apos;s value. This reduces the risk of &quot;negative equity,&quot; where you owe more on the car than it is worth. Use our calculator to experiment with different down payment amounts to see how much interest you can save over time.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      
      <RelatedTools currentPath="/car-loan-calculator" />
    </div>
  );
}
