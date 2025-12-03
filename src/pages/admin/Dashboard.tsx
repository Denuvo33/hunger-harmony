import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Store, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { ShopSettings } from '@/components/admin/ShopSettings';
import { AddProductForm } from '@/components/admin/AddProductForm';
import { Header } from '@/components/Header';
import { useWeather } from '@/hooks/useWeather';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [province, setProvince] = useState('jakarta');
  const { weather, loading: weatherLoading } = useWeather(province);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen page-transition">
      <Header
        province={province}
        onProvinceChange={setProvince}
        weather={weather}
        weatherLoading={weatherLoading}
      />

      <main className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8 text-primary" />
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">Kelola produk dan pengaturan warung Anda</p>
          </div>
          <Button onClick={() => navigate('/')}>
            Lihat Website
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card className="glass-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Warung Aktif</CardTitle>
              <Store className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          {user.role === 'superadmin' && (
            <Card className="glass-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="products">Daftar Produk</TabsTrigger>
            <TabsTrigger value="add">Tambah Produk</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan Warung</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="animate-fade-in">
            <ProductsTable />
          </TabsContent>

          <TabsContent value="add" className="animate-fade-in">
            <AddProductForm />
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <ShopSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
