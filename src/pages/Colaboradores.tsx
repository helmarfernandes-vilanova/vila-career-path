import { useState } from "react";
import { Search, Filter, Download, Plus, MapPin, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - em produção viria da API
const colaboradores = [
  {
    id: 1,
    nome: "Ana Paula Silva",
    email: "ana.silva@vilanova.com.br",
    cargo: "Analista de Sistemas",
    nivel: "Sênior",
    area: "TI",
    empresa: "Vila Nova Tech",
    status: "Ativo",
    dataAdmissao: "2022-03-15",
    foto: ""
  },
  {
    id: 2,
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@vilanova.com.br",
    cargo: "Coordenador Comercial",
    nivel: "Pleno",
    area: "Comercial",
    empresa: "Vila Nova Distribuidora",
    status: "Ativo",
    dataAdmissao: "2021-08-22",
    foto: ""
  },
  {
    id: 3,
    nome: "Marina Costa",
    email: "marina.costa@vilanova.com.br",
    cargo: "Analista de Logística",
    nivel: "Junior",
    area: "Logística",
    empresa: "Vila Nova Logística",
    status: "Ativo",
    dataAdmissao: "2023-01-10",
    foto: ""
  },
  {
    id: 4,
    nome: "Ricardo Oliveira",
    email: "ricardo.oliveira@vilanova.com.br",
    cargo: "Gerente de TI",
    nivel: "Especialista",
    area: "TI",
    empresa: "Vila Nova Tech",
    status: "Ativo",
    dataAdmissao: "2020-05-18",
    foto: ""
  }
];

const areas = ["Todas", "TI", "Comercial", "Logística", "Financeiro", "RH"];
const niveis = ["Todos", "Estagiário", "Junior", "Pleno", "Sênior", "Especialista"];
const empresas = ["Todas", "Vila Nova Tech", "Vila Nova Distribuidora", "Vila Nova Logística"];
const statusOptions = ["Todos", "Ativo", "Inativo", "Férias"];

export default function Colaboradores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedNivel, setSelectedNivel] = useState("Todos");
  const [selectedEmpresa, setSelectedEmpresa] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredColaboradores = colaboradores.filter(colaborador => {
    const matchesSearch = colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         colaborador.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "Todas" || colaborador.area === selectedArea;
    const matchesNivel = selectedNivel === "Todos" || colaborador.nivel === selectedNivel;
    const matchesEmpresa = selectedEmpresa === "Todas" || colaborador.empresa === selectedEmpresa;
    const matchesStatus = selectedStatus === "Todos" || colaborador.status === selectedStatus;
    
    return matchesSearch && matchesArea && matchesNivel && matchesEmpresa && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Filtros e Ações */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar colaboradores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
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

            <Select value={selectedEmpresa} onValueChange={setSelectedEmpresa}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Empresa" />
              </SelectTrigger>
              <SelectContent>
                {empresas.map(empresa => (
                  <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
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
            Novo Colaborador
          </Button>
        </div>
      </div>

      {/* Resultados */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{filteredColaboradores.length} colaboradores encontrados</span>
        {(selectedArea !== "Todas" || selectedNivel !== "Todos" || selectedEmpresa !== "Todas" || selectedStatus !== "Todos" || searchTerm) && (
          <Badge variant="secondary" className="ml-2">
            Filtros aplicados
          </Badge>
        )}
      </div>

      {/* Lista de Colaboradores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredColaboradores.map((colaborador) => (
          <Card key={colaborador.id} className="group cursor-pointer transition-all duration-200 hover:shadow-card hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarImage src={colaborador.foto} alt={colaborador.nome} />
                  <AvatarFallback className="bg-primary/5 text-primary font-semibold">
                    {getInitials(colaborador.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base leading-tight mb-1 group-hover:text-primary transition-colors">
                    {colaborador.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground truncate">
                    {colaborador.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-sm">{colaborador.cargo}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getNivelColor(colaborador.nivel)}`}
                  >
                    {colaborador.nivel}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building className="h-3 w-3" />
                    {colaborador.empresa}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {colaborador.area}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Badge 
                  variant={colaborador.status === "Ativo" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {colaborador.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Desde {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredColaboradores.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum colaborador encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termo de busca.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todas");
              setSelectedNivel("Todos");
              setSelectedEmpresa("Todas");
              setSelectedStatus("Todos");
            }}>
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}