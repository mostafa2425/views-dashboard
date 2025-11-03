import { useState } from 'react';
import { ThemeProvider } from './lib/theme-context';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ReputationPage } from './components/dashboard/ReputationPage';
import { SocialMediaPage } from './components/dashboard/SocialMediaPage';
import { CompetitorsPage } from './components/dashboard/CompetitorsPage';
import { OperationsPage } from './components/dashboard/OperationsPage';
import { AIInsightsPage } from './components/dashboard/AIInsightsPage';
import { ReportsPage } from './components/dashboard/ReportsPage';
import { SettingsPage } from './components/dashboard/SettingsPage';
import { ProfilePage } from './components/account/ProfilePage';
import { AccountSettingsPage } from './components/account/AccountSettingsPage';
import { NotificationsPage } from './components/account/NotificationsPage';
import { TeamManagementPage } from './components/account/TeamManagementPage';
import { BillingPage } from './components/account/BillingPage';
import { SecurityPage } from './components/account/SecurityPage';
import { HelpSupportPage } from './components/account/HelpSupportPage';
import { Toaster } from './components/ui/sonner';
import { ReviewSourcesDemo } from './components/charts/ReviewSourcesDemo';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('All Properties');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setActivePage} />;
      case 'reputation':
        return <ReputationPage />;
      case 'social':
        return <SocialMediaPage />;
      case 'competitors':
        return <CompetitorsPage />;
      case 'operations':
        return <OperationsPage />;
      case 'ai-insights':
        return <AIInsightsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'account-settings':
        return <AccountSettingsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'team-management':
        return <TeamManagementPage />;
      case 'billing':
        return <BillingPage />;
      case 'security':
        return <SecurityPage />;
      case 'help-support':
        return <HelpSupportPage />;
      case 'chart-demo':
        return <ReviewSourcesDemo />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Header 
          selectedBranch={selectedBranch} 
          onBranchChange={setSelectedBranch}
          onNavigate={setActivePage}
        />
        
        <div className="flex h-[calc(100vh-73px)]">
          <Sidebar activePage={activePage} onPageChange={setActivePage} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {renderPage()}
            </div>
          </main>
        </div>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
