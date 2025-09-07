// Component for managing and sending notifications to students
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { mockStudents } from '@/data/mockStudents';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Send,
  Settings,
  Users,
  MessageSquare,
  Smartphone,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'reminder' | 'success' | 'info';
  timestamp: Date;
  isRead: boolean;
  students?: string[];
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'High Risk Alert',
      message: 'Rohit Singh (CSE003) has critically low attendance (45%) and multiple subject backs. Immediate intervention required.',
      type: 'alert',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      students: ['Rohit Singh']
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      message: '4 students have pending fee payments. Consider following up with parents.',
      type: 'reminder',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: false,
      students: ['Priya Patel', 'Deepak Joshi', 'Akash Verma']
    },
    {
      id: '3',
      title: 'ML Model Updated',
      message: 'Risk prediction model successfully retrained with latest student data. Accuracy: 94.2%',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    },
    {
      id: '4',
      title: 'Attendance Tracking',
      message: 'Weekly attendance report ready. 3 students below 60% attendance threshold.',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      students: ['Rohit Singh', 'Deepak Joshi', 'Ritu Agarwal']
    }
  ]);

  const [messageTemplate, setMessageTemplate] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    highRiskAlerts: true,
    attendanceReminders: true,
    feePaymentAlerts: true,
    weeklyReports: false,
    systemUpdates: true
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    const iconConfig = {
      'alert': { icon: AlertTriangle, className: 'text-risk-high' },
      'reminder': { icon: Clock, className: 'text-risk-medium' },
      'success': { icon: CheckCircle, className: 'text-risk-low' },
      'info': { icon: Bell, className: 'text-primary' }
    };
    
    const config = iconConfig[type as keyof typeof iconConfig];
    const Icon = config.icon;
    
    return <Icon className={cn("h-5 w-5", config.className)} />;
  };

  const getNotificationBadge = (type: string) => {
    const badgeConfig = {
      'alert': { className: 'risk-badge risk-high', text: 'Alert' },
      'reminder': { className: 'risk-badge risk-medium', text: 'Reminder' },
      'success': { className: 'risk-badge risk-low', text: 'Success' },
      'info': { className: 'risk-badge bg-primary/10 text-primary border-primary/20', text: 'Info' }
    };
    
    const config = badgeConfig[type as keyof typeof badgeConfig];
    return <Badge className={config.className}>{config.text}</Badge>;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const sendNotification = () => {
    if (!messageTemplate.trim()) return;
    
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: 'Custom Notification Sent',
      message: `Message sent: "${messageTemplate}"${recipientEmail ? ` to ${recipientEmail}` : ' to all relevant students'}`,
      type: 'success',
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setMessageTemplate('');
    setRecipientEmail('');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Notification Center</h2>
        <Badge className="bg-primary text-primary-foreground">
          {unreadCount} unread
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border border-border rounded-lg transition-colors hover:bg-muted/50 cursor-pointer",
                    !notification.isRead && "bg-primary/5 border-primary/20"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{notification.title}</h4>
                          {getNotificationBadge(notification.type)}
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        {notification.students && notification.students.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <div className="flex gap-1 flex-wrap">
                              {notification.students.map(student => (
                                <Badge key={student} variant="outline" className="text-xs">
                                  {student}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings & Actions */}
        <div className="space-y-4">
          {/* Send Custom Notification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recipient (optional)</label>
                <Input
                  placeholder="student@college.edu"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={sendNotification} disabled={!messageTemplate.trim()}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p><strong>Note:</strong> In production, this would send via:</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    <span>SMS/WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mark All as Read
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Test Notification System
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;