"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShareIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  ChartPieIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

// Register GSAP plugin once globally
gsap.registerPlugin(ScrollTrigger);
 
interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
  }

interface KeyMetric {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface ProjectInfo {
  client: string;
  industry: string;
  services: string[];
}

interface CaseStudyContentSection {
  title: string;
  id: "context" | "solution" | "results";
  paragraphs: string[];
  listItems?: string[];
}

interface CaseStudy {
  id: number;
  slug: string;
  heroImage: string;
  title: string;
  subtitle: string;
  keyMetrics: KeyMetric[];
  projectInfo: ProjectInfo;
  content: CaseStudyContentSection[];
}

const caseStudyData: CaseStudy = {
  id: 2,
  slug: "platform-upgrade-nonprofit-education",
  title: "Platform upgrade for a nonprofit education & research organization",
  subtitle:
    "We helped the customer ensure their platform's stability to sustain 50% user base growth and minimize its maintenance costs by making it more future-proof.",
  heroImage:
    "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  keyMetrics: [
    { icon: ChartPieIcon, value: "-60%", label: "Page Load Time" },
    { icon: UsersIcon, value: "+200%", label: "Concurrent User Capacity" },
    { icon: WrenchScrewdriverIcon, value: "-40%", label: "Maintenance Costs" },
  ],
  projectInfo: {
    client: "Global Sustainability Institute",
    industry: "Nonprofit & Education",
    services: ["Web App Modernization", "Cloud Migration (AWS)", "UI/UX Enhancements"],
  },
  content: [
    // ... (content remains the same as original)
    {
      title: "Context",
      id: "context",
      paragraphs: [
        "Our customer is an education and research-focused organization operating as a nonprofit. Their primary area of work centers on sustainable development, with an emphasis on planning and engineering within urban environments. Since its founding in 2007, the organization has provided tools, resources, and strategic guidance to help global communities build more resilient and sustainable infrastructures.",
        "To support these efforts, the customer has a platform designed to evaluate the sustainability and resilience of infrastructure systems. It also supports the company's other key activities, including:",
      ],
      listItems: [
        "Offering education and training on sustainability topics",
        "Evaluating and rating infrastructure initiatives",
        "Operating a membership program that provides access to resources, professional development, and project validation services",
      ],
    },
    {
      title: "Solution",
      id: "solution",
      paragraphs: [
        "As part of their growth strategy, the customer sought to upgrade their platform to support a larger user base and increasing system demands. They chose Itransition based on our expertise in web application development for education and nonprofit sectors to ensure the platform's scalability and reliable performance.",
        "Our team performed a comprehensive architectural review and proposed a migration to a modern, microservices-based architecture. We rebuilt the core application using Node.js and React, deploying it on AWS for enhanced scalability and reliability. This involved a phased rollout to minimize disruption for existing users.",
      ],
    },
    {
      title: "Results",
      id: "results",
      paragraphs: [
        "The newly architected platform successfully launched with zero downtime. The modern tech stack and scalable infrastructure immediately improved performance, with page load times decreasing by an average of 60%.",
        "The new system is now capable of handling a 200% increase in concurrent users, far exceeding the initial 50% growth target. The customer also reported a 40% reduction in maintenance overhead, allowing them to redirect resources towards new educational programs and community initiatives.",
      ],
    },
  ],
};



const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ title, subtitle }) => (
    <header className="relative flex h-[30vh] min-h-[500px] flex-col justify-end p-8 text-white md:p-12 lg:p-16 bg-gradient-to-br from-black to-teal-300">
      {/* Gradient background layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-teal-300" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
  
      {/* Content overlays */}
      <div className="relative z-10 max-w-4xl">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-teal-400">
          Case Study
        </span>
        <h1 className="font-serif text-4xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-200 md:text-xl">
          {subtitle}
        </p>
      </div>
    </header>
  );
  
  

