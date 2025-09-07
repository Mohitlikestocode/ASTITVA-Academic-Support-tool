import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  FileText, 
  Bell, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const NavButton = ({ item, isMobile = false }: { item: typeof navigationItems[0], isMobile?: boolean }) => (
    <Button
      variant={currentView === item.id ? 'default' : 'ghost'}
      onClick={() => {
        onViewChange(item.id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={cn(
        "justify-start gap-3 h-11",
        isMobile ? "w-full" : "",
        currentView === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Button>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex-col z-40">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">ASTITVA</h1>
          <p className="text-sm text-muted-foreground mt-1">Academic Support System</p>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="justify-start gap-3 h-11 w-full text-muted-foreground">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">ASTITVA</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg">
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <NavButton key={item.id} item={item} isMobile />
              ))}
              <Button variant="ghost" className="justify-start gap-3 h-11 w-full text-muted-foreground">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;