import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Shorts Ideas Generator — Viral Short Ideas & Scripts | ToolSnappy",
  description: "Generate 10 viral YouTube Shorts ideas with hooks, scripts, hashtags, and thumbnail text. Free AI-powered tool for creators who want to grow faster.",
  openGraph: {
    title: "YouTube Shorts Ideas Generator — Viral Short Ideas & Scripts",
    description: "Generate 10 viral YouTube Shorts ideas with hooks, scripts, hashtags, and thumbnail text. Free AI-powered tool for creators.",
    url: "https://toolsnappy.com/shorts-ideas",
    images: [{ url: "https://toolsnappy.com/logo.svg", width: 256, height: 256 }],
  },
  twitter: {
    title: "YouTube Shorts Ideas Generator — Viral Short Ideas & Scripts",
    description: "Generate 10 viral YouTube Shorts ideas with hooks, scripts, hashtags, and thumbnail text.",
    images: ["https://toolsnappy.com/logo.svg"],
  },
  alternates: {
    canonical: 'https://toolsnappy.com/shorts-ideas',
  },
};

export default function ShortsIdeasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
