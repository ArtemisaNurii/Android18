
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Menu,

} from "lucide-react";
import Hero from '@/components/LandingComponents/Hero';
import AboutUsPage from '@/components/LandingComponents/AboutUs';
import ServicesPage from '@/components/LandingComponents/Services';
import Projects from '@/components/LandingComponents/Projects';
import Testimonials from '@/components/LandingComponents/Testimonials';
import Process from '@/components/LandingComponents/Process';
import Contact from '@/components/LandingComponents/ContactPage';
import HeroParallaxDemo from '@/components/LandingComponents/Team';
import logo from "../assets/images/whiteLogo.png"
import DotOrbitLoader from '@/components/Loader/Loader';
import NavbarVariant from '@/components/Navbar';
const Index = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = [heroRef, aboutRef, servicesRef, processRef, testimonialsRef, contactRef];
    elements.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DotOrbitLoader />;
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full bg-black backdrop-blur-md border-b border-transparent z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className=" font-bold text-white">            <img src={logo} alt="Logo" className="h-9 md:h-12 w-auto" />
            </div>
            <div className="hidden md:flex space-x-10">
              <a href="#about" className="text-white hover:text-cyan-600 font-medium transition-colors">About Us</a>
              <a href="#services" className="text-white hover:text-cyan-600 font-medium transition-colors">Services</a>
              <a href="#case-studies" className="text-white hover:text-cyan-600 font-medium transition-colors">Projects</a>
              <a href="#pricing" className="text-white hover:text-cyan-600 font-medium transition-colors">Pricing</a>
              <a href="#case-studies" className="text-white hover:text-cyan-600 font-medium transition-colors"> Contact Us</a>      </div>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-900">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav> */}
<NavbarVariant/>
      {/* Hero Section */}
<Hero/>

      {/* About Section */}
      {/* <section ref={aboutRef} id="about" className="py-24 px-6 lg:px-8 bg-gray-50 opacity-0 transition-all duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
              ABOUT US
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto leading-tight">
              Who we are: Our story and mission
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6 text-white text-lg leading-relaxed">
                <p>
                  In a digital landscape where visibility is paramount, our SEO company Lungo 
                  was born out of a passion for guiding businesses towards online success.
                </p>
                <p>
                  Our story begins with a small team of enthusiasts, united by a shared vision 
                  to revolutionize the way brands connect with their audience online. Fueled 
                  by innovation and driven by results, we embarked on a mission to empower 
                  businesses of all sizes to soar to new heights in the digital realm.
                </p>
                <p>
                  Join us on this journey as we continue to elevate brands and redefine what's 
                  possible in the ever-evolving world of digital marketing. Together, let's reach 
                  new heights and make your digital dreams a reality.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">500+</div>
                  <div className="text-sm text-white mt-1">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">50+</div>
                  <div className="text-sm text-white mt-1">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">99%</div>
                  <div className="text-sm text-white mt-1">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide">
                  Partnership & Certification
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Google Partner", icon: Search },
                    { name: "Microsoft Ads", icon: Target },
                    { name: "Facebook Partner", icon: Users },
                    { name: "HubSpot Certified", icon: TrendingUp }
                  ].map((partner, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cyan-200 transition-colors hover:shadow-md">
                      <partner.icon className="h-8 w-8 text-cyan-600 mb-3" />
                      <p className="text-sm font-medium text-gray-700">{partner.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white leading-relaxed">
                Our partnership and certification programs offer unparalleled opportunities 
                for businesses to collaborate with our expert team, driving impactful results 
                in the dynamic realm of Search Engine Optimization.
              </p>
            </div>
          </div>
        </div>
      </section> */}

<AboutUsPage/>
      {/* Services Section */}
      {/* <section ref={servicesRef} id="services" className="py-24 px-6 lg:px-8 opacity-0 transition-all duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
              SERVICES
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto leading-tight">
              What we can do for you
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Keyword Research",
                description: "We identify high-potential keywords that drive targeted traffic to your website, focusing on search volume and competition to align with your business goals.",
                icon: Search
              },
              {
                number: "02", 
                title: "On-Page Optimization",
                description: "Our service enhances your website's content and structure, optimizing elements like title tags and meta descriptions to improve rankings and user engagement.",
                icon: Target
              },
              {
                number: "03",
                title: "Link Building", 
                description: "We develop a customized link building strategy to acquire high-quality backlinks, boosting your website's authority and credibility for better search engine visibility.",
                icon: Link
              },
              {
                number: "04",
                title: "SEO Audits",
                description: "Our comprehensive SEO audits evaluate your website's performance, covering technical aspects and content quality, and providing actionable insights for improvement.",
                icon: BarChart3
              },
              {
                number: "05",
                title: "Content Strategy",
                description: "We create a tailored content plan that resonates with your audience, producing SEO-friendly content that drives organic traffic and establishes your brand authority.",
                icon: FileText
              },
              {
                number: "06",
                title: "Analytics & Reporting",
                description: "Track your progress with detailed analytics and comprehensive reports that show your ROI and help you make data-driven decisions for continued growth.",
                icon: TrendingUp
              }
            ].map((service, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:border-cyan-200 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <span className="text-6xl font-bold text-gray-100 group-hover:text-cyan-100 transition-colors">{service.number}</span>
                      <div className="bg-cyan-100 p-3 rounded-2xl group-hover:bg-cyan-200 transition-colors">
                        <service.icon className="h-8 w-8 text-cyan-600" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-white leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      <ServicesPage/>
<Projects/>


<Process/>
<Testimonials/>
<HeroParallaxDemo/>

   <Contact></Contact> 
    </div>
  );
};

export default Index;
