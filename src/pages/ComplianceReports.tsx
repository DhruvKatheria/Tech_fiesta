import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { complianceReports } from '@/data/mockData';
import { FileText, Download, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComplianceReports() {
  const reportTypes = [
    {
      type: 'FMR-1 Report',
      description: 'Fraud Monitoring Return as per RBI guidelines',
      icon: FileText,
      color: 'bg-accent/10 text-accent',
    },
    {
      type: 'Quarterly Fraud Report',
      description: 'Comprehensive quarterly fraud analysis report',
      icon: Calendar,
      color: 'bg-primary/10 text-primary',
    },
  ];

  const handleDownload = (reportId: string) => {
    console.log('Downloading report:', reportId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage regulatory compliance reports
          </p>
        </div>

        {/* Report Type Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {reportTypes.map((report) => (
            <div
              key={report.type}
              className="rounded-xl bg-card p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg ${report.color} flex items-center justify-center`}>
                  <report.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{report.type}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
          ))}
        </div>

        {/* Reports History */}
        <div className="rounded-xl bg-card shadow-md border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Report History</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Previously generated and submitted reports
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Report ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Submitted Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {complianceReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-foreground">{report.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{report.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">{report.period}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {report.submittedDate || 'Not submitted'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {report.downloadUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(report.id)}
                          className="text-accent hover:text-accent hover:bg-accent/10"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
