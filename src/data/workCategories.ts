export type WorkCategory = {
  slug: "3d" | "motion" | "uiux" | "video-to-3d";
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  gradient: string;
  previewImage: string;
};

export const workCategories: WorkCategory[] = [
  {
    slug: "3d",
    title: "3D",
    subtitle: "Realtime Spatial Work",
    description: "Dark, depth-heavy visuals with subtle spatial motion and lighting.",
    accent: "#60b4ff",
    gradient:
      "radial-gradient(ellipse at 25% 30%, rgba(96,180,255,0.35) 0%, rgba(0,0,0,0.0) 55%), linear-gradient(150deg,#0a0a0a 20%, #101726 100%)",
    previewImage:
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "motion",
    title: "Motion Graphics",
    subtitle: "Dynamic Story Frames",
    description: "Animated gradients and cinematic pacing for high-energy visual narratives.",
    accent: "#a29bfe",
    gradient:
      "radial-gradient(ellipse at 75% 35%, rgba(162,155,254,0.4) 0%, rgba(0,0,0,0.0) 50%), linear-gradient(130deg,#140d22 0%, #0a0a0a 100%)",
    previewImage:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "uiux",
    title: "UI/UX",
    subtitle: "Clarity & Product Systems",
    description: "Minimal, sharp typography and clear structure with strong usability.",
    accent: "#ff6b6b",
    gradient:
      "radial-gradient(ellipse at 50% 20%, rgba(255,69,0,0.22) 0%, rgba(0,0,0,0) 45%), linear-gradient(180deg,#f7f8fb 0%, #d9dee8 100%)",
    previewImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "video-to-3d",
    title: "Video-to-3D",
    subtitle: "AI Pipeline Engineering",
    description: "Tech-forward workflows with scan, reconstruction and delivery pipelines.",
    accent: "#fb923c",
    gradient:
      "radial-gradient(ellipse at 70% 60%, rgba(251,146,60,0.32) 0%, rgba(0,0,0,0) 50%), linear-gradient(155deg,#120d0a 0%, #0a0a0a 100%)",
    previewImage:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1600&q=80",
  },
];

