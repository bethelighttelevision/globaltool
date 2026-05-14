"use client";

import React, { useState, useMemo } from 'react';

export default function Calculator() {
  const [invest, setInvest] = useState('');
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [fee, setFee] = useState('0.1');
  const [applyTax, setApplyTax] = useState(false);
  const [taxType, setTaxType] = useState('long'); // 'short' (e.g., 24%) or 'long' (e.g., 15%)
  
  const results = useMemo(() => {
    const buyPrice = parseFloat(buy);
    const sellPrice = parseFloat(sell);
    const investment = parseFloat(invest);
    const feePct = parseFloat(fee) / 100;

    if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(investment) || buyPrice <= 0) {
      return null;
    }

    const quantity = investment / buyPrice;
    const grossSell = quantity * sellPrice;
    const totalFees = (investment * feePct) + (grossSell * feePct);
    const grossProfit = grossSell - investment - totalFees;
    
    // Tax Calculation
    let taxAmount = 0;
    if (applyTax && grossProfit > 0) {
      const taxRate = taxType === 'short' ? 0.24 : 0.15; // Rough US estimates
      taxAmount = grossProfit * taxRate;
    }
    
    const netProfit = grossProfit - taxAmount;
    const roi = (netProfit / investment) * 100;

    return {
      quantity: quantity.toFixed(4),
      grossSell: grossSell.toFixed(2),
      grossProfit: grossProfit.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netProfit: netProfit.toFixed(2),
      roi: roi.toFixed(2),
      isProfit: netProfit >= 0,
      totalFees: totalFees.toFixed(2)
    };
  }, [buy, sell, invest, fee, applyTax, taxType]);

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Crypto & Stock ROI Calculator</h2>
        <p style={{ color: 'var(--muted)' }}>Advanced profit tracking with US tax bracket estimation.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {/* Input Section */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label-text">Investment Amount ($)</label>
            <input type="number" className="input-field" value={invest} onChange={e => setInvest(e.target.value)} placeholder="1000" />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label className="label-text">Buy Price ($)</label>
            <input type="number" className="input-field" value={buy} onChange={e => setBuy(e.target.value)} placeholder="50000" />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label className="label-text">Sell Price ($)</label>
            <input type="number" className="input-field" value={sell} onChange={e => setSell(e.target.value)} placeholder="60000" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="label-text">Exchange Fee (%)</label>
            <input type="number" className="input-field" value={fee} onChange={e => setFee(e.target.value)} placeholder="0.1" />
          </div>

          <div style={{ padding: '16px', border: '1px solid var(--card-border)', borderRadius: '12px', background: 'rgba(0,0,0,0.05)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--foreground)' }}>
              <input type="checkbox" checked={applyTax} onChange={e => setApplyTax(e.target.checked)} style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Estimate US Capital Gains Tax</span>
            </label>
            {applyTax && (
              <div style={{ marginTop: '16px' }}>
                <select 
                  className="input-field" 
                  value={taxType} 
                  onChange={e => setTaxType(e.target.value)}
                  style={{ appearance: 'none' }}
                >
                  <option value="long">Long-Term (&gt; 1 year, ~15%)</option>
                  <option value="short">Short-Term (&lt; 1 year, ~24%)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px',
          background: results ? (results.isProfit ? 'rgba(52, 199, 89, 0.05)' : 'rgba(255, 59, 48, 0.05)') : 'transparent',
          border: '1px solid',
          borderColor: results ? (results.isProfit ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 59, 48, 0.3)') : 'var(--card-border)',
          borderRadius: '16px'
        }}>
          {!results ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
              Enter your trade details to see the calculation
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                <div className="label-text">Final Net Profit (After Tax & Fees)</div>
                <div style={{ fontSize: '56px', fontWeight: 'bold', color: results.isProfit ? 'var(--success)' : 'var(--error)', letterSpacing: '-0.02em' }}>
                  {results.isProfit ? '+' : ''}${results.netProfit}
                </div>
                <div style={{ 
                  display: 'inline-block', padding: '6px 16px', borderRadius: '980px', fontSize: '16px', fontWeight: '600', marginTop: '12px',
                  background: results.isProfit ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 59, 48, 0.15)',
                  color: results.isProfit ? 'var(--success)' : 'var(--error)'
                }}>
                  {results.roi}% Total ROI
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingTop: '24px', borderTop: '1px solid var(--card-border)' }}>
                <div>
                  <div className="label-text">Trading Fees</div>
                  <div style={{ fontWeight: '500', fontSize: '18px', color: 'var(--foreground)' }}>${results.totalFees}</div>
                </div>
                <div>
                  <div className="label-text">Est. Tax Deducted</div>
                  <div style={{ fontWeight: '500', fontSize: '18px', color: 'var(--error)' }}>${results.taxAmount}</div>
                </div>
                <div>
                  <div className="label-text">Asset Quantity</div>
                  <div style={{ fontWeight: '500', fontSize: '18px', color: 'var(--foreground)' }}>{results.quantity}</div>
                </div>
                <div>
                  <div className="label-text">Gross Return</div>
                  <div style={{ fontWeight: '500', fontSize: '18px', color: 'var(--foreground)' }}>${results.grossSell}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
