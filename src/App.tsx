import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import CareerTest from "./pages/CareerTest";
import HobbyTest from "./pages/HobbyTest";
import UniversityTest from "./pages/UniversityTest";
import Planner from "./pages/Planner";
import MyUniversity from "./pages/MyUniversity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/community" element={<Community />} />
            <Route path="/career-test" element={<CareerTest />} />
            <Route path="/hobby-test" element={<HobbyTest />} />
            <Route path="/university-test" element={<UniversityTest />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/my-university" element={<MyUniversity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
