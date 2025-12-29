import { cn } from '@/lib/utils';

type StatusType = 'Approved' | 'Normal' | 'Pending' | 'Flagged' | 'Rejected' | 'Fraudulent' | 'Open' | 'Under Review' | 'Closed' | 'Submitted' | 'Active' | 'Inactive' | 'Detected' | 'Under Investigation' | 'Report Generated' | 'Submitted to RBI';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // Success states
  'Approved': 'bg-success/10 text-success border-success/20',
  'Normal': 'bg-success/10 text-success border-success/20',
  'Active': 'bg-success/10 text-success border-success/20',
  'Closed': 'bg-success/10 text-success border-success/20',
  'Submitted': 'bg-success/10 text-success border-success/20',
  
  // Warning states
  'Pending': 'bg-warning/10 text-warning border-warning/20',
  'Flagged': 'bg-warning/10 text-warning border-warning/20',
  'Open': 'bg-warning/10 text-warning border-warning/20',
  'Under Review': 'bg-warning/10 text-warning border-warning/20',
  'Under Investigation': 'bg-warning/10 text-warning border-warning/20',
  'Detected': 'bg-accent/10 text-accent border-accent/20',
  'Report Generated': 'bg-accent/10 text-accent border-accent/20',
  'Submitted to RBI': 'bg-primary/10 text-primary border-primary/20',
  
  // Danger states
  'Rejected': 'bg-destructive/10 text-destructive border-destructive/20',
  'Fraudulent': 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Neutral states
  'Inactive': 'bg-muted text-muted-foreground border-border',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] || 'bg-muted text-muted-foreground border-border';
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
