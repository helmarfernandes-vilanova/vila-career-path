import { useState } from "react";
import { Search, Plus, AlertCircle, FileText, Calendar, Filter, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data - em produção viria da API
const ocorrencias = [
  {
    id: 1,
    colaborador: {
      nome: "João Silva Santos",
      cargo: "Operador de Logística",
      area: "Logística",
      foto: "",
      matricula: "LOG001"
    },
    tipo: "Advertência",
    categoria: "Atraso",
    dataOcorrencia: "2024-06-15",
    descricao: "Atraso recorrente nos últimos 5 dias úteis sem justificativa prévia",
    medidaTomada: "Advertência verbal com orientação sobre pontualidade",
    responsavel: "Carlos Mendes",
    status: "Ativa",
    prazoValidade: "2024-12-15",
    observacoes: "Colaborador se comprometeu a melhorar pontualidade",
    documentos: ["advertencia_verbal_001.pdf"]
  },
  {
    id: 2,
    colaborador: {
      nome: "Maria Costa Lima",
      cargo: "Analista Financeiro",
      area: "Financeiro",
      foto: "",
      matricula: "FIN002"
    },
    tipo: "Suspensão",
    categoria: "Conduta",
    dataOcorrencia: "2024-05-22",
    descricao: "Comportamento inadequado com cliente durante atendimento telefônico",
    medidaTomada: "Suspensão de 1 dia e treinamento de relacionamento",
    responsavel: "Ana Paula Rodrigues",
    status: "Cumprida",
    prazoValidade: "2025-05-22",
    observacoes: "Participou do treinamento de relacionamento interpessoal",
    documentos: ["suspensao_001.pdf", "treinamento_relacional.pdf"]
  },
  {
    id: 3,
    colaborador: {
      nome: "Pedro Oliveira",
      cargo: "Desenvolvedor Pleno",
      area: "TI",
      foto: "",
      matricula: "TI003"
    },
    tipo: "Orientação",
    categoria: "Processo",
    dataOcorrencia: "2024-07-03",
    descricao: "Não seguimento dos procedimentos de versionamento de código",
    medidaTomada: "Orientação sobre boas práticas de desenvolvimento",
    responsavel: "Ricardo Oliveira",
    status: "Ativa",
    prazoValidade: null,
    observacoes: "Orientação preventiva para melhoria dos processos",
    documentos: ["orientacao_processo_001.pdf"]
  }
];

const tipos = ["Todos", "Advertência", "Suspensão", "Demissão", "Orientação", "Elogio"];
const categorias = ["Todas", "Atraso", "Conduta", "Processo", "Segurança", "Qualidade", "Relacionamento"];
const status = ["Todos", "Ativa", "Cumprida", "Vencida", "Cancelada"];
const areas = ["Todas", "TI", "Comercial", "Financeiro", "RH", "Logística"];

export default function HistoricoDisciplinas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("Todos");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<any>(null);

  const filteredOcorrencias = ocorrencias.filter(ocorrencia => {
    const matchesSearch = ocorrencia.colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.colaborador.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ocorrencia.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = selectedTipo === "Todos" || ocorrencia.tipo === selectedTipo;
    const matchesCategoria = selectedCategoria === "Todas" || ocorrencia.categoria === selectedCategoria;
    const matchesStatus = selectedStatus === "Todos" || ocorrencia.status === selectedStatus;
    const matchesArea = selectedArea === "Todas" || ocorrencia.colaborador.area === selectedArea;
    
    return matchesSearch && matchesTipo && matchesCategoria && matchesStatus && matchesArea;
  });

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      "Advertência": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Suspensão": "bg-orange-50 text-orange-700 border-orange-200",
      "Demissão": "bg-red-50 text-red-700 border-red-200",
      "Orientação": "bg-blue-50 text-blue-700 border-blue-200",
      "Elogio": "bg-green-50 text-green-700 border-green-200"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Ativa": "bg-blue-50 text-blue-700 border-blue-200",
      "Cumprida": "bg-green-50 text-green-700 border-green-200",
      "Vencida": "bg-gray-50 text-gray-700 border-gray-200",
      "Cancelada": "bg-red-50 text-red-700 border-red-200"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getTipoIcon = (tipo: string) => {
    switch(tipo) {
      case "Advertência": return AlertCircle;
      case "Suspensão": return AlertCircle;
      case "Demissão": return AlertCircle;
      case "Orientação": return FileText;
      case "Elogio": return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ocorrencias" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="politicas">Políticas</TabsTrigger>
        </TabsList>

        <TabsContent value="ocorrencias" className="space-y-6">
          {/* Filtros e Ações */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {status.map(st => (
                      <SelectItem key={st} value={st}>{st}</SelectItem>
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

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4 mr-2" />
                Nova Ocorrência
              </Button>
            </div>
          </div>

          {/* Lista de Ocorrências */}
          <div className="space-y-4">
            {filteredOcorrencias.map((ocorrencia) => {
              const IconComponent = getTipoIcon(ocorrencia.tipo);
              return (
                <Card key={ocorrencia.id} className="group cursor-pointer transition-all duration-200 hover:shadow-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                          <AvatarImage src={ocorrencia.colaborador.foto} alt={ocorrencia.colaborador.nome} />
                          <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                            {getInitials(ocorrencia.colaborador.nome)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                            {ocorrencia.colaborador.nome}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mb-2">
                            {ocorrencia.colaborador.cargo} • {ocorrencia.colaborador.area}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Matrícula: {ocorrencia.colaborador.matricula}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-4 w-4" />
                          <Badge variant="outline" className={`text-xs ${getTipoColor(ocorrencia.tipo)}`}>
                            {ocorrencia.tipo}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(ocorrencia.dataOcorrencia).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {ocorrencia.categoria}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(ocorrencia.status)}`}>
                        {ocorrencia.status}
                      </Badge>
                      {ocorrencia.prazoValidade && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Calendar className="h-3 w-3" />
                          Validade: {new Date(ocorrencia.prazoValidade).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Descrição</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ocorrencia.descricao}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Medida Tomada</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ocorrencia.medidaTomada}
                      </p>
                    </div>

                    {ocorrencia.observacoes && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Observações</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ocorrencia.observacoes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Responsável: {ocorrencia.responsavel}</span>
                        <span>•</span>
                        <span>{ocorrencia.documentos.length} documento(s)</span>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOcorrencia(ocorrencia)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">
                              Detalhes da Ocorrência - {selectedOcorrencia?.tipo}
                            </DialogTitle>
                            <DialogDescription>
                              {selectedOcorrencia?.colaborador.nome} • {selectedOcorrencia?.colaborador.matricula}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedOcorrencia && (
                            <div className="space-y-6 mt-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold mb-2 text-sm">Data da Ocorrência</h5>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(selectedOcorrencia.dataOcorrencia).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div>
                                  <h5 className="font-semibold mb-2 text-sm">Status</h5>
                                  <Badge variant="outline" className={`text-xs ${getStatusColor(selectedOcorrencia.status)}`}>
                                    {selectedOcorrencia.status}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <h5 className="font-semibold mb-2 text-sm">Descrição Completa</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedOcorrencia.descricao}
                                </p>
                              </div>

                              <div>
                                <h5 className="font-semibold mb-2 text-sm">Medida Tomada</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedOcorrencia.medidaTomada}
                                </p>
                              </div>

                              {selectedOcorrencia.observacoes && (
                                <div>
                                  <h5 className="font-semibold mb-2 text-sm">Observações</h5>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedOcorrencia.observacoes}
                                  </p>
                                </div>
                              )}

                              <div>
                                <h5 className="font-semibold mb-2 text-sm">Documentos</h5>
                                <div className="space-y-2">
                                  {selectedOcorrencia.documentos.map((doc: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm flex-1">{doc}</span>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {selectedOcorrencia.prazoValidade && (
                                <div className="bg-accent/50 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-sm">Prazo de Validade</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Esta ocorrência tem validade até {new Date(selectedOcorrencia.prazoValidade).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios Disciplinares
              </CardTitle>
              <CardDescription>
                Análises e estatísticas das ocorrências disciplinares
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Relatórios em Desenvolvimento</h3>
              <p className="text-muted-foreground">
                Dashboard com métricas disciplinares estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Políticas e Regulamentos
              </CardTitle>
              <CardDescription>
                Documentos e diretrizes da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Políticas em Desenvolvimento</h3>
              <p className="text-muted-foreground">
                Biblioteca de políticas e regulamentos estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}