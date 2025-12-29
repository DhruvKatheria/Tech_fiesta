import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  score: number;
  className?: string;
}

export function RiskBadge({ score, className }: RiskBadgeProps) {
  const getStyle = () => {
    if (score >= 70) {
      return 'bg-destructive/10 text-destructive border-destructive/20';
    } else if (score >= 40) {
      return 'bg-warning/10 text-warning border-warning/20';
    } else {
      return 'bg-success/10 text-success border-success/20';
    }
  };

  const getLabel = () => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
          getStyle()
        )}
      >
        {score}
      </span>
      <span className="text-xs text-muted-foreground">{getLabel()}</span>
    </div>
  );
}
