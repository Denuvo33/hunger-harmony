import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Link as LinkIcon, Loader2, CheckCircle, User, Mail, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRequests } from '@/hooks/useAdminRequests';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { useWeather } from '@/hooks/useWeather';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitRequest, requests } = useAdminRequests();
  const [province, setProvince] = useState('jakarta');
  const { weather, loading: weatherLoading } = useWeather(province);

  const [showOpenStore, setShowOpenStore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shopName, setShopName] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const [manualLocationUrl, setManualLocationUrl] = useState('');

  const hasPendingRequest = requests.some(
    (r) => r.userId === user?.id && r.status === 'pending'
  );

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationLat(position.coords.latitude.toString());
          setLocationLng(position.coords.longitude.toString());
          toast({
            title: 'Lokasi berhasil didapat',
            description: 'Koordinat telah diisi otomatis',
          });
        },
        () => {
          toast({
            title: 'Gagal mendapat lokasi',
            description: 'Silakan isi manual atau coba lagi',
            variant: 'destructive',
          });
        }
      );
    }
  };

  const handleSubmitRequest = async () => {
    if (!user || !shopName || (!locationLat && !manualLocationUrl)) {
      toast({
        title: 'Data tidak lengkap',
        description: 'Isi semua field yang diperlukan',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    submitRequest({
      userId: user.id,
      userEmail: user.email,
      shopName,
      locationLat: parseFloat(locationLat) || 0,
      locationLng: parseFloat(locationLng) || 0,
      manualLocationUrl,
    });

    setSubmitting(false);
    setShowOpenStore(false);
    toast({
      title: 'Request terkirim! 🎉',
      description: 'Tunggu persetujuan dari superadmin',
    });
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen page-transition">
      <Header
        province={province}
        onProvinceChange={setProvince}
        weather={weather}
        weatherLoading={weatherLoading}
      />

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Profile Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profil Saya
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{user.address || 'Belum diisi'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Open Store Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-accent" />
              Buka Tokomu
            </CardTitle>
            <CardDescription>
              Ingin berjualan di Hunger's Harmony? Daftar sebagai admin toko!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasPendingRequest ? (
              <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Request sedang diproses</p>
                  <p className="text-sm text-muted-foreground">
                    Tunggu persetujuan dari superadmin
                  </p>
                </div>
              </div>
            ) : !showOpenStore ? (
              <Button onClick={() => setShowOpenStore(true)} className="w-full gap-2">
                <Store className="h-4 w-4" />
                Mulai Buka Toko
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shopName">Nama Toko</Label>
                  <Input
                    id="shopName"
                    placeholder="Contoh: Warung Makan Sederhana"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lokasi Toko</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    className="w-full gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Ambil Lokasi Otomatis
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      placeholder="-6.2088"
                      value={locationLat}
                      onChange={(e) => setLocationLat(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      placeholder="106.8456"
                      value={locationLng}
                      onChange={(e) => setLocationLng(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mapUrl">Atau Link Google Maps (opsional)</Label>
                  <Input
                    id="mapUrl"
                    placeholder="https://maps.google.com/..."
                    value={manualLocationUrl}
                    onChange={(e) => setManualLocationUrl(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowOpenStore(false)}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleSubmitRequest}
                    disabled={submitting}
                    className="flex-1 gap-2"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Kirim Request
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
