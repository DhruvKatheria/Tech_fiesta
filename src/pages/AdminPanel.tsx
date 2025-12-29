import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { adminUsers, auditLogs, amlSettings } from '@/data/mockData';
import {
  Users,
  Settings,
  Shield,
  Activity,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPanel() {
  const [settings, setSettings] = useState(amlSettings);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, settings, and system configuration
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="users" className="data-[state=active]:bg-card">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-card">
              <Settings className="h-4 w-4 mr-2" />
              AML Settings
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-card">
              <Activity className="h-4 w-4 mr-2" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="rounded-xl bg-card shadow-md border border-border overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Admin Users</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage admin access and roles</p>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-foreground">{user.role}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* AML Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Threshold Settings */}
              <div className="rounded-xl bg-card p-6 shadow-md border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AML Thresholds</h3>
                    <p className="text-sm text-muted-foreground">Configure detection limits</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Daily Transaction Limit</Label>
                      <span className="text-sm font-medium text-foreground">
                        {formatCurrency(settings.dailyTransactionLimit)}
                      </span>
                    </div>
                    <Slider
                      value={[settings.dailyTransactionLimit]}
                      max={1000000}
                      min={100000}
                      step={50000}
                      onValueChange={(value) =>
                        setSettings({ ...settings, dailyTransactionLimit: value[0] })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Single Transaction Limit</Label>
                      <span className="text-sm font-medium text-foreground">
                        {formatCurrency(settings.singleTransactionLimit)}
                      </span>
                    </div>
                    <Slider
                      value={[settings.singleTransactionLimit]}
                      max={500000}
                      min={50000}
                      step={25000}
                      onValueChange={(value) =>
                        setSettings({ ...settings, singleTransactionLimit: value[0] })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Risk Score Threshold</Label>
                      <span className="text-sm font-medium text-foreground">
                        {settings.riskScoreThreshold}
                      </span>
                    </div>
                    <Slider
                      value={[settings.riskScoreThreshold]}
                      max={100}
                      min={30}
                      step={5}
                      onValueChange={(value) =>
                        setSettings({ ...settings, riskScoreThreshold: value[0] })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="rounded-xl bg-card p-6 shadow-md border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Feature Toggles</h3>
                    <p className="text-sm text-muted-foreground">Enable/disable features</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">ML Scoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Machine learning based risk scoring
                      </p>
                    </div>
                    <Switch
                      checked={settings.mlScoringEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, mlScoringEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Auto-Flag High Risk</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically flag high-risk transactions
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoFlagHighRisk}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, autoFlagHighRisk: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Real-time Monitoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable real-time transaction monitoring
                      </p>
                    </div>
                    <Switch
                      checked={settings.realTimeMonitoring}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, realTimeMonitoring: checked })
                      }
                    />
                  </div>
                </div>

                <Button className="w-full mt-6 gradient-primary text-primary-foreground">
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <div className="rounded-xl bg-card shadow-md border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Audit Logs</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  System activity and user actions
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Target
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        IP Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-foreground">{log.action}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-foreground">{log.user}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-muted-foreground">{log.target}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-muted-foreground">{log.ipAddress}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
