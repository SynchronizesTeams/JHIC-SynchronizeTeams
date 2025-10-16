import type { News } from '../types/news';

export const useNews = () => {
  const newsList = ref<News[]>([
    {
      slug: "sora-2-breakthrough",
      title: "Sora 2: A New Era of AI Video Generation",
      excerpt:
        "OpenAI announces Sora 2, an advanced AI model that brings realistic video generation closer to reality.",
      cover: "https://picsum.photos/seed/sora2/1920/1080",
      date: "2025-10-10",
      author: "OpenAI Research Team",
      content: `
<h3>Introducing Sora 2</h3>
<p>Sora 2 pushes the boundaries of generative AI, allowing users to create cinematic-quality videos from text prompts.</p>
<p>The new model features enhanced realism, scene continuity, and improved physics simulation.</p>
<h3>What’s New</h3>
<ul>
  <li>Better motion coherence</li>
  <li>Higher visual fidelity</li>
  <li>Realistic lighting & reflections</li>
  <li>Longer video duration</li>
</ul>
<p>Sora 2 is currently available for research preview.</p>
      `,
    },
    {
      slug: "ai-music-evolution",
      title: "AI in Music: How Neural Networks Compose Songs",
      excerpt:
        "AI models are learning not just to replicate but to innovate in the world of music creation.",
      cover: "https://picsum.photos/seed/aimusic/1920/1080",
      date: "2025-09-28",
      author: "AI Labs",
      content: `
<h3>The New Wave of AI Music</h3>
<p>Recent advancements in neural audio models have enabled composition systems that adapt to user emotion and context.</p>
<h3>Key Highlights</h3>
<ul>
  <li>Real-time composition</li>
  <li>Multi-instrument generation</li>
  <li>Emotion-based modulation</li>
</ul>
      `,
    },
    {
      slug: "gpt-6-preview",
      title: "Introducing GPT-6: The Next Leap in Language Understanding",
      excerpt:
        "OpenAI unveils GPT-6, featuring deeper reasoning, multimodal understanding, and improved factual accuracy.",
      cover: "https://picsum.photos/seed/gpt6/1920/1080",
      date: "2025-08-15",
      author: "OpenAI Communications",
      content: `
<h3>Smarter and More Context-Aware</h3>
<p>GPT-6 represents a major step toward human-level reasoning and comprehension. The model can process complex multimodal inputs, from text to video.</p>
<h3>Major Improvements</h3>
<ul>
  <li>Enhanced factual consistency</li>
  <li>Context retention across long documents</li>
  <li>Built-in model interpretability</li>
</ul>
<p>Currently available to researchers through the OpenAI API beta.</p>
      `,
    },
    {
      slug: "robotics-research-2025",
      title: "AI-Powered Robotics: Merging Intelligence with Motion",
      excerpt:
        "The frontier of robotics meets AI — enabling adaptable, context-aware physical systems.",
      cover: "https://picsum.photos/seed/robotics/1920/1080",
      date: "2025-07-30",
      author: "OpenAI Robotics",
      content: `
<h3>Intelligence in Motion</h3>
<p>Our research focuses on integrating large language models into robotic control systems. Robots can now interpret human commands and execute complex tasks.</p>
<h3>Applications</h3>
<ul>
  <li>Industrial automation</li>
  <li>Assistive robotics</li>
  <li>Human-robot collaboration</li>
</ul>
<p>Robots are becoming not just reactive, but proactively intelligent.</p>
      `,
    },
    {
      slug: "ethics-in-ai",
      title: "AI Ethics 2025: Transparency and Responsibility in AI Systems",
      excerpt:
        "Building responsible AI means creating transparent systems that align with human values.",
      cover: "https://picsum.photos/seed/aithics/1920/1080",
      date: "2025-06-18",
      author: "OpenAI Policy Team",
      content: `
<h3>Transparency as a Core Value</h3>
<p>As AI becomes more embedded in society, it's critical that systems remain interpretable and fair.</p>
<h3>Our Ethical Priorities</h3>
<ul>
  <li>Bias mitigation</li>
  <li>Explainable outputs</li>
  <li>Human-centered governance</li>
</ul>
<p>OpenAI continues to work with policymakers and academics to guide AI responsibly.</p>
      `,
    },
    {
      slug: "energy-efficient-ai",
      title: "Greener AI: Reducing Energy Footprints in Training Models",
      excerpt:
        "AI systems are becoming more sustainable through innovations in compute optimization and model efficiency.",
      cover: "https://picsum.photos/seed/greenerai/1920/1080",
      date: "2025-05-09",
      author: "Sustainability Research",
      content: `
<h3>Efficiency at Scale</h3>
<p>Recent advances allow us to train models with up to 40% less energy usage compared to last generation systems.</p>
<h3>Key Technologies</h3>
<ul>
  <li>Adaptive compute scheduling</li>
  <li>Low-power inference pipelines</li>
  <li>AI-optimized data centers</li>
</ul>
<p>Toward a more sustainable AI future.</p>
      `,
    },
    {
      slug: "ai-education-revolution",
      title: "Transforming Education with AI-Powered Learning Tools",
      excerpt:
        "AI tutoring systems are personalizing learning experiences for millions of students worldwide.",
      cover: "https://picsum.photos/seed/aieducation/1920/1080",
      date: "2025-04-25",
      author: "OpenAI Learning Lab",
      content: `
<h3>Adaptive Learning</h3>
<p>AI-driven systems tailor lessons to each student’s needs and pace, making education more inclusive and efficient.</p>
<h3>Impact Metrics</h3>
<ul>
  <li>Higher retention rates</li>
  <li>Faster comprehension</li>
  <li>Reduced learning gaps</li>
</ul>
<p>Education meets intelligence — for everyone, everywhere.</p>
      `,
    },
    {
      slug: "openai-partnerships-2025",
      title: "Expanding Collaboration: OpenAI Partnerships for Innovation",
      excerpt:
        "OpenAI strengthens collaborations across academia, enterprise, and open-source communities.",
      cover: "https://picsum.photos/seed/partnerships/1920/1080",
      date: "2025-03-12",
      author: "OpenAI Press",
      content: `
<h3>Building the Ecosystem</h3>
<p>Through strategic partnerships, OpenAI aims to accelerate safe and beneficial AI deployment worldwide.</p>
<h3>Highlights</h3>
<ul>
  <li>Joint research with universities</li>
  <li>Enterprise-level integration</li>
  <li>Open tools for developers</li>
</ul>
<p>Collaboration fuels innovation — responsibly.</p>
      `,
    },
  ]);

  const getNews = (slug: string): News | undefined => newsList.value.find((n) => n.slug === slug);

  return { newsList, getNews };
};
