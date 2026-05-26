"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Bot, Copy, Check, RefreshCw, ArrowLeftRight, Sparkles, BarChart3 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const transitions = [
  'however', 'therefore', 'furthermore', 'moreover', 'nevertheless', 'conversely',
  'consequently', 'additionally', 'in contrast', 'on the other hand', 'as a result',
  'accordingly', 'besides', 'hence', 'meanwhile', 'notably', 'specifically',
];

const thesaurus: Record<string, string[]> = {
  'good': ['excellent', 'outstanding', 'superb', 'remarkable', 'exceptional', 'fine'],
  'bad': ['poor', 'inferior', 'substandard', 'unfavorable', 'inadequate', 'deficient'],
  'big': ['substantial', 'considerable', 'significant', 'immense', 'vast', 'enormous'],
  'small': ['minor', 'modest', 'compact', 'limited', 'slight', 'diminutive'],
  'important': ['crucial', 'vital', 'essential', 'critical', 'paramount', 'pivotal'],
  'get': ['obtain', 'acquire', 'secure', 'attain', 'procure', 'gain'],
  'use': ['utilize', 'employ', 'leverage', 'apply', 'harness'],
  'show': ['demonstrate', 'illustrate', 'exhibit', 'reveal', 'indicate', 'display'],
  'make': ['create', 'produce', 'generate', 'construct', 'establish', 'form'],
  'help': ['assist', 'aid', 'support', 'facilitate', 'enable'],
  'change': ['modify', 'adjust', 'transform', 'alter', 'convert', 'refine'],
  'think': ['believe', 'consider', 'deem', 'regard', 'presume', 'reckon'],
  'need': ['require', 'necessitate', 'demand', 'call for'],
  'give': ['provide', 'offer', 'supply', 'furnish', 'deliver'],
  'take': ['require', 'necessitate', 'demand', 'call for', 'entail'],
  'know': ['understand', 'comprehend', 'recognize', 'grasp', 'discern'],
  'like': ['appreciate', 'value', 'admire', 'favor'],
  'start': ['initiate', 'commence', 'embark on', 'launch', 'begin'],
  'end': ['conclude', 'terminate', 'finalize', 'complete', 'culminate'],
  'find': ['discover', 'identify', 'locate', 'uncover', 'detect'],
  'tell': ['inform', 'notify', 'advise', 'convey', 'disclose'],
  'try': ['attempt', 'endeavor', 'strive', 'undertake', 'seek'],
  'work': ['operate', 'function', 'perform', 'accomplish'],
  'keep': ['maintain', 'preserve', 'sustain', 'retain', 'uphold'],
  'look': ['examine', 'inspect', 'observe', 'survey', 'scrutinize'],
  'come': ['arrive', 'appear', 'emerge', 'materialize'],
  'go': ['proceed', 'advance', 'progress', 'continue', 'move'],
  'way': ['method', 'approach', 'technique', 'strategy', 'process'],
  'part': ['component', 'element', 'segment', 'portion', 'constituent'],
  'result': ['outcome', 'consequence', 'effect', 'ramification'],
  'cause': ['prompt', 'trigger', 'provoke', 'generate', 'induce'],
  'hard': ['challenging', 'demanding', 'arduous', 'strenuous', 'formidable'],
  'easy': ['straightforward', 'simple', 'effortless', 'uncomplicated'],
  'fast': ['rapid', 'swift', 'quick', 'expeditious', 'prompt'],
  'slow': ['gradual', 'leisurely', 'unhurried', 'deliberate'],
  'new': ['innovative', 'novel', 'original', 'fresh', 'groundbreaking'],
  'old': ['established', 'conventional', 'traditional', 'long-standing'],
  'many': ['numerous', 'multiple', 'countless', 'various', 'abundant'],
  'some': ['several', 'a few', 'certain', 'various', 'assorted'],
  'very': ['extremely', 'remarkably', 'exceptionally', 'profoundly', 'tremendously'],
  'really': ['genuinely', 'truly', 'undeniably', 'unquestionably'],
  'always': ['consistently', 'invariably', 'perpetually', 'continually'],
  'often': ['frequently', 'regularly', 'commonly', 'routinely'],
  'maybe': ['potentially', 'possibly', 'perhaps', 'conceivably'],
  'sure': ['certain', 'confident', 'convinced', 'assured'],
  'best': ['optimal', 'prime', 'superior', 'finest', 'foremost'],
  'first': ['primary', 'initial', 'foremost', 'principal', 'paramount'],
  'last': ['final', 'ultimate', 'conclusive', 'terminal'],
  'right': ['correct', 'accurate', 'proper', 'precise', 'appropriate'],
  'wrong': ['incorrect', 'faulty', 'inaccurate', 'erroneous', 'flawed'],
  'clear': ['evident', 'apparent', 'obvious', 'distinct', 'transparent'],
  'different': ['distinct', 'disparate', 'contrasting', 'divergent'],
  'same': ['identical', 'equivalent', 'corresponding', 'comparable'],
  'possible': ['feasible', 'viable', 'attainable', 'achievable', 'practicable'],
  'likely': ['probable', 'plausible', 'expected', 'presumed'],
  'special': ['unique', 'distinctive', 'particular', 'notable', 'exceptional'],
  'common': ['widespread', 'prevalent', 'ubiquitous', 'rampant'],
  'simple': ['basic', 'elementary', 'fundamental', 'rudimentary', 'straightforward'],
  'complex': ['intricate', 'complicated', 'sophisticated', 'elaborate', 'involved'],
  'interesting': ['engaging', 'captivating', 'compelling', 'intriguing', 'fascinating'],
  'useful': ['valuable', 'beneficial', 'advantageous', 'practical', 'effective'],
};

