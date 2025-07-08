import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectProfile from "./components/ProjectPage.tsx/ProjectProfile";
import ProjectPage from "./components/ProjectPage.tsx/AllProject";
import NavbarVariant from "./components/Navbar";
import Loader from "./components/Loader/Loader";

const queryClient = new QueryClient();

const App = () => {
  // ――― Loading gate ―――
  const [isPageLoading, setPageLoading] = useState(true);

  const handleLoadingComplete = () => {
    setPageLoading(false);           // ← when Loader fires this, the nav appears
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* 1.  Show the loader while isPageLoading === true               */}
        <Loader isLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />

        {/* 2.  App content that should wait for the loader goes here      */}
        <BrowserRouter>
          {/*  ──> Navbar stays hidden until loading finishes  */}
          {!isPageLoading && <NavbarVariant />}

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/:id" element={<ProjectProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
