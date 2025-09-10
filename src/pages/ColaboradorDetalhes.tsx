import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Building, User, FileText, Star, AlertTriangle, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock data - em produção viria da API
const colaboradoresDetalhes = {
  1: {
    id: 1,
    nome: "Ana Paula Silva",
    email: "ana.silva@vilanova.com.br",
    telefone: "(11) 98765-4321",
    cargo: "Analista de Sistemas",
    nivel: "Sênior",
    area: "TI",
    empresa: "Vila Nova Tech",
    status: "Ativo",
    dataAdmissao: "2022-03-15",
    dataNascimento: "1990-08-22",
    endereco: "São Paulo, SP",
    foto: "",
    matricula: "TI001",
    salario: "R$ 8.500,00",
    gestor: "Ricardo Oliveira",
    competencias: [
      { nome: "JavaScript", nivel: 9, categoria: "Técnica" },
      { nome: "React", nivel: 8, categoria: "Técnica" },
      { nome: "Node.js", nivel: 7, categoria: "Técnica" },
      { nome: "Trabalho em Equipe", nivel: 9, categoria: "Comportamental" },
      { nome: "Comunicação", nivel: 8, categoria: "Comportamental" }
    ],
    ultimaAvaliacao: {
      periodo: "2024 - 1º Semestre",
      pontuacaoGeral: 8.5,
      status: "Concluída",
      data: "2024-06-30"
    },
    historicoDisciplinar: [
      {
        tipo: "Elogio",
        data: "2024-05-15",
        motivo: "Excelente entrega do projeto de migração",
        status: "Ativo"
      }
    ],
    trilhaCarreira: {
      cargoAtual: "Analista de Sistemas Sênior",
      proximoCargo: "Coordenador de Desenvolvimento",
      progresso: 75,
      requisitosRestantes: [
        "Liderança de projetos complexos",
        "Mentoria de desenvolvedores júnior",
        "Conhecimento em arquitetura de software"
      ]
    }
  },
  2: {
    id: 2,
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@vilanova.com.br",
    telefone: "(11) 97654-3210",
    cargo: "Coordenador Comercial",
    nivel: "Pleno",
    area: "Comercial",
    empresa: "Vila Nova Distribuidora",
    status: "Ativo",
    dataAdmissao: "2021-08-22",
    dataNascimento: "1985-12-10",
    endereco: "São Paulo, SP",
    foto: "",
    matricula: "COM002",
    salario: "R$ 12.000,00",
    gestor: "Maria Santos",
    competencias: [
      { nome: "Liderança", nivel: 9, categoria: "Comportamental" },
      { nome: "Negociação", nivel: 9, categoria: "Comportamental" },
      { nome: "CRM", nivel: 8, categoria: "Técnica" },
      { nome: "Análise de Vendas", nivel: 8, categoria: "Técnica" },
      { nome: "Gestão de Equipes", nivel: 9, categoria: "Comportamental" }
    ],
    ultimaAvaliacao: {
      periodo: "2024 - 1º Semestre",
      pontuacaoGeral: 9.2,
      status: "Concluída",
      data: "2024-06-30"
    },
    historicoDisciplinar: [],
    trilhaCarreira: {
      cargoAtual: "Coordenador Comercial Pleno",
      proximoCargo: "Gerente Comercial",
      progresso: 85,
      requisitosRestantes: [
        "MBA em Gestão Comercial",
        "Resultados consistentes por 2 anos",
        "Desenvolvimento de novos mercados"
      ]
    }
  }
};

