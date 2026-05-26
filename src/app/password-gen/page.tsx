"use client";

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { ShieldCheck, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
export default function PasswordGenPage() {

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = React.useCallback((currentLength: number, upper: boolean, nums: boolean, syms: boolean) => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (nums) charset += '0123456789';
    if (syms) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    const array = new Uint32Array(currentLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < currentLength; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePassword(length, useUppercase, useNumbers, useSymbols);
    }, 0);
    return () => clearTimeout(timer);
  }, [generatePassword, length, useUppercase, useNumbers, useSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 12) score += 2;
    if (length > 16) score += 1;
    if (useUppercase) score += 1;
    if (useNumbers) score += 1;
    if (useSymbols) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'var(--error)', width: '33%' };
    if (score <= 4) return { label: 'Good', color: '#ffcc00', width: '66%' };
    return { label: 'Strong', color: 'var(--success)', width: '100%' };
  };

  const strength = calculateStrength();

  return (
    <ToolLayout
      icon={<ShieldCheck size={40} />}
      title="Secure Password Generator"
      description="Generate secure, cryptographically strong passwords locally in your browser. No data is ever sent to a server."
      seo={{
        toolName: "Secure Password Generator",
        description: "Generate strong, randomized, and secure passwords instantly to protect your online accounts.",
        url: "https://toolsnappy.com/password-gen"
      }}
      currentPath="/password-gen"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Why Secure Password Generation is Critical in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            In an era of increasingly sophisticated cyber threats, automated brute-force scripts, and massive credential database leaks, using a simple or reused password is one of the most significant security risks you can take with your digital life. Our <strong>Professional Password Generator</strong> uses cryptographically secure randomization powered by the browser&rsquo;s built-in crypto API to create passwords that are virtually impossible for attackers to crack through any known method. Whether you are protecting your cryptocurrency wallet, personal email accounts, business SaaS platforms, or social media profiles, a strong, unique password is your absolute first line of defense against unauthorized access and identity theft.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Anatomy of a Strong Password</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            A truly secure password should include a diverse mix of uppercase letters, lowercase letters, numerical digits, and special symbols like exclamation marks, dollar signs, and percentage symbols. More importantly, password length is the single biggest factor in determining overall security strength. Each additional character exponentially increases the number of possible combinations an attacker must attempt in a brute-force attack. Security experts worldwide recommend a minimum of sixteen characters for critical accounts such as banking, email, and cloud storage. Our tool allows you to customize both the length and character complexity to meet the specific security requirements of any platform or organizational policy.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #ffcc00' }}>
            <h4 style={{ marginTop: 0, color: '#ffcc00' }}>Security Tip: Never Reuse Passwords Across Accounts</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              If any one of your online accounts is compromised in a data breach, attackers will immediately attempt to use that same email and password combination on every other major service in a technique called credential stuffing. This automated process can compromise dozens of your accounts within minutes of a single leak being published. The only effective defense is to generate a unique, random password for every single website and application you use, storing them securely in a dedicated password manager vault rather than relying on your memory or a reused pattern.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Understanding Password Entropy and Cracking Resistance</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Password entropy is a measurement of how unpredictable a password is, typically expressed in bits. Each bit of entropy doubles the number of guesses required to crack the password through brute-force methods. A password with only lowercase letters and eight characters has roughly forty-seven bits of entropy and can be cracked in seconds by modern hardware. A password with sixteen characters that includes uppercase, lowercase, numbers, and symbols has well over one hundred bits of entropy, requiring billions of years to crack even with the most powerful supercomputers available today. Our generator ensures maximum entropy by using truly random selection from the full character set you specify, producing passwords that are mathematically resistant to both dictionary attacks and exhaustive brute-force attempts.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Manage Your Secure Passwords Effectively</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Since human memory is not well suited to recalling random twenty-character strings containing symbols and mixed-case letters, we strongly recommend using a reputable password manager such as Bitwarden, 1Password, Dashlane, or the built-in password managers in modern browsers like Chrome and Safari. Use our generator to create strong, unique passwords for each account, then save them directly into your password manager&rsquo;s encrypted vault. This approach gives you maximum security without the frustration of forgetting login credentials or the dangerous temptation to reuse passwords. Many password managers also include features like automatic password change reminders, security breach monitoring, and secure sharing options for family or team accounts.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Beyond Password Generation: Multi-Factor Authentication</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            While a strong password generated by our tool provides excellent protection, adding an extra layer of security through multi-factor authentication is highly recommended for all critical accounts. MFA requires a second verification method such as a temporary code from an authenticator app, a hardware security key, or a biometric scan in addition to your password. This means that even if an attacker somehow obtains your password through phishing or a data breach, they still cannot access your account without the second factor. Combining a cryptographically strong generated password with MFA provides the highest practical level of account security available to consumers and businesses in 2026, reducing the risk of compromise by over ninety-nine percent compared to password-only protection.
          </p>
        </article>
      }
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '16px', border: '1px solid var(--card-border)', textAlign: 'left' }}>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input 
            type="text" 
            value={password} 
            readOnly 
            style={{ flex: 1, padding: '16px 20px', fontSize: '20px', fontFamily: 'monospace', background: '#000', border: '1px solid var(--card-border)', borderRadius: '12px', color: '#fff', letterSpacing: '0.05em' }} 
          />
          <button onClick={() => generatePassword(length, useUppercase, useNumbers, useSymbols)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer', color: 'var(--foreground)' }}>
            <RefreshCw size={20} />
          </button>
          <button onClick={handleCopy} style={{ background: 'var(--accent)', border: 'none', padding: '0 24px', borderRadius: '12px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>
            <span>Password Strength: <strong style={{ color: strength.color }}>{strength.label}</strong></span>
          </div>
          <div style={{ height: '6px', background: 'var(--card-border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s ease' }}></div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--foreground)', marginBottom: '16px' }}>
            <span>Password Length ({length})</span>
            <input type="range" min="8" max="64" value={length} onChange={(e) => {
              const newLen = parseInt(e.target.value);
              setLength(newLen);
              generatePassword(newLen, useUppercase, useNumbers, useSymbols);
            }} style={{ width: '60%' }} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
              <input type="checkbox" checked={useUppercase} onChange={(e) => {
                const val = e.target.checked;
                setUseUppercase(val);
                generatePassword(length, val, useNumbers, useSymbols);
              }} style={{ width: '18px', height: '18px' }} />
              Uppercase (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
              <input type="checkbox" checked={useNumbers} onChange={(e) => {
                const val = e.target.checked;
                setUseNumbers(val);
                generatePassword(length, useUppercase, val, useSymbols);
              }} style={{ width: '18px', height: '18px' }} />
              Numbers (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', cursor: 'pointer' }}>
              <input type="checkbox" checked={useSymbols} onChange={(e) => {
                const val = e.target.checked;
                setUseSymbols(val);
                generatePassword(length, useUppercase, useNumbers, val);
              }} style={{ width: '18px', height: '18px' }} />
              Symbols (!@#$)
            </label>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}

