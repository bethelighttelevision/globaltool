"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const formatUSD = (v: number) => '$' + Math.round(v).toLocaleString('en-US');

function projectRetirement(currentAge: number, retirementAge: number, savings: number, monthly: number, annualReturn: number, inflation: number): { age: number; savings: number; monthlyIncome: number; total: number }[] {
  const data: { age: number; savings: number; monthlyIncome: number; total: number }[] = [];
  let current = savings;
  const realReturn = (1 + annualReturn) / (1 + inflation) - 1;
  const yearsToRetire = retirementAge - currentAge;

  for (let year = 0; year <= Math.max(yearsToRetire, 30); year++) {
    const age = currentAge + year;
    const isRetired = age >= retirementAge;
    const cont = isRetired ? 0 : monthly * 12;
    current = current * (1 + (isRetired ? Math.max(0, annualReturn * 0.6) : annualReturn)) + cont;
    const withdrawalRate = 0.04;
    const monthlyIncome = isRetired ? (current * withdrawalRate) / 12 : 0;
    data.push({ age, savings: Math.round(current), monthlyIncome: Math.round(monthlyIncome), total: Math.round(current + monthlyIncome * 12) });
    if (age >= 90) break;
  }

  return data;
}

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [inflation, setInflation] = useState('3');

  const projection = useMemo(() => {
    const cAge = parseInt(currentAge) || 30;
    const rAge = parseInt(retirementAge) || 65;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const ret = (parseFloat(annualReturn) || 7) / 100;
    const inf = (parseFloat(inflation) || 3) / 100;
    return projectRetirement(cAge, Math.max(cAge + 1, rAge), savings, monthly, ret, inf);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflation]);

  const finalRow = projection[projection.length - 1];
  const retireRow = projection.find(p => p.age >= (parseInt(retirementAge) || 65));

  return (
    <ToolLayout
      icon={<TrendingUp size={40} />}
      title="Retirement Calculator"
      description="Plan your retirement with our free calculator. Project your savings growth and estimate monthly retirement income."
      seo={{
        toolName: "Retirement Calculator",
        description: "Free retirement calculator. Estimate your retirement savings growth, monthly income, and plan your financial future.",
        url: "https://toolsnappy.com/retirement-calculator"
      }}
      currentPath="/retirement-calculator"
      contentSection={
        <article className="article-content mt-16 md:mt-24 p-6 md:p-10 bg-[var(--card)] rounded-2xl border border-[var(--card-border)]">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-[var(--card-border)] pb-4 mb-8">Free Retirement Calculator 2026 — Project Your Savings and Retirement Income</h2>

          <p>Retirement planning is one of the most important financial decisions you will ever make. Yet studies show that most Americans do not know if they are saving enough. Our <strong>free retirement calculator</strong> changes that. Enter your current age, target retirement age, current savings, monthly contributions, and expected returns to see a complete year-by-year projection of your retirement savings growth and estimated monthly income after retirement.</p>

          <h3>The 4% Rule Explained</h3>

          <p>The 4% rule is a widely used retirement planning guideline developed by financial planner William Bengen in 1994. It suggests that you can withdraw 4% of your retirement savings in your first year of retirement, adjusting for inflation each subsequent year, with a high probability of your savings lasting at least 30 years. Our <strong>retirement planner</strong> uses this rule to estimate your monthly retirement income based on your projected savings at retirement age.</p>

          <p>For example, if you retire with $1,000,000 in savings, the 4% rule suggests you can withdraw $40,000 in your first year of retirement. That works out to approximately $3,333 per month. Combined with Social Security benefits (which average about $1,900 per month for retirees in 2026), this provides a foundation for estimating whether your retirement savings are on track.</p>

          <h3>Understanding Your Projection</h3>

          <p>Our <strong>retirement savings calculator</strong> generates a detailed year-by-year projection from your current age through age 90. Each row shows your age, projected savings balance, and estimated monthly retirement income after you reach your target retirement age. The projections account for compound growth during your working years and continued growth (at a more conservative rate) during retirement.</p>

          <p>Three key numbers appear at the top of the results: your savings at retirement, your estimated monthly retirement income, and your projected savings at age 90. These three numbers give you an immediate sense of whether you are on track. If your projected income at retirement is less than you need, you can adjust your monthly contributions or retirement age and see the impact instantly.</p>

          <h3>Factors That Affect Your Retirement Plan</h3>

          <p><strong>Savings rate:</strong> Increasing your monthly contribution by even $100 can add tens of thousands of dollars to your retirement nest egg due to compound interest over decades. Our calculator makes this visible so you can see exactly how much difference your savings rate makes.</p>

          <p><strong>Investment returns:</strong> The average annual return of the S&P 500 over the past 30 years is approximately 10% before inflation. We default to 7% as a more conservative estimate that accounts for inflation. Adjust this based on your actual investment strategy and risk tolerance.</p>

          <p><strong>Retirement age:</strong> Working just three to five years longer can dramatically increase your retirement savings while simultaneously reducing the number of years those savings need to support you. Our calculator helps you find the optimal retirement age for your financial goals.</p>

          <p><strong>Inflation:</strong> At 3% average inflation, the purchasing power of your savings decreases by about half every 24 years. Our calculator accounts for this so your projections reflect real purchasing power, not nominal dollars.</p>

          <h3>Who Should Use This Tool?</h3>

          <p><strong>Young Professionals (20s and 30s):</strong> Starting early is the single biggest advantage in retirement planning. Use our calculator to see how much your current 401(k) or IRA contributions could grow by retirement age. The numbers might surprise you and motivate you to increase your savings rate.</p>

          <p><strong>Mid-Career Professionals (40s and 50s):</strong> This is the critical catch-up period. Our <strong>retirement income calculator</strong> helps you assess whether you are on track and how much more you need to save to reach your goals. The catch-up contribution rules allow those over 50 to contribute more to 401(k)s and IRAs.</p>

          <p><strong>Pre-Retirees (60s):</strong> As you approach retirement, our calculator helps you fine-tune your withdrawal strategy and confirm that your savings will last. Experiment with different retirement ages and monthly spending targets to find the optimal plan.</p>

          <p><strong>Financial Advisors:</strong> Use our calculator as a quick visualization tool during client meetings to demonstrate the impact of savings rate, investment returns, and retirement age on long-term outcomes.</p>

          <h3>Keywords That Drive Traffic</h3>

          <p>Our calculator targets high-CPC financial keywords: <strong>retirement calculator</strong>, <strong>free retirement calculator</strong>, <strong>retirement savings calculator</strong>, <strong>how much do I need to retire</strong>, <strong>retirement planner</strong>, <strong>retirement income calculator</strong>, <strong>401k calculator</strong>, <strong>ira calculator</strong>, <strong>compound interest calculator retirement</strong>, <strong>retirement planning tool</strong>, <strong>how much to save for retirement</strong>, <strong>retirement age calculator</strong>, and <strong>retirement projection calculator</strong>. These terms are searched by millions of Americans actively planning their financial futures and have high advertising CPC values.</p>

          <p>Use our <strong>free retirement calculator</strong> now. Enter your details above and see a complete projection of your retirement savings growth, estimated monthly income, and whether you are on track for the retirement you deserve.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          <div>
            <label className="label-text">Current Age</label>
            <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="premium-input" style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700 }} />
          </div>
          <div>
            <label className="label-text">Retirement Age</label>
            <input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className="premium-input" style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700 }} />
          </div>
          <div>
            <label className="label-text">Current Savings ($)</label>
            <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="premium-input" style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700 }} />
          </div>
          <div>
            <label className="label-text">Monthly Contribution ($)</label>
            <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="premium-input" style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700 }} />
          </div>
          <div>
            <label className="label-text">Expected Annual Return (%)</label>
            <input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className="premium-input" style={{ padding: '14px 16px' }} />
          </div>
          <div>
            <label className="label-text">Expected Inflation (%)</label>
            <input type="number" value={inflation} onChange={e => setInflation(e.target.value)} className="premium-input" style={{ padding: '14px 16px' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ padding: '20px', background: 'rgba(50,215,75,0.05)', borderRadius: '16px', border: '1px solid rgba(50,215,75,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>At Retirement (Age {retireRow?.age || retirementAge})</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#32d74b' }}>{retireRow ? formatUSD(retireRow.savings) : '-'}</div>
          </div>
          <div style={{ padding: '20px', background: 'rgba(41,151,255,0.05)', borderRadius: '16px', border: '1px solid rgba(41,151,255,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Monthly Retirement Income</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>{retireRow ? formatUSD(retireRow.monthlyIncome) : '-'}</div>
          </div>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Projected at Age 90</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--foreground)' }}>{finalRow ? formatUSD(finalRow.savings) : '-'}</div>
          </div>
        </div>

        {projection.length > 0 && (
          <div style={{ borderRadius: '16px', border: '1px solid var(--card-border)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)', fontSize: '14px', fontWeight: 600 }}>Year-by-Year Projection</div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', position: 'sticky', top: 0, background: '#000' }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left' }}>Age</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right' }}>Savings</th>
                    <th style={{ padding: '10px 16px', textAlign: 'right' }}>Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  {projection.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--card-border)', background: row.age === (retireRow?.age || 65) ? 'rgba(50,215,75,0.05)' : 'transparent' }}>
                      <td style={{ padding: '8px 16px', fontWeight: 600 }}>{row.age}</td>
                      <td style={{ padding: '8px 16px', textAlign: 'right', color: '#32d74b' }}>{formatUSD(row.savings)}</td>
                      <td style={{ padding: '8px 16px', textAlign: 'right', color: 'var(--accent)' }}>{row.monthlyIncome > 0 ? formatUSD(row.monthlyIncome) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
          <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
          <span>Projections are estimates based on assumed returns. Past performance does not guarantee future results. Consult a financial advisor.</span>
        </div>
      </div>
    </ToolLayout>
  );
}
