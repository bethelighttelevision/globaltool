"use client";

import React, { useState } from 'react';
import { Copy, CheckCircle2, AlertTriangle, FileJson } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
export default function JsonFormatterPage() {

  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!inputJson.trim()) {
      setOutputJson('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
      setOutputJson('');
    }
  };

  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError(null);
  };

  return (
    <ToolLayout
      icon={<FileJson size={40} />}
      title="JSON Formatter & Validator"
      description="Format, beautify, and validate your raw JSON strings instantly in the browser."
      seo={{
        toolName: "JSON Formatter & Validator",
        description: "Format, beautify, and validate your raw JSON strings instantly in the browser. 100% Free and Private.",
        url: "https://globalutilitytoolbox.com/json-formatter"
      }}
      currentPath="/json-formatter"
      contentSection={
        <article>
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Why JSON Formatting Matters for Modern Developers</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web, powering everything from RESTful APIs to cloud infrastructure configuration files. However, minified JSON returned from live endpoints is often compressed into a single dense line that is impossible for humans to read or debug effectively. Our <strong>Professional JSON Formatter & Validator</strong> is designed to help developers, data scientists, QA engineers, and technical writers quickly beautify, validate, and troubleshoot their data structures with zero setup required. Unlike IDE plugins that require installation and configuration, this tool works instantly in your browser with no data ever transmitted to a server, making it both convenient and secure for handling confidential payloads containing user information or proprietary business data.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Difference Between Minified and Beautified JSON</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Minification is excellent for reducing bandwidth usage and improving page load speeds during data transmission, but it is a nightmare when you need to inspect or debug the actual content. By adding proper indentation, line breaks, and visual hierarchy, our tool reveals the nested structure of your data at a single glance. This makes it trivial to spot missing brackets, trailing commas, mismatched key-value pairs, or incorrect data types that would otherwise cause silent runtime errors in your application. The clear visual distinction between different nesting levels helps you trace through complex objects containing hundreds of keys, dramatically reducing the time spent hunting down structural inconsistencies in your data.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
            <h4 style={{ marginTop: 0, color: '#32d74b' }}>Developer Productivity in 2026</h4>
            <p style={{ marginBottom: 0, fontSize: '15px' }}>
              Time is the most valuable asset for any software engineer. Instead of manually fixing indentation in your IDE or relying on brittle regex replacements that can accidentally modify your data, simply paste your raw API response here for an instant, structured view. Our validator also pinpoints the exact line and character position of any JSON syntax error, turning what could be a ten-minute debugging session into a ten-second fix. This is especially valuable during rapid development cycles where every minute saved compounds into faster deployment times and reduced developer frustration. In an era where shipping speed determines competitive advantage, tools that eliminate friction from the development workflow are indispensable.
            </p>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Common Use Cases for JSON Formatting</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '40px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>API Debugging:</strong> Quickly inspect the payload from REST or GraphQL endpoints during development to confirm the server is returning the expected data structure before you build your UI components and business logic around it.</li>
            <li style={{ marginBottom: '12px' }}><strong>Config File Management:</strong> Validate your .json configuration files for VS Code, cloud deployment scripts, CI/CD pipelines, and Docker Compose files to avoid syntax-related build failures that can halt your entire deployment pipeline.</li>
            <li style={{ marginBottom: '12px' }}><strong>Data Education:</strong> An excellent resource for students and junior developers who are learning how complex nested data objects are structured and how different data types interact within a single JSON document.</li>
            <li style={{ marginBottom: '12px' }}><strong>Log Analysis:</strong> Format structured log outputs from cloud servers, AWS CloudWatch, or application performance monitoring tools to quickly identify error patterns and trace issues across distributed systems and microservices architectures.</li>
            <li style={{ marginBottom: '12px' }}><strong>Database Exports:</strong> Inspect and clean up MongoDB, Firebase, or PostgreSQL JSON export files before importing them into a new environment or running complex data migration scripts across production systems.</li>
            <li style={{ marginBottom: '12px' }}><strong>API Documentation:</strong> Create clean, readable JSON examples for your API documentation, making it substantially easier for third-party developers to understand your request and response schemas without confusion.</li>
          </ul>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Common JSON Errors and How to Fix Them</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Even experienced developers encounter JSON syntax errors on a regular basis. The most common issues include trailing commas after the last element in an object or array, missing quotation marks around property keys, mismatched brackets or braces, and accidentally using single quotes instead of the required double quotes. Our validator catches all of these issues instantly and provides descriptive error messages that tell you exactly where the problem occurred within your data structure. This eliminates the tedious process of manually scanning through hundreds of lines of data to find a single missing character. Understanding these common pitfalls will make you significantly more efficient when working with any JSON-based technology, from configuration files to complex API integrations.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>JSON vs Other Data Formats</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            While XML and CSV were previously the dominant formats for data exchange on the web, JSON has taken over due to its lightweight syntax, native compatibility with JavaScript, and cleaner human readability. Modern APIs from Google, Twitter, Stripe, GitHub, and virtually every other major platform use JSON as their primary response format. Compared to XML, JSON requires significantly fewer characters to represent the same data, which means faster parsing on the client side and reduced bandwidth costs for high-traffic applications. Compared to YAML, JSON is more strict and predictable, making it a safer choice for configuration files where parsing ambiguity can lead to security vulnerabilities or unexpected behavior. Mastering JSON is therefore a fundamental skill for any full-stack developer, backend engineer, or data analyst working in 2026.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Best Practices for Working with JSON Data</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            To get the most out of JSON in your projects, always validate your data before using it in a production environment. Use schema validation tools like JSON Schema to define the expected structure of your data and catch type mismatches early in the development process. Keep your JSON files well-organized with consistent key naming conventions, preferably using camelCase for JavaScript and TypeScript projects or snake_case for Python-based systems. Avoid deeply nested structures when possible, as excessive nesting can make your data harder to read, process, and maintain over time. Finally, always use a reliable formatter like the one on this page to ensure your JSON is consistently indented and completely free of syntax errors before committing it to your shared codebase or deploying it to a live server environment.
          </p>
        </article>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>

        {/* Input Panel */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Raw JSON</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={clearAll} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '13px' }}>Clear</button>
              <button onClick={formatJson} className="premium-button" style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '8px' }}>Format</button>
            </div>
          </div>

          <textarea 
            className="input-field" 
            value={inputJson} 
            onChange={(e) => setInputJson(e.target.value)} 
            placeholder='{"paste": "your JSON here"}' 
            style={{ flex: 1, minHeight: '400px', resize: 'vertical', fontFamily: 'monospace', fontSize: '14px', background: '#000' }} 
          />
        </div>

        {/* Output Panel */}
        <div style={{ background: '#0d0d0d', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--foreground)' }}>Formatted JSON</h3>
            <button 
              onClick={handleCopy}
              disabled={!outputJson}
              style={{ background: outputJson ? 'var(--card)' : 'transparent', border: outputJson ? '1px solid var(--card-border)' : 'none', color: outputJson ? 'var(--foreground)' : 'var(--muted)', padding: '8px 12px', borderRadius: '8px', cursor: outputJson ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', transition: 'all 0.2s ease' }}
            >
              {copied ? <CheckCircle2 size={16} color="var(--success)" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {error ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--error)', background: 'rgba(255, 59, 48, 0.05)', borderRadius: '12px', border: '1px dashed rgba(255, 59, 48, 0.3)' }}>
              <AlertTriangle size={32} style={{ marginBottom: '16px' }} />
              <div style={{ fontWeight: '500' }}>Invalid JSON</div>
              <div style={{ fontSize: '13px', marginTop: '8px', opacity: 0.8 }}>{error}</div>
            </div>
          ) : (
            <textarea 
              readOnly
              value={outputJson} 
              placeholder='Formatted output will appear here...' 
              style={{ flex: 1, minHeight: '400px', resize: 'vertical', fontFamily: 'monospace', fontSize: '14px', background: 'transparent', border: 'none', color: '#a8c7fa', outline: 'none' }} 
            />
          )}
        </div>

      </div>
    </ToolLayout>
  );
}

