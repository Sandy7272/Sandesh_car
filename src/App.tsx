import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Projects from "./pages/Projects.tsx";
import Work3D from "./pages/work/Work3D.tsx";
import WorkMotion from "./pages/work/WorkMotion.tsx";
import WorkUIUX from "./pages/work/WorkUIUX.tsx";
import WorkVideoTo3D from "./pages/work/WorkVideoTo3D.tsx";

const queryClient = new QueryClient();

const EASE = [0.22, 1, 0.36, 1] as const;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.985, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.98, y: 8, filter: "blur(6px)" }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/work/3d" element={<Work3D />} />
          <Route path="/work/motion" element={<WorkMotion />} />
          <Route path="/work/uiux" element={<WorkUIUX />} />
          <Route path="/work/video-to-3d" element={<WorkVideoTo3D />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
