import { Users, FileText, TrendingUp, Building2, Target, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  // Mock data - em produção viria da API
  const stats = {
    totalColaboradores: 156,
    colaboradoresAtivos: 143,
    totalCargos: 28,
    areasAtuacao: 8,
    promocoesMes: 5,
    avaliacoesPendentes: 12
  };

  const proximasPromocoes = [
    { nome: "Ana Paula Silva", cargoAtual: "Analista de Sistemas Pleno", proximoCargo: "Sênior", previsao: "Março 2024" },
    { nome: "Carlos Eduardo", cargoAtual: "Coordenador Comercial", proximoCargo: "Gerente Comercial", previsao: "Abril 2024" },
    { nome: "Marina Costa", cargoAtual: "Analista Logística Junior", proximoCargo: "Pleno", previsao: "Maio 2024" }
  ];

  const metricas = [
    { area: "TI", colaboradores: 24, crescimento: "+8%" },
    { area: "Comercial", colaboradores: 45, crescimento: "+12%" },
    { area: "Logística", colaboradores: 38, crescimento: "+5%" },
    { area: "Financeiro", colaboradores: 18, crescimento: "+3%" },
    { area: "RH", colaboradores: 12, crescimento: "+2%" }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-card transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalColaboradores}</div>
            <p className="text-xs text-muted-foreground">
              {stats.colaboradoresAtivos} ativos
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Definidos</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCargos}</div>
            <p className="text-xs text-muted-foreground">
              {stats.areasAtuacao} áreas de atuação
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoções este Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.promocoesMes}</div>
            <p className="text-xs text-muted-foreground">
              +15% vs mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.avaliacoesPendentes}</div>
            <p className="text-xs text-muted-foreground">
              Para este trimestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Próximas Promoções */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Próximas Promoções Previstas
            </CardTitle>
            <CardDescription>
              Colaboradores em trilha de evolução com previsão de promoção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {proximasPromocoes.map((promocao, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium">{promocao.nome}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{promocao.cargoAtual}</span>
                    <TrendingUp className="h-3 w-3" />
                    <span>{promocao.proximoCargo}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {promocao.previsao}
                  </Badge>
                  <div className="text-xs text-muted-foreground">Previsão</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Trilhas
            </Button>
          </CardContent>
        </Card>

        {/* Distribuição por Área */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Colaboradores por Área
            </CardTitle>
            <CardDescription>
              Distribuição e crescimento por setor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metricas.map((metrica, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{metrica.area}</span>
                  <div className="flex items-center gap-2">
                    <span>{metrica.colaboradores}</span>
                    <Badge 
                      variant="outline" 
                      className="text-xs text-green-600 border-green-200 bg-green-50"
                    >
                      {metrica.crescimento}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(metrica.colaboradores / stats.totalColaboradores) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso direto às principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Users className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-medium">Novo Colaborador</div>
                <div className="text-xs text-muted-foreground">Cadastrar pessoa</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <FileText className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-medium">Novo Cargo</div>
                <div className="text-xs text-muted-foreground">Definir posição</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-medium">Avaliar Trilha</div>
                <div className="text-xs text-muted-foreground">Processo de promoção</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Target className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-medium">Relatórios</div>
                <div className="text-xs text-muted-foreground">Análises completas</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}