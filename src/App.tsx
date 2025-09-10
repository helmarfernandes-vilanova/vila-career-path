import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import Dashboard from "./pages/Dashboard";
import Colaboradores from "./pages/Colaboradores";
import ColaboradorDetalhes from "./pages/ColaboradorDetalhes";
import Cargos from "./pages/Cargos";
import TrilhaCompetencias from "./pages/TrilhaCompetencias";
import AvaliacaoDesempenho from "./pages/AvaliacaoDesempenho";
import HistoricoDisciplinas from "./pages/HistoricoDisciplinas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/colaborador/:id" element={<ColaboradorDetalhes />} />
            <Route path="/cargos" element={<Cargos />} />
            <Route path="/trilha-competencias" element={<TrilhaCompetencias />} />
            <Route path="/avaliacao-desempenho" element={<AvaliacaoDesempenho />} />
            <Route path="/historico-disciplinas" element={<HistoricoDisciplinas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
