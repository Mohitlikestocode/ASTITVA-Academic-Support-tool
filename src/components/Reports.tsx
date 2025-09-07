import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockStudents, getDepartmentStats } from '@/data/mockStudents';
import { 
  Download, 
  FileText, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('risk-analysis');
  const [department, setDepartment] = useState('all');
  const [timeframe, setTimeframe] = useState('current');

  const departments = [...new Set(mockStudents.map(s => s.department))];
  const departmentStats = getDepartmentStats();

  const generateReport = (type: string) => {
    // In a real app, this would generate and download the actual report
    const data = getReportData(type);
    const csv = convertToCSV(data);
    downloadCSV(csv, `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const getReportData = (type: string) => {
    const filteredStudents = department === 'all' 
      ? mockStudents 
      : mockStudents.filter(s => s.department === department);

    switch (type) {
      case 'risk-analysis':
        return filteredStudents.map(s => ({
          Name: s.name,
          'Roll No': s.rollNo,
          Department: s.department,
          'Risk Level': s.riskLevel,
          'Risk Score': Math.round(s.riskScore * 100) + '%',
          Attendance: s.attendance + '%',
          Grades: s.grades,
          'Subject Backs': s.numberOfBacks,
          'Fee Status': s.feePayment ? 'Paid' : 'Pending'
        }));
      
      case 'high-risk':
        return filteredStudents
          .filter(s => s.riskLevel === 'High')
          .map(s => ({
            Name: s.name,
            'Roll No': s.rollNo,
            Department: s.department,
            Email: s.email,
            'Risk Score': Math.round(s.riskScore * 100) + '%',
            Attendance: s.attendance + '%',
            Grades: s.grades,
            'Subject Backs': s.numberOfBacks,
            'Fee Status': s.feePayment ? 'Paid' : 'Pending',
            'Intervention Notes': s.interventionNotes?.join('; ') || 'None'
          }));
      
      case 'attendance':
        return filteredStudents.map(s => ({
          Name: s.name,
          'Roll No': s.rollNo,
          Department: s.department,
          Attendance: s.attendance + '%',
          'Attendance Status': s.attendance >= 75 ? 'Adequate' : 'Below Requirement'
        }));
      
      default:
        return filteredStudents;
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    );
    
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getHighRiskStudents = () => {
    return department === 'all' 
      ? mockStudents.filter(s => s.riskLevel === 'High')
      : mockStudents.filter(s => s.riskLevel === 'High' && s.department === department);
  };

  const getLowAttendanceStudents = () => {
    return department === 'all'
      ? mockStudents.filter(s => s.attendance < 75)
      : mockStudents.filter(s => s.attendance < 75 && s.department === department);
  };

  const getPendingFeesStudents = () => {
    return department === 'all'
      ? mockStudents.filter(s => !s.feePayment)
      : mockStudents.filter(s => !s.feePayment && s.department === department);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Reports & Analytics</h2>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="risk-analysis">Risk Analysis Report</SelectItem>
                <SelectItem value="high-risk">High Risk Students</SelectItem>
                <SelectItem value="attendance">Attendance Report</SelectItem>
                <SelectItem value="academic">Academic Performance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Semester</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="academic-year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              High Risk Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-risk-high">{getHighRiskStudents().length}</div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Low Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{getLowAttendanceStudents().length}</div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pending Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-risk-high">{getPendingFeesStudents().length}</div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {department === 'all' ? mockStudents.length : mockStudents.filter(s => s.department === department).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold">Risk Analysis Report</h4>
                <p className="text-sm text-muted-foreground">Complete risk assessment for all students with detailed factors</p>
              </div>
              <Button variant="success" onClick={() => generateReport('risk-analysis')}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold">High Risk Students Report</h4>
                <p className="text-sm text-muted-foreground">Detailed report of students requiring immediate intervention</p>
                <Badge className="risk-badge risk-high mt-1">{getHighRiskStudents().length} students</Badge>
              </div>
              <Button variant="success" onClick={() => generateReport('high-risk')}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold">Attendance Report</h4>
                <p className="text-sm text-muted-foreground">Attendance analysis with low-attendance student identification</p>
                <Badge className="risk-badge risk-medium mt-1">{getLowAttendanceStudents().length} below 75%</Badge>
              </div>
              <Button variant="success" onClick={() => generateReport('attendance')}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold">Academic Performance Report</h4>
                <p className="text-sm text-muted-foreground">Comprehensive academic metrics and grade analysis</p>
              </div>
              <Button variant="success" onClick={() => generateReport('academic')}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department-wise Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4">Department</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">High Risk</th>
                  <th className="text-left p-4">Medium Risk</th>
                  <th className="text-left p-4">Low Risk</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map(stat => (
                  <tr key={stat.department} className="border-b border-border">
                    <td className="p-4 font-medium">{stat.department}</td>
                    <td className="p-4">{stat.total}</td>
                    <td className="p-4">
                      <Badge className="risk-badge risk-high">{stat.highRisk}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="risk-badge risk-medium">{stat.mediumRisk}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="risk-badge risk-low">{stat.lowRisk}</Badge>
                    </td>
                    <td className="p-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setDepartment(stat.department);
                          generateReport('risk-analysis');
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;