export default function ColaboradorDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const colaborador = colaboradoresDetalhes[Number(id) as keyof typeof colaboradoresDetalhes];

  if (!colaborador) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Colaborador não encontrado</h2>
          <Button onClick={() => navigate('/colaboradores')}>
            Voltar para Colaboradores
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getNivelColor = (nivel: string) => {
    const colors = {
      "Estagiário": "bg-gray-100 text-gray-800 border-gray-200",
      "Junior": "bg-blue-50 text-blue-700 border-blue-200",
      "Pleno": "bg-green-50 text-green-700 border-green-200",
      "Sênior": "bg-orange-50 text-orange-700 border-orange-200",
      "Especialista": "bg-purple-50 text-purple-700 border-purple-200"
    };
    return colors[nivel as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCompetenciaColor = (nivel: number) => {
    if (nivel >= 8) return "text-green-600";
    if (nivel >= 6) return "text-blue-600";
    if (nivel >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/colaboradores')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Perfil do Colaborador</h1>
          <p className="text-muted-foreground">Informações detalhadas e histórico</p>
        </div>
      </div>

      {/* Informações Principais */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary/10">
              <AvatarImage src={colaborador.foto} alt={colaborador.nome} />
              <AvatarFallback className="bg-primary/5 text-primary font-semibold text-lg">
                {getInitials(colaborador.nome)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{colaborador.nome}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`${getNivelColor(colaborador.nivel)}`}>
                      {colaborador.nivel}
                    </Badge>
                    <Badge variant="default" className="bg-primary">
                      {colaborador.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">{colaborador.cargo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Matrícula</p>
                  <p className="font-semibold">{colaborador.matricula}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.empresa}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{colaborador.area}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="competencias">Competências</TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliação</TabsTrigger>
          <TabsTrigger value="carreira">Carreira</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                    <p className="text-sm">{new Date(colaborador.dataNascimento).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                    <p className="text-sm">{colaborador.endereco}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data de Admissão</p>
                    <p className="text-sm">{new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gestor Direto</p>
                    <p className="text-sm">{colaborador.gestor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Status Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Última Avaliação</span>
                    <Badge variant="outline" className="text-xs">
                      {colaborador.ultimaAvaliacao.status}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">{colaborador.ultimaAvaliacao.pontuacaoGeral}</p>
                  <p className="text-xs text-muted-foreground">{colaborador.ultimaAvaliacao.periodo}</p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progresso na Carreira</span>
                    <span className="text-sm text-muted-foreground">{colaborador.trilhaCarreira.progresso}%</span>
                  </div>
                  <Progress value={colaborador.trilhaCarreira.progresso} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Próximo: {colaborador.trilhaCarreira.proximoCargo}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competencias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Competências Avaliadas
              </CardTitle>
              <CardDescription>
                Nível de proficiência em diferentes competências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {colaborador.competencias.map((competencia, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{competencia.nome}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {competencia.categoria}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <Progress value={competencia.nivel * 10} className="h-2" />
                      </div>
                      <div className={`text-lg font-bold w-8 text-center ${getCompetenciaColor(competencia.nivel)}`}>
                        {competencia.nivel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avaliacao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Última Avaliação de Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Detalhes da Avaliação</h3>
                <p className="text-muted-foreground mb-4">
                  Período: {colaborador.ultimaAvaliacao.periodo}
                </p>
                <div className="text-4xl font-bold text-primary mb-2">
                  {colaborador.ultimaAvaliacao.pontuacaoGeral}
                </div>
                <p className="text-muted-foreground">
                  Avaliação realizada em {new Date(colaborador.ultimaAvaliacao.data).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carreira" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trilha de Carreira
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Cargo Atual</h3>
                    <p className="text-muted-foreground">{colaborador.trilhaCarreira.cargoAtual}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold">Próximo Nível</h3>
                    <p className="text-muted-foreground">{colaborador.trilhaCarreira.proximoCargo}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progresso para Próximo Nível</span>
                    <span className="text-sm text-muted-foreground">{colaborador.trilhaCarreira.progresso}%</span>
                  </div>
                  <Progress value={colaborador.trilhaCarreira.progresso} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Requisitos Restantes</h4>
                <div className="space-y-2">
                  {colaborador.trilhaCarreira.requisitosRestantes.map((requisito, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm">{requisito}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Histórico Disciplinar
              </CardTitle>
            </CardHeader>
            <CardContent>
              {colaborador.historicoDisciplinar.length > 0 ? (
                <div className="space-y-4">
                  {colaborador.historicoDisciplinar.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.tipo === 'Elogio' ? 'bg-green-500' : 
                        item.tipo === 'Advertência' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={`text-xs ${
                            item.tipo === 'Elogio' ? 'bg-green-50 text-green-700 border-green-200' : 
                            item.tipo === 'Advertência' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {item.tipo}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.motivo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma ocorrência registrada</h3>
                  <p className="text-muted-foreground">
                    Este colaborador não possui histórico disciplinar.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}