import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-navy-50/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/mark.svg" alt="" className="h-8 w-8" />
            <span className="font-display text-xl font-bold tracking-tight text-navy-900">PropSpace</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-navy-800">Explore</h4>
          <ul className="space-y-2 text-sm text-slate/60">
            <li><Link to="/properties" className="hover:text-navy-700">All listings</Link></li>
            <li><Link to="/register" className="hover:text-navy-700">Create account</Link></li>
            <li><Link to="/login" className="hover:text-navy-700">Log in</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-navy-800">Company</h4>
          <ul className="space-y-2 text-sm text-slate/60">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
