"use client";

import React, { useState } from 'react';
import { Image, Copy, CheckCircle2 } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { generateAICentent } from '../actions/ai';
export default function InstagramCaptionPage() {

  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [isLoading, setIsLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generateCaptions = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const prompt = `Generate 4 viral Instagram captions for the topic: "${topic}". 
      The tone should be ${tone}. 
      Include relevant emojis and hashtags. 
      Format each caption clearly, separated by a unique delimiter like "---". 
      Don't include any extra text, just the 4 captions.`;

      const response = await generateAICentent(prompt);

      let results: string[] = [];
      if (response.includes('---')) {
        results = response.split('---').map(c => c.trim()).filter(Boolean);
      } else {
        // Fallback: Split by double newlines or paragraph blocks
        const blocks = response.split(/\n\s*\n/).map(c => c.trim()).filter(Boolean);
        results = blocks.map(block => block.replace(/^[\d\.\-\*\s]+/, '').trim());
      }

      // If still not properly split, try matching standard numbered items (e.g., "1. ...")
      if (results.length < 2) {
        const matches = response.match(/(?:^|\n)\d+[\.\)]\s*([\s\S]*?)(?=\n\d+[\.\)]|$)/g);
        if (matches) {
          results = matches.map(m => m.replace(/^\s*\d+[\.\)]\s*/, '').trim());
        }
      }

      // Filter out meta-text and keep only valid captions
      results = results.filter(c => c.length > 10 && !c.toLowerCase().includes('here are') && !c.toLowerCase().includes('instagram caption'));

      // If parsing fails entirely, fallback to splitting by lines or the entire response
      if (results.length === 0) {
        results = response.split('\n').map(c => c.trim()).filter(c => c.length > 15);
      }

      if (results.length === 0) {
        results = [response];
      }

      setCaptions(results.slice(0, 4));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to generate captions.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <ToolLayout
      icon={<Image size={48} strokeWidth={1.5} />}
      title="Instagram Caption Generator"
      description="Stop staring at a blank screen. Generate viral, high-engagement captions for your Reels and Posts in seconds."
      seo={{
        toolName: "Instagram Caption Generator",
        description: "Generate viral, high-engagement captions for your Reels and Posts in seconds using AI.",
        url: "https://toolsnappy.com/instagram-caption"
      }}
      currentPath="/instagram-caption"
      results={captions.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {captions.map((cap, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--foreground)', marginBottom: '40px' }}>{cap}</p>
              <button 
                onClick={() => handleCopy(cap, idx)}
                style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  right: '20px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: 'none', 
                  color: 'var(--muted)', 
                  padding: '8px', 
                  borderRadius: '10px', 
                  cursor: 'pointer' 
                }}
              >
                {copiedIdx === idx ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
              </button>
            </div>
          ))}
        </div>
      )}
      contentSection={
        <div style={{ maxWidth: '900px', margin: '80px auto 0' }}>
          <article>
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Complete Guide to Writing Viral Instagram Captions in 2026</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              A stunning photo or video will stop the scroll, but a great caption is what drives engagement, builds community, and converts followers into customers. Our <strong>AI Instagram Caption Generator</strong> uses proven copywriting frameworks to produce captions that resonate with your specific audience, whether you are a lifestyle blogger, e-commerce brand, or corporate account. In the ever-evolving landscape of social media marketing, the caption has become just as important as the visual content itself. Instagram users scroll through hundreds of posts daily, and only those with compelling narratives or value propositions manage to capture their attention. The difference between a post that gets forgotten and one that goes viral often comes down to the words you choose to accompany your image or video. By leveraging artificial intelligence, our tool helps you craft messages that are not only engaging but also strategically optimized for the Instagram algorithm. Whether you are promoting a product, sharing a personal milestone, or building thought leadership in your industry, the right caption can amplify your reach exponentially. The best part is that you no longer need to be a professional copywriter to produce high-converting social media content. With just a few clicks, you can generate multiple caption options tailored to your specific needs and preferences, saving hours of brainstorming and editing time.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Your Caption Strategy Directly Impacts Reach</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              The Instagram algorithm rewards posts that generate immediate engagement â€” saves, shares, and comments in the first 30 minutes of posting. A well-crafted caption with a clear Call-to-Action (CTA) like &quot;Save this post for later&quot; or &quot;Tag a friend who needs this&quot; can dramatically boost your initial engagement rate and signal to the algorithm that your content deserves a wider distribution. This initial burst of activity is critical because Instagram interprets it as a sign of quality content that should be shown to more users, both on the Explore page and in the feeds of your existing followers. Beyond the algorithm, captions serve a deeper purpose in building your brand identity. They allow you to showcase your personality, share your values, and create meaningful connections with your audience. When followers feel connected to you on a personal level, they are far more likely to become loyal customers and brand advocates. This is why a thoughtful caption strategy is not just about getting likes but about cultivating a community around your brand. Additionally, well-written captions can drive traffic to your website, increase your newsletter sign-ups, and boost sales for your products or services. Every element of your caption, from the opening hook to the closing call to action, should be designed with a specific goal in mind.
            </p>

            <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #cc2366' }}>
              <h4 style={{ marginTop: 0, color: '#cc2366' }}>The 3-Part Caption Formula</h4>
              <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
                <strong>Hook (Line 1):</strong> Stop the scroll with a bold statement or question. This is your only chance to grab attention, so make it count. Use curiosity gaps, surprising statistics, or emotionally charged language to compel users to stop and read more. <br />
                <strong>Body:</strong> Deliver value, tell a story, or explain the context of your post. This is where you build rapport and provide substance. Share personal anecdotes, educational insights, or entertaining narratives that keep readers engaged. <br />
                <strong>CTA:</strong> Direct your audience to comment, save, or click the link in bio. A strong call to action can significantly increase your engagement metrics. Be specific about what you want your audience to do next, whether it is tagging a friend, sharing their opinion, or visiting your website.
              </p>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Caption Length and Hashtag Usage</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              For feed posts, aim for 150-300 words in your caption. For Reels, shorter captions (under 100 characters) that quickly convey the value of the post tend to perform better. Regarding hashtags, using a mix of niche-specific (e.g., #CryptoInvestor) and broad tags (e.g., #Finance) provides both discoverability and community access. Our generator automatically adds relevant hashtags to each caption. The strategic use of hashtags cannot be overstated, as they function as the primary discovery mechanism on Instagram beyond the algorithmic feed. By researching and selecting the right combination of hashtags, you can place your content in front of users who are actively interested in your niche but may not yet follow you. We recommend using a rotating set of 20 to 30 carefully curated hashtags that you cycle through based on the specific content of each post. Avoid using banned or spammy hashtags, as these can actually hurt your reach and potentially lead to shadowbanning. Additionally, consider placing your hashtags in the first comment rather than in the caption body itself if you prefer a cleaner aesthetic, as both methods are equally effective for discoverability. The key is to stay updated on trending hashtags within your industry and to analyze which tags consistently drive the most engagement for your specific content type.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tone Matters: Matching Your Voice to Your Audience</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Our tool provides four tone options: Professional, Funny, Minimalist, and Inspirational. Each caters to a different audience segment. A B2B SaaS company should use a professional and informative tone, while a personal fitness creator thrives with an inspirational and motivational voice. Choosing the right tone dramatically increases your audience connection rate. The tone of your captions should align seamlessly with your overall brand voice and the expectations of your target demographic. For instance, a travel blogger targeting adventurous millennials may benefit from a witty and casual tone that feels like a conversation with a friend, while a financial advisor targeting professionals should maintain a tone of authority and trustworthiness. Understanding the nuances of tone can also help you navigate sensitive topics and build deeper emotional connections with your audience. Experimenting with different tones across various posts can provide valuable insights into what resonates most with your followers. Our AI generator makes this experimentation effortless by allowing you to generate multiple versions of the same caption in different tones, so you can compare and choose the one that feels most authentic to your brand. Consistency in tone across your feed also helps establish a recognizable brand identity that followers come to trust and look forward to engaging with on a daily basis.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Advanced Storytelling Techniques for Instagram Captions</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Beyond the basic structure of hook, body, and call to action, mastering the art of storytelling can elevate your Instagram presence to new heights. People are naturally drawn to narratives, and a well-told story can create an emotional connection that static images alone cannot achieve. Consider using the &quot;before and after&quot; framework to showcase transformations, the &quot;problem and solution&quot; approach to demonstrate value, or the &quot;behind the scenes&quot; style to humanize your brand. Each of these narrative structures serves a different purpose and can be adapted to virtually any niche or industry. When telling stories on Instagram, remember to keep your language conversational and relatable. Avoid overly complex vocabulary that might alienate readers, and instead write as if you are speaking directly to a close friend. Using line breaks strategically can also improve readability and keep your audience engaged throughout longer captions. The most successful Instagram storytellers understand that authenticity trumps perfection every time. Audiences can sense when a caption is overly scripted or inauthentic, so do not be afraid to show vulnerability, humor, and real emotions. Our AI caption generator can help you brainstorm compelling narrative angles that you can then personalize with your unique voice and experiences for maximum impact.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Leveraging User-Generated Content and Community Engagement</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              One of the most effective ways to grow your Instagram presence is by actively engaging with your community and encouraging user-generated content. Your captions can play a pivotal role in this strategy by explicitly inviting your followers to participate in conversations, share their own experiences, or contribute to your content. For example, you might ask a question at the end of your caption that prompts followers to share their thoughts in the comments, or you could create a branded hashtag that fans can use when posting about your products. Reposting user-generated content with thoughtful captions that credit and celebrate your community not only provides you with authentic content but also strengthens the loyalty of your most engaged followers. Additionally, responding to comments on your posts with meaningful replies rather than generic reactions can significantly boost your engagement rates and foster a sense of belonging among your audience. The Instagram algorithm takes into account the depth of conversation happening in your comment section, so longer, more thoughtful comment threads can signal high-quality content and improve your visibility. Our AI caption generator can help you craft prompts and questions that are specifically designed to maximize comment engagement and community participation.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Using Emojis and Formatting to Enhance Readability</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Visual breaks in your caption text can significantly improve readability and engagement. Emojis serve as both decorative elements and communication tools that convey emotion and context quickly. Using relevant emojis in your captions can increase engagement by making your content more visually appealing and relatable. However, moderation is key. Overusing emojis can make your captions appear unprofessional or cluttered. Similarly, formatting techniques such as line breaks, bullet points, and short paragraphs make your content more scannable for mobile users who are browsing quickly. Instagram does not natively support bold or italic formatting, but many creators use creative workarounds like special Unicode characters or third-party apps to add emphasis to specific words. Our AI caption generator incorporates best practices for emoji usage and formatting automatically, ensuring that your captions are both visually appealing and optimized for maximum readability across all devices.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Measuring Caption Performance and Iterating</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Creating great captions is an iterative process that requires ongoing analysis and refinement. To truly optimize your Instagram caption strategy, you need to track which types of captions generate the highest engagement rates for your specific audience. Instagram Insights provides valuable data on impressions, reach, saves, shares, and comment counts that you can correlate with your caption styles. Pay attention to patterns: do your inspirational quotes get more saves? Do your question-based captions generate more comments? Do your educational posts get more shares? By systematically analyzing this data, you can identify what resonates most with your audience and double down on those formats. Our AI caption generator makes it easy to experiment with different approaches and maintain a consistent posting schedule, which is another critical factor in algorithmic success. The more consistently you post high-quality content with optimized captions, the more the algorithm will reward you with increased visibility in your followers feeds and on the Explore page.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Your Caption Strategy Directly Impacts Reach</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              The Instagram algorithm rewards posts that generate immediate engagement â€” saves, shares, and comments in the first 30 minutes of posting. A well-crafted caption with a clear Call-to-Action (CTA) like &quot;Save this post for later&quot; or &quot;Tag a friend who needs this&quot; can dramatically boost your initial engagement rate and signal to the algorithm that your content deserves a wider distribution.
            </p>

            <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #cc2366' }}>
              <h4 style={{ marginTop: 0, color: '#cc2366' }}>The 3-Part Caption Formula</h4>
              <p style={{ marginBottom: 0, fontSize: '15px', color: 'var(--muted)' }}>
                <strong>Hook (Line 1):</strong> Stop the scroll with a bold statement or question. <br />
                <strong>Body:</strong> Deliver value, tell a story, or explain the context of your post. <br />
                <strong>CTA:</strong> Direct your audience to comment, save, or click the link in bio.
              </p>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Caption Length and Hashtag Usage</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              For feed posts, aim for 150-300 words in your caption. For Reels, shorter captions (under 100 characters) that quickly convey the video&apos;s value tend to perform better. Regarding hashtags, using a mix of niche-specific (e.g., #CryptoInvestor) and broad tags (e.g., #Finance) provides both discoverability and community access. Our generator automatically adds relevant hashtags to each caption.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tone Matters: Matching Your Voice to Your Audience</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Our tool provides four tone options: Professional, Funny, Minimalist, and Inspirational. Each caters to a different audience segment. A B2B SaaS company should use a professional and informative tone, while a personal fitness creator thrives with an inspirational and motivational voice. Choosing the right tone dramatically increases your audience connection rate.
            </p>
          </article>
        </div>
      }
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
         <input 
          type="text" 
          className="input-field" 
          placeholder="What is your post about? (e.g., 'Morning Coffee', 'New Product')" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ marginBottom: '16px', fontSize: '17px' }} 
         />

         <div className="responsive-tone-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
           {['Professional', 'Funny', 'Minimalist', 'Inspirational'].map((t) => (
             <button 
              key={t}
              onClick={() => setTone(t)}
              style={{ 
                padding: '12px 10px', 
                fontSize: '14px', 
                fontWeight: '500',
                borderRadius: '12px', 
                border: '1px solid var(--card-border)',
                background: tone === t ? 'var(--foreground)' : 'rgba(255,255,255,0.05)',
                color: tone === t ? 'var(--background)' : 'var(--foreground)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
             >
               {t}
             </button>
           ))}
         </div>

         <button 
          className="premium-button" 
          onClick={generateCaptions}
          disabled={isLoading}
          style={{ width: '100%', padding: '16px', fontSize: '17px' }}
         >
           {isLoading ? 'AI Writing Captions...' : 'Generate Viral Captions'}
         </button>
      </div>
    </ToolLayout>
  );
}

