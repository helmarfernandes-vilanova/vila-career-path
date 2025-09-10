import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface MainLayoutProps {
  children: React.ReactNode;
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/colaboradores':
      return 'Colaboradores';
    case '/cargos':
      return 'Descrição de Cargos';
    case '/relatorios':
      return 'Relatórios';
    case '/configuracoes':
      return 'Configurações';
    default:
      return 'Página';
  }
};

const getBreadcrumbs = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Dashboard', path: '/' }];
  
  if (parts.length > 0) {
    let currentPath = '';
    parts.forEach((part) => {
      currentPath += `/${part}`;
      const name = getPageTitle(currentPath);
      breadcrumbs.push({ name, path: currentPath });
    });
  }
  
  return breadcrumbs;
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const pageTitle = getPageTitle(location.pathname);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.path} className="flex items-center">
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                          <BreadcrumbPage className="font-medium text-foreground">
                            {breadcrumb.name}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink 
                            href={breadcrumb.path}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {breadcrumb.name}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="mx-2" />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 flex flex-col gap-4 p-6 pt-0 overflow-auto">
            <div className="flex items-center justify-between pt-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{pageTitle}</h1>
                <p className="text-muted-foreground mt-1">
                  {location.pathname === '/' && 'Gerencie colaboradores e trilhas de carreira do Grupo Vila Nova'}
                  {location.pathname === '/colaboradores' && 'Visualize e gerencie todos os colaboradores'}
                  {location.pathname === '/cargos' && 'Defina cargos e trilhas de desenvolvimento'}
                  {location.pathname === '/relatorios' && 'Análises e métricas de RH'}
                  {location.pathname === '/configuracoes' && 'Configurações do sistema'}
                </p>
              </div>
            </div>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}