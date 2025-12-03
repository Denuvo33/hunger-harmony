import { useState, useMemo, useEffect } from 'react';
import { Utensils, Coffee, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { RecommendationFilters } from '@/components/RecommendationFilters';
import { ProductCard } from '@/components/ProductCard';
import { OpeningAnimation } from '@/components/OpeningAnimation';
import { useWeather, getWeatherSuitability } from '@/hooks/useWeather';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const OPENING_SHOWN_KEY = 'hungers_harmony_opening_shown';

export default function Index() {
  const [province, setProvince] = useState('jakarta');
  const [filters, setFilters] = useState({
    byWeather: true,
    byMood: true,
    byPrompt: true,
  });
  const [mood, setMood] = useState('');
  const [prompt, setPrompt] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'weather'>('all');
  const [showOpening, setShowOpening] = useState(() => {
    return !sessionStorage.getItem(OPENING_SHOWN_KEY);
  });

  const { weather, loading: weatherLoading } = useWeather(province);
  const { products, loading: productsLoading } = useProducts();

  const handleOpeningComplete = () => {
    setShowOpening(false);
    sessionStorage.setItem(OPENING_SHOWN_KEY, 'true');
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filters.byWeather && weather && activeFilter === 'weather') {
      const suitability = getWeatherSuitability(weather.temperature);
      result = result.filter(
        (p) => p.weatherSuitability === suitability || p.weatherSuitability === 'semua'
      );
    }

    return result;
  }, [products, filters.byWeather, weather, activeFilter]);

  const makanan = filteredProducts.filter((p) => p.type === 'makanan');
  const minuman = filteredProducts.filter((p) => p.type === 'minuman');

  const handleGetRecommendations = () => {
    setActiveFilter('weather');
  };

  return (
    <div className="min-h-screen">
      {showOpening && <OpeningAnimation onComplete={handleOpeningComplete} />}
      
      <Header
        province={province}
        onProvinceChange={setProvince}
        weather={weather}
        weatherLoading={weatherLoading}
      />

      <main className="container mx-auto px-4 py-6 space-y-8 page-transition">
        {/* Hero Section */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              Rekomendasi Untukmu
            </h2>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Berdasarkan cuaca di {province.charAt(0).toUpperCase() + province.slice(1).replace('-', ' ')}
          </p>
        </div>

        {/* Filters */}
        <RecommendationFilters
          filters={filters}
          onFiltersChange={setFilters}
          mood={mood}
          onMoodChange={setMood}
          prompt={prompt}
          onPromptChange={setPrompt}
          onGetRecommendations={handleGetRecommendations}
        />

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Makanan Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Makanan</h2>
            </div>
            
            {productsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-lg" />
                ))}
              </div>
            ) : makanan.length > 0 ? (
              <div className="space-y-4">
                {makanan.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Tidak ada makanan yang sesuai
              </p>
            )}
          </section>

          {/* Minuman Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-bold">Minuman</h2>
            </div>

            {productsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-lg" />
                ))}
              </div>
            ) : minuman.length > 0 ? (
              <div className="space-y-4">
                {minuman.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Tidak ada minuman yang sesuai
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
