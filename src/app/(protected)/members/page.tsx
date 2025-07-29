"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Crown, 
  Shield, 
  Eye,
  Trash2,
  Settings
} from 'lucide-react';

// Datos de ejemplo
const organizationData = {
  id: "org-123",
  name: "Mi Empresa SRL",
  slug: "mi-empresa-srl",
  members: [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@empresa.com",
      image: null,
      role: "OWNER",
      joinedAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "María García",
      email: "maria@empresa.com",
      image: null,
      role: "ADMIN",
      joinedAt: "2024-02-10"
    },
    {
      id: "3",
      name: "Carlos López",
      email: "carlos@empresa.com", 
      image: null,
      role: "MEMBER",
      joinedAt: "2024-03-05"
    }
  ]
};

const roleConfig = {
  OWNER: { label: "Propietario", icon: Crown, color: "bg-yellow-100 text-yellow-800" },
  ADMIN: { label: "Administrador", icon: Shield, color: "bg-blue-100 text-blue-800" },
  MEMBER: { label: "Miembro", icon: Users, color: "bg-green-100 text-green-800" },
  VIEWER: { label: "Visualizador", icon: Eye, color: "bg-gray-100 text-gray-800" }
};

export default function OrganizationManagement() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("MEMBER");
  const [members, setMembers] = useState(organizationData.members);

  const handleInviteUser = () => {
    if (!inviteEmail) return;
    
    // Simular invitación
    const newMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      image: null,
      role: inviteRole,
      joinedAt: new Date().toISOString().split('T')[0]
    };
    
    setMembers([...members, newMember]);
    setInviteEmail("");
    setInviteRole("MEMBER");
  };

  const handleRoleChange = ({memberId, newRole}:any) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const handleRemoveMember = (memberId:any) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {organizationData.name}
          </h1>
          <p className="text-gray-600">
            Gestiona los miembros y permisos de tu organización
          </p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configuración
        </Button>
      </div>

      {/* Invite Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invitar Usuario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="email">Email del usuario</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@ejemplo.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="MEMBER">Miembro</SelectItem>
                  <SelectItem value="VIEWER">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleInviteUser} className="w-full md:w-auto">
            <Mail className="h-4 w-4 mr-2" />
            Enviar Invitación
          </Button>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Miembros ({members.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member:any) => {
              const roleInfo = roleConfig[member.role];
              const RoleIcon = roleInfo.icon;
              
              return (
                <div 
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">
                          {member.name}
                        </h3>
                        <Badge className={roleInfo.color}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {roleInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">
                        Se unió el {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {member.role !== "OWNER" && (
                      <>
                        <Select 
                          value={member.role} 
                          onValueChange={(newRole) => handleRoleChange(member.id)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="MEMBER">Miembro</SelectItem>
                            <SelectItem value="VIEWER">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Propietarios</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.role === "OWNER").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Administradores</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.role === "ADMIN").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Miembros</p>
              <p className="text-2xl font-bold">
                {members.filter(m => m.role === "MEMBER").length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{members.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}