
import { useState } from 'react';
import { User } from '@/types/auth';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import LeadsView from '../leads/LeadsView';
import UsersView from '../users/UsersView';
import SettingsView from '../settings/SettingsView';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'leads':
        return <LeadsView user={user} />;
      case 'users':
        return user.role === 'super_admin' ? <UsersView user={user} /> : <DashboardContent user={user} />;
      case 'settings':
        return <SettingsView user={user} />;
      default:
        return <DashboardContent user={user} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar user={user} activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <Header user={user} onLogout={onLogout} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
