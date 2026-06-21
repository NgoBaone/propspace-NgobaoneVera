import { Link } from 'react-router-dom';
import { BedDouble, Bath, Maximize, Pencil, Trash2 } from 'lucide-react';

const formatPrice = (price, purpose) => {
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
  return { value, suffix: purpose === 'Rent' ? '/month' : '' };
};

export default function PropertyCard({ property, owned = false, onEdit, onDelete }) {
  const cover = property.images?.[0];
  const { value, suffix } = formatPrice(property.price, property.purpose);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-white p-3 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/properties/${property._id}`} className="relative block aspect-[4/3] overflow-hidden rounded-xl">
        {cover ? (
          <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-navy-50 text-navy-300">No image</div>
        )}
        <span className="absolute left-3 top-3 chip bg-white/90 backdrop-blur">
          {property.purpose === 'Rent' ? 'For rent' : 'For sale'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <Link to={`/properties/${property._id}`}>
          <h3 className="font-display text-lg font-semibold leading-snug text-navy-900 hover:text-navy-700">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-slate/55">{property.city}, {property.country}</p>

        {/* Icon stats row */}
        <div className="mt-3 flex items-center gap-4 text-sm text-slate/70">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-navy-600" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-navy-600" /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-navy-600" /> {property.propertyType}
          </span>
        </div>

        <div className="mt-3 border-t border-line pt-3">
          <p className="font-display text-xl font-bold text-navy-900">
            {value}
            {suffix && <span className="text-sm font-medium text-slate/50"> {suffix}</span>}
          </p>
        </div>

        {owned && (
          <div className="mt-3 flex gap-2">
            <button onClick={() => onEdit?.(property)} className="btn-ghost flex-1 py-2 text-sm">
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => onDelete?.(property)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
