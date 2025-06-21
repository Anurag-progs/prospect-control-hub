
import { User } from '@/types/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Phone, 
  Mail,
  Calendar,
  Award
} from 'lucide-react';

interface DashboardContentProps {
  user: User;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
  // Mock data based on user role
  const getStatsForRole = () => {
    switch (user.role) {
      case 'super_admin':
        return {
          totalLeads: 1247,
          totalRevenue: 125000,
          conversionRate: 24,
          activeUsers: 12,
          monthlyGrowth: 15.2,
          recentActivity: [
            { type: 'lead', message: 'New lead from Website', time: '2 min ago' },
            { type: 'sale', message: 'Deal closed - $5,500', time: '1 hour ago' },
            { type: 'user', message: 'New user registered', time: '3 hours ago' },
          ]
        };
      case 'manager':
        return {
          totalLeads: 156,
          totalRevenue: 45000,
          conversionRate: 28,
          teamSize: 5,
          monthlyGrowth: 12.8,
          recentActivity: [
            { type: 'lead', message: 'Lead assigned to Mike', time: '15 min ago' },
            { type: 'meeting', message: 'Team meeting scheduled', time: '2 hours ago' },
            { type: 'target', message: 'Monthly target 80% complete', time: '1 day ago' },
          ]
        };
      case 'sales_person':
        return {
          totalLeads: 23,
          totalRevenue: 8500,
          conversionRate: 35,
          callsMade: 45,
          monthlyGrowth: 22.1,
          recentActivity: [
            { type: 'call', message: 'Follow-up call with ABC Corp', time: '30 min ago' },
            { type: 'email', message: 'Proposal sent to XYZ Ltd', time: '2 hours ago' },
            { type: 'meeting', message: 'Demo scheduled for tomorrow', time: '4 hours ago' },
          ]
        };
      default:
        return {};
    }
  };

  const stats = getStatsForRole();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="h-4 w-4" />;
      case 'sale': return <DollarSign className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {user.role === 'super_admin' && 'System Overview'}
              {user.role === 'manager' && 'Team Dashboard'}
              {user.role === 'sales_person' && 'Your Performance'}
            </h2>
            <p className="text-blue-100">
              {user.role === 'super_admin' && 'Monitor your entire organization\'s performance'}
              {user.role === 'manager' && 'Track your team\'s progress and manage leads'}
              {user.role === 'sales_person' && 'Keep track of your leads and targets'}
            </p>
          </div>
          <Award className="h-12 w-12 text-blue-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === 'super_admin' ? 'Total Leads' : 
               user.role === 'manager' ? 'Team Leads' : 
               'Your Leads'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user.role === 'super_admin' ? 'Active Users' :
               user.role === 'manager' ? 'Team Size' :
               'Calls Made'}
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.role === 'super_admin' ? stats.activeUsers :
               user.role === 'manager' ? stats.teamSize :
               stats.callsMade}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.role === 'sales_person' ? 'This week' : 'Currently active'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.role === 'super_admin' && (
                <>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="font-medium">Manage Users</span>
                    <Badge variant="secondary">Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="font-medium">System Settings</span>
                    <Badge variant="secondary">Config</Badge>
                  </div>
                </>
              )}
              {user.role === 'manager' && (
                <>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="font-medium">Assign Leads</span>
                    <Badge variant="secondary">Management</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="font-medium">Team Reports</span>
                    <Badge variant="secondary">Analytics</Badge>
                  </div>
                </>
              )}
              {user.role === 'sales_person' && (
                <>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="font-medium">Add New Lead</span>
                    <Badge variant="secondary">Sales</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <span className="font-medium">Follow Up</span>
                    <Badge variant="secondary">Action</Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
