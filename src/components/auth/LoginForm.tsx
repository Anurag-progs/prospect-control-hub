
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LoginCredentials } from '@/types/auth';
import { Building2, Users } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [selectedRole, setSelectedRole] = useState<string>('');

  const mockUsers = {
    'super_admin': {
      id: '1',
      name: 'John Admin',
      email: 'admin@company.com',
      role: 'super_admin' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    },
    'manager': {
      id: '2',
      name: 'Sarah Manager',
      email: 'manager@company.com',
      role: 'manager' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager'
    },
    'sales_person': {
      id: '3',
      name: 'Mike Sales',
      email: 'sales@company.com',
      role: 'sales_person' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sales'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && mockUsers[selectedRole as keyof typeof mockUsers]) {
      onLogin(mockUsers[selectedRole as keyof typeof mockUsers]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            LeadsPro
          </h1>
          <p className="text-gray-600 mt-2">Professional Lead Management System</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Choose your role to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role (Demo)</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Super Admin
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="sales_person">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Sales Person
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                disabled={!selectedRole}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo Access:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p>• Super Admin: Full system access</p>
                <p>• Manager: Lead oversight & team management</p>
                <p>• Sales Person: Personal lead management</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
