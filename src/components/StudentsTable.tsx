// Table component for displaying and managing student data
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { mockStudents, Student } from '@/data/mockStudents';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Mail, 
  Phone,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

const StudentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newNote, setNewNote] = useState('');

  const departments = [...new Set(mockStudents.map(s => s.department))];

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter;
      const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
      
      return matchesSearch && matchesRisk && matchesDepartment;
    });
  }, [searchTerm, riskFilter, departmentFilter]);

  const getRiskBadge = (risk: string, score: number) => {
    const riskConfig = {
      'High': { className: 'risk-badge risk-high', icon: AlertCircle },
      'Medium': { className: 'risk-badge risk-medium', icon: AlertTriangle },
      'Low': { className: 'risk-badge risk-low', icon: CheckCircle }
    };
    
    const config = riskConfig[risk as keyof typeof riskConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {risk} ({Math.round(score * 100)}%)
      </Badge>
    );
  };

  const addInterventionNote = () => {
    if (selectedStudent && newNote.trim()) {
      // In a real app, this would update the database
      const updatedNotes = [...(selectedStudent.interventionNotes || []), 
        `${new Date().toLocaleDateString()}: ${newNote}`];
      setSelectedStudent({...selectedStudent, interventionNotes: updatedNotes});
      setNewNote('');
    }
  };

  const getExplanation = (student: Student) => {
    const factors = [];
    if (student.attendance < 75) factors.push(`low attendance (${student.attendance}%)`);
    if (student.grades < 6) factors.push(`poor grades (${student.grades}/10)`);
    if (student.numberOfBacks > 0) factors.push(`${student.numberOfBacks} subject backs`);
    if (!student.feePayment) factors.push('pending fee payment');
    
    if (factors.length === 0) {
      return "Good academic performance with no major risk factors.";
    }
    
    return `Risk factors: ${factors.join(', ')}.`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Student Management</h2>
        
        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-40 border-primary/20 bg-card">
                <Filter className="w-4 h-4 mr-2 text-primary" />
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3 text-left">Student</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Attendance</th>
                  <th className="px-6 py-3 text-left">Grades</th>
                  <th className="px-6 py-3 text-left">Backs</th>
                  <th className="px-6 py-3 text-left">Fee Status</th>
                  <th className="px-6 py-3 text-left">Risk Level</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{student.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.attendance < 75 ? 
                          <TrendingDown className="w-4 h-4 text-risk-high" /> : 
                          <TrendingUp className="w-4 h-4 text-risk-low" />
                        }
                        <span className={cn(
                          "font-medium",
                          student.attendance < 75 ? "text-risk-high" : "text-risk-low"
                        )}>
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "font-medium",
                        student.grades < 6 ? "text-risk-high" : 
                        student.grades < 7 ? "text-risk-medium" : "text-risk-low"
                      )}>
                        {student.grades}/10
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "font-medium",
                        student.numberOfBacks > 0 ? "text-risk-high" : "text-muted-foreground"
                      )}>
                        {student.numberOfBacks}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className={cn(
                          "w-4 h-4",
                          student.feePayment ? "text-risk-low" : "text-risk-high"
                        )} />
                        <span className={cn(
                          "font-medium text-sm",
                          student.feePayment ? "text-risk-low" : "text-risk-high"
                        )}>
                          {student.feePayment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRiskBadge(student.riskLevel, student.riskScore)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Student Profile: {student.name}</DialogTitle>
                            </DialogHeader>
                            
                            {selectedStudent && (
                              <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Basic Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><span className="text-muted-foreground">Name:</span> {selectedStudent.name}</div>
                                      <div><span className="text-muted-foreground">Roll No:</span> {selectedStudent.rollNo}</div>
                                      <div><span className="text-muted-foreground">Email:</span> {selectedStudent.email}</div>
                                      <div><span className="text-muted-foreground">Department:</span> {selectedStudent.department}</div>
                                      <div><span className="text-muted-foreground">Semester:</span> {selectedStudent.semester}</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2">Academic Status</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><span className="text-muted-foreground">Attendance:</span> {selectedStudent.attendance}%</div>
                                      <div><span className="text-muted-foreground">Grades:</span> {selectedStudent.grades}/10</div>
                                      <div><span className="text-muted-foreground">Subject Backs:</span> {selectedStudent.numberOfBacks}</div>
                                      <div><span className="text-muted-foreground">Fee Status:</span> {selectedStudent.feePayment ? 'Paid' : 'Pending'}</div>
                                      <div><span className="text-muted-foreground">Risk Score:</span> {Math.round(selectedStudent.riskScore * 100)}%</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Risk Explanation */}
                                <div>
                                  <h4 className="font-semibold mb-2">Risk Analysis</h4>
                                  <div className="p-4 bg-muted rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      {getRiskBadge(selectedStudent.riskLevel, selectedStudent.riskScore)}
                                    </div>
                                    <p className="text-sm">{getExplanation(selectedStudent)}</p>
                                  </div>
                                </div>

                                {/* Intervention Notes */}
                                <div>
                                  <h4 className="font-semibold mb-2">Intervention Notes</h4>
                                  <div className="space-y-2 mb-4">
                                    {selectedStudent.interventionNotes?.length > 0 ? (
                                      selectedStudent.interventionNotes.map((note, index) => (
                                        <div key={index} className="p-3 bg-muted rounded text-sm">
                                          {note}
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-muted-foreground text-sm">No intervention notes yet.</p>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Textarea
                                      placeholder="Add intervention note..."
                                      value={newNote}
                                      onChange={(e) => setNewNote(e.target.value)}
                                      className="flex-1"
                                    />
                                    <Button onClick={addInterventionNote} disabled={!newNote.trim()}>
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Add Note
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${student.email}`)}
                          title={`Email ${student.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`tel:${student.phone}`)}
                          title={`Call ${student.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
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

export default StudentsTable;