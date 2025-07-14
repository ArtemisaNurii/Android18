import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectProfile from "./components/ProjectPage.tsx/ProjectProfile";
import ProjectPage from "./components/ProjectPage.tsx/AllProject";
import NavbarVariant from "./components/Navbar";
import Loader from "./components/Loader/Loader";
// import AllTeam from "./components/TeamPage/AllTeam";

const queryClient = new QueryClient();

// Inner component to handle route changes
const AppContent = () => {
  const location = useLocation();
  const [isPageLoading, setPageLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const previousPathname = useRef<string>("");

  // Handle route changes
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only trigger loader if this is actually a route change (not initial load)
    if (previousPathname.current !== "" && previousPathname.current !== currentPath) {
      console.log("Route change detected:", previousPathname.current, "->", currentPath);
      setPageLoading(true);
    }
    
    previousPathname.current = currentPath;
  }, [location.pathname]);

  // Fallback: ensure content shows after maximum time
  useEffect(() => {
    if (isPageLoading) {
      const fallbackTimer = setTimeout(() => {
        console.log("Fallback: forcing loader to complete");
        setPageLoading(false);
        setIsInitialLoad(false);
      }, 3000); // 3 second fallback

      return () => clearTimeout(fallbackTimer);
    }
  }, [isPageLoading]);

  const handleLoadingComplete = () => {
    console.log("Loading complete callback fired");
    setPageLoading(false);
    setIsInitialLoad(false);
  };

  console.log("AppContent render:", { isPageLoading, isInitialLoad, pathname: location.pathname });

  return (
    <>
      {/* Show the loader while isPageLoading === true */}
      {isPageLoading && (
        <Loader isLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />
      )}

      {/* App content that should wait for the loader */}
      {!isPageLoading && <NavbarVariant />}
      
      {!isPageLoading && (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectProfile />} />
          {/* <Route path="/team" element={<AllTeam />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
