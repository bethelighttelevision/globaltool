"use client";

import React, { useState } from 'react';
import { Home, Calculator as CalcIcon } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function MortgageCalculator() {
  usePageMeta("Free Mortgage Calculator | ToolSnappy", "Calculate monthly mortgage payments, amortization, and interest. Free home loan calculator.");
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);

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
    <ToolLayout
      icon={<Home size={48} strokeWidth={1.5} />}
      title="Mortgage Calculator"
      description="Estimate your monthly mortgage payments and explore different financing scenarios for your next home."
      seo={{
        toolName: "Professional Mortgage & Home Loan Calculator",
        description: "Plan your dream home with our advanced Mortgage Calculator. Calculate monthly payments, interest rates, and total loan costs instantly.",
        url: "https://globalutilitytoolbox.com/mortgage-calculator"
      }}
      currentPath="/mortgage-calculator"
      contentSection={
        <div style={{ maxWidth: '900px', margin: '80px auto 0' }}>
          <article className="prose prose-invert lg:prose-xl">
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Mastering Your Home Financing with Our Mortgage Calculator</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Buying a home is likely the largest financial commitment you will ever make. Our <strong>Professional Mortgage Calculator</strong> empowers you to enter negotiations with banks and lenders from a position of knowledge. By adjusting the interest rate and down payment, you can see exactly how much house you can afford without stretching your finances to the breaking point. Understanding your monthly payment before you ever step foot in a lender&apos;s office gives you a significant advantage in the home-buying process, allowing you to focus on properties that genuinely fit your budget rather than falling in love with a home you cannot realistically afford.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>What Makes Up Your Monthly Mortgage Payment?</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              A standard mortgage payment consists of four main elements, often referred to as PITI: Principal, Interest, Taxes, and Insurance. While our calculator focuses on the Principal and Interest (P&amp;I), it provides the foundational data you need to estimate your total housing budget. The principal is the amount you borrowed to purchase the home, while the interest is the cost charged by the lender for lending you that money. Property taxes are assessed by your local government and are typically based on the value of your home, and homeowners insurance protects your investment against damage or loss. Many lenders also require Private Mortgage Insurance (PMI) if your down payment is less than 20% of the home&apos;s purchase price.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Interest Rates Affect Your Long-Term Costs</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              The interest rate on your mortgage directly determines how much you will pay over the life of the loan. Even a difference of one percentage point can translate into tens of thousands of dollars in additional interest over a 30-year term. For example, on a $300,000 loan at 6%, your monthly payment might be around $1,800, but at 7%, that same loan jumps to nearly $2,000 per month. Over three decades, that seemingly small increase adds up to more than $70,000 in extra interest. This is why shopping around for the best rate and improving your credit score before applying can have such a dramatic impact on your financial future.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Loan Term Comparison: 15-Year vs. 30-Year Mortgages</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              One of the most important decisions you will make when financing a home is choosing the loan term. A 30-year fixed-rate mortgage offers the lowest monthly payment, making it the most popular choice among homebuyers. However, because you are paying interest over a longer period, the total cost of the loan is significantly higher. A 15-year mortgage, by contrast, comes with higher monthly payments but allows you to build equity much faster and pay far less interest overall. Our Mortgage Calculator lets you toggle between these options instantly, so you can see the trade-offs in real time and choose the term that best aligns with your financial goals and monthly cash flow.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Down Payment Strategies for First-Time Buyers</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Saving for a down payment is often the biggest hurdle for first-time homebuyers. While the traditional advice has always been to put down 20%, there are many loan programs that allow for much lower down payments. FHA loans, for example, require as little as 3.5% down, and conventional loans through Fannie Mae and Freddie Mac may allow 3% to 5% down for qualified buyers. However, putting down less than 20% means you will likely need to pay PMI, which adds to your monthly payment. Use our calculator to experiment with different down payment amounts to find the sweet spot where your monthly payment is comfortable and your total interest cost is minimized over the long term.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Understanding Amortization Schedules</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              An amortization schedule is a complete table of periodic loan payments that shows the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term. In the early years of a mortgage, the vast majority of your monthly payment goes toward interest rather than principal. As the loan matures, this balance shifts, and more of your payment is applied to the principal balance. This is why making extra payments early in the loan term can have an outsized impact on reducing your total interest cost. Our calculator gives you the insight you need to understand this dynamic and plan an accelerated payoff strategy if that is your goal.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tips for Getting a Lower Interest Rate</h3>
            <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Improve Your Credit Score:</strong> A higher score often qualifies you for the lowest market rates. Check your credit report for errors and pay down existing debt before applying.</li>
              <li style={{ marginBottom: '12px' }}><strong>Larger Down Payment:</strong> Aim for 20% to avoid Private Mortgage Insurance (PMI) costs and to demonstrate financial stability to lenders.</li>
              <li style={{ marginBottom: '12px' }}><strong>Shop Around:</strong> Compare rates from traditional banks, credit unions, and online mortgage lenders. Even a 0.25% difference can save thousands.</li>
              <li style={{ marginBottom: '12px' }}><strong>Buy Discount Points:</strong> Paying discount points upfront can lower your interest rate. One point typically costs 1% of the loan amount and reduces the rate by about 0.25%.</li>
              <li style={{ marginBottom: '12px' }}><strong>Shorter Loan Term:</strong> Lenders typically offer lower rates for 15-year loans compared to 30-year loans because the risk is spread over a shorter period.</li>
            </ul>
          </article>
        </div>
      }
    >
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
    </ToolLayout>
  );
}
