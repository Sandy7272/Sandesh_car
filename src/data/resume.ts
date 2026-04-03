export const resume = {
  name: "Sandesh Gadakh",
  location: "Pune, Maharashtra, India",
  title: "Product Builder · Creative Technologist · 3D Generalist",
  email: "gadakhsandesh@gmail.com",
  phone: "+91-7447337272",
  links: {
    linkedin: "https://www.linkedin.com/in/sandesh-gadakh",
    github: "https://github.com/Sandy7272",
  },
  summary:
    "Results-driven Product Builder and Creative Technologist with 4+ years of experience spanning 3D design, motion graphics, AI-driven workflows, and product development. Proven track record of transforming early-stage systems into production-grade platforms — delivering 50+ client projects across real estate, education, and e-commerce sectors. Recognized for a 70% reduction in manual operations, 3× Best Employee Award at Byju's, and awarded equity for exceptional contributions at MetaShop AI.",
  experience: [
    {
      company: "MetaShop AI",
      when: "January 2023 – Present · Pune, India",
      role: "Product Builder & Creative Operations Lead",
      highlights: [
        "Architected and delivered company's first client-facing self-service product — an AI-powered website with integrated custom 3D viewer (React, Three.js).",
        "Transformed video-to-3D pipeline into an enterprise-grade production system using Gaussian Splatting and NeRF (Nerfstudio).",
        "Automated end-to-end 3D generation workflows, reducing manual operations by 70% and scaling output 3×.",
        "Managed and delivered 50+ client projects end-to-end (including L&T Realty and Kesari Weddings).",
        "Awarded equity stake by founder for exceptional product and operational contributions.",
      ],
    },
    {
      company: "Byju's (Think & Learn Pvt. Ltd.)",
      when: "October 2021 – January 2023 · Bangalore, India",
      role: "Motion Graphics Artist & 3D Specialist",
      highlights: [
        "Created motion graphics and 3D educational content consumed by millions of students.",
        "Built reusable animation systems and templates improving production efficiency by 40% across 100+ modules.",
        "Received Best Employee Award 3 consecutive times among 400+ design team members.",
      ],
    },
    {
      company: "Global Studio (Freelance)",
      when: "January 2020 – September 2021 · Pune, India",
      role: "Freelance 3D Assets & VFX Specialist",
      highlights: [
        "Created 3D models, VFX assets, and motion graphics for gaming and commercial clients.",
        "Managed end-to-end freelance pipeline with a 100% on-time delivery record.",
      ],
    },
  ],
  keyProjects: [
    {
      slug: "ai-ecommerce-3d-viewer",
      title: "AI-Powered E-Commerce Website & 3D Viewer",
      org: "MetaShop AI · 2024",
      stack: ["React", "Three.js", "Tailwind CSS", "AI-assisted development"],
      summary:
        "Responsive website with real-time 3D product visualization — the company’s first self-service product enabling customers to independently customize and interact with 3D models.",
    },
    {
      slug: "enterprise-3d-pipeline",
      title: "Enterprise 3D Production Pipeline",
      org: "MetaShop AI · 2023",
      stack: ["Blender", "Nerfstudio", "Gaussian Splatting", "3ds Max", "Substance Painter"],
      summary:
        "Rebuilt video-to-3D pipeline from scratch into a production-grade system using NeRF and Gaussian Fields research; onboarded L&T Realty and Kesari Weddings.",
    },
    {
      slug: "ops-automation",
      title: "Operations Automation Infrastructure",
      org: "MetaShop AI · 2023",
      stack: ["AI tools", "Process Automation", "Workflow Design"],
      summary:
        "Designed file tracking and automated processing workflows, eliminating 70% repetitive manual operations and enabling 3× output scaling.",
    },
    {
      slug: "stem-content-system",
      title: "STEM Educational Content System",
      org: "Byju's · 2022",
      stack: ["After Effects", "Blender", "Maya", "Premiere Pro"],
      summary:
        "Delivered 100+ animated learning modules and engineered a template system reducing per-module production time by 40% across a 15+ designer team.",
    },
  ],
  education: [
    {
      title: "B.Sc. Media Graphics & Animation",
      org: "Srajan College of Design · Pune University, Pune",
      when: "2019 – 2021",
    },
    {
      title: "Diploma in Computer Animation",
      org: "Srajan College of Design, Pune",
      when: "Completed August 2021",
    },
  ],
  awards: [
    "Adobe Certified Professional — Graphic Design (Illustrator, Photoshop)",
    "Best Employee Award — 3× (Byju's, 2021–2023)",
    "Equity Award (MetaShop AI, 2024)",
  ],
} as const;

