import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyDetailPage from "./components/UserStories/StoryProfileView";
import UserCasesPage from "./pages/UserCases";
import NavbarVariant from "./components/Navbar";
import { useRef } from "react";

const queryClient = new QueryClient();

const App = () => {
    const aboutRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const processRef = useRef<HTMLElement>(null);

    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <NavbarVariant
                sections={{
                  About: aboutRef,
                  Services: servicesRef,
                  Projects: projectsRef,
                  Process: processRef,
                }}
              />
            <Routes>
       
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<UserCasesPage />} />
              <Route path="/projects/:id" element={<CaseStudyDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
};

export default App;
