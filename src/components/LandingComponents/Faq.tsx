import { useState } from 'react';
import FaqItem from './FaqItem';
import { useInView } from 'react-intersection-observer'; // Import the hook

// Define the FAQ data structure
const faqData = [
  {
    id: 1,
    question: 'What types of software projects do you take on?',
    answer:
      'We build everything from MVPs and mobile apps to large-scale SaaS platforms, internal tools, and complex cloud back-ends. If it involves custom code, we can probably handle it.',
  },
  {
    id: 2,
    question: 'Which technologies and frameworks do you specialize in?',
    answer:
      'Our core stack includes React / Next.js on the front-end and Node.js, .NET, and Python (Django/FastAPI) on the back-end. We also work with popular cloud services (AWS, Azure, GCP), SQL & NoSQL databases, and DevOps tools like Docker and Kubernetes.',
  },
  {
    id: 3,
    question: 'How do you estimate project timelines and budgets?',
    answer:
      'After a short discovery call, we break requirements into user stories, size them, and produce a detailed estimate with phased milestones. You get both time and cost ranges before we start coding.',
  },
  {
    id: 4,
    question: 'Will I own the source code and intellectual property?',
    answer:
      'Absolutely. Upon final payment (or as specified in the contract), you receive full ownership of the source code and all related IP.',
  },
  {
    id: 5,
    question: 'How will we communicate during the project?',
    answer:
      'You’ll have a dedicated project manager and access to a shared Slack channel, weekly demo calls, and a live Jira/Kanban board so you can track progress in real time.',
  },
  {
    id: 6,
    question: 'What is your quality-assurance process?',
    answer:
      'We follow automated testing (unit, integration, and end-to-end) plus peer code reviews and continuous integration pipelines. Security scans and performance benchmarks are baked into every release.',
  },
  {
    id: 7,
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Yes. We offer flexible support plans, from on-call bug fixes to continuous feature enhancements and infrastructure monitoring.',
  },
  {
    id: 8,
    question: 'Can you work with an existing or legacy codebase?',
    answer:
      'Definitely. We start with a code audit to map dependencies and technical debt, then create a phased refactor or feature-addition plan that minimises risk and downtime.',
  },
];

const FaqSection = () => {
  // State to track the currently open FAQ item. Starts with the first item open.
  const [openItemId, setOpenItemId] = useState<number | null>(faqData[0].id);

  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once when it comes into view
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  // Function to toggle FAQ items
  const handleToggle = (id: number) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    // Attach the ref to the main container of the section
    <div ref={ref} className="bg-white font-sans">
      <div className="container mx-auto max-w-6xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 max-sm:px-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
          
          {/* Left Column: Title and Contact */}
          {/* Conditionally apply animation classes based on `inView` status */}
          <div
            className={`lg:col-span-1 transition-opacity duration-1000 ${
              inView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-500">
              In a creative workplace, employees with responsibly try different solutions
            </p>
            <a
              href="#contact"
              className="inline-block mt-10 text-black font-medium border-b-2 border-black pb-1 hover:border-gray-500 hover:text-gray-500 transition-colors"
            >
              Contact support
            </a>
          </div>

          {/* Right Column: Accordion */}
          {/* Add a delay to this column for a staggered effect */}
          <div
            className={`lg:col-span-2 transition-opacity duration-1000 ${
              inView ? 'animate-fade-in-up [animation-delay:200ms]' : 'opacity-0'
            }`}
          >
            {faqData.map((item) => (
              <FaqItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItemId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;