import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Users, UserCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import {
  dashboardStats,
  transactionsOverTime,
  transactionStatusDistribution,
  monthlySuspiciousTransactions,
} from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your compliance metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Verified KYC"
            value={dashboardStats.verifiedKYC}
            icon={UserCheck}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Flagged Accounts"
            value={dashboardStats.flaggedAccounts}
            icon={AlertTriangle}
            variant="warning"
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Active Fraud Cases"
            value={dashboardStats.activeFraudCases}
            icon={ShieldAlert}
            variant="danger"
            trend={{ value: 15, isPositive: false }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transactions Over Time */}
          <div className="rounded-xl bg-card p-6 shadow-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Transactions Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="transactions"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                    name="Total Transactions"
                  />
                  <Line
                    type="monotone"
                    dataKey="flagged"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    dot={false}
                    name="Flagged"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction Status Distribution */}
          <div className="rounded-xl bg-card p-6 shadow-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {transactionStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Suspicious Transactions */}
        <div className="rounded-xl bg-card p-6 shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Suspicious Transactions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySuspiciousTransactions}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--destructive))"
                  radius={[4, 4, 0, 0]}
                  name="Suspicious Transactions"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
