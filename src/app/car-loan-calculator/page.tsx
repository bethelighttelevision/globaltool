"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { CreditCard, Car, Calculator as CalcIcon } from 'lucide-react';
export default function CarLoanCalculator() {

  const [carPrice, setCarPrice] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);

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
    <ToolLayout
      icon={<CreditCard size={44} />}
      title="Car Loan EMI Calculator"
      description="Plan your vehicle purchase with our professional finance tool. Calculate monthly installments and interest instantly."
      seo={{
        toolName: "Professional Car Loan EMI Calculator",
        description: "Calculate your monthly car loan payments (EMI), total interest, and total cost with our free car finance tool. Plan your auto loan smarter.",
        url: "https://toolsnappy.com/car-loan-calculator"
      }}
      currentPath="/car-loan-calculator"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Comprehensive Car Loan EMI Calculator Guide</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Financing a vehicle is one of the most significant financial decisions for many households. Our professional <strong>Car Loan EMI Calculator</strong> is designed to provide you with transparency and clarity before you visit a dealership. By understanding the components of your monthly paymentâ€”principal and interestâ€”you can negotiate better terms and choose a car that fits your budget without overextending your finances. Whether you are buying a new sedan, a used SUV, or a luxury vehicle, knowing your exact monthly obligation before signing any paperwork puts you in the driver&apos;s seat during negotiations.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Key Components of an Auto Loan</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '32px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Vehicle Price:</strong> The total cost of the car, including taxes, registration fees, and dealer add-ons. Always negotiate the out-the-door price rather than the monthly payment.</li>
            <li style={{ marginBottom: '12px' }}><strong>Down Payment:</strong> The upfront amount you pay. A higher down payment reduces your loan amount and monthly EMI, and it also reduces the risk of being upside down on your loan.</li>
            <li style={{ marginBottom: '12px' }}><strong>Interest Rate (APR):</strong> The cost of borrowing money. Even a 1% difference can save thousands over several years. Your credit score, loan term, and the lender all influence your APR.</li>
            <li style={{ marginBottom: '12px' }}><strong>Loan Tenure:</strong> The duration of the loan, typically expressed in months. While longer terms lower your monthly payment, they significantly increase the total interest paid over the life of the loan.</li>
            <li style={{ marginBottom: '12px' }}><strong>Trade-In Value:</strong> If you are trading in an existing vehicle, its value can be applied toward the down payment, further reducing the amount you need to finance.</li>
          </ul>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Interest Rates Impact Your Total Cost</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The interest rate you receive on your car loan is determined by several factors, including your credit history, the loan term, the age of the vehicle, and current market conditions set by the Federal Reserve. Borrowers with excellent credit scores above 740 typically qualify for the lowest advertised rates, while those with fair or poor credit may face significantly higher APRs. Even a seemingly modest difference in rate can have a dramatic effect on your total cost. On a $30,000 loan over 60 months, a 4% APR results in total interest of roughly $3,150, while a 7% APR pushes that figure to over $5,600. By using our calculator before visiting a dealership, you can quickly determine whether a promotional financing offer is genuinely a good deal or simply a marketing tactic.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The True Cost of Extended Loan Terms</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In recent years, auto loan terms have stretched to 72, 84, and even 96 months as car prices have risen. While extending your loan term reduces your monthly payment, it comes with several drawbacks that are easy to overlook. First, lenders typically charge higher interest rates on longer terms because the risk of default increases over time. Second, you will pay substantially more in total interest over the life of the loan. Third, and most importantly, cars depreciate rapidlyâ€”often losing 20% to 30% of their value within the first year. With a long-term loan, you will almost certainly owe more than the car is worth for several years, creating a negative equity situation that makes it difficult to sell or trade in the vehicle. Our calculator allows you to compare different term lengths side by side so you can make an informed decision.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Save Money on Your Car Loan</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            To get the best deal, try to keep your loan term under 60 months and put down at least 20% of the car&apos;s value. This reduces the risk of &quot;negative equity,&quot; where you owe more on the car than it is worth. Use our calculator to experiment with different down payment amounts to see how much interest you can save over time. Additionally, consider getting pre-approved for a loan from your bank or credit union before going to the dealership. This gives you a baseline rate to compare against dealer financing and strengthens your negotiating position. Making bi-weekly payments instead of monthly payments can also reduce your total interest by making an extra half-payment each year, which accelerates the principal payoff schedule.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>New vs. Used: How Vehicle Age Affects Your Loan</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The age of the vehicle you are financing has a significant impact on your loan terms. New cars typically qualify for lower interest rates, especially when manufacturer promotional financing is available. However, new cars also depreciate faster, meaning you lose equity more quickly in the early years of ownership. Used cars, particularly those that are two to three years old, offer a better value proposition because the previous owner has already absorbed the steepest depreciation. However, used car loans often carry higher interest rates, and some lenders impose restrictions on loan terms for older vehicles. Our calculator helps you run the numbers for both scenarios so you can decide which path makes the most financial sense for your situation.
          </p>
        </article>
      }
    >
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
    </ToolLayout>
  );
}

