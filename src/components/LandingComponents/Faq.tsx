import { useState } from 'react';
import FaqItem from './FaqItem';

// --- Import the animation components ---
import { motion } from 'framer-motion';
import TextAnimation from '../ui/AnimationText';

// --- Reusable Variants ---
// A container variant for staggering children's animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // The delay between each child animating in
    },
  },
};

// A variant for individual items in a staggered list
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};


// --- FAQ Data (remains the same) ---
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
  },];

const FaqSection = () => {
  // State for the accordion (remains the same)
  const [openItemId, setOpenItemId] = useState<number | null>(faqData[0].id);

  // We no longer need the useInView hook. It's handled by Framer Motion's `whileInView`.

  const handleToggle = (id: number) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="pt-44 max-sm:pt-20 bg-[#f8f7f4] font-sans">

      <div className='p-22 max-sm:p-0'></div>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 max-sm:px-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
          
          {/* Left Column: Title and Contact */}
          <div className="lg:col-span-1">
            <TextAnimation
              as="h2"
              text="Frequently Asked Questions"
              classname="text-4xl sm:text-5xl font-semibold leading-tight text-black/70"
            />
            <TextAnimation
              as="p"
              text="In a creative workplace, employees with responsibly try different solutions"
              classname="mt-4 text-black/70"
            />
            {/* Animate the link as a single block for a clean effect */}
            <motion.a
              href="#contact"
              variants={staggerItem} // We can reuse the item variant
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }} // Add a slight delay to have it appear last
              className="inline-block mt-10 text-black/70 font-medium border-b-2 border-white pb-1 hover:border-gray-500 hover:text-gray-500 transition-colors"
            >
              Contact support
            </motion.a>
          </div>

          {/* Right Column: Accordion */}
          {/* This motion.div will act as the staggering container */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the list is visible
          >
            {faqData.map((item) => (
              // Each item is now a motion component that inherits the stagger
              <motion.div key={item.id} variants={staggerItem}>
                <FaqItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItemId === item.id}
                  onClick={() => handleToggle(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className='p-12'></div>
    </div>
  );
};

export default FaqSection;