import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  ArrowLeftRight,
  AlertTriangle,
  FileText,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'KYC Verification',
    href: '/kyc',
    icon: UserCheck,
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    title: 'AML Alerts',
    href: '/aml-alerts',
    icon: AlertTriangle,
  },
  {
    title: 'Fraud Cases',
    href: '/fraud-cases',
    icon: ShieldAlert,
  },
  {
    title: 'Compliance Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Admin Panel',
    href: '/admin',
    icon: Settings,
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
              <ShieldAlert className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">FinGuard</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
            <ShieldAlert className="h-5 w-5 text-accent-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-12 items-center justify-center border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </aside>
  );
}

export function useSidebarWidth() {
  const [collapsed] = useState(false);
  return collapsed ? 64 : 256;
}
