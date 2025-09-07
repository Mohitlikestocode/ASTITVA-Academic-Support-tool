import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Users, AlertTriangle, Shield, TrendingUp, Upload, FileText } from 'lucide-react';
import { mockStudents, getRiskDistribution, getDepartmentStats } from '@/data/mockStudents';
import heroImage from '@/assets/astitva-hero.jpg';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const totalStudents = mockStudents.length;
  const highRiskCount = mockStudents.filter(s => s.riskLevel === 'High').length;
  const mediumRiskCount = mockStudents.filter(s => s.riskLevel === 'Medium').length;
  const lowRiskCount = mockStudents.filter(s => s.riskLevel === 'Low').length;
  
  const riskDistribution = getRiskDistribution();
  const departmentStats = getDepartmentStats();
  
  const averageAttendance = Math.round(
    mockStudents.reduce((sum, s) => sum + s.attendance, 0) / totalStudents
  );

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="ASTITVA Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">ASTITVA</h1>
            <p className="text-xl mb-2 opacity-90">
              <span className="font-bold text-yellow-400 text-2xl">A</span>cademic <span className="font-bold text-yellow-400 text-2xl">S</span>upport <span className="font-bold text-yellow-400 text-2xl">T</span>ool For <span className="font-bold text-yellow-400 text-2xl">I</span>ntervention, <span className="font-bold text-yellow-400 text-2xl">T</span>racking &<span className="font-bold text-yellow-400 text-2xl"> V</span>alue <span className="font-bold text-yellow-400 text-2xl">A</span>lignment
            </p>
            <p className="text-lg opacity-75 mb-8">
              Empowering educators with AI-driven insights to support student success and prevent academic dropout
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Upload className="mr-2 h-5 w-5" />
                Upload Student Data
              </Button>
              <Button variant="secondary" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8 relative z-10">
          <Card className="metric-card border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled & Active</p>
            </CardContent>
          </Card>
          
          <Card className="metric-card border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-risk-high" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-risk-high">{highRiskCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires Immediate Attention</p>
            </CardContent>
          </Card>
          
          <Card className="metric-card border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medium Risk</CardTitle>
              <TrendingUp className="h-4 w-4 text-risk-medium" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-risk-medium">{mediumRiskCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitor & Support</p>
            </CardContent>
          </Card>
          
          <Card className="metric-card border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Risk</CardTitle>
              <Shield className="h-4 w-4 text-risk-low" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-risk-low">{lowRiskCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Performing Well</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Risk Distribution Pie Chart */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department-wise Stats */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Department-wise Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentStats}>
                  <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="highRisk" fill="hsl(var(--risk-high))" name="High Risk" />
                  <Bar dataKey="mediumRisk" fill="hsl(var(--risk-medium))" name="Medium Risk" />
                  <Bar dataKey="lowRisk" fill="hsl(var(--risk-low))" name="Low Risk" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{averageAttendance}%</div>
              <p className="text-sm text-muted-foreground mt-2">Across all departments</p>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Students with Backs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-warning">
                {mockStudents.filter(s => s.numberOfBacks > 0).length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Need academic support</p>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Fee Payment Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-risk-high">
                {mockStudents.filter(s => !s.feePayment).length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Pending payments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;