// 2. Key Metrics Bar - NEW COMPONENT for high-impact info
const KeyMetricsBar = ({ metrics }: { metrics: KeyMetric[] }) => (
  <div className="bg-slate-50 border-b border-slate-200">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="text-center">
          <metric.icon className="mx-auto h-8 w-8 text-teal-500" aria-hidden="true" />
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{metric.value}</p>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// 3. Project Info - NEW COMPONENT for scannable metadata
const ProjectInfo = ({ info }: { info: ProjectInfo }) => (
  <div className="mb-10 rounded-lg border border-slate-200 bg-white p-6">
    <h3 className="text-lg font-semibold text-slate-900">Project at a Glance</h3>
    <dl className="mt-4 space-y-4 text-sm">
      <div>
        <dt className="font-medium text-slate-500">Client</dt>
        <dd className="mt-1 text-slate-800">{info.client}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Industry</dt>
        <dd className="mt-1 text-slate-800">{info.industry}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Services</dt>
        <dd className="mt-1 text-slate-800">{info.services.join(", ")}</dd>
      </div>
    </dl>
  </div>
);

// 4. Table of Contents - Refined styling
const TableOfContents = ({ sections, activeSection }: { sections: { id: string; title: string }[]; activeSection: string }) => (
  <aside className="sticky top-28 hidden h-fit lg:block">
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
      On This Page
    </h3>
    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ${
              activeSection === section.id
                ? "bg-teal-50 font-semibold text-teal-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>

  </aside>
);

// 5. Main Content Section - Enhanced typography and list styles
const ContentSection = React.forwardRef<HTMLElement, { section: CaseStudyContentSection }>(
    ({ section }, ref) => (
      <section ref={ref} id={section.id} className="scroll-mt-24 content-section">
        <h2 className="font-serif text-3xl font-bold text-slate-900">{section.title}</h2>
        <div className="prose prose-lg mt-4 max-w-none text-slate-600 prose-li:my-1">
          {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {section.listItems && (
            <ul>
              {section.listItems.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircleIcon className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr className="my-16 border-slate-200" />
      </section>
    )
);
ContentSection.displayName = "ContentSection";

// 6. Call To Action - NEW COMPONENT to guide user's next step
const CallToAction = () => (
    <div className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Have a similar challenge?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
                Let's discuss how we can apply our expertise to elevate your project. We specialize in creating robust, scalable, and user-friendly digital solutions.
            </p>
            <div className="mt-8 ">
            <button 
              className="border border-black px-8 py-3 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors w-full md:w-auto flex-shrink-0"
              onClick={() => (window.location.href = "mailto:hr@codevider.com")}
            >
              Let's Talk
            </button>
            </div>
        </div>
    </div>
);


const ProjectProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(caseStudyData.content[0].id);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // --- GSAP SCROLL-TRIGGER FOR ACTIVE SECTION HIGHLIGHTING ---
    const triggers = sectionRefs.current.map((section, index) => {
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(caseStudyData.content[index].id),
        onEnterBack: () => setActiveSection(caseStudyData.content[index].id),
      });
    });

    // --- GSAP FADE-IN ANIMATION FOR CONTENT SECTIONS ---
    gsap.fromTo(
      ".content-section",
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2,
        scrollTrigger: { trigger: ".main-content-area", start: "top 80%", toggleActions: "play none none none" }
      }
    );

    return () => {
        // Cleanup GSAP triggers on component unmount
        triggers.forEach(trigger => trigger?.kill());
    }
  }, []);

  return (
    // Use `prose` with Tailwind Typography plugin for beautiful article styling out-of-the-box
    <main className="bg-white font-sans">
      <CaseStudyHero
        title={caseStudyData.title}
        subtitle={caseStudyData.subtitle}     />

      <KeyMetricsBar metrics={caseStudyData.keyMetrics} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-12 lg:px-8 lg:py-24">
        {/* Left Column: Project Info & Sticky TOC */}
        <div className="lg:col-span-1">
            <ProjectInfo info={caseStudyData.projectInfo} />
            <TableOfContents sections={caseStudyData.content} activeSection={activeSection} />
        </div>

        {/* Right Column: Main Content */}
        <article className="lg:col-span-3 main-content-area mt-12 lg:mt-0">
          {caseStudyData.content.map((section, index) => (
            <ContentSection
              key={section.id}
              section={section}
              ref={el => sectionRefs.current[index] = el}
            />
          ))}
        </article>
      </div>

      <CallToAction />
    </main>
  );
};

export default ProjectProfile;