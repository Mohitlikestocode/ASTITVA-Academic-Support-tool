// Component for uploading student data files
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Database,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const UploadData = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const excelFile = files.find(file => 
      file.type.includes('spreadsheet') || 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls')
    );

    if (!excelFile) {
      setError('Please select a valid Excel file (.xlsx or .xls)');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate processing
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setUploadComplete(true);
      clearInterval(progressInterval);
    }, 3000);
  };

  const reset = () => {
    setUploadProgress(0);
    setUploadComplete(false);
    setIsUploading(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Upload Student Data</h2>
      
      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Excel File Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p><strong>Required Columns:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>Name (Student full name)</li>
              <li>Roll No (Unique student identifier)</li>
              <li>Email (Student email address)</li>
              <li>Attendance (Percentage: 0-100)</li>
              <li>Grades (Scale: 0-10)</li>
              <li>Number of Backs (Integer)</li>
              <li>Fee Receipt Payment (Yes/No or True/False)</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              <strong>Note:</strong> The system will automatically process the data and train the ML model for dropout risk prediction.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-8">
          {!uploadComplete ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-border",
                isUploading ? "pointer-events-none opacity-50" : "cursor-pointer hover:border-primary hover:bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isUploading ? 'Processing...' : 'Upload Excel File'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isUploading 
                      ? 'Parsing data and training ML model...' 
                      : 'Drag and drop your Excel file here, or click to browse'
                    }
                  </p>
                </div>

                {isUploading && (
                  <div className="w-full max-w-sm space-y-2">
                    <Progress value={uploadProgress} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Processing student data...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-success/10 rounded-full mx-auto w-fit">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-success">Upload Complete!</h3>
              <p className="text-muted-foreground">
                Student data has been successfully processed and the ML model has been updated.
              </p>
              <Button onClick={reset} variant="outline">
                Upload Another File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert className="border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Processing Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            What Happens After Upload?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Data Parsing</h4>
                <p className="text-sm text-muted-foreground">Excel file is parsed and validated for required columns and data types.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Database className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Database Storage</h4>
                <p className="text-sm text-muted-foreground">Student records are securely stored in the local database.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">ML Training</h4>
                <p className="text-sm text-muted-foreground">Machine learning model is trained to predict dropout risk probabilities.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadData;