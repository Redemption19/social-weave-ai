'use client'
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { ChevronRight, BookOpen } from "lucide-react";

interface DocSectionType {
  title: string;
  description: string;
  link: string;
  bulletPoints?: string[];
}

const docsSections: DocSectionType[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to set up your account and create your first AI-generated content. This feature provides guidance on account setup and step-by-step assistance for content creation.",
    link: "/docs/getting-started",
    bulletPoints: [
      "Quick account setup guide",
      "First-time user walkthrough",
      "Basic content generation tutorial",
      "Platform navigation overview"
    ]
  },
  {
    title: "Twitter Threads",
    description:
      "Discover how to create engaging Twitter threads using our AI technology. Our tools help streamline your process and create threads that captivate your audience.",
    link: "/docs/twitter-threads",
    bulletPoints: [
      "Thread structure optimization",
      "Engagement maximization tips",
      "Automated thread generation",
      "Analytics integration"
    ]
  },
  {
    title: "Instagram Captions",
    description:
      "Learn the best practices for generating Instagram captions that boost engagement. Create captivating captions that resonate with your followers and drive interaction.",
    link: "/docs/instagram-captions",
    bulletPoints: [
      "Hashtag optimization",
      "Caption length guidelines",
      "Engagement triggers",
      "Content scheduling tips"
    ]
  },
  {
    title: "LinkedIn Posts",
    description:
      "Explore techniques for crafting professional LinkedIn content with AI assistance. Our AI-driven approach helps you achieve the perfect tone and style for your posts.",
    link: "/docs/linkedin-posts",
    bulletPoints: [
      "Professional tone adjustment",
      "Industry-specific templates",
      "B2B content strategies",
      "Personal branding tips"
    ]
  },
  {
    title: "API Reference",
    description:
      "Detailed documentation for integrating our AI content generation into your applications. Access the tools and information you need to integrate seamlessly.",
    link: "/docs/api-reference",
    bulletPoints: [
      "Authentication setup",
      "Endpoint documentation",
      "Rate limiting details",
      "Sample code examples"
    ]
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="container mx-auto px-8 py-40">
        <div className="flex items-center justify-center mb-12 gap-3">
          <BookOpen className="w-10 h-10 text-blue-500" />
          <h1 className="text-5xl font-bold text-center text-white">
            Documentation
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {docsSections.map((section, index) => (
            <DocSection key={index} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
}

function DocSection({ section }: { section: DocSectionType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="p-6 rounded-lg border border-gray-800 flex flex-col bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
        <ChevronRight className="w-5 h-5 text-blue-500" />
        {section.title}
      </h2>
      <div className="text-gray-400 mb-4 flex-grow">
        <p className="mb-4">
          {isExpanded ? section.description : `${section.description.slice(0, 80)}...`}
        </p>
        {isExpanded && section.bulletPoints && (
          <ul className="space-y-2 ml-4">
            {section.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        onClick={toggleReadMore}
        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </Button>
    </div>
  );
}