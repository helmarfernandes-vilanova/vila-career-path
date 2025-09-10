import { useState } from "react";
import { Search, Plus, Star, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - em produção viria da API
const competencias = [
  {
    id: 1,
    nome: "JavaScript",
    categoria: "Técnica",
    area: "TI",
    nivelRequerido: "Intermediário",
    colaboradoresComCompetencia: 15,
    totalColaboradores: 25,
    trilhaAprendizado: [
      { etapa: "Fundamentos", concluido: true, recursos: ["Curso JS Básico", "Documentação MDN"] },
      { etapa: "ES6+", concluido: true, recursos: ["Curso JS Moderno", "Exercícios Práticos"] },
      { etapa: "Frameworks", concluido: false, recursos: ["React", "Vue.js", "Angular"] },
      { etapa: "Avançado", concluido: false, recursos: ["Node.js", "TypeScript", "Testes"] }
    ]
  },
  {
    id: 2,
    nome: "Liderança",
    categoria: "Comportamental",
    area: "Geral",
    nivelRequerido: "Avançado",
    colaboradoresComCompetencia: 8,
    totalColaboradores: 35,
    trilhaAprendizado: [
      { etapa: "Autoconhecimento", concluido: true, recursos: ["Workshop Liderança", "Feedback 360º"] },
      { etapa: "Comunicação", concluido: false, recursos: ["Técnicas de Comunicação", "Apresentações Eficazes"] },
      { etapa: "Gestão de Conflitos", concluido: false, recursos: ["Resolução de Conflitos", "Mediação"] },
      { etapa: "Estratégia", concluido: false, recursos: ["Planejamento Estratégico", "Visão de Negócio"] }
    ]
  },
  {
    id: 3,
    nome: "Excel Avançado",
    categoria: "Técnica",
    area: "Financeiro",
    nivelRequerido: "Avançado",
    colaboradoresComCompetencia: 12,
    totalColaboradores: 18,
    trilhaAprendizado: [
      { etapa: "Fórmulas Básicas", concluido: true, recursos: ["Curso Excel Básico", "Prática Diária"] },
      { etapa: "Tabelas Dinâmicas", concluido: true, recursos: ["Workshop Tabelas Dinâmicas"] },
      { etapa: "Macros e VBA", concluido: false, recursos: ["Curso VBA", "Projetos Práticos"] },
      { etapa: "Power BI Integração", concluido: false, recursos: ["Power BI Desktop", "DAX"] }
    ]
  }
];

const categorias = ["Todas", "Técnica", "Comportamental", "Idioma", "Certificação"];
const areas = ["Todas", "TI", "Comercial", "Financeiro", "RH", "Logística", "Geral"];
const niveis = ["Todos", "Básico", "Intermediário", "Avançado"];

export default function TrilhaCompetencias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedNivel, setSelectedNivel] = useState("Todos");

  const filteredCompetencias = competencias.filter(competencia => {
    const matchesSearch = competencia.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === "Todas" || competencia.categoria === selectedCategoria;
    const matchesArea = selectedArea === "Todas" || competencia.area === selectedArea;
    const matchesNivel = selectedNivel === "Todos" || competencia.nivelRequerido === selectedNivel;
    
    return matchesSearch && matchesCategoria && matchesArea && matchesNivel;
  });

  const getProgressPercentage = (competencia: any) => {
    return Math.round((competencia.colaboradoresComCompetencia / competencia.totalColaboradores) * 100);
  };

  const getTrilhaProgress = (trilha: any[]) => {
    const concluidas = trilha.filter(etapa => etapa.concluido).length;
    return Math.round((concluidas / trilha.length) * 100);
  };

  const getCategoriaColor = (categoria: string) => {
    const colors = {
      "Técnica": "bg-blue-50 text-blue-700 border-blue-200",
      "Comportamental": "bg-green-50 text-green-700 border-green-200",
      "Idioma": "bg-purple-50 text-purple-700 border-purple-200",
      "Certificação": "bg-orange-50 text-orange-700 border-orange-200"
    };
    return colors[categoria as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getNivelColor = (nivel: string) => {
    const colors = {
      "Básico": "bg-gray-50 text-gray-700 border-gray-200",
      "Intermediário": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Avançado": "bg-red-50 text-red-700 border-red-200"
    };
    return colors[nivel as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="competencias" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="competencias">Competências</TabsTrigger>
          <TabsTrigger value="trilhas">Trilhas de Aprendizado</TabsTrigger>
        </TabsList>

        <TabsContent value="competencias" className="space-y-6">
          {/* Filtros e Ações */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar competências..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

                <Select value={selectedNivel} onValueChange={setSelectedNivel}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveis.map(nivel => (
                      <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Nova Competência
            </Button>
          </div>

          {/* Lista de Competências */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompetencias.map((competencia) => (
              <Card key={competencia.id} className="group cursor-pointer transition-all duration-200 hover:shadow-card hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {competencia.nome}
                    </CardTitle>
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className={`text-xs ${getCategoriaColor(competencia.categoria)}`}>
                      {competencia.categoria}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getNivelColor(competencia.nivelRequerido)}`}>
                      {competencia.nivelRequerido}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {competencia.area}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso da Equipe</span>
                      <span className="text-sm text-muted-foreground">
                        {competencia.colaboradoresComCompetencia}/{competencia.totalColaboradores}
                      </span>
                    </div>
                    <Progress value={getProgressPercentage(competencia)} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getProgressPercentage(competencia)}% dos colaboradores possuem esta competência
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Trilha de Aprendizado</span>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      {competencia.trilhaAprendizado.map((etapa, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${etapa.concluido ? 'bg-green-500' : 'bg-muted'}`} />
                          <span className={`text-xs ${etapa.concluido ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {etapa.etapa}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ver Trilha Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trilhas" className="space-y-6">
          <div className="grid gap-6">
            {filteredCompetencias.map((competencia) => (
              <Card key={competencia.id} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{competencia.nome}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs ${getCategoriaColor(competencia.categoria)}`}>
                        {competencia.categoria}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getNivelColor(competencia.nivelRequerido)}`}>
                        {competencia.nivelRequerido}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{competencia.area}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{getTrilhaProgress(competencia.trilhaAprendizado)}%</div>
                    <p className="text-sm text-muted-foreground">Concluído</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {competencia.trilhaAprendizado.map((etapa, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                      etapa.concluido 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-muted bg-muted/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {etapa.concluido ? (
                          <Award className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <h4 className="font-medium">{etapa.etapa}</h4>
                      </div>
                      <div className="space-y-1">
                        {etapa.recursos.map((recurso, i) => (
                          <p key={i} className="text-xs text-muted-foreground">• {recurso}</p>
                        ))}
                      </div>
                      {!etapa.concluido && (
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Iniciar Etapa
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}