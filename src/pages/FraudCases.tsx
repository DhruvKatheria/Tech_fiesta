import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fraudCases } from '@/data/mockData';
import {
  ShieldAlert,
  ArrowLeft,
  FileText,
  CheckCircle,
  Circle,
  AlertTriangle,
  Building,
  User,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FraudCases() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCase, setSelectedCase] = useState(id ? fraudCases.find((c) => c.id === id) : fraudCases[0]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleGenerateReport = () => {
    console.log('Generating FMR-1 Report for case:', selectedCase?.id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fraud Cases</h1>
            <p className="text-muted-foreground mt-1">
              Investigate and manage fraud cases
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cases List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">
              Active Cases
            </h3>
            {fraudCases.map((fraudCase) => (
              <button
                key={fraudCase.id}
                onClick={() => setSelectedCase(fraudCase)}
                className={cn(
                  'w-full text-left rounded-xl p-4 transition-all',
                  selectedCase?.id === fraudCase.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card hover:bg-muted/50 border border-border'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{fraudCase.id}</span>
                  <StatusBadge status={fraudCase.status} />
                </div>
                <p className={cn(
                  'text-sm',
                  selectedCase?.id === fraudCase.id
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                )}>
                  {fraudCase.userName}
                </p>
                <p className={cn(
                  'text-lg font-bold mt-1',
                  selectedCase?.id === fraudCase.id
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                )}>
                  {formatCurrency(fraudCase.amount)}
                </p>
              </button>
            ))}
          </div>

          {/* Case Details */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-6">
              {/* Case Header */}
              <div className="rounded-xl bg-card p-6 shadow-md border border-border">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl gradient-danger flex items-center justify-center">
                      <ShieldAlert className="h-7 w-7 text-destructive-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedCase.id}</h2>
                      <p className="text-muted-foreground">Created on {selectedCase.createdAt}</p>
                    </div>
                  </div>
                  <StatusBadge status={selectedCase.status} />
                </div>

                {/* Case Info Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">User</p>
                      <p className="font-medium text-foreground">{selectedCase.userName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-medium text-foreground">{formatCurrency(selectedCase.amount)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bank</p>
                      <p className="font-medium text-foreground">{selectedCase.bankName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Account</p>
                      <p className="font-medium text-foreground">{selectedCase.accountNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-xl bg-card p-6 shadow-md border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Case Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {selectedCase.timeline.map((step, index) => (
                      <div key={index} className="relative flex items-start gap-4 pl-10">
                        <div
                          className={cn(
                            'absolute left-0 h-8 w-8 rounded-full flex items-center justify-center',
                            step.completed
                              ? 'bg-success text-success-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p
                            className={cn(
                              'font-medium',
                              step.completed ? 'text-foreground' : 'text-muted-foreground'
                            )}
                          >
                            {step.status}
                          </p>
                          {step.date && (
                            <p className="text-sm text-muted-foreground">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Risk Indicators */}
              <div className="rounded-xl bg-card p-6 shadow-md border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Risk Indicators</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.riskIndicators.map((indicator, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium"
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleGenerateReport}
                  className="flex-1 h-12 gradient-primary text-primary-foreground font-semibold"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Generate FMR-1 Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
