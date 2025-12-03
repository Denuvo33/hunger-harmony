import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Store, Package, Clock, CheckCircle, XCircle, Trash2, RefreshCw, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRequests } from '@/hooks/useAdminRequests';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { useWeather } from '@/hooks/useWeather';
import { getAdminsWithShops } from '@/data/mockData';

export default function SuperadminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { requests, updateRequestStatus, getPendingRequests } = useAdminRequests();
  const [province, setProvince] = useState('jakarta');
  const { weather, loading: weatherLoading } = useWeather(province);
  const [adminsWithShops, setAdminsWithShops] = useState(getAdminsWithShops());

  useEffect(() => {
    if (!user || user.role !== 'superadmin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleApproveRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'approved');
    toast({
      title: 'Request disetujui! ✅',
      description: 'User sekarang menjadi admin',
    });
  };

  const handleRejectRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'rejected');
    toast({
      title: 'Request ditolak',
      description: 'User tidak disetujui menjadi admin',
    });
  };

  if (!user || user.role !== 'superadmin') return null;

  const pendingRequests = getPendingRequests();

  return (
    <div className="min-h-screen page-transition">
      <Header
        province={province}
        onProvinceChange={setProvince}
        weather={weather}
        weatherLoading={weatherLoading}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Dashboard Superadmin
            </h1>
            <p className="text-muted-foreground">Kelola admin dan request toko</p>
          </div>
          <Button onClick={() => navigate('/')}>Lihat Website</Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminsWithShops.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Toko</CardTitle>
              <Store className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminsWithShops.filter((a) => a.shop).length}
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Request Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminsWithShops.reduce((sum, a) => sum + a.products.length, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="admins" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="admins">Daftar Admin</TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              Request Admin
              {pendingRequests.length > 0 && (
                <Badge className="ml-2 bg-destructive text-destructive-foreground">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Admin List */}
          <TabsContent value="admins" className="space-y-4">
            {adminsWithShops.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Belum ada admin terdaftar
                </CardContent>
              </Card>
            ) : (
              adminsWithShops.map((admin) => (
                <Card key={admin.id} className="glass-card card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          {admin.email}
                        </CardTitle>
                        {admin.shop && (
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Store className="h-4 w-4" />
                            {admin.shop.shopName}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Reset
                        </Button>
                        <Button variant="destructive" size="sm" className="gap-1">
                          <Trash2 className="h-3 w-3" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {admin.shop && (
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {admin.shop.latitude}, {admin.shop.longitude}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {admin.shop.openTime} - {admin.shop.closeTime}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Produk ({admin.products.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {admin.products.map((product) => (
                              <Badge key={product.id} variant="secondary">
                                {product.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </TabsContent>

          {/* Admin Requests */}
          <TabsContent value="requests" className="space-y-4">
            {requests.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Belum ada request
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="glass-card card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Store className="h-5 w-5 text-accent" />
                          {request.shopName}
                        </CardTitle>
                        <CardDescription>{request.userEmail}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          request.status === 'pending'
                            ? 'secondary'
                            : request.status === 'approved'
                            ? 'default'
                            : 'destructive'
                        }
                        className={
                          request.status === 'approved' ? 'bg-accent text-accent-foreground' : ''
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {request.locationLat}, {request.locationLng}
                        </span>
                      </div>
                      {request.manualLocationUrl && (
                        <a
                          href={request.manualLocationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Lihat di Google Maps
                        </a>
                      )}
                      {request.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleApproveRequest(request.id)}
                            className="flex-1 gap-2 bg-accent hover:bg-accent/90"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Setujui
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleRejectRequest(request.id)}
                            className="flex-1 gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Tolak
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
