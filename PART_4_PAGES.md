# PARTE 4 - PÁGINAS

## src/pages/Dashboard.tsx
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Briefcase, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalColaboradores: 234,
    colaboradoresAtivos: 218,
    cargosDefinidos: 45,
    promocoesPendentes: 12,
    avaliacoesPendentes: 28
  };

  const proximasPromocoes = [
    { nome: "Maria Silva", cargoAtual: "Analista Jr", proximoCargo: "Analista Pleno", previsao: "Mar 2024" },
    { nome: "João Santos", cargoAtual: "Desenvolvedor Pleno", proximoCargo: "Desenvolvedor Sênior", previsao: "Abr 2024" },
    { nome: "Ana Costa", cargoAtual: "Designer Jr", proximoCargo: "Designer Pleno", previsao: "Mai 2024" },
  ];

  const colaboradoresPorArea = [
    { area: "Tecnologia", colaboradores: 85, crescimento: 12 },
    { area: "Vendas", colaboradores: 52, crescimento: 8 },
    { area: "Marketing", colaboradores: 31, crescimento: 15 },
    { area: "RH", colaboradores: 18, crescimento: 5 },
    { area: "Financeiro", colaboradores: 25, crescimento: -2 },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalColaboradores}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.colaboradoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              93% de taxa de atividade
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Definidos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cargosDefinidos}</div>
            <p className="text-xs text-muted-foreground">
              Em 8 áreas diferentes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoções Pendentes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.promocoesPendentes}</div>
            <p className="text-xs text-muted-foreground">
              Para os próximos 3 meses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avaliacoesPendentes}</div>
            <p className="text-xs text-muted-foreground">
              Vencimento em 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Próximas Promoções */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Promoções</CardTitle>
            <CardDescription>
              Colaboradores elegíveis para promoção nos próximos meses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {proximasPromocoes.map((promocao, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{promocao.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {promocao.cargoAtual} → {promocao.proximoCargo}
                  </p>
                </div>
                <Badge variant="outline">{promocao.previsao}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Colaboradores por Área */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Colaboradores por Área</CardTitle>
            <CardDescription>
              Distribuição de colaboradores nas diferentes áreas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {colaboradoresPorArea.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{area.area}</p>
                    <p className="text-sm text-muted-foreground">
                      {area.colaboradores} colaboradores
                    </p>
                  </div>
                  <Badge 
                    variant={area.crescimento >= 0 ? "default" : "destructive"}
                  >
                    {area.crescimento >= 0 ? "+" : ""}{area.crescimento}%
                  </Badge>
                </div>
                <Progress value={(area.colaboradores / stats.totalColaboradores) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="h-20 flex flex-col gap-2">
            <Users className="h-6 w-6" />
            Adicionar Colaborador
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Briefcase className="h-6 w-6" />
            Definir Novo Cargo
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <TrendingUp className="h-6 w-6" />
            Avaliar Trilha de Carreira
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <Clock className="h-6 w-6" />
            Gerar Relatórios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
```

## src/pages/Colaboradores.tsx
```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Download } from "lucide-react";

const Colaboradores = () => {
  const navigate = useNavigate();
  
  // Mock data
  const colaboradores = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria.silva@empresa.com",
      cargo: "Analista de Sistemas",
      nivel: "Pleno",
      area: "Tecnologia",
      empresa: "TechCorp",
      status: "Ativo",
      dataAdmissao: "2022-03-15",
      foto: "/placeholder.svg"
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao.santos@empresa.com",
      cargo: "Desenvolvedor Frontend",
      nivel: "Sênior",
      area: "Tecnologia",
      empresa: "TechCorp",
      status: "Ativo",
      dataAdmissao: "2021-08-20",
      foto: "/placeholder.svg"
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana.costa@empresa.com",
      cargo: "Designer UX/UI",
      nivel: "Junior",
      area: "Design",
      empresa: "DesignCorp",
      status: "Ativo",
      dataAdmissao: "2023-01-10",
      foto: "/placeholder.svg"
    },
    {
      id: 4,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      cargo: "Gerente de Vendas",
      nivel: "Especialista",
      area: "Vendas",
      empresa: "SalesCorp",
      status: "Inativo",
      dataAdmissao: "2020-05-12",
      foto: "/placeholder.svg"
    },
    {
      id: 5,
      nome: "Carla Mendes",
      email: "carla.mendes@empresa.com",
      cargo: "Analista de Marketing",
      nivel: "Pleno",
      area: "Marketing",
      empresa: "MarketCorp",
      status: "Ativo",
      dataAdmissao: "2022-11-08",
      foto: "/placeholder.svg"
    }
  ];

  const areas = ["Todas", "Tecnologia", "Design", "Vendas", "Marketing", "RH", "Financeiro"];
  const niveis = ["Todos", "Junior", "Pleno", "Sênior", "Especialista"];
  const empresas = ["Todas", "TechCorp", "DesignCorp", "SalesCorp", "MarketCorp"];
  const statusOptions = ["Todos", "Ativo", "Inativo"];

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedNivel, setSelectedNivel] = useState("Todos");
  const [selectedEmpresa, setSelectedEmpresa] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  // Filter colaboradores based on search and filters
  const filteredColaboradores = colaboradores.filter(colaborador => {
    const matchesSearch = colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "Todas" || colaborador.area === selectedArea;
    const matchesNivel = selectedNivel === "Todos" || colaborador.nivel === selectedNivel;
    const matchesEmpresa = selectedEmpresa === "Todas" || colaborador.empresa === selectedEmpresa;
    const matchesStatus = selectedStatus === "Todos" || colaborador.status === selectedStatus;
    
    return matchesSearch && matchesArea && matchesNivel && matchesEmpresa && matchesStatus;
  });

  // Helper functions
  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Junior": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pleno": return "bg-green-100 text-green-800 border-green-200";
      case "Sênior": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Especialista": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleColaboradorClick = (id: number) => {
    navigate(`/colaborador/${id}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Colaboradores</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Colaborador
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar colaboradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedNivel} onValueChange={setSelectedNivel}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            {niveis.map(nivel => (
              <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedEmpresa} onValueChange={setSelectedEmpresa}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Empresa" />
          </SelectTrigger>
          <SelectContent>
            {empresas.map(empresa => (
              <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Colaboradores Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredColaboradores.map((colaborador) => (
          <Card 
            key={colaborador.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleColaboradorClick(colaborador.id)}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={colaborador.foto} alt={colaborador.nome} />
                <AvatarFallback>{getInitials(colaborador.nome)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{colaborador.nome}</CardTitle>
                <p className="text-sm text-muted-foreground">{colaborador.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{colaborador.cargo}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getNivelColor(colaborador.nivel)}>
                    {colaborador.nivel}
                  </Badge>
                  <Badge variant={colaborador.status === "Ativo" ? "default" : "secondary"}>
                    {colaborador.status}
                  </Badge>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium">Empresa:</span> {colaborador.empresa}</p>
                <p><span className="font-medium">Área:</span> {colaborador.area}</p>
                <p><span className="font-medium">Admissão:</span> {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredColaboradores.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhum colaborador encontrado com os filtros aplicados.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todas");
              setSelectedNivel("Todos");
              setSelectedEmpresa("Todas");
              setSelectedStatus("Todos");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default Colaboradores;
```

## src/pages/ColaboradorDetalhes.tsx
```tsx
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Building, Users, TrendingUp, Award, BookOpen, AlertTriangle } from "lucide-react";

const ColaboradorDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from an API based on the ID
  const colaborador = {
    id: parseInt(id || "1"),
    nome: "Maria Silva",
    email: "maria.silva@empresa.com",
    telefone: "(11) 99999-9999",
    cargo: "Analista de Sistemas",
    nivel: "Pleno",
    area: "Tecnologia",
    empresa: "TechCorp",
    status: "Ativo",
    dataAdmissao: "2022-03-15",
    dataNascimento: "1990-05-20",
    endereco: "São Paulo, SP",
    gestor: "João Supervisor",
    salario: "R$ 8.500,00",
    foto: "/placeholder.svg",
    competencias: [
      { nome: "JavaScript", nivel: "Avançado", progresso: 85 },
      { nome: "React", nivel: "Intermediário", progresso: 70 },
      { nome: "Node.js", nivel: "Intermediário", progresso: 65 },
      { nome: "SQL", nivel: "Avançado", progresso: 90 },
      { nome: "Git", nivel: "Avançado", progresso: 95 }
    ],
    avaliacoes: [
      {
        periodo: "2024 - 1º Semestre",
        nota: 4.2,
        status: "Concluída",
        pontosForca: ["Proatividade", "Trabalho em equipe", "Conhecimento técnico"],
        pontosDesenvolvimento: ["Liderança", "Apresentações públicas"]
      },
      {
        periodo: "2023 - 2º Semestre",
        nota: 4.0,
        status: "Concluída",
        pontosForca: ["Dedicação", "Aprendizado rápido"],
        pontosDesenvolvimento: ["Gestão de tempo", "Comunicação"]
      }
    ],
    trilhaCarreira: {
      cargoAtual: "Analista de Sistemas Pleno",
      proximoCargo: "Analista de Sistemas Sênior",
      requisitos: [
        { competencia: "Liderança de Projetos", status: "Em Desenvolvimento" },
        { competencia: "Arquitetura de Software", status: "Pendente" },
        { competencia: "Mentoria", status: "Em Desenvolvimento" }
      ],
      previsaoPromocao: "Junho 2024"
    },
    historicoDisciplinar: [
      {
        data: "2024-01-15",
        tipo: "Advertência Verbal",
        motivo: "Atraso recorrente",
        status: "Resolvido",
        observacoes: "Colaborador demonstrou melhoria após feedback"
      }
    ]
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Junior": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pleno": return "bg-green-100 text-green-800 border-green-200";
      case "Sênior": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Especialista": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCompetenciaColor = (progresso: number) => {
    if (progresso >= 80) return "bg-green-500";
    if (progresso >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getAvaliacaoColor = (nota: number) => {
    if (nota >= 4.5) return "text-green-600";
    if (nota >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/colaboradores")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Perfil do Colaborador</h2>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={colaborador.foto} alt={colaborador.nome} />
              <AvatarFallback className="text-2xl">{getInitials(colaborador.nome)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-bold">{colaborador.nome}</h3>
                <Badge className={getNivelColor(colaborador.nivel)}>
                  {colaborador.nivel}
                </Badge>
                <Badge variant={colaborador.status === "Ativo" ? "default" : "secondary"}>
                  {colaborador.status}
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground">{colaborador.cargo}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{colaborador.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{colaborador.telefone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{colaborador.endereco}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{colaborador.empresa} - {colaborador.area}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Gestor: {colaborador.gestor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Admissão: {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="competencias">Competências</TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliação de Desempenho</TabsTrigger>
          <TabsTrigger value="carreira">Trilha de Carreira</TabsTrigger>
          <TabsTrigger value="disciplinar">Histórico Disciplinar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Data de Nascimento</label>
                  <p>{new Date(colaborador.dataNascimento).toLocaleDateString('pt-BR')}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Salário Atual</label>
                  <p>{colaborador.salario}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Tempo na Empresa</label>
                  <p>{Math.floor((new Date().getTime() - new Date(colaborador.dataAdmissao).getTime()) / (1000 * 60 * 60 * 24 * 365))} anos</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo de Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Última Avaliação</label>
                  <p className={`text-2xl font-bold ${getAvaliacaoColor(colaborador.avaliacoes[0].nota)}`}>
                    {colaborador.avaliacoes[0].nota}/5.0
                  </p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Competências Dominadas</label>
                  <p>{colaborador.competencias.filter(c => c.progresso >= 80).length} de {colaborador.competencias.length}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Próxima Promoção Prevista</label>
                  <p>{colaborador.trilhaCarreira.previsaoPromocao}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competencias">
          <Card>
            <CardHeader>
              <CardTitle>Competências Técnicas</CardTitle>
              <CardDescription>
                Nível de proficiência nas principais competências técnicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {colaborador.competencias.map((competencia, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{competencia.nome}</span>
                    <Badge variant="outline">{competencia.nivel}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={competencia.progresso} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12">{competencia.progresso}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avaliacao">
          <div className="space-y-4">
            {colaborador.avaliacoes.map((avaliacao, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{avaliacao.periodo}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold ${getAvaliacaoColor(avaliacao.nota)}`}>
                        {avaliacao.nota}/5.0
                      </span>
                      <Badge variant="outline">{avaliacao.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Pontos Fortes</h4>
                    <div className="flex flex-wrap gap-2">
                      {avaliacao.pontosForca.map((ponto, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50">
                          {ponto}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Pontos de Desenvolvimento</h4>
                    <div className="flex flex-wrap gap-2">
                      {avaliacao.pontosDesenvolvimento.map((ponto, i) => (
                        <Badge key={i} variant="outline" className="bg-orange-50">
                          {ponto}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carreira">
          <Card>
            <CardHeader>
              <CardTitle>Trilha de Carreira</CardTitle>
              <CardDescription>
                Progresso na carreira e requisitos para próxima promoção
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Cargo Atual</p>
                  <p className="text-lg">{colaborador.trilhaCarreira.cargoAtual}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Próximo Cargo</p>
                  <p className="text-lg">{colaborador.trilhaCarreira.proximoCargo}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Requisitos para Promoção</h4>
                <div className="space-y-3">
                  {colaborador.trilhaCarreira.requisitos.map((requisito, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{requisito.competencia}</span>
                      <Badge 
                        variant={requisito.status === "Concluído" ? "default" : 
                                requisito.status === "Em Desenvolvimento" ? "secondary" : "outline"}
                      >
                        {requisito.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Previsão de Promoção</span>
                </div>
                <p className="text-lg text-blue-600 mt-1">{colaborador.trilhaCarreira.previsaoPromocao}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disciplinar">
          <Card>
            <CardHeader>
              <CardTitle>Histórico Disciplinar</CardTitle>
              <CardDescription>
                Registro de ocorrências e medidas disciplinares
              </CardDescription>
            </CardHeader>
            <CardContent>
              {colaborador.historicoDisciplinar.length > 0 ? (
                <div className="space-y-4">
                  {colaborador.historicoDisciplinar.map((ocorrencia, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">{ocorrencia.tipo}</span>
                        </div>
                        <Badge variant={ocorrencia.status === "Resolvido" ? "default" : "destructive"}>
                          {ocorrencia.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(ocorrencia.data).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="mb-2">{ocorrencia.motivo}</p>
                      {ocorrencia.observacoes && (
                        <p className="text-sm text-muted-foreground italic">
                          {ocorrencia.observacoes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma ocorrência disciplinar registrada.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColaboradorDetalhes;
```

## src/pages/Cargos.tsx
```tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Users, TrendingUp } from "lucide-react";

const Cargos = () => {
  // Mock data
  const cargos = [
    {
      id: 1,
      nome: "Desenvolvedor",
      area: "Tecnologia",
      niveis: [
        {
          nivel: "Junior",
          descricao: "Desenvolvedor em início de carreira com conhecimentos básicos",
          competenciasObrigatorias: ["HTML/CSS", "JavaScript Básico", "Git"],
          competenciasDesejaveis: ["React", "Node.js"],
          colaboradoresAtivos: 12,
          proximoNivel: "Pleno",
          requisitosProximoNivel: ["2 anos de experiência", "React Avançado", "Liderança de pequenos projetos"]
        },
        {
          nivel: "Pleno",
          descricao: "Desenvolvedor com experiência intermediária e autonomia",
          competenciasObrigatorias: ["JavaScript Avançado", "React", "Node.js", "Testes"],
          competenciasDesejaveis: ["TypeScript", "Docker", "AWS"],
          colaboradoresAtivos: 18,
          proximoNivel: "Sênior",
          requisitosProximoNivel: ["4 anos de experiência", "Arquitetura de Software", "Mentoria de juniors"]
        },
        {
          nivel: "Sênior",
          descricao: "Desenvolvedor experiente com capacidade de liderança técnica",
          competenciasObrigatorias: ["Arquitetura de Software", "Liderança Técnica", "Mentoria"],
          competenciasDesejaveis: ["Microserviços", "DevOps", "Gestão de Equipe"],
          colaboradoresAtivos: 8,
          proximoNivel: "Especialista",
          requisitosProximoNivel: ["7 anos de experiência", "Gestão de Projetos", "Visão de Negócio"]
        }
      ]
    },
    {
      id: 2,
      nome: "Designer",
      area: "Design",
      niveis: [
        {
          nivel: "Junior",
          descricao: "Designer iniciante com conhecimentos básicos de design",
          competenciasObrigatorias: ["Figma", "Photoshop", "Design Thinking"],
          competenciasDesejaveis: ["Illustrator", "UX Research"],
          colaboradoresAtivos: 6,
          proximoNivel: "Pleno",
          requisitosProximoNivel: ["2 anos de experiência", "UX/UI Avançado", "Prototipação"]
        },
        {
          nivel: "Pleno",
          descricao: "Designer com experiência em projetos complexos",
          competenciasObrigatorias: ["UX/UI Avançado", "Prototipação", "User Research"],
          competenciasDesejaveis: ["Motion Design", "Design System"],
          colaboradoresAtivos: 4,
          proximoNivel: "Sênior",
          requisitosProximoNivel: ["4 anos de experiência", "Liderança de Design", "Estratégia de Produto"]
        }
      ]
    },
    {
      id: 3,
      nome: "Analista de Marketing",
      area: "Marketing",
      niveis: [
        {
          nivel: "Junior",
          descricao: "Analista iniciante focado em execução de campanhas",
          competenciasObrigatorias: ["Google Analytics", "Excel", "Marketing Digital"],
          competenciasDesejaveis: ["Google Ads", "Facebook Ads"],
          colaboradoresAtivos: 8,
          proximoNivel: "Pleno",
          requisitosProximoNivel: ["2 anos de experiência", "Gestão de Campanhas", "Análise de ROI"]
        },
        {
          nivel: "Pleno",
          descricao: "Analista com autonomia para estratégias de marketing",
          competenciasObrigatorias: ["Gestão de Campanhas", "Análise de ROI", "Marketing de Conteúdo"],
          competenciasDesejaveis: ["Marketing Automation", "CRM"],
          colaboradoresAtivos: 5,
          proximoNivel: "Sênior",
          requisitosProximoNivel: ["4 anos de experiência", "Estratégia de Marketing", "Liderança de Equipe"]
        }
      ]
    }
  ];

  const areas = ["Todas", "Tecnologia", "Design", "Marketing", "Vendas", "RH", "Financeiro"];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedCargo, setSelectedCargo] = useState<any>(null);

  // Filter cargos
  const filteredCargos = cargos.filter(cargo => {
    const matchesSearch = cargo.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "Todas" || cargo.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  // Helper functions
  const getTotalColaboradores = (cargo: any) => {
    return cargo.niveis.reduce((total: number, nivel: any) => total + nivel.colaboradoresAtivos, 0);
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Junior": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pleno": return "bg-green-100 text-green-800 border-green-200";
      case "Sênior": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Especialista": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Descrição de Cargos</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cargo
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cargos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cargos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCargos.map((cargo) => (
          <Card key={cargo.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{cargo.nome}</CardTitle>
                <Badge variant="outline">{cargo.area}</Badge>
              </div>
              <CardDescription className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{getTotalColaboradores(cargo)} colaboradores ativos</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Níveis Disponíveis</h4>
                <div className="space-y-2">
                  {cargo.niveis.map((nivel, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Badge className={getNivelColor(nivel.nivel)}>
                        {nivel.nivel}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{nivel.colaboradoresAtivos}</span>
                        {nivel.proximoNivel && (
                          <>
                            <TrendingUp className="h-3 w-3" />
                            <span>{nivel.proximoNivel}</span>
                          </>
                        )}
                      </div>
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
                    Ver Detalhes e Trilha
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{selectedCargo?.nome} - {selectedCargo?.area}</DialogTitle>
                    <DialogDescription>
                      Detalhes dos níveis e competências necessárias
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedCargo && (
                    <div className="space-y-6">
                      {selectedCargo.niveis.map((nivel: any, index: number) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{nivel.nivel}</CardTitle>
                              <div className="flex items-center space-x-2">
                                <Badge className={getNivelColor(nivel.nivel)}>
                                  {nivel.colaboradoresAtivos} ativos
                                </Badge>
                                {nivel.proximoNivel && (
                                  <Badge variant="outline">
                                    Próximo: {nivel.proximoNivel}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <CardDescription>{nivel.descricao}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h5 className="font-medium text-green-600 mb-2">Competências Obrigatórias</h5>
                              <div className="flex flex-wrap gap-2">
                                {nivel.competenciasObrigatorias.map((comp: string, i: number) => (
                                  <Badge key={i} variant="outline" className="bg-green-50">
                                    {comp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-blue-600 mb-2">Competências Desejáveis</h5>
                              <div className="flex flex-wrap gap-2">
                                {nivel.competenciasDesejaveis.map((comp: string, i: number) => (
                                  <Badge key={i} variant="outline" className="bg-blue-50">
                                    {comp}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {nivel.proximoNivel && (
                              <div>
                                <h5 className="font-medium text-orange-600 mb-2">
                                  Requisitos para {nivel.proximoNivel}
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {nivel.requisitosProximoNivel.map((req: string, i: number) => (
                                    <Badge key={i} variant="outline" className="bg-orange-50">
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredCargos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhum cargo encontrado com os filtros aplicados.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todas");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cargos;
```

## src/pages/TrilhaCompetencias.tsx
```tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, BookOpen, Play, CheckCircle } from "lucide-react";

const TrilhaCompetencias = () => {
  // Mock data
  const competencias = [
    {
      id: 1,
      nome: "JavaScript Avançado",
      categoria: "Técnica",
      area: "Tecnologia",
      nivelExigido: "Pleno",
      colaboradoresComCompetencia: 45,
      totalColaboradores: 60,
      trilhaAprendizado: {
        etapas: [
          {
            nome: "Fundamentos ES6+",
            recursos: ["Curso Online", "Documentação", "Exercícios Práticos"],
            concluida: true
          },
          {
            nome: "Programação Assíncrona",
            recursos: ["Workshop", "Projeto Prático", "Mentoria"],
            concluida: true
          },
          {
            nome: "Design Patterns",
            recursos: ["Livro", "Exemplos de Código", "Review de Código"],
            concluida: false
          },
          {
            nome: "Performance e Otimização",
            recursos: ["Curso Avançado", "Benchmark Tools", "Projeto Real"],
            concluida: false
          }
        ]
      }
    },
    {
      id: 2,
      nome: "React Ecosystem",
      categoria: "Técnica",
      area: "Tecnologia",
      nivelExigido: "Pleno",
      colaboradoresComCompetencia: 38,
      totalColaboradores: 60,
      trilhaAprendizado: {
        etapas: [
          {
            nome: "React Fundamentals",
            recursos: ["Curso Online", "Documentação Oficial", "Mini Projetos"],
            concluida: true
          },
          {
            nome: "Hooks e Context API",
            recursos: ["Tutorial Avançado", "Exercícios", "Code Review"],
            concluida: true
          },
          {
            nome: "State Management",
            recursos: ["Redux Toolkit", "Zustand", "Projeto Complexo"],
            concluida: false
          },
          {
            nome: "Testing React Apps",
            recursos: ["Jest", "React Testing Library", "E2E Tests"],
            concluida: false
          }
        ]
      }
    },
    {
      id: 3,
      nome: "Liderança de Equipe",
      categoria: "Comportamental",
      area: "Gestão",
      nivelExigido: "Sênior",
      colaboradoresComCompetencia: 12,
      totalColaboradores: 25,
      trilhaAprendizado: {
        etapas: [
          {
            nome: "Comunicação Efetiva",
            recursos: ["Workshop", "Role Playing", "Feedback 360°"],
            concluida: true
          },
          {
            nome: "Gestão de Conflitos",
            recursos: ["Curso Presencial", "Simulações", "Coaching"],
            concluida: false
          },
          {
            nome: "Desenvolvimento de Pessoas",
            recursos: ["Mentoria", "Planos de Desenvolvimento", "1:1s"],
            concluida: false
          },
          {
            nome: "Visão Estratégica",
            recursos: ["MBA Módulo", "Projetos Estratégicos", "Shadowing"],
            concluida: false
          }
        ]
      }
    },
    {
      id: 4,
      nome: "UX Research",
      categoria: "Técnica",
      area: "Design",
      nivelExigido: "Pleno",
      colaboradoresComCompetencia: 8,
      totalColaboradores: 15,
      trilhaAprendizado: {
        etapas: [
          {
            nome: "Métodos de Pesquisa",
            recursos: ["Curso UX", "Templates", "Ferramentas"],
            concluida: true
          },
          {
            nome: "Análise de Dados",
            recursos: ["Analytics", "Heatmaps", "User Testing"],
            concluida: true
          },
          {
            nome: "Personas e Jornadas",
            recursos: ["Workshop", "Templates", "Validação"],
            concluida: false
          },
          {
            nome: "Pesquisa Avançada",
            recursos: ["Etnografia", "Entrevistas", "Surveys"],
            concluida: false
          }
        ]
      }
    }
  ];

  const categorias = ["Todas", "Técnica", "Comportamental", "Gestão"];
  const areas = ["Todas", "Tecnologia", "Design", "Marketing", "Vendas", "Gestão"];
  const niveis = ["Todos", "Junior", "Pleno", "Sênior", "Especialista"];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedNivel, setSelectedNivel] = useState("Todos");

  // Filter competências
  const filteredCompetencias = competencias.filter(competencia => {
    const matchesSearch = competencia.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === "Todas" || competencia.categoria === selectedCategoria;
    const matchesArea = selectedArea === "Todas" || competencia.area === selectedArea;
    const matchesNivel = selectedNivel === "Todos" || competencia.nivelExigido === selectedNivel;
    
    return matchesSearch && matchesCategoria && matchesArea && matchesNivel;
  });

  // Helper functions
  const getProgressPercentage = (competencia: any) => {
    return Math.round((competencia.colaboradoresComCompetencia / competencia.totalColaboradores) * 100);
  };

  const getTrilhaProgress = (trilha: any) => {
    const etapasConcluidas = trilha.etapas.filter((etapa: any) => etapa.concluida).length;
    return Math.round((etapasConcluidas / trilha.etapas.length) * 100);
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Técnica": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Comportamental": return "bg-green-100 text-green-800 border-green-200";
      case "Gestão": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Junior": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pleno": return "bg-green-100 text-green-800 border-green-200";
      case "Sênior": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Especialista": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trilha de Competências</h2>
      </div>

      <Tabs defaultValue="competencias" className="space-y-4">
        <TabsList>
          <TabsTrigger value="competencias">Competências</TabsTrigger>
          <TabsTrigger value="trilhas">Trilhas de Aprendizado</TabsTrigger>
        </TabsList>

        <TabsContent value="competencias">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar competências..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedNivel} onValueChange={setSelectedNivel}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                {niveis.map(nivel => (
                  <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Competências Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCompetencias.map((competencia) => (
              <Card key={competencia.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{competencia.nome}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoriaColor(competencia.categoria)}>
                          {competencia.categoria}
                        </Badge>
                        <Badge className={getNivelColor(competencia.nivelExigido)}>
                          {competencia.nivelExigido}
                        </Badge>
                        <Badge variant="outline">{competencia.area}</Badge>
                      </div>
                    </div>
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
                    <Progress value={getProgressPercentage(competencia)} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getProgressPercentage(competencia)}% dos colaboradores possuem esta competência
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Trilha de Aprendizado</h4>
                    <div className="space-y-2">
                      {competencia.trilhaAprendizado.etapas.map((etapa, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            {etapa.concluida ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                            )}
                            <span className={`text-sm ${etapa.concluida ? 'line-through text-muted-foreground' : ''}`}>
                              {etapa.nome}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {etapa.recursos.length} recursos
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trilhas">
          <div className="grid gap-4">
            {filteredCompetencias.map((competencia) => (
              <Card key={competencia.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{competencia.nome}</CardTitle>
                      <CardDescription>
                        Trilha de aprendizado detalhada - {getTrilhaProgress(competencia.trilhaAprendizado)}% concluída
                      </CardDescription>
                    </div>
                    <Progress value={getTrilhaProgress(competencia.trilhaAprendizado)} className="w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {competencia.trilhaAprendizado.etapas.map((etapa, index) => (
                      <Card key={index} className={`${etapa.concluida ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">{etapa.nome}</CardTitle>
                            {etapa.concluida ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-gray-400 rounded-full" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {etapa.recursos.map((recurso, rIndex) => (
                              <div key={rIndex} className="flex items-center space-x-2">
                                <BookOpen className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{recurso}</span>
                              </div>
                            ))}
                          </div>
                          {!etapa.concluida && (
                            <Button size="sm" className="w-full mt-3">
                              <Play className="h-3 w-3 mr-1" />
                              Iniciar Etapa
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* No results message */}
      {filteredCompetencias.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhuma competência encontrada com os filtros aplicados.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategoria("Todas");
              setSelectedArea("Todas");
              setSelectedNivel("Todos");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrilhaCompetencias;
```

## src/pages/AvaliacaoDesempenho.tsx
```tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Users, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";

const AvaliacaoDesempenho = () => {
  // Mock data
  const avaliacoes = [
    {
      id: 1,
      colaborador: {
        nome: "Maria Silva",
        cargo: "Analista de Sistemas",
        area: "Tecnologia",
        foto: "/placeholder.svg"
      },
      periodo: "2024 - 1º Semestre",
      status: "Concluída",
      notaGeral: 4.2,
      competencias: [
        { nome: "Conhecimento Técnico", nota: 4.5 },
        { nome: "Comunicação", nota: 4.0 },
        { nome: "Trabalho em Equipe", nota: 4.3 },
        { nome: "Proatividade", nota: 4.1 }
      ],
      metas: [
        { descricao: "Implementar 3 novos módulos", status: "Concluída", progresso: 100 },
        { descricao: "Reduzir bugs em 20%", status: "Em Andamento", progresso: 75 },
        { descricao: "Mentoria de 2 juniors", status: "Concluída", progresso: 100 }
      ],
      pontosForca: ["Proatividade", "Conhecimento técnico", "Colaboração"],
      pontosDesenvolvimento: ["Liderança", "Apresentações públicas"],
      proximaAvaliacao: "2024-12-15"
    },
    {
      id: 2,
      colaborador: {
        nome: "João Santos",
        cargo: "Desenvolvedor Frontend",
        area: "Tecnologia",
        foto: "/placeholder.svg"
      },
      periodo: "2024 - 1º Semestre",
      status: "Pendente",
      notaGeral: 0,
      competencias: [],
      metas: [
        { descricao: "Migrar sistema para React", status: "Em Andamento", progresso: 60 },
        { descricao: "Implementar testes automatizados", status: "Não Iniciada", progresso: 0 },
        { descricao: "Otimizar performance", status: "Em Andamento", progresso: 40 }
      ],
      pontosForca: [],
      pontosDesenvolvimento: [],
      proximaAvaliacao: "2024-06-30"
    },
    {
      id: 3,
      colaborador: {
        nome: "Ana Costa",
        cargo: "Designer UX/UI",
        area: "Design",
        foto: "/placeholder.svg"
      },
      periodo: "2024 - 1º Semestre",
      status: "Em Andamento",
      notaGeral: 0,
      competencias: [
        { nome: "Design Thinking", nota: 4.8 },
        { nome: "Prototipação", nota: 4.6 },
        { nome: "User Research", nota: 4.2 }
      ],
      metas: [
        { descricao: "Redesign do produto principal", status: "Concluída", progresso: 100 },
        { descricao: "Criar design system", status: "Em Andamento", progresso: 80 },
        { descricao: "Pesquisa com usuários", status: "Concluída", progresso: 100 }
      ],
      pontosForca: ["Criatividade", "Atenção aos detalhes", "User-centricity"],
      pontosDesenvolvimento: ["Gestão de stakeholders"],
      proximaAvaliacao: "2024-07-15"
    }
  ];

  const periodos = ["Todos", "2024 - 1º Semestre", "2023 - 2º Semestre", "2023 - 1º Semestre"];
  const statusOptions = ["Todos", "Concluída", "Em Andamento", "Pendente", "Atrasada"];
  const areas = ["Todas", "Tecnologia", "Design", "Marketing", "Vendas", "RH"];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todas");

  // Filter avaliações
  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    const matchesSearch = avaliacao.colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         avaliacao.colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriodo = selectedPeriodo === "Todos" || avaliacao.periodo === selectedPeriodo;
    const matchesStatus = selectedStatus === "Todos" || avaliacao.status === selectedStatus;
    const matchesArea = selectedArea === "Todas" || avaliacao.colaborador.area === selectedArea;
    
    return matchesSearch && matchesPeriodo && matchesStatus && matchesArea;
  });

  // Helper functions
  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída": return "bg-green-100 text-green-800 border-green-200";
      case "Em Andamento": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pendente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Atrasada": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMetaStatusColor = (status: string) => {
    switch (status) {
      case "Concluída": return "text-green-600";
      case "Em Andamento": return "text-blue-600";
      case "Não Iniciada": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getPontuacaoColor = (pontuacao: number) => {
    if (pontuacao >= 4.5) return "text-green-600";
    if (pontuacao >= 3.5) return "text-yellow-600";
    if (pontuacao >= 2.5) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Avaliação de Desempenho</h2>
      </div>

      <Tabs defaultValue="avaliacoes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="ciclos">Ciclos de Avaliação</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="avaliacoes">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                {periodos.map(periodo => (
                  <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Avaliação
            </Button>
          </div>

          {/* Avaliações List */}
          <div className="space-y-4">
            {filteredAvaliacoes.map((avaliacao) => (
              <Card key={avaliacao.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={avaliacao.colaborador.foto} alt={avaliacao.colaborador.nome} />
                        <AvatarFallback>{getInitials(avaliacao.colaborador.nome)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{avaliacao.colaborador.nome}</CardTitle>
                        <CardDescription>
                          {avaliacao.colaborador.cargo} - {avaliacao.colaborador.area}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(avaliacao.status)}>
                        {avaliacao.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{avaliacao.periodo}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Nota Geral */}
                  {avaliacao.notaGeral > 0 && (
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Nota Geral</p>
                        <p className={`text-3xl font-bold ${getPontuacaoColor(avaliacao.notaGeral)}`}>
                          {avaliacao.notaGeral}/5.0
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Competências */}
                  {avaliacao.competencias.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Competências Avaliadas</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {avaliacao.competencias.map((competencia, index) => (
                          <div key={index} className="text-center p-3 border rounded">
                            <p className="text-sm font-medium">{competencia.nome}</p>
                            <p className={`text-lg font-bold ${getPontuacaoColor(competencia.nota)}`}>
                              {competencia.nota}/5.0
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metas */}
                  <div>
                    <h4 className="font-medium mb-3">Metas e Objetivos</h4>
                    <div className="space-y-3">
                      {avaliacao.metas.map((meta, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{meta.descricao}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm ${getMetaStatusColor(meta.status)}`}>
                                {meta.status}
                              </span>
                              {meta.status === "Concluída" && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {meta.status === "Em Andamento" && (
                                <Clock className="h-4 w-4 text-blue-500" />
                              )}
                              {meta.status === "Não Iniciada" && (
                                <AlertCircle className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <Progress value={meta.progresso} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pontos Fortes e Desenvolvimento */}
                  {(avaliacao.pontosForca.length > 0 || avaliacao.pontosDesenvolvimento.length > 0) && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {avaliacao.pontosForca.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">Pontos Fortes</h4>
                          <div className="flex flex-wrap gap-2">
                            {avaliacao.pontosForca.map((ponto, index) => (
                              <Badge key={index} variant="outline" className="bg-green-50">
                                {ponto}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {avaliacao.pontosDesenvolvimento.length > 0 && (
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Pontos de Desenvolvimento</h4>
                          <div className="flex flex-wrap gap-2">
                            {avaliacao.pontosDesenvolvimento.map((ponto, index) => (
                              <Badge key={index} variant="outline" className="bg-orange-50">
                                {ponto}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Próxima Avaliação */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Próxima avaliação: {new Date(avaliacao.proximaAvaliacao).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                      {avaliacao.status !== "Concluída" && (
                        <Button size="sm">Continuar Avaliação</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ciclos">
          <Card>
            <CardHeader>
              <CardTitle>Ciclos de Avaliação</CardTitle>
              <CardDescription>
                Gerenciamento dos períodos de avaliação de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Funcionalidade em desenvolvimento.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Desempenho</CardTitle>
              <CardDescription>
                Análises e métricas de desempenho da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Relatórios em desenvolvimento.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* No results message */}
      {filteredAvaliacoes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhuma avaliação encontrada com os filtros aplicados.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedPeriodo("Todos");
              setSelectedStatus("Todos");
              setSelectedArea("Todas");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvaliacaoDesempenho;
```

## src/pages/HistoricoDisciplinas.tsx
```tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, AlertTriangle, FileText, Download, Calendar } from "lucide-react";
import { jsPDF } from "jspdf";

const HistoricoDisciplinas = () => {
  // Mock data
  const registros = [
    {
      id: 1,
      colaborador: {
        nome: "Pedro Oliveira",
        cargo: "Analista de Vendas",
        area: "Vendas",
        foto: "/placeholder.svg"
      },
      data: "2024-02-15",
      tipo: "Advertência Verbal",
      motivo: "Atraso recorrente",
      descricao: "Colaborador apresentou atrasos recorrentes nos últimos 30 dias, totalizando 8 ocorrências.",
      status: "Ativo",
      responsavel: "Maria Gestora",
      observacoes: "Colaborador demonstrou compreensão e comprometimento com melhoria.",
      prazoCorrecao: "2024-03-15",
      documentos: []
    },
    {
      id: 2,
      colaborador: {
        nome: "Carlos Santos",
        cargo: "Desenvolvedor",
        area: "Tecnologia",
        foto: "/placeholder.svg"
      },
      data: "2024-01-20",
      tipo: "Advertência Escrita",
      motivo: "Não cumprimento de deadline",
      descricao: "Falha em entregar projeto crítico dentro do prazo estabelecido, causando impacto no cliente.",
      status: "Resolvido",
      responsavel: "João Supervisor",
      observacoes: "Colaborador melhorou significativamente após feedback e apresentou entregas pontuais.",
      prazoCorrecao: "2024-02-20",
      documentos: ["advertencia_escrita_carlos.pdf"]
    },
    {
      id: 3,
      colaborador: {
        nome: "Ana Costa",
        cargo: "Analista de Marketing",
        area: "Marketing",
        foto: "/placeholder.svg"
      },
      data: "2023-12-10",
      tipo: "Orientação",
      motivo: "Conflito interpessoal",
      descricao: "Discussão com colega de equipe durante reunião. Necessário alinhamento sobre comunicação profissional.",
      status: "Resolvido",
      responsavel: "Patricia RH",
      observacoes: "Situação resolvida com sucesso. Colaboradora demonstrou maturidade para lidar com conflitos.",
      prazoCorrecao: "2024-01-10",
      documentos: []
    },
    {
      id: 4,
      colaborador: {
        nome: "Roberto Silva",
        cargo: "Gerente Comercial",
        area: "Vendas",
        foto: "/placeholder.svg"
      },
      data: "2023-11-25",
      tipo: "Suspensão",
      motivo: "Conduta inadequada",
      descricao: "Comportamento agressivo com cliente durante negociação, resultando em perda de contrato.",
      status: "Suspenso",
      responsavel: "Diretor Comercial",
      observacoes: "Colaborador em processo de coaching para desenvolvimento de soft skills.",
      prazoCorrecao: "2024-01-25",
      documentos: ["termo_suspensao.pdf", "plano_desenvolvimento.pdf"]
    }
  ];

  const tipoOptions = ["Todos", "Orientação", "Advertência Verbal", "Advertência Escrita", "Suspensão", "Demissão"];
  const statusOptions = ["Todos", "Ativo", "Resolvido", "Suspenso", "Cancelado"];
  const areas = ["Todas", "Tecnologia", "Vendas", "Marketing", "RH", "Financeiro"];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedRegistro, setSelectedRegistro] = useState<any>(null);

  // Filter registros
  const filteredRegistros = registros.filter(registro => {
    const matchesSearch = registro.colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registro.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = selectedTipo === "Todos" || registro.tipo === selectedTipo;
    const matchesStatus = selectedStatus === "Todos" || registro.status === selectedStatus;
    const matchesArea = selectedArea === "Todas" || registro.colaborador.area === selectedArea;
    
    return matchesSearch && matchesTipo && matchesStatus && matchesArea;
  });

  // Helper functions
  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Orientação": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Advertência Verbal": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advertência Escrita": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Suspensão": return "bg-red-100 text-red-800 border-red-200";
      case "Demissão": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-red-100 text-red-800 border-red-200";
      case "Resolvido": return "bg-green-100 text-green-800 border-green-200";
      case "Suspenso": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Cancelado": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (tipo: string) => {
    switch (tipo) {
      case "Orientação": return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case "Advertência Verbal": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Advertência Escrita": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "Suspensão": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "Demissão": return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const generatePDF = (registro: any) => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('REGISTRO DISCIPLINAR', 20, 20);
    
    // Employee info
    pdf.setFontSize(12);
    pdf.text(`Colaborador: ${registro.colaborador.nome}`, 20, 40);
    pdf.text(`Cargo: ${registro.colaborador.cargo}`, 20, 50);
    pdf.text(`Área: ${registro.colaborador.area}`, 20, 60);
    
    // Incident details
    pdf.text(`Data: ${new Date(registro.data).toLocaleDateString('pt-BR')}`, 20, 80);
    pdf.text(`Tipo: ${registro.tipo}`, 20, 90);
    pdf.text(`Motivo: ${registro.motivo}`, 20, 100);
    pdf.text(`Status: ${registro.status}`, 20, 110);
    pdf.text(`Responsável: ${registro.responsavel}`, 20, 120);
    
    // Description
    pdf.text('Descrição:', 20, 140);
    const splitDescription = pdf.splitTextToSize(registro.descricao, 170);
    pdf.text(splitDescription, 20, 150);
    
    // Observations
    const yPosition = 150 + (splitDescription.length * 10) + 20;
    pdf.text('Observações:', 20, yPosition);
    const splitObservations = pdf.splitTextToSize(registro.observacoes, 170);
    pdf.text(splitObservations, 20, yPosition + 10);
    
    // Footer
    const finalY = yPosition + (splitObservations.length * 10) + 30;
    pdf.text(`Documento gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, finalY);
    
    pdf.save(`registro_disciplinar_${registro.colaborador.nome.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Histórico Disciplinar</h2>
      </div>

      <Tabs defaultValue="registros" className="space-y-4">
        <TabsList>
          <TabsTrigger value="registros">Registros</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="novo">Novo Registro</TabsTrigger>
        </TabsList>

        <TabsContent value="registros">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar registros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTipo} onValueChange={setSelectedTipo}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {tipoOptions.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Registros List */}
          <div className="space-y-4">
            {filteredRegistros.map((registro) => (
              <Card key={registro.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={registro.colaborador.foto} alt={registro.colaborador.nome} />
                        <AvatarFallback>{getInitials(registro.colaborador.nome)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{registro.colaborador.nome}</CardTitle>
                        <CardDescription>
                          {registro.colaborador.cargo} - {registro.colaborador.area}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(registro.tipo)}
                        <Badge className={getTipoColor(registro.tipo)}>
                          {registro.tipo}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(registro.status)}>
                        {registro.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data do Registro</p>
                      <p>{new Date(registro.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Responsável</p>
                      <p>{registro.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Motivo</p>
                      <p>{registro.motivo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prazo para Correção</p>
                      <p>{new Date(registro.prazoCorrecao).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Descrição</p>
                    <p className="text-sm">{registro.descricao}</p>
                  </div>

                  {registro.observacoes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Observações</p>
                      <p className="text-sm italic">{registro.observacoes}</p>
                    </div>
                  )}

                  {registro.documentos.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Documentos</p>
                      <div className="flex flex-wrap gap-2">
                        {registro.documentos.map((doc, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Registro #{registro.id}
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => generatePDF(registro)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedRegistro(registro)}
                          >
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes do Registro Disciplinar</DialogTitle>
                            <DialogDescription>
                              Informações completas do registro #{selectedRegistro?.id}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedRegistro && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={selectedRegistro.colaborador.foto} alt={selectedRegistro.colaborador.nome} />
                                  <AvatarFallback className="text-lg">{getInitials(selectedRegistro.colaborador.nome)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-bold">{selectedRegistro.colaborador.nome}</h3>
                                  <p className="text-muted-foreground">{selectedRegistro.colaborador.cargo} - {selectedRegistro.colaborador.area}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-medium">Data do Registro</p>
                                  <p>{new Date(selectedRegistro.data).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Tipo</p>
                                  <Badge className={getTipoColor(selectedRegistro.tipo)}>
                                    {selectedRegistro.tipo}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="font-medium">Status</p>
                                  <Badge className={getStatusColor(selectedRegistro.status)}>
                                    {selectedRegistro.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="font-medium">Responsável</p>
                                  <p>{selectedRegistro.responsavel}</p>
                                </div>
                              </div>

                              <div>
                                <p className="font-medium mb-2">Motivo</p>
                                <p>{selectedRegistro.motivo}</p>
                              </div>

                              <div>
                                <p className="font-medium mb-2">Descrição Completa</p>
                                <p className="text-sm">{selectedRegistro.descricao}</p>
                              </div>

                              <div>
                                <p className="font-medium mb-2">Observações</p>
                                <p className="text-sm italic">{selectedRegistro.observacoes}</p>
                              </div>

                              <div>
                                <p className="font-medium mb-2">Prazo para Correção</p>
                                <p>{new Date(selectedRegistro.prazoCorrecao).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disciplinares</CardTitle>
              <CardDescription>
                Análises e métricas dos registros disciplinares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Relatórios em desenvolvimento.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="novo">
          <Card>
            <CardHeader>
              <CardTitle>Novo Registro Disciplinar</CardTitle>
              <CardDescription>
                Criar um novo registro de ocorrência disciplinar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Colaborador</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o colaborador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">Maria Silva</SelectItem>
                      <SelectItem value="joao">João Santos</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tipo de Registro</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orientacao">Orientação</SelectItem>
                      <SelectItem value="verbal">Advertência Verbal</SelectItem>
                      <SelectItem value="escrita">Advertência Escrita</SelectItem>
                      <SelectItem value="suspensao">Suspensão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Motivo</label>
                <Input placeholder="Descreva brevemente o motivo" />
              </div>

              <div>
                <label className="text-sm font-medium">Descrição Detalhada</label>
                <Textarea 
                  placeholder="Descreva detalhadamente a ocorrência..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Data da Ocorrência</label>
                  <Input type="date" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Prazo para Correção</label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Observações</label>
                <Textarea 
                  placeholder="Observações adicionais..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Registro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* No results message */}
      {filteredRegistros.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhum registro encontrado com os filtros aplicados.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedTipo("Todos");
              setSelectedStatus("Todos");
              setSelectedArea("Todas");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoricoDisciplinas;
```

## src/pages/NotFound.tsx
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground mb-6">
          A página que você está procurando não existe.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
```