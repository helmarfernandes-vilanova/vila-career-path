import { useState } from "react";
import { Search, Plus, TrendingUp, Users, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Mock data - em produção viria da API
const cargos = [
  {
    id: 1,
    nome: "Analista de Sistemas",
    area: "TI",
    niveis: [
      {
        nivel: "Junior",
        descricao: "Desenvolvimento de sistemas básicos e manutenção",
        competenciasObrigatorias: ["JavaScript", "HTML/CSS", "Banco de Dados"],
        competenciasDesejaveis: ["React", "TypeScript", "Git"],
        colaboradoresAtivos: 3,
        proximoNivel: "Pleno",
        requisitosProximoNivel: ["2 anos de experiência", "Conhecimento em React", "Participação em projetos complexos"]
      },
      {
        nivel: "Pleno",
        descricao: "Desenvolvimento de funcionalidades complexas e liderança técnica",
        competenciasObrigatorias: ["JavaScript", "React", "Node.js", "Banco de Dados", "Git"],
        competenciasDesejaveis: ["TypeScript", "Docker", "AWS", "Metodologias Ágeis"],
        colaboradoresAtivos: 5,
        proximoNivel: "Sênior",
        requisitosProximoNivel: ["4 anos de experiência", "Liderança de projetos", "Mentoria de juniors"]
      },
      {
        nivel: "Sênior",
        descricao: "Arquitetura de sistemas e liderança técnica avançada",
        competenciasObrigatorias: ["Arquitetura de Software", "Liderança Técnica", "Múltiplas tecnologias"],
        competenciasDesejaveis: ["Microserviços", "DevOps", "Gestão de Equipes"],
        colaboradoresAtivos: 2,
        proximoNivel: "Especialista",
        requisitosProximoNivel: ["7+ anos de experiência", "Gestão de múltiplos projetos", "Definição de arquiteturas"]
      }
    ]
  },
  {
    id: 2,
    nome: "Coordenador Comercial",
    area: "Comercial",
    niveis: [
      {
        nivel: "Pleno",
        descricao: "Coordenação de equipe comercial e gestão de carteira",
        competenciasObrigatorias: ["Gestão de Equipes", "Negociação", "CRM", "Análise de Vendas"],
        competenciasDesejaveis: ["Power BI", "Liderança", "Planejamento Estratégico"],
        colaboradoresAtivos: 4,
        proximoNivel: "Sênior",
        requisitosProximoNivel: ["3 anos de coordenação", "Resultados consistentes", "Desenvolvimento de equipe"]
      },
      {
        nivel: "Sênior",
        descricao: "Gestão estratégica comercial e desenvolvimento de novos mercados",
        competenciasObrigatorias: ["Estratégia Comercial", "Gestão de P&L", "Desenvolvimento de Mercado"],
        competenciasDesejaveis: ["MBA", "Inglês Avançado", "Gestão de Canais"],
        colaboradoresAtivos: 2,
        proximoNivel: "Especialista",
        requisitosProximoNivel: ["5+ anos gestão comercial", "Expansão de mercados", "Resultados excepcionais"]
      }
    ]
  },
  {
    id: 3,
    nome: "Analista de Logística",
    area: "Logística",
    niveis: [
      {
        nivel: "Junior",
        descricao: "Controle de estoque e operações básicas de logística",
        competenciasObrigatorias: ["Controle de Estoque", "WMS", "Excel"],
        competenciasDesejaveis: ["Power BI", "Lean", "Six Sigma"],
        colaboradoresAtivos: 6,
        proximoNivel: "Pleno",
        requisitosProximoNivel: ["1,5 anos de experiência", "Certificação em logística", "Melhoria de processos"]
      },
      {
        nivel: "Pleno",
        descricao: "Otimização de processos logísticos e gestão de indicadores",
        competenciasObrigatorias: ["Gestão de Processos", "KPIs Logísticos", "Análise de Dados"],
        competenciasDesejaveis: ["Supply Chain", "Projetos de Melhoria", "Gestão de Fornecedores"],
        colaboradoresAtivos: 3,
        proximoNivel: "Sênior",
        requisitosProximoNivel: ["3 anos de experiência", "Liderança de projetos", "Redução de custos"]
      }
    ]
  }
];

const areas = ["Todas", "TI", "Comercial", "Logística", "Financeiro", "RH"];

export default function Cargos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedCargo, setSelectedCargo] = useState<any>(null);

  const filteredCargos = cargos.filter(cargo => {
    const matchesSearch = cargo.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "Todas" || cargo.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const getTotalColaboradores = (cargo: any) => {
    return cargo.niveis.reduce((total: number, nivel: any) => total + nivel.colaboradoresAtivos, 0);
  };

  const getNivelColor = (nivel: string) => {
    const colors = {
      "Junior": "bg-blue-50 text-blue-700 border-blue-200",
      "Pleno": "bg-green-50 text-green-700 border-green-200",
      "Sênior": "bg-orange-50 text-orange-700 border-orange-200",
      "Especialista": "bg-purple-50 text-purple-700 border-purple-200"
    };
    return colors[nivel as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Filtros e Ações */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cargos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              {areas.map(area => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button size="sm" className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cargo
        </Button>
      </div>

      {/* Lista de Cargos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCargos.map((cargo) => (
          <Card key={cargo.id} className="group cursor-pointer transition-all duration-200 hover:shadow-card hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                    {cargo.nome}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {cargo.area}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {getTotalColaboradores(cargo)} colaboradores
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                  Níveis Disponíveis
                </h4>
                <div className="space-y-2">
                  {cargo.niveis.map((nivel: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getNivelColor(nivel.nivel)}`}
                        >
                          {nivel.nivel}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {nivel.colaboradoresAtivos}
                        </div>
                      </div>
                      {nivel.proximoNivel && (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <ArrowRight className="h-3 w-3" />
                          {nivel.proximoNivel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedCargo(cargo)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Detalhes e Trilha
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      {selectedCargo?.nome} - {selectedCargo?.area}
                    </DialogTitle>
                    <DialogDescription>
                      Trilha de desenvolvimento e competências por nível
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedCargo && (
                    <div className="space-y-6 mt-6">
                      {selectedCargo.niveis.map((nivel: any, index: number) => (
                        <div key={index} className="border rounded-lg p-6 space-y-4">
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant="outline" 
                              className={`${getNivelColor(nivel.nivel)} px-3 py-1`}
                            >
                              {nivel.nivel}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {nivel.colaboradoresAtivos} colaboradores ativos
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {nivel.descricao}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold mb-2 text-sm">Competências Obrigatórias</h5>
                              <div className="flex flex-wrap gap-1">
                                {nivel.competenciasObrigatorias.map((comp: string) => (
                                  <Badge key={comp} variant="default" className="text-xs">
                                    {comp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-semibold mb-2 text-sm">Competências Desejáveis</h5>
                              <div className="flex flex-wrap gap-1">
                                {nivel.competenciasDesejaveis.map((comp: string) => (
                                  <Badge key={comp} variant="outline" className="text-xs">
                                    {comp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {nivel.proximoNivel && (
                            <>
                              <Separator />
                              <div className="bg-accent/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                  <TrendingUp className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-sm">
                                    Próximo nível: {nivel.proximoNivel}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <h6 className="text-sm font-medium">Requisitos para promoção:</h6>
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    {nivel.requisitosProximoNivel.map((req: string, i: number) => (
                                      <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCargos.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cargo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termo de busca.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todas");
            }}>
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}