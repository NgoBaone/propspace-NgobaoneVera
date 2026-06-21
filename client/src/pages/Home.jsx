import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Building2, Wallet, Search, ArrowRight, ShieldCheck, Sparkles, Home as HomeIcon } from 'lucide-react';
import api from '../api/client.js';
import PropertyCard from '../components/PropertyCard.jsx';
import { Loading, ErrorState } from '../components/States.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [featured, setFeatured] = useState([]);
  const [status, setStatus] = useState('loading');

  const loadFeatured = () => {
    setStatus('loading');
    api
      .get('/properties', { params: { limit: 3 } })
      .then(({ data }) => {
        setFeatured(data.items);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(loadFeatured, []);

  const goSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (propertyType) params.set('propertyType', propertyType);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-6">
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80"
            alt="Modern luxury home lit up at dusk with a pool"
            className="h-[520px] w-full object-cover sm:h-[560px]"
          />
          {/* Sky-blue wash at the top, fading to a dark base for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/70 via-navy-900/20 to-navy-950/80" />

          <div className="absolute inset-0 flex flex-col px-7 pt-10 sm:px-12 sm:pt-14">
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Finding Your New
              <br />
              Home Is Simple
            </h1>
            <p className="mt-4 max-w-md text-white/85">
              We provide high-quality rental and sale listings to help you find the perfect home.
            </p>
          </div>

          {/* Multi-field search bar */}
          <div className="absolute inset-x-0 bottom-6 mx-auto w-[min(94%,860px)] px-2">
            <div className="rounded-[1.5rem] bg-white p-2 shadow-search sm:rounded-pill">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:border-r sm:border-line">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-700" />
                  <input
                    className="w-full rounded-pill border-0 bg-transparent py-3 pl-11 pr-3 text-slate placeholder:text-slate/50 focus:outline-none"
                    placeholder="City Street"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && goSearch()}
                  />
                </div>
                <div className="relative flex-1 sm:border-r sm:border-line">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-700" />
                  <select
                    className="w-full appearance-none rounded-pill border-0 bg-transparent py-3 pl-11 pr-3 text-slate focus:outline-none"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">Typology of rent</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <Wallet className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-700" />
                  <input
                    type="number"
                    min="0"
                    className="w-full rounded-pill border-0 bg-transparent py-3 pl-11 pr-3 text-slate placeholder:text-slate/50 focus:outline-none"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && goSearch()}
                  />
                </div>
                <button onClick={goSearch} className="btn-primary sm:px-8">
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most viewed */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">Most viewed</h2>
          <Link to="/properties" className="hidden items-center gap-1 font-semibold text-navy-700 hover:text-navy-900 sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {status === 'loading' && <Loading label="Loading homes…" />}
        {status === 'error' && <ErrorState onRetry={loadFeatured} />}
        {status === 'done' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-5 pb-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: HomeIcon, title: 'Quality listings', text: 'Real homes from real owners.' },
            { icon: ShieldCheck, title: 'Secure accounts', text: 'Protected sign-in and listings.' },
            { icon: Sparkles, title: 'List in minutes', text: 'Publish and manage with ease.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="panel p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-50 text-navy-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-1 text-sm text-slate/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
