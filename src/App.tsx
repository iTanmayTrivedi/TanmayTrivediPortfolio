import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const legacySlugs: Record<string, string> = {
  dataflow: "teamhub",
  "shopify-plus": "bookflow",
  fintrack: "rakuten",
  "estate-pro": "kaizen",
  taskboard: "sysmonitor",
  mediconnect: "lynt",
  "team-hub": "teamhub",
  "rakuten-reimagined": "rakuten",
  "system-monitoring": "sysmonitor",
};

const LegacyProjectRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/projects/${legacySlugs[slug ?? ""] ?? slug ?? ""}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/project/:slug" element={<LegacyProjectRedirect />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
