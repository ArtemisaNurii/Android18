import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectProfile from "./components/ProjectPage.tsx/ProjectProfile";
import NavbarVariant from "./components/Navbar";
import ProjectPage from "./components/ProjectPage.tsx/AllProject";

const queryClient = new QueryClient();
const App = () => {
  

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <NavbarVariant
 
            />
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
}
export default App;
