import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import KYCVerification from "./pages/KYCVerification";
import Transactions from "./pages/Transactions";
import AMLAlerts from "./pages/AMLAlerts";
import FraudCases from "./pages/FraudCases";
import ComplianceReports from "./pages/ComplianceReports";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kyc" element={<KYCVerification />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/aml-alerts" element={<AMLAlerts />} />
          <Route path="/fraud-cases" element={<FraudCases />} />
          <Route path="/fraud-cases/:id" element={<FraudCases />} />
          <Route path="/reports" element={<ComplianceReports />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