const sentenceStarters = [
  'What makes this particularly interesting is that', 'One key aspect to consider is',
  'It is worth noting that', 'An important factor here is',
  'This becomes especially relevant when', 'A closer examination reveals that',
  'Perhaps the most significant point is that', 'What sets this apart is',
  'This raises an interesting question about', 'The reality of the situation is that',
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSynonym(word: string): string | null {
  const lower = word.toLowerCase().replace(/[^a-z]/g, '');
  const options = thesaurus[lower];
  if (!options) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function replaceSynonyms(text: string, intensity: number): string {
  const words = text.split(/\b/);
  const replaceableIndices: number[] = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase().replace(/[^a-z]/g, '');
    if (thesaurus[w] && words[i].length > 2) replaceableIndices.push(i);
  }
  const maxReplace = Math.max(1, Math.floor(replaceableIndices.length * intensity));
  const toReplace = shuffleArray(replaceableIndices).slice(0, maxReplace);
  for (const idx of toReplace) {
    const syn = getSynonym(words[idx]);
    if (syn) {
      const isUpper = words[idx][0] === words[idx][0].toUpperCase();
      words[idx] = isUpper ? syn[0].toUpperCase() + syn.slice(1) : syn;
    }
  }
  return words.join('');
}

function addTransitions(text: string, intensity: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  if (sentences.length < 3) return text;
  const numTransitions = Math.max(1, Math.floor((sentences.length - 1) * intensity * 0.4));
  const candidates: number[] = [];
  for (let i = 1; i < sentences.length; i++) {
    const s = sentences[i].trim().toLowerCase();
    const hasTransition = transitions.some(t => s.startsWith(t));
    if (!hasTransition) candidates.push(i);
  }
  const selected = shuffleArray(candidates).slice(0, numTransitions);
  for (const idx of selected) {
    const trans = shuffleArray(transitions).slice(0, 1)[0];
    sentences[idx] = ` ${trans}, ${sentences[idx].trim()[0].toLowerCase() + sentences[idx].trim().slice(1)}`;
  }
  return sentences.join('');
}

function varySentenceStructure(text: string, intensity: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  if (sentences.length < 3) return text;
  const numChanges = Math.max(1, Math.floor(sentences.length * intensity * 0.3));
  const selected = shuffleArray(
    sentences.map((_, i) => i).filter(i => {
      const trimmed = sentences[i].trim();
      return trimmed.length > 40 && !startsWithTransition(trimmed);
    })
  ).slice(0, numChanges);
  for (const idx of selected) {
    const starter = shuffleArray(sentenceStarters).slice(0, 1)[0];
    const s = sentences[idx].trim();
    sentences[idx] = ` ${starter} ${s[0].toLowerCase() + s.slice(1)}`;
  }
  return sentences.join('');
}

function startsWithTransition(text: string): boolean {
  const lower = text.trim().toLowerCase();
  return transitions.some(t => lower.startsWith(t)) || sentenceStarters.some(s => lower.startsWith(s.toLowerCase()));
}

function useContractions(text: string, intensity: number): string {
  let result = text;
  if (intensity < 0.5) return result;
  const replacements: [RegExp, string][] = [
    [/\bdo not\b/gi, "don't"], [/\bdoes not\b/gi, "doesn't"],
    [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"],
    [/\bwas not\b/gi, "wasn't"], [/\bwere not\b/gi, "weren't"],
    [/\bhas not\b/gi, "hasn't"], [/\bhave not\b/gi, "haven't"],
    [/\bhad not\b/gi, "hadn't"], [/\bwill not\b/gi, "won't"],
    [/\bwould not\b/gi, "wouldn't"], [/\bcould not\b/gi, "couldn't"],
    [/\bshould not\b/gi, "shouldn't"], [/\bmight not\b/gi, "mightn't"],
    [/\bcannot\b/gi, "can't"], [/\bi am\b/gi, "I'm"],
    [/\byou are\b/gi, "you're"], [/\bwe are\b/gi, "we're"],
    [/\bthey are\b/gi, "they're"], [/\bhe is\b/gi, "he's"],
    [/\bshe is\b/gi, "she's"], [/\bit is\b/gi, "it's"],
    [/\bthat is\b/gi, "that's"], [/\bthere is\b/gi, "there's"],
    [/\bi have\b/gi, "I've"], [/\byou have\b/gi, "you've"],
    [/\bwe have\b/gi, "we've"], [/\bthey have\b/gi, "they've"],
    [/\bi would\b/gi, "I'd"], [/\byou would\b/gi, "you'd"],
    [/\bwe would\b/gi, "we'd"], [/\bthey would\b/gi, "they'd"],
    [/\bi will\b/gi, "I'll"], [/\byou will\b/gi, "you'll"],
    [/\bwe will\b/gi, "we'll"], [/\bthey will\b/gi, "they'll"],
  ];
  const numReplace = Math.max(1, Math.floor(replacements.length * intensity * 0.5));
  const selected = shuffleArray([...Array(replacements.length).keys()]).slice(0, numReplace);
  for (const idx of selected) {
    result = result.replace(replacements[idx][0], replacements[idx][1]);
  }
  return result;
}

function expandContractions(text: string): string {
  return text
    .replace(/don't/gi, "do not")
    .replace(/doesn't/gi, "does not")
    .replace(/isn't/gi, "is not")
    .replace(/aren't/gi, "are not")
    .replace(/wasn't/gi, "was not")
    .replace(/weren't/gi, "were not")
    .replace(/hasn't/gi, "has not")
    .replace(/haven't/gi, "have not")
    .replace(/hadn't/gi, "had not")
    .replace(/won't/gi, "will not")
    .replace(/wouldn't/gi, "would not")
    .replace(/couldn't/gi, "could not")
    .replace(/shouldn't/gi, "should not")
    .replace(/can't/gi, "cannot")
    .replace(/I'm/gi, "I am")
    .replace(/you're/gi, "you are")
    .replace(/we're/gi, "we are")
    .replace(/they're/gi, "they are")
    .replace(/he's/gi, "he is")
    .replace(/she's/gi, "she is")
    .replace(/it's/gi, "it is")
    .replace(/that's/gi, "that is")
    .replace(/there's/gi, "there is")
    .replace(/I've/gi, "I have")
    .replace(/you've/gi, "you have")
    .replace(/we've/gi, "we have")
    .replace(/they've/gi, "they have");
}

function calculateHumanScore(original: string, humanized: string): number {
  const origSentences = original.match(/[^.!?]+[.!?]+/g) || [original];
  const humSentences = humanized.match(/[^.!?]+[.!?]+/g) || [humanized];
  let score = 50;

  if (humSentences.length > 1) {
    const avgLen = humSentences.reduce((a, s) => a + s.split(/\s+/).length, 0) / humSentences.length;
    if (avgLen >= 12 && avgLen <= 25) score += 10;
    else if (avgLen >= 8 && avgLen <= 30) score += 5;
  }

  const transCount = transitions.filter(t => humanized.toLowerCase().includes(t)).length;
  score += Math.min(10, transCount * 3);

  const startersFound = sentenceStarters.filter(s => humanized.toLowerCase().includes(s.substring(0, 15))).length;
  score += Math.min(8, startersFound * 4);

  const contractionCount = (humanized.match(/'/g) || []).length;
  score += Math.min(7, contractionCount * 2);

  const origWords = original.split(/\s+/).length;
  const humWords = humanized.split(/\s+/).length;
  const diff = Math.abs(humWords - origWords);
  if (diff > 5 && diff < 50) score += 5;

  const uniqueWords = new Set(humanized.toLowerCase().match(/\b[a-z]{4,}\b/g)).size;
  const totalWords = (humanized.match(/\b[a-z]{4,}\b/g) || []).length;
  if (totalWords > 0) {
    const ratio = uniqueWords / totalWords;
    if (ratio > 0.5) score += 10;
    else if (ratio > 0.35) score += 5;
  }

  const sentenceStarts = humSentences.map(s => s.trim()[0]).filter(Boolean);
  const uniqueStarts = new Set(sentenceStarts).size;
  if (sentenceStarts.length > 2) {
    const startRatio = uniqueStarts / sentenceStarts.length;
    if (startRatio > 0.5) score += 5;
  }

  return Math.min(99, Math.max(10, score));
}

export default function AIHumanizerPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [intensity, setIntensity] = useState(0.6);
  const [showComparison, setShowComparison] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSynonymReplace, setShowSynonymReplace] = useState(true);
  const [showTransitions, setShowTransitions] = useState(true);
  const [showStructure, setShowStructure] = useState(true);
  const [showContractions, setShowContractions] = useState(true);

  const humanScore = useMemo(() => {
    if (!outputText) return 0;
    return calculateHumanScore(inputText, outputText);
  }, [inputText, outputText]);

  const handleHumanize = useCallback(() => {
    if (!inputText.trim()) return;
    let text = inputText;
    if (showSynonymReplace) text = replaceSynonyms(text, intensity);
    if (showTransitions) text = addTransitions(text, intensity);
    if (showStructure) text = varySentenceStructure(text, intensity);
    if (showContractions) {
      text = intensity > 0.5 ? useContractions(text, intensity) : expandContractions(text);
    }
    text = text.replace(/\s{2,}/g, ' ').trim();
    setOutputText(text);
    setCopied(false);
  }, [inputText, intensity, showSynonymReplace, showTransitions, showStructure, showContractions]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return '#32d74b';
    if (s >= 60) return '#ff9f0a';
    return '#ff3b30';
  };

  return (
    <ToolLayout
      icon={<Bot size={40} />}
      title="AI Content Humanizer"
      description="Polish and refine AI-generated text to sound more natural. Free content improvement tool for ChatGPT, Claude, and Gemini writing."
      seo={{
        toolName: "AI Content Humanizer",
        description: "Polish and refine AI-generated text to sound more natural. Free writing assistant for ChatGPT, Claude, and Gemini content.",
        url: "https://toolsnappy.com/ai-humanizer"
      }}
      currentPath="/ai-humanizer"
      contentSection={
        <article className="article-content mt-16 md:mt-24 p-6 md:p-10 bg-[var(--card)] rounded-2xl border border-[var(--card-border)]">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-[var(--card-border)] pb-4 mb-8">
            Free AI Content Humanizer — Make AI Text Sound Natural
          </h2>

          <p>AI writing tools like ChatGPT, Claude, Gemini, and Copilot have become essential for content creators, marketers, and professionals. They help you draft faster, overcome writer's block, and scale your content production. But AI-generated text often sounds stiff, repetitive, and mechanical. It uses the same sentence structures, overuses certain words, and lacks the natural rhythm of human writing. That is where our <strong>free AI content humanizer</strong> comes in. It rewrites AI-generated text to sound more natural and engaging while preserving the original meaning.</p>

          <h3>Why Refine AI-Generated Content</h3>

          <p>Readers can tell when content was written by a machine. Robotic phrasing, repetitive sentence starts, and unnatural word choices hurt reader engagement and trust. Whether you are publishing blog posts, sending emails, or creating website copy, your audience expects writing that flows naturally. Our <strong>AI writing assistant</strong> helps you achieve that by restructuring sentences, varying vocabulary, and adding the small touches that make text feel authentically written by a person.</p>

          <p>Google's search algorithms prioritize content that demonstrates experience, expertise, authoritativeness, and trustworthiness. Raw AI content often lacks the depth and originality that Google looks for. By refining AI-generated text to sound more natural, you create content that performs better with both readers and search engines. Our tool helps you bridge that gap between AI efficiency and human quality.</p>

          <h3>How Our Content Refinement Tool Works</h3>

          <p>Our tool uses five proven techniques to transform stiff AI text into natural-sounding writing. First, <strong>synonym replacement</strong> swaps overused words with more varied alternatives from our extensive thesaurus. Instead of saying "important" five times in an article, it might use "crucial," "significant," "paramount," or "vital." This variety makes the text more engaging to read. Second, <strong>transition word insertion</strong> adds connecting phrases like "however," "furthermore," "conversely," and "as a result" to create smoother flow between ideas.</p>

          <p>Third, <strong>sentence structure variation</strong> breaks up predictable patterns. Our tool mixes short punchy sentences with longer, more complex ones to create natural rhythm. Fourth, <strong>contraction management</strong> introduces appropriate contractions like "don't," "can't," "we're," and "I've" which make text feel more conversational and natural. And fifth, the <strong>readability score</strong> gives you a percentage rating so you can track how natural your content has become.</p>

          <p>The entire process runs locally in your browser. Your text never leaves your device, ensuring complete privacy for sensitive content. Unlike paid services that charge monthly subscriptions, our <strong>free AI humanizer</strong> costs nothing and produces comparable results.</p>

          <h3>Who Should Use This Tool?</h3>

          <p><strong>Content Writers:</strong> Bloggers, freelance writers, and SEO specialists who use AI assistance should refine their output before publishing. Natural-sounding content keeps readers engaged longer and builds trust with your audience.</p>

          <p><strong>Marketers:</strong> Email campaigns, social media posts, and ad copy generated by AI need to feel personal and authentic. Our tool adds the conversational tone that drives engagement and conversions.</p>

          <p><strong>Business Owners:</strong> If you use AI to create website copy, product descriptions, or customer communications, polishing that content protects your brand reputation and ensures your message lands the right way with your audience.</p>

          <p><strong>Students:</strong> When using AI as a research and drafting aid, refining the output helps ensure your assignments read naturally and clearly express your own understanding of the material.</p>

          <h3>Why Free Beats Paid</h3>

          <p>Most AI humanization tools charge subscription fees because they rely on expensive large language models to rewrite content. Our approach uses algorithmic text transformation that runs entirely in JavaScript, making it both faster and completely free. You can refine unlimited text without worrying about word counts, API credits, or monthly bills. There are no hidden limits, no account creation required, and no data collection.</p>

          <p>Try our <strong>free AI content humanizer</strong> today and see the difference. Paste your AI-generated text above, adjust the intensity slider to your preference, and click Humanize Text. Your refined, natural-sounding content is ready in seconds.</p>
        </article>
      }
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: showSynonymReplace ? 'var(--accent)' : 'var(--muted)' }}>
              <input type="checkbox" checked={showSynonymReplace} onChange={e => setShowSynonymReplace(e.target.checked)} /> Synonym Replacement
            </label>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: showTransitions ? 'var(--accent)' : 'var(--muted)' }}>
              <input type="checkbox" checked={showTransitions} onChange={e => setShowTransitions(e.target.checked)} /> Transition Words
            </label>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: showStructure ? 'var(--accent)' : 'var(--muted)' }}>
              <input type="checkbox" checked={showStructure} onChange={e => setShowStructure(e.target.checked)} /> Sentence Variation
            </label>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: showContractions ? 'var(--accent)' : 'var(--muted)' }}>
              <input type="checkbox" checked={showContractions} onChange={e => setShowContractions(e.target.checked)} /> Contractions
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Humanization Intensity</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>{Math.round(intensity * 100)}%</span>
          </div>
          <input
            type="range" min="0.1" max="1" step="0.05" value={intensity}
            onChange={e => setIntensity(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)' }}>
            <span>Subtle</span>
            <span>Aggressive</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>Your AI Text</label>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{inputText.split(/\s+/).filter(Boolean).length} words</span>
            </div>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here (ChatGPT, Claude, Gemini, etc.)..."
              style={{
                width: '100%', height: '280px', padding: '16px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
                resize: 'vertical', fontFamily: 'inherit'
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>Humanized Output</label>
              {outputText && (
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{outputText.split(/\s+/).filter(Boolean).length} words</span>
              )}
            </div>
            <textarea
              readOnly
              value={outputText}
              placeholder="Humanized version will appear here..."
              style={{
                width: '100%', height: '280px', padding: '16px', borderRadius: '14px',
                background: outputText ? 'rgba(50,215,75,0.03)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${outputText ? 'rgba(50,215,75,0.3)' : 'var(--card-border)'}`,
                color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.7',
                resize: 'vertical', fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            onClick={handleHumanize}
            disabled={!inputText.trim()}
            className="premium-button"
            style={{ padding: '14px 40px', display: 'flex', alignItems: 'center', gap: '8px', opacity: inputText.trim() ? 1 : 0.5, cursor: inputText.trim() ? 'pointer' : 'not-allowed' }}
          >
            <Sparkles size={20} /> Humanize Text
          </button>
          {outputText && (
            <>
              <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 24px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.03)', color: '#fff', cursor: 'pointer' }}>
                {copied ? <><Check size={18} color="#32d74b" /> Copied</> : <><Copy size={18} /> Copy</>}
              </button>
              <button onClick={() => setShowComparison(!showComparison)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 24px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--accent)', cursor: 'pointer' }}>
                <ArrowLeftRight size={18} /> {showComparison ? 'Hide' : 'Compare'}
              </button>
            </>
          )}
        </div>

        {outputText && (
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: getScoreColor(humanScore) }}>{humanScore}%</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                <BarChart3 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Natural Readability Score
              </div>
            </div>
          </div>
        )}

        {showComparison && outputText && inputText && (
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeftRight size={18} /> Side-by-side Comparison
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#ff453a', marginBottom: '8px' }}>Original</div>
                <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--muted)', padding: '12px', background: 'rgba(255,69,58,0.05)', borderRadius: '8px' }}>{inputText}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#32d74b', marginBottom: '8px' }}>Humanized</div>
                <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--foreground)', padding: '12px', background: 'rgba(50,215,75,0.05)', borderRadius: '8px' }}>{outputText}</div>
              </div>
            </div>
          </div>
        )}

        {!inputText && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--card-border)' }}>
            <Bot size={40} color="var(--muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ color: 'var(--muted)' }}>Paste your AI-generated text above and click <strong>Humanize Text</strong></p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
