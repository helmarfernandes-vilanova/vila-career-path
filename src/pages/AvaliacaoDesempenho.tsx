import { useState } from "react";
import { Search, Plus, Star, TrendingUp, Calendar, FileText, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - em produção viria da API
const avaliacoes = [
  {
    id: 1,
    colaborador: {
      nome: "Ana Paula Silva",
      cargo: "Analista de Sistemas",
      area: "TI",
      foto: ""
    },
    periodo: "2024 - 1º Semestre",
    status: "Concluída",
    dataAvaliacao: "2024-06-30",
    avaliador: "Ricardo Oliveira",
    pontuacaoGeral: 8.5,
    competencias: [
      { nome: "Conhecimento Técnico", nota: 9, peso: 30 },
      { nome: "Qualidade do Trabalho", nota: 8, peso: 25 },
      { nome: "Comunicação", nota: 8, peso: 20 },
      { nome: "Trabalho em Equipe", nota: 9, peso: 15 },
      { nome: "Proatividade", nota: 7, peso: 10 }
    ],
    metas: [
      { meta: "Implementar 3 novos módulos", status: "Concluída", progresso: 100 },
      { meta: "Mentorear 2 desenvolvedores júnior", status: "Concluída", progresso: 100 },
      { meta: "Reduzir bugs em 20%", status: "Parcial", progresso: 75 }
    ],
    pontosFortes: [
      "Excelente conhecimento técnico",
      "Boa capacidade de trabalho em equipe",
      "Sempre disposta a ajudar colegas"
    ],
    areasDesenvolvimento: [
      "Melhorar gestão de tempo",
      "Desenvolver habilidades de liderança"
    ],
    proximaAvaliacao: "2024-12-31"
  },
  {
    id: 2,
    colaborador: {
      nome: "Carlos Eduardo Santos",
      cargo: "Coordenador Comercial",
      area: "Comercial",
      foto: ""
    },
    periodo: "2024 - 1º Semestre",
    status: "Em Andamento",
    dataAvaliacao: "2024-07-15",
    avaliador: "Maria Santos",
    pontuacaoGeral: 9.2,
    competencias: [
      { nome: "Liderança", nota: 9, peso: 35 },
      { nome: "Resultados Comerciais", nota: 10, peso: 30 },
      { nome: "Negociação", nota: 9, peso: 20 },
      { nome: "Relacionamento", nota: 9, peso: 15 }
    ],
    metas: [
      { meta: "Aumentar vendas em 15%", status: "Superada", progresso: 120 },
      { meta: "Desenvolver 3 novos clientes", status: "Concluída", progresso: 100 },
      { meta: "Implementar novo CRM", status: "Em Andamento", progresso: 60 }
    ],
    pontosFortes: [
      "Excelentes resultados comerciais",
      "Boa liderança da equipe",
      "Relacionamento forte com clientes"
    ],
    areasDesenvolvimento: [
      "Conhecimento em análise de dados",
      "Habilidades digitais"
    ],
    proximaAvaliacao: "2024-12-31"
  }
];

const periodos = ["Todos", "2024 - 1º Semestre", "2023 - 2º Semestre", "2023 - 1º Semestre"];
const statusOptions = ["Todos", "Concluída", "Em Andamento", "Pendente", "Atrasada"];
const areas = ["Todas", "TI", "Comercial", "Financeiro", "RH", "Logística"];

export default function AvaliacaoDesempenho() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todas");

  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    const matchesSearch = avaliacao.colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         avaliacao.colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriodo = selectedPeriodo === "Todos" || avaliacao.periodo === selectedPeriodo;
    const matchesStatus = selectedStatus === "Todos" || avaliacao.status === selectedStatus;
    const matchesArea = selectedArea === "Todas" || avaliacao.colaborador.area === selectedArea;
    
    return matchesSearch && matchesPeriodo && matchesStatus && matchesArea;
  });

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Concluída": "bg-green-50 text-green-700 border-green-200",
      "Em Andamento": "bg-blue-50 text-blue-700 border-blue-200",
      "Pendente": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Atrasada": "bg-red-50 text-red-700 border-red-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getMetaStatusColor = (status: string) => {
    const colors = {
      "Concluída": "bg-green-500",
      "Superada": "bg-emerald-500", 
      "Em Andamento": "bg-blue-500",
      "Pendente": "bg-yellow-500",
      "Atrasada": "bg-red-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getPontuacaoColor = (pontuacao: number) => {
    if (pontuacao >= 9) return "text-green-600";
    if (pontuacao >= 7) return "text-blue-600";
    if (pontuacao >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="avaliacoes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="ciclos">Ciclos de Avaliação</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="avaliacoes" className="space-y-6">
          {/* Filtros e Ações */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar avaliações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map(periodo => (
                      <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Nova Avaliação
            </Button>
          </div>

          {/* Lista de Avaliações */}
          <div className="space-y-6">
            {filteredAvaliacoes.map((avaliacao) => (
              <Card key={avaliacao.id} className="group cursor-pointer transition-all duration-200 hover:shadow-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarImage src={avaliacao.colaborador.foto} alt={avaliacao.colaborador.nome} />
                        <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                          {getInitials(avaliacao.colaborador.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                          {avaliacao.colaborador.nome}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">
                          {avaliacao.colaborador.cargo} • {avaliacao.colaborador.area}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(avaliacao.status)}`}>
                            {avaliacao.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {avaliacao.periodo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getPontuacaoColor(avaliacao.pontuacaoGeral)}`}>
                        {avaliacao.pontuacaoGeral.toFixed(1)}
                      </div>
                      <p className="text-sm text-muted-foreground">Pontuação Geral</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Competências */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Competências Avaliadas
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {avaliacao.competencias.map((competencia, index) => (
                        <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className={`text-lg font-bold ${getPontuacaoColor(competencia.nota)}`}>
                            {competencia.nota.toFixed(1)}
                          </div>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {competencia.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Peso: {competencia.peso}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metas */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Metas do Período
                    </h4>
                    <div className="space-y-2">
                      {avaliacao.metas.map((meta, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${getMetaStatusColor(meta.status)}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{meta.meta}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={meta.progresso} className="flex-1 h-2" />
                              <span className="text-xs text-muted-foreground w-12">
                                {meta.progresso}%
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(meta.status)}`}>
                            {meta.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pontos Fortes e Desenvolvimento */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-green-600">Pontos Fortes</h4>
                      <ul className="space-y-1">
                        {avaliacao.pontosFortes.map((ponto, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {ponto}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-orange-600">Áreas de Desenvolvimento</h4>
                      <ul className="space-y-1">
                        {avaliacao.areasDesenvolvimento.map((area, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Próxima avaliação: {new Date(avaliacao.proximaAvaliacao).toLocaleDateString('pt-BR')}
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ciclos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Ciclos de Avaliação
              </CardTitle>
              <CardDescription>
                Gerencie os períodos de avaliação de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Funcionalidade em Desenvolvimento</h3>
              <p className="text-muted-foreground">
                A gestão de ciclos de avaliação estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Relatórios de Desempenho
              </CardTitle>
              <CardDescription>
                Análises e métricas de desempenho da equipe
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Relatórios em Desenvolvimento</h3>
              <p className="text-muted-foreground">
                Dashboard com métricas de desempenho estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}