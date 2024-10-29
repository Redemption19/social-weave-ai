'use client'
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

interface DocSectionType {
  title: string;
  description: string;
  link: string;
}

const docsSections: DocSectionType[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to set up your account and create your first AI-generated content. This feature provides guidance on account setup and step-by-step assistance for content creation.",
    link: "/docs/getting-started",
  },
  {
    title: "Twitter Threads",
    description:
      "Discover how to create engaging Twitter threads using our AI technology. Our tools help streamline your process and create threads that captivate your audience.",
    link: "/docs/twitter-threads",
  },
  {
    title: "Instagram Captions",
    description:
      "Learn the best practices for generating Instagram captions that boost engagement. Create captivating captions that resonate with your followers and drive interaction.",
    link: "/docs/instagram-captions",
  },
  {
    title: "LinkedIn Posts",
    description:
      "Explore techniques for crafting professional LinkedIn content with AI assistance. Our AI-driven approach helps you achieve the perfect tone and style for your posts.",
    link: "/docs/linkedin-posts",
  },
  {
    title: "API Reference",
    description:
      "Detailed documentation for integrating our AI content generation into your applications. Access the tools and information you need to integrate seamlessly.",
    link: "/docs/api-reference",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <main className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">
          Documentation
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
    <div className="p-6 rounded-lg border border-gray-800 flex flex-col">
      <h2 className="text-2xl font-bold mb-3 text-white">{section.title}</h2>
      <p className="text-gray-400 mb-4 flex-grow">
        {isExpanded ? section.description : `${section.description.slice(0, 80)}...`}
      </p>
      <Button
        onClick={toggleReadMore}
        className="w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </Button>
    </div>
  );
}
