import { useState } from 'react';
import { cn } from '@/lib/utils';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import StudentsTable from './StudentsTable';
import UploadData from './UploadData';
import Reports from './Reports';
import Notifications from './Notifications';

const AstitvaApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentsTable />;
      case 'upload':
        return <UploadData />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content */}
      <main className={cn(
        "transition-all duration-200 ease-out",
        "md:ml-64 md:pt-0 pt-16" // Account for mobile header and desktop sidebar
      )}>
        <div className="p-6">
          {renderCurrentView()}
        </div>
      </main>
      
      {/* Offline Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Running Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstitvaApp;