import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { kycUsers } from '@/data/mockData';
import { Eye, Search, Filter, X, FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface KYCUser {
  id: string;
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  status: string;
  submittedDate: string;
  verifiedDate: string | null;
}

export default function KYCVerification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<KYCUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = kycUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewKYC = (user: KYCUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for user:`, selectedUser?.id);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">KYC Verification</h1>
            <p className="text-muted-foreground mt-1">
              Review and manage user KYC submissions
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Flagged">Flagged</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Document Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-foreground">{user.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">{user.documentType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{user.submittedDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewKYC(user)}
                        className="text-accent hover:text-accent hover:bg-accent/10"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View KYC
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KYC Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                KYC Details - {selectedUser?.name}
              </DialogTitle>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-6">
                {/* Document Preview */}
                <div className="rounded-lg border border-border bg-muted/30 p-8 flex items-center justify-center min-h-48">
                  <div className="text-center text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">{selectedUser.documentType} Document</p>
                    <p className="text-sm">Document preview placeholder</p>
                  </div>
                </div>

                {/* Extracted OCR Data */}
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Extracted Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Document Type:</span>
                      <p className="font-medium text-foreground">{selectedUser.documentType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Document Number:</span>
                      <p className="font-medium text-foreground">{selectedUser.documentNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Full Name:</span>
                      <p className="font-medium text-foreground">{selectedUser.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium text-foreground">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Submitted:</span>
                      <p className="font-medium text-foreground">{selectedUser.submittedDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Status:</span>
                      <StatusBadge status={selectedUser.status} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleAction('approve')}
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleAction('flag')}
                    variant="outline"
                    className="flex-1 border-warning text-warning hover:bg-warning/10"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Flag for Review
                  </Button>
                  <Button
                    onClick={() => handleAction('reject')}
                    variant="outline"
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
