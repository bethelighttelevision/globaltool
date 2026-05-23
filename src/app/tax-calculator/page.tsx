"use client";

import React, { useState, useMemo } from 'react';
import { DollarSign, Calculator, Info } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const STANDARD_DEDUCTION: Record<string, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

const TAX_BRACKETS_2026: Record<string, { min: number; max: number; rate: number }[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

function calculateTax(taxableIncome: number, status: string): { brackets: { amount: number; rate: number; tax: number }[]; totalTax: number } {
  const brackets = TAX_BRACKETS_2026[status] || TAX_BRACKETS_2026.single;
  let remaining = taxableIncome;
  const details: { amount: number; rate: number; tax: number }[] = [];
  let totalTax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
    const tax = taxableInBracket * bracket.rate;
    if (taxableInBracket > 0) {
      details.push({ amount: taxableInBracket, rate: bracket.rate, tax });
    }
    totalTax += tax;
    remaining -= taxableInBracket;
  }

  return { brackets: details, totalTax };
}

const formatUSD = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState('75000');
  const [status, setStatus] = useState<string>('single');
  const [deductions, setDeductions] = useState('0');

  const result = useMemo(() => {
    const gross = parseFloat(income) || 0;
    const extraDed = parseFloat(deductions) || 0;
    const stdDed = STANDARD_DEDUCTION[status] || STANDARD_DEDUCTION.single;
    const totalDed = stdDed + extraDed;
    const taxable = Math.max(0, gross - totalDed);
    const { brackets, totalTax } = calculateTax(taxable, status);
    const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
    const marginalRate = brackets.length > 0 ? brackets[brackets.length - 1].rate * 100 : 0;
    const afterTax = gross - totalTax;
    const monthlyTakeHome = afterTax / 12;
    return { gross, stdDed, extraDed, totalDed, taxable, brackets, totalTax, effectiveRate, marginalRate, afterTax, monthlyTakeHome };
  }, [income, status, deductions]);

  return (
    <ToolLayout
      icon={<Calculator size={40} />}
      title="US Tax Calculator 2026"
      description="Estimate your 2026 federal income taxes. Free tax calculator for US taxpayers."
      seo={{
        toolName: "US Tax Calculator 2026",
        description: "Free 2026 US income tax calculator. Estimate your federal tax refund, effective rate, and take-home pay.",
        url: "https://toolsnappy.com/tax-calculator"
      }}
      currentPath="/tax-calculator"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Free US Tax Calculator 2026 — Estimate Your Federal Income Tax</h2>

          <p>Tax season in the United States is stressful for millions of Americans. Understanding your tax liability before you file helps you plan your finances, adjust your withholding, and avoid surprises in April. Our <strong>free US tax calculator 2026</strong> gives you an instant estimate of your federal income tax based on the latest IRS tax brackets, standard deductions, and filing statuses. Whether you are a W-2 employee, freelancer, or small business owner, this tool helps you understand exactly what you owe.</p>

          <h3>2026 Federal Tax Brackets</h3>

          <p>The IRS adjusts tax brackets annually for inflation. Our calculator uses the official 2026 tax brackets for all filing statuses. For single filers, the rates start at 10% for income up to $11,600 and progress through 12%, 22%, 24%, 32%, 35%, and 37% for the highest earners. Married couples filing jointly benefit from wider brackets — double the single-filer thresholds — which can significantly reduce their effective tax rate. Head of household filers fall somewhere in between, with brackets designed to provide tax relief for single parents and caregivers.</p>

          <p>The standard deduction for 2026 is $14,600 for single filers, $29,200 for married couples filing jointly, and $21,900 for head of household. This deduction reduces your taxable income before any brackets are applied. Our <strong>income tax calculator</strong> handles all these calculations automatically, showing you exactly how much of your income falls into each bracket and the tax owed at each level.</p>

          <h3>Understanding Your Tax Calculation</h3>

          <p>Our <strong>federal tax calculator</strong> shows you five critical numbers. Your gross income is the starting point. Your standard deduction reduces this to your taxable income. The brackets then calculate your total tax, which appears in red. Your effective tax rate is your total tax divided by your gross income — this is your actual tax burden expressed as a percentage. Your marginal rate is the highest bracket your income reaches, which determines the tax impact of earning additional income. And your monthly take-home pay shows what your salary is worth after federal taxes.</p>

          <p>The bracket-by-bracket breakdown is particularly useful. You can see exactly how much income is taxed at each rate, from the 10% bracket all the way up. This transparency helps you understand the progressive nature of the US tax system and plan strategies like additional deductions or retirement contributions to lower your taxable income.</p>

          <h3>Who Benefits From This Tool?</h3>

          <p><strong>Employees:</strong> Check your withholding throughout the year. If our calculator shows you will owe significantly more or less than last year, adjust your W-4 with your employer to avoid a large bill or refund at tax time.</p>

          <p><strong>Freelancers and Gig Workers:</strong> If you receive 1099 income, you are responsible for paying estimated quarterly taxes. Our <strong>2026 tax calculator</strong> helps you estimate what you need to set aside from each payment to cover your federal tax obligation.</p>

          <p><strong>Home Buyers and Real Estate Investors:</strong> Understanding how mortgage interest, property taxes, and other deductions affect your tax situation helps you make better financial decisions. Our tool includes additional deductions so you can model different scenarios.</p>

          <p><strong>Retirees:</strong> If you are drawing from retirement accounts, understanding how withdrawals are taxed helps you plan your distributions strategically to minimize your overall tax burden.</p>

          <h3>How to Use Your Tax Calculator Results for Financial Planning</h3>

          <p>Once you have your estimated tax liability from our 2026 calculator, you can take several practical actions to optimize your financial situation. If the calculator shows you will owe a significant amount at tax time, consider increasing your withholding by submitting a new W-4 form to your employer. Requesting an additional $50 or $100 withheld from each paycheck can prevent a large April surprise and help you avoid underpayment penalties from the IRS. Conversely, if you consistently receive large refunds exceeding $2,000, you are effectively giving the government an interest-free loan. Adjust your withholding to keep more money in your pocket throughout the year, directing the difference into a high-yield savings account where it can earn interest.</p>

          <p>For freelancers and self-employed individuals, our calculator is an essential tool for quarterly estimated tax planning. The IRS requires taxpayers with significant self-employment income to pay estimated taxes quarterly using Form 1040-ES. Use our calculator to project your annual liability, divide by four, and submit your quarterly payments on time to avoid penalties and interest charges. Many freelancers find it helpful to set aside twenty-five to thirty percent of each client payment in a separate savings account dedicated to tax obligations. Our calculator&rsquo;s additional deductions field lets you model the impact of business expenses, home office deductions, and health insurance premiums on your overall tax burden, helping you maximize legitimate deductions while maintaining accurate records for tax filing season.</p>

          <p>Retirement planning directly intersects with tax planning in powerful ways. Contributions to traditional 401(k) and IRA accounts reduce your current taxable income, potentially dropping you into a lower tax bracket. Our calculator helps you model the tax savings from different contribution levels. For example, contributing the maximum $23,000 to a 401(k) in 2026 could save you over $5,000 in federal taxes if you are in the 24% bracket. Roth IRA and Roth 401(k) contributions do not provide immediate tax deductions but grow tax-free for retirement withdrawals. Use our calculator to compare the immediate tax impact of traditional versus Roth contributions and determine which strategy aligns better with your current income level and long-term retirement goals.</p>

          <h3>Important Disclaimer</h3>

          <p>This calculator provides estimates based on 2026 federal tax brackets and standard deductions only. State income taxes are not included. Individual situations vary based on credits, itemized deductions, investment income, business structures, and other factors. For personalized tax advice, consult a qualified tax professional or CPA.</p>

          <h3>Keywords for Tax-Related Searches</h3>

          <p>Our tool targets high-value financial keywords: <strong>tax calculator 2026</strong>, <strong>free tax calculator</strong>, <strong>federal tax calculator</strong>, <strong>income tax estimator</strong>, <strong>tax brackets 2026</strong>, <strong>how much tax will I pay</strong>, <strong>effective tax rate calculator</strong>, <strong>irs tax calculator</strong>, <strong>paycheck tax calculator</strong>, <strong>annual tax calculator</strong>, <strong>us income tax calculator</strong>, <strong>standard deduction 2026</strong>, and <strong>marginal tax rate calculator</strong>. These search terms attract users actively planning their finances and looking for reliable, free tax estimation tools.</p>

          <p>Use our <strong>free US tax calculator 2026</strong> now. Enter your annual income, select your filing status, and add any additional deductions to see a complete breakdown of your estimated federal tax liability, effective rate, and monthly take-home pay.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {['single', 'married', 'head'].map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '14px', borderRadius: '12px', cursor: 'pointer',
                background: status === s ? 'rgba(41,151,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${status === s ? 'var(--accent)' : 'var(--card-border)'}`,
                color: status === s ? 'var(--accent)' : 'var(--muted)', fontWeight: 600, fontSize: '14px'
              }}
            >
              {s === 'single' ? 'Single' : s === 'married' ? 'Married Joint' : 'Head of Household'}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="label-text">Annual Gross Income</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', color: 'var(--muted)' }}>$</span>
            <input
              type="number" value={income} onChange={e => setIncome(e.target.value)}
              className="premium-input"
              style={{ fontSize: '24px', fontWeight: 700, padding: '16px 20px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label className="label-text">Additional Deductions (above standard)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: 'var(--muted)' }}>$</span>
            <input
              type="number" value={deductions} onChange={e => setDeductions(e.target.value)}
              className="premium-input"
              style={{ padding: '12px 16px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#32d74b' }}>{formatUSD(result.afterTax)}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>After-Tax Income</div>
          </div>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ff453a' }}>{formatUSD(result.totalTax)}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Total Tax</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>{result.effectiveRate.toFixed(1)}%</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Effective Rate</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>{result.marginalRate.toFixed(0)}%</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Marginal Rate</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>{formatUSD(result.taxable)}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Taxable Income</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>{formatUSD(Math.round(result.monthlyTakeHome))}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Monthly Take-Home</div>
          </div>
        </div>

        {result.brackets.length > 0 && (
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600 }}>Tax Bracket Breakdown</h4>
            {result.brackets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid var(--card-border)' }}>
                <div style={{ flex: 1, fontSize: '13px' }}>{(b.rate * 100).toFixed(0)}% Bracket</div>
                <div style={{ flex: 1, fontSize: '13px', color: 'var(--muted)' }}>{formatUSD(b.amount)} taxed</div>
                <div style={{ flex: 0, fontSize: '14px', fontWeight: 700, color: '#ff453a' }}>{formatUSD(Math.round(b.tax))}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontWeight: 700, fontSize: '15px' }}>
              <span>Total Federal Tax</span>
              <span style={{ color: '#ff453a' }}>{formatUSD(Math.round(result.totalTax))}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
          <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
          <span>This calculator provides estimates only based on 2026 federal tax brackets. State taxes not included. Consult a tax professional for accurate advice.</span>
        </div>
      </div>
    </ToolLayout>
  );
}
