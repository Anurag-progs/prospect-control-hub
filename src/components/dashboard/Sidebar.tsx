
import { User } from '@/types/auth';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  user: User;
  activeView: string;
  onViewChange: (view: string) => void;
}

const AppSidebar = ({ user, activeView, onViewChange }: SidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        id: 'dashboard',
        description: 'Overview & Analytics'
      },
      {
        title: 'Leads',
        icon: UserPlus,
        id: 'leads',
        description: 'Manage Leads'
      }
    ];

    if (user.role === 'super_admin') {
      baseItems.push(
        {
          title: 'Users',
          icon: Users,
          id: 'users',
          description: 'User Management'
        },
        {
          title: 'Settings',
          icon: Settings,
          id: 'settings',
          description: 'System Settings'
        }
      );
    } else if (user.role === 'manager') {
      baseItems.push({
        title: 'Settings',
        icon: Settings,
        id: 'settings',
        description: 'Team Settings'
      });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-gray-200 bg-white" collapsible="icon">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LeadsPro
              </h2>
              <p className="text-xs text-gray-500 capitalize">
                {user.role.replace('_', ' ')} Portal
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.id)}
                    tooltip={isCollapsed ? item.title : undefined}
                    className={cn(
                      "w-full h-12 px-3 rounded-lg transition-all duration-200 group",
                      activeView === item.id 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                        : "hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <item.icon className={cn(
                        "h-5 w-5 transition-colors",
                        activeView === item.id ? "text-white" : "text-gray-500"
                      )} />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">{item.title}</span>
                          <span className={cn(
                            "text-xs",
                            activeView === item.id ? "text-blue-100" : "text-gray-400"
                          )}>
                            {item.description}
                          </span>
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform group-hover:translate-x-1",
                        activeView === item.id ? "text-white" : "text-gray-400"
                      )} />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
