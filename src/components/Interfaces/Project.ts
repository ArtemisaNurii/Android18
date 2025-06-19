export interface Project {
    id: number;
    title: string;
    description: string;
    services: string[];
    market: string;
    industry: string;
    timescale: string;
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Trendy Store",
      description: "Trendy Fashion Store, an online retailer specializing in women's apparel, faced a significant drop in traffic and sales. After conducting a detailed SEO audit, we implemented a targeted keyword strategy and optimized product descriptions. As a result, organic traffic increased by 40% and sales by 25% within six months.",
      services: ["SEO Audits", "Keyword Research"],
      market: "USA",
      industry: "E-Commerce",
      timescale: "6 Months",
    },
    {
      id: 2,
      title: "ABC Plumbing",
      description: "ABC Plumbing, a local service provider, struggled to generate online leads. We developed a hyper-local SEO strategy, focusing on Google My Business optimization and localized content. This led to a 150% increase in qualified leads through their website in the first quarter.",
      services: ["Local SEO", "Content Marketing"],
      market: "Canada",
      industry: "Home Services",
      timescale: "3 Months",
    },
    {
      id: 3,
      title: "Innovative Software",
      description: "A B2B SaaS company, Innovative Software, needed to increase its domain authority and organic rankings for competitive keywords. Through a strategic link-building campaign and technical SEO fixes, we boosted their domain rating by 20 points and secured top-3 rankings for key terms.",
      services: ["Technical SEO", "Link Building"],
      market: "Global",
      industry: "SaaS",
      timescale: "12 Months",
    },
    {
      id: 4,
      title: "City Health Clinics",
      description: "City Health Clinics aimed to become the go-to source for health information in their region. We executed a content-driven strategy, producing high-quality, medically-reviewed articles. This resulted in a 300% growth in organic traffic and established them as a trusted health authority.",
      services: ["Content Strategy", "Medical SEO"],
      market: "UK",
      industry: "Healthcare",
      timescale: "8 Months",
    },
  ];