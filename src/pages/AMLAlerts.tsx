import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { amlAlerts } from '@/data/mockData';
import { AlertTriangle, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AMLAlerts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');

  const filteredAlerts = amlAlerts.filter((alert) => {
    const matchesSearch =
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesReason = reasonFilter === 'all' || alert.reason === reasonFilter;
    return matchesSearch && matchesStatus && matchesReason;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateFraudCase = (alertId: string) => {
    console.log('Creating fraud case for alert:', alertId);
    navigate('/fraud-cases');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AML Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Anti-Money Laundering alerts requiring attention
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-xl font-bold text-foreground">{amlAlerts.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground">Open</p>
            <p className="text-xl font-bold text-warning">
              {amlAlerts.filter((a) => a.status === 'Open').length}
            </p>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground">Under Review</p>
            <p className="text-xl font-bold text-accent">
              {amlAlerts.filter((a) => a.status === 'Under Review').length}
            </p>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground">Closed</p>
            <p className="text-xl font-bold text-success">
              {amlAlerts.filter((a) => a.status === 'Closed').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reasonFilter} onValueChange={setReasonFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              <SelectItem value="Rule-based">Rule-based</SelectItem>
              <SelectItem value="ML-based">ML-based</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alerts Cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl bg-card p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{alert.id}</h3>
                    <p className="text-sm text-muted-foreground">{alert.createdAt}</p>
                  </div>
                </div>
                <StatusBadge status={alert.status} />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transaction</span>
                  <span className="text-sm font-mono text-foreground">{alert.transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">User</span>
                  <span className="text-sm font-medium text-foreground">{alert.userName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(alert.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <RiskBadge score={alert.riskScore} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Detection</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      alert.reason === 'ML-based'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {alert.reason}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-3 mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Reason: </span>
                  {alert.ruleDescription}
                </p>
              </div>

              {alert.status !== 'Closed' && (
                <Button
                  onClick={() => handleCreateFraudCase(alert.id)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Fraud Case
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
