
import { useState } from 'react';
import { User } from '@/types/auth';
import { Lead, LeadStats } from '@/types/leads';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2,
  DollarSign,
  Calendar,
  Edit,
  Eye
} from 'lucide-react';
import LeadDialog from './LeadDialog';

interface LeadsViewProps {
  user: User;
}

const LeadsView = ({ user }: LeadsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

  // Mock data - in real app, this would come from API
  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0123',
      company: 'Acme Corp',
      status: 'new',
      value: 15000,
      source: 'Website',
      assignedTo: user.role === 'sales_person' ? user.name : 'Mike Sales',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      notes: 'Interested in premium package'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1-555-0456',
      company: 'TechCorp Ltd',
      status: 'contacted',
      value: 25000,
      source: 'LinkedIn',
      assignedTo: user.role === 'sales_person' ? user.name : 'Mike Sales',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-14',
      notes: 'Follow up next week'
    },
    {
      id: '3',
      name: 'David Chen',
      email: 'david@startup.io',
      phone: '+1-555-0789',
      company: 'StartupX',
      status: 'qualified',
      value: 8000,
      source: 'Referral',
      assignedTo: user.role === 'sales_person' ? user.name : 'Sarah Manager',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      notes: 'Ready for proposal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'won': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    // Sales person can only see their own leads
    if (user.role === 'sales_person') {
      return matchesSearch && matchesStatus && lead.assignedTo === user.name;
    }
    
    return matchesSearch && matchesStatus;
  });

  const stats: LeadStats = {
    total: filteredLeads.length,
    new: filteredLeads.filter(l => l.status === 'new').length,
    contacted: filteredLeads.filter(l => l.status === 'contacted').length,
    qualified: filteredLeads.filter(l => l.status === 'qualified').length,
    won: filteredLeads.filter(l => l.status === 'won').length,
    lost: filteredLeads.filter(l => l.status === 'lost').length,
    totalValue: filteredLeads.reduce((sum, lead) => sum + lead.value, 0)
  };

  const handleAddLead = () => {
    setSelectedLead(undefined);
    setIsDialogOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const canEditLead = (lead: Lead) => {
    if (user.role === 'super_admin') return true;
    if (user.role === 'manager') return true;
    if (user.role === 'sales_person') return lead.assignedTo === user.name;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Lead Management</h2>
          <p className="text-gray-500">
            {user.role === 'sales_person' ? 'Manage your assigned leads' : 'Manage all leads in the system'}
          </p>
        </div>
        <Button onClick={handleAddLead} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <p className="text-xs text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            <p className="text-xs text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
            <p className="text-xs text-muted-foreground">Qualified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.won}</div>
            <p className="text-xs text-muted-foreground">Won</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.lost}</div>
            <p className="text-xs text-muted-foreground">Lost</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-green-600">${stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Source</TableHead>
                  {(user.role === 'super_admin' || user.role === 'manager') && (
                    <TableHead>Assigned To</TableHead>
                  )}
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{lead.name}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{lead.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">${lead.value.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    {(user.role === 'super_admin' || user.role === 'manager') && (
                      <TableCell>{lead.assignedTo}</TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLead(lead)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canEditLead(lead) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditLead(lead)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <LeadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        lead={selectedLead}
        user={user}
      />
    </div>
  );
};

export default LeadsView;
