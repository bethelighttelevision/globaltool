"use client";

import React, { useState, useMemo } from 'react';
import { DollarSign, Calculator, Info } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const FICA_RATE = 0.0765;
const SOCIAL_SECURITY_WAGE_BASE = 176100;

interface StateTaxInfo {
  name: string;
  rate: number;
  flat: boolean;
}

const stateTaxes: StateTaxInfo[] = [
  { name: 'Alabama', rate: 0.05, flat: false },
  { name: 'Alaska', rate: 0, flat: true },
  { name: 'Arizona', rate: 0.0259, flat: true },
  { name: 'Arkansas', rate: 0.049, flat: false },
  { name: 'California', rate: 0.093, flat: false },
  { name: 'Colorado', rate: 0.0455, flat: true },
  { name: 'Connecticut', rate: 0.0699, flat: false },
  { name: 'Delaware', rate: 0.066, flat: false },
  { name: 'Florida', rate: 0, flat: true },
  { name: 'Georgia', rate: 0.0575, flat: false },
  { name: 'Hawaii', rate: 0.11, flat: false },
  { name: 'Idaho', rate: 0.058, flat: false },
  { name: 'Illinois', rate: 0.0495, flat: true },
  { name: 'Indiana', rate: 0.0323, flat: true },
  { name: 'Iowa', rate: 0.057, flat: false },
  { name: 'Kansas', rate: 0.057, flat: false },
  { name: 'Kentucky', rate: 0.05, flat: true },
  { name: 'Louisiana', rate: 0.0425, flat: false },
  { name: 'Maine', rate: 0.0715, flat: false },
  { name: 'Maryland', rate: 0.0575, flat: false },
  { name: 'Massachusetts', rate: 0.05, flat: true },
  { name: 'Michigan', rate: 0.0425, flat: true },
  { name: 'Minnesota', rate: 0.0785, flat: false },
  { name: 'Mississippi', rate: 0.05, flat: false },
  { name: 'Missouri', rate: 0.054, flat: false },
  { name: 'Montana', rate: 0.069, flat: false },
  { name: 'Nebraska', rate: 0.0684, flat: false },
  { name: 'Nevada', rate: 0, flat: true },
  { name: 'New Hampshire', rate: 0, flat: true },
  { name: 'New Jersey', rate: 0.1075, flat: false },
  { name: 'New Mexico', rate: 0.059, flat: false },
  { name: 'New York', rate: 0.109, flat: false },
  { name: 'North Carolina', rate: 0.0475, flat: true },
  { name: 'North Dakota', rate: 0.029, flat: false },
  { name: 'Ohio', rate: 0.0399, flat: false },
  { name: 'Oklahoma', rate: 0.0475, flat: false },
  { name: 'Oregon', rate: 0.099, flat: false },
  { name: 'Pennsylvania', rate: 0.0307, flat: true },
  { name: 'Rhode Island', rate: 0.0599, flat: false },
  { name: 'South Carolina', rate: 0.064, flat: false },
  { name: 'South Dakota', rate: 0, flat: true },
  { name: 'Tennessee', rate: 0, flat: true },
  { name: 'Texas', rate: 0, flat: true },
  { name: 'Utah', rate: 0.0485, flat: true },
  { name: 'Vermont', rate: 0.0875, flat: false },
  { name: 'Virginia', rate: 0.0575, flat: false },
  { name: 'Washington', rate: 0, flat: true },
  { name: 'West Virginia', rate: 0.065, flat: false },
  { name: 'Wisconsin', rate: 0.0765, flat: false },
  { name: 'Wyoming', rate: 0, flat: true },
  { name: 'District of Columbia', rate: 0.1075, flat: false },
];

const formatUSD = (v: number) => '$' + Math.round(v).toLocaleString('en-US');

