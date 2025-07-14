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
    <header className="relative flex h-[25vh] min-h-[400px] sm:h-[30vh] sm:min-h-[500px] flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-white">
      {/* Gradient background layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-emerald-300" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
  
      {/* Content overlays */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <span className="mb-2 block text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Case Study
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          {title}
        </h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-slate-200">
          {subtitle}
        </p>
      </div>
    </header>
  );
  
  

// 2. Key Metrics Bar - Enhanced responsive design
const KeyMetricsBar = ({ metrics }: { metrics: KeyMetric[] }) => (
  <div className="bg-slate-50 ">
    <div className="mx-auto flex max-w-7xl justify-between lg:justify-center lg:gap-8 gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="text-center flex-1 lg:flex-none">
          <metric.icon className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" aria-hidden="true" />
          <p className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-black/70">{metric.value}</p>
          <p className="text-xs sm:text-sm font-medium text-black">{metric.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// 3. Project Info - Enhanced responsive design
const ProjectInfo = ({ info }: { info: ProjectInfo }) => (
  <div className="mb-6 sm:mb-8 lg:mb-10 rounded-lg border border-gray-00 bg-white p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-black/70">Project at a Glance</h3>
    <dl className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-sm">
      <div>
        <dt className="font-medium text-slate-500">Client</dt>
        <dd className="mt-1 text-black/70">{info.client}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Industry</dt>
        <dd className="mt-1 text-black/70">{info.industry}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Services</dt>
        <dd className="mt-1 text-black/70">{info.services.join(", ")}</dd>
      </div>
    </dl>
  </div>
);

// 4. Table of Contents - Enhanced responsive design with mobile considerations
const TableOfContents = ({ sections, activeSection }: { sections: { id: string; title: string }[]; activeSection: string }) => (
  <aside className="sticky top-20 sm:top-24 lg:top-28 hidden lg:block h-fit">
    <h3 className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-black/70">
      On This Page
    </h3>
    <ul className="space-y-1 sm:space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`flex items-center rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
              activeSection === section.id
                ? "bg-emerald-50 font-semibold text-emerald-700"
                : "text-black/70 hover:bg-slate-100 hover:text-emerald-700"
            }`}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

// 5. Main Content Section - Enhanced responsive typography and spacing
const ContentSection = React.forwardRef<HTMLElement, { section: CaseStudyContentSection }>(
    ({ section }, ref) => (
      <section ref={ref} id={section.id} className="scroll-mt-16 sm:scroll-mt-20 lg:scroll-mt-24 content-section">
        <h2 className="font-serif text-2xl sm:text-2xl md:text-3xl font-bold text-black/70">{section.title}</h2>
        <div className="prose prose-sm sm:prose-base lg:prose-lg mt-3 sm:mt-4 max-w-none text-black/70 prose-li:my-0.5 sm:prose-li:my-1">
          {section.paragraphs.map((p, i) => <p key={i} className="mb-3 sm:mb-4">{p}</p>)}
          {section.listItems && (
            <ul className="mt-4 sm:mt-6">
              {section.listItems.map((item, i) => (
                <li key={i} className="flex items-start mb-2 sm:mb-3">
                  <CheckCircleIcon className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr className="my-8 sm:my-12 lg:my-16 border-slate-200" />
      </section>
    )
);
ContentSection.displayName = "ContentSection";

// 6. Call To Action - Enhanced responsive design
const CallToAction = () => (
    <div className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Have a similar challenge?
            </h2>
            <p className="mt-3 sm:mt-4 text- sm:text-lg leading-7 sm:leading-8 text-black/70 max-w-2xl mx-auto">
                Let's discuss how we can apply our expertise to elevate your project. We specialize in creating robust, scalable, and user-friendly digital solutions.
            </p>
            <div className="mt-6 sm:mt-8">
            <button 
              className="border border-black px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors w-full sm:w-auto flex-shrink-0 text-sm sm:text-base"
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
    <main className=" bg-[#ffffff] font-sans">
      <CaseStudyHero
        title={caseStudyData.title}
        subtitle={caseStudyData.subtitle}     />
  <KeyMetricsBar metrics={caseStudyData.keyMetrics} />

<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
  {/* Mobile: Single column layout */}
  <div className="lg:hidden">
    <ProjectInfo info={caseStudyData.projectInfo} />
    
    {/* Mobile Table of Contents */}
    <div className="mb-6 sm:mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-3">
        On This Page
      </h3>
      <ul className="space-y-1">
        {caseStudyData.content.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-emerald-50 font-semibold text-emerald-700"
                  : "text-black/70 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Mobile Main Content */}
    <article className="main-content-area">
      {caseStudyData.content.map((section, index) => (
        <ContentSection
          key={section.id}
          section={section}
          ref={el => sectionRefs.current[index] = el}
        />
      ))}
    </article>
  </div>

  {/* Desktop: Two column layout */}
  <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 xl:gap-12">
    {/* Left Column: Project Info & Sticky TOC */}
    <div className="lg:col-span-1">
        <ProjectInfo info={caseStudyData.projectInfo} />
        <TableOfContents sections={caseStudyData.content} activeSection={activeSection} />
    </div>

    {/* Right Column: Main Content */}
    <article className="lg:col-span-3 main-content-area">
      {caseStudyData.content.map((section, index) => (
        <ContentSection
          key={section.id}
          section={section}
          ref={el => sectionRefs.current[index] = el}
        />
      ))}
    </article>
  </div>
</div>

<CallToAction />
</main>
  );
};

export default ProjectProfile;