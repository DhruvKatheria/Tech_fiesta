import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-primary text-primary-foreground',
  success: 'gradient-success text-success-foreground',
  warning: 'gradient-warning text-warning-foreground',
  danger: 'gradient-danger text-destructive-foreground',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  success: 'bg-success-foreground/20 text-success-foreground',
  warning: 'bg-warning-foreground/20 text-warning-foreground',
  danger: 'bg-destructive-foreground/20 text-destructive-foreground',
};

export function StatCard({ title, value, icon: Icon, trend, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
          )}>
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend.isPositive 
                ? variant === 'default' ? 'text-success' : 'opacity-90'
                : variant === 'default' ? 'text-destructive' : 'opacity-90'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="opacity-70">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg',
          iconVariantStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-foreground/5" />
    </div>
  );
}