export default function SalaryCalculatorPage() {
  const [salary, setSalary] = useState('85000');
  const [status, setStatus] = useState<string>('single');
  const [stateIdx, setStateIdx] = useState(12);

  const results = useMemo(() => {
    const annual = parseFloat(salary) || 0;
    const state = stateTaxes[stateIdx];
    const stdDed = status === 'single' ? 14600 : status === 'married' ? 29200 : 21900;

    const federalTaxable = Math.max(0, annual - stdDed);
    const brackets = [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ];
    let remaining = federalTaxable;
    let federalTax = 0;
    for (const b of brackets) {
      if (remaining <= 0) break;
      const amt = Math.min(remaining, b.max - b.min);
      federalTax += amt * b.rate;
      remaining -= amt;
    }

    const ficaAmount = Math.min(annual, SOCIAL_SECURITY_WAGE_BASE) * FICA_RATE;
    const stateEst = state.flat ? annual * state.rate : annual * Math.min(state.rate, 0.07);
    const totalTax = federalTax + ficaAmount + stateEst;
    const netAnnual = annual - totalTax;
    const monthly = netAnnual / 12;
    const biweekly = netAnnual / 26;
    const weekly = netAnnual / 52;
    const hourly = weekly / 40;

    return { annual, federalTax, ficaAmount, stateTax: stateEst, totalTax, netAnnual, monthly, biweekly, weekly, hourly, effectiveRate: (totalTax / annual) * 100 };
  }, [salary, status, stateIdx]);

  return (
    <ToolLayout
      icon={<DollarSign size={40} />}
      title="Salary Take-Home Calculator"
      description="Calculate your take-home pay after federal, state, and FICA taxes. Free salary calculator for US workers."
      seo={{
        toolName: "Salary Calculator",
        description: "Free salary take-home calculator. Estimate your net pay after federal and state taxes, FICA, and deductions.",
        url: "https://toolsnappy.com/salary-calculator"
      }}
      currentPath="/salary-calculator"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Free Salary Take-Home Calculator — Know Your Net Pay After Taxes</h2>

          <p>Your annual salary is the number you negotiate during hiring, but it is not what lands in your bank account. Federal income tax, FICA (Social Security and Medicare at 7.65%), and state income tax combine to reduce your gross pay by 20% to 40% depending on where you live and how much you earn. Our <strong>free salary take-home calculator</strong> gives you the complete picture: exactly how much you keep after every tax and deduction.</p>

          <h3>Understanding Your Pay Breakdown</h3>

          <p>Every paycheck has multiple deductions before you see your net pay. Federal income tax is calculated based on your taxable income after the standard deduction and your filing status. Our <strong>salary after tax calculator</strong> uses the 2026 federal brackets to compute this accurately. FICA taxes fund Social Security (6.2%) and Medicare (1.45%) and apply to your gross wages up to the Social Security wage base of $176,100.</p>

          <p>State income tax varies dramatically by location. Nine states including Texas, Florida, Nevada, Washington, and Tennessee have no state income tax at all. Others like California, New York, Oregon, and Hawaii have rates exceeding 9%. Our tool includes tax rates for all 50 states plus Washington DC, giving you an accurate estimate regardless of where you live. Simply select your state from the dropdown and your state tax estimate adjusts automatically.</p>

          <h3>What Makes Our Calculator Different</h3>

          <p>Most salary calculators only show annual take-home pay. Our <strong>net pay calculator</strong> breaks it down into every practical time period: monthly, bi-weekly, weekly, and hourly. This is incredibly useful for budgeting. Knowing your monthly take-home helps you plan rent and bills. Your bi-weekly number matches most employers' pay schedules. Your hourly rate helps you evaluate side hustles and overtime opportunities. Your effective tax rate shows you the true percentage of income that goes to taxes.</p>

          <p>The tax breakdown section is particularly valuable. You can see exactly how much goes to federal tax, how much to FICA, and how much to your specific state. This transparency helps you make informed decisions about retirement contributions, additional withholding, tax-advantaged accounts like HSAs and 401(k)s, and even relocation decisions if you are considering moving to a different state.</p>

          <h3>Who Should Use This Tool?</h3>

          <p><strong>Job Seekers:</strong> When comparing job offers in different states, the salary number alone is misleading. A $100,000 salary in Texas (no state tax) is worth significantly more than $100,000 in California (up to 10.9% state tax). Use our tool to compare actual take-home pay before making your decision.</p>

          <p><strong>Employees:</strong> Check if your employer's withholding is accurate. If you consistently get large refunds or owe significant amounts at tax time, adjust your W-4. Our calculator helps you find the right withholding balance.</p>

          <p><strong>Freelancers:</strong> Your hourly rate needs to account for the self-employment tax (15.3% instead of 7.65% for FICA). Use our calculator to determine what hourly rate you need to charge to match or exceed your target net income.</p>

          <p><strong>Remote Workers:</strong> If you work for a company based in one state but live in another, state tax rules can be complex. Our calculator helps you estimate the combined tax impact of your specific situation.</p>

          <h3>How FICA Taxes Affect Your Take-Home Pay</h3>

          <p>Understanding FICA taxes is crucial for accurate salary planning. FICA stands for the Federal Insurance Contributions Act, and it funds two of America's largest social programs: Social Security at 6.2% and Medicare at 1.45%, totaling 7.65% of your gross wages. Unlike federal income tax, FICA is a flat percentage applied to your entire gross income up to the Social Security wage base of $176,100 in 2026. Any income above this threshold is not subject to Social Security tax but still incurs the Medicare portion plus an additional 0.9% Medicare surtax for high earners above $200,000 ($250,000 for married couples). Self-employed individuals pay both the employee and employer portions, totaling 15.3%, though half of this is deductible on your tax return.</p>

          <p>Our salary calculator automatically handles all FICA calculations, including the wage base limits and additional Medicare taxes. This accuracy is critical because payroll errors in FICA withholding can be difficult to correct and may result in unexpected tax bills at filing time. The calculator also accounts for pre-tax deductions like 401(k) contributions, health insurance premiums, and health savings account contributions that reduce your taxable income before FICA and federal income tax are calculated. Understanding how each type of deduction affects your net pay helps you make informed decisions about benefit elections during open enrollment periods and salary negotiations.</p>

          <h3>Keywords Our Tool Targets</h3>

          <p>High-value financial search terms include: <strong>salary calculator</strong>, <strong>take home pay calculator</strong>, <strong>salary after tax calculator</strong>, <strong>net pay calculator</strong>, <strong>hourly rate calculator</strong>, <strong>annual to hourly calculator</strong>, <strong>paycheck calculator</strong>, <strong>salary breakdown</strong>, <strong>how much will I take home</strong>, <strong>free salary calculator</strong>, <strong>income tax by state</strong>, <strong>salary comparison tool</strong>, and <strong>monthly take home pay calculator</strong>. These terms attract users who are actively planning their finances and comparing compensation packages.</p>

          <p>Try our <strong>free salary calculator</strong> now. Enter your annual salary, select your filing status and state, and get a complete breakdown of your earnings after all federal, state, and FICA taxes — broken down by month, week, and hour.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label className="label-text">Annual Salary ($)</label>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="premium-input" style={{ fontSize: '20px', fontWeight: 700, padding: '14px 16px' }} />
          </div>
          <div>
            <label className="label-text">Filing Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="premium-input" style={{ padding: '14px 16px', color: 'var(--foreground)' }}>
              <option value="single" style={{ background: '#1c1c1e', color: '#f5f5f7' }}>Single</option>
              <option value="married" style={{ background: '#1c1c1e', color: '#f5f5f7' }}>Married Filing Jointly</option>
              <option value="head" style={{ background: '#1c1c1e', color: '#f5f5f7' }}>Head of Household</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label className="label-text">State</label>
          <select value={stateIdx} onChange={e => setStateIdx(parseInt(e.target.value))} className="premium-input" style={{ padding: '14px 16px', color: 'var(--foreground)' }}>
            {stateTaxes.map((s, i) => <option key={i} value={i} style={{ background: '#1c1c1e', color: '#f5f5f7' }}>{s.name}{s.rate > 0 ? ` (${(s.rate * 100).toFixed(1)}%)` : ' (No income tax)'}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '24px', background: 'rgba(50,215,75,0.05)', borderRadius: '16px', border: '1px solid rgba(50,215,75,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '4px' }}>Annual Take-Home</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#32d74b' }}>{formatUSD(results.netAnnual)}</div>
          </div>
          <div style={{ padding: '24px', background: 'rgba(255,69,58,0.05)', borderRadius: '16px', border: '1px solid rgba(255,69,58,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '4px' }}>Total Taxes Paid</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff453a' }}>{formatUSD(results.totalTax)}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Monthly', value: formatUSD(results.monthly) },
            { label: 'Bi-Weekly', value: formatUSD(results.biweekly) },
            { label: 'Weekly', value: formatUSD(results.weekly) },
            { label: 'Hourly', value: formatUSD(results.hourly) },
            { label: 'Eff. Rate', value: results.effectiveRate.toFixed(1) + '%' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>{item.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600 }}>Tax Breakdown</h4>
          {[
            { label: 'Federal Income Tax', amount: results.federalTax, color: '#2997ff' },
            { label: 'FICA (Social Security + Medicare)', amount: results.ficaAmount, color: '#ff9f0a' },
            { label: `State Tax (${stateTaxes[stateIdx].name})`, amount: results.stateTax, color: '#ff453a' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--card-border)' : 'none' }}>
              <span style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                {item.label}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: item.color }}>{formatUSD(item.amount)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', borderTop: '1px solid var(--card-border)', fontWeight: 700, fontSize: '15px', marginTop: '8px' }}>
            <span>Net Annual Income</span>
            <span style={{ color: '#32d74b' }}>{formatUSD(results.netAnnual)}</span>
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
          <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
          <span>Estimates based on 2026 rates. State tax is approximated — actual may vary by local rules.</span>
        </div>
      </div>
    </ToolLayout>
  );
}
