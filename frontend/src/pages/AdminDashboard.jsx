import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import { contactApi, reviewApi, portfolioApi, serviceApi, authApi } from '../services/api';
import Loader from '../components/Loader';

const TAB = { contacts: 'contacts', reviews: 'reviews', portfolio: 'portfolio', seed: 'seed' };

export default function AdminDashboard() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState(TAB.contacts);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      if (tab === TAB.contacts) {
        const res = await contactApi.getAll();
        setContacts(res.data.data);
      } else if (tab === TAB.reviews) {
        const res = await reviewApi.getAll();
        setReviews(res.data.data);
      } else if (tab === TAB.portfolio) {
        const res = await portfolioApi.getAll();
        setPortfolio(res.data.data);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [tab]);

  const handleSeedAll = async () => {
    setLoading(true);
    try {
      await portfolioApi.seed();
      await reviewApi.seed();
      await serviceApi.seed();
      toast.success('All data seeded successfully!');
    } catch {
      toast.error('Seed failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const statusColors = { unread: 'text-gold', read: 'text-muted', replied: 'text-green-400' };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="section-label">Admin Panel</div>
            <h1 className="font-display text-4xl font-semibold">Dashboard</h1>
            <p className="font-body text-sm text-muted mt-1">Welcome, {user?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-outline text-xs py-2.5 px-5">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-10">
          {Object.values(TAB).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs tracking-widest uppercase py-3 px-6 border-b-2 -mb-px transition-all ${
                tab === t ? 'text-gold border-gold' : 'text-muted border-transparent hover:text-paper'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 flex justify-center"><Loader /></div>
        ) : (
          <>
            {/* Contacts */}
            {tab === TAB.contacts && (
              <div className="space-y-px bg-border">
                {contacts.length === 0 && (
                  <div className="bg-ink py-12 text-center">
                    <p className="font-mono text-xs text-muted">No contact submissions yet</p>
                  </div>
                )}
                {contacts.map(c => (
                  <div key={c._id} className="bg-ink p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-body font-medium text-paper">{c.name}</p>
                        <span className={`font-mono text-xs tracking-wider ${statusColors[c.status]}`}>{c.status}</span>
                      </div>
                      <p className="font-mono text-xs text-muted mb-2">{c.email}</p>
                      <p className="font-body text-sm text-paper/80 font-medium mb-1">{c.subject}</p>
                      <p className="font-body text-sm text-muted truncate">{c.message}</p>
                    </div>
                    <p className="font-mono text-xs text-muted shrink-0">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {tab === TAB.reviews && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {reviews.length === 0 && (
                  <div className="col-span-full bg-ink py-12 text-center">
                    <p className="font-mono text-xs text-muted">No approved reviews</p>
                  </div>
                )}
                {reviews.map(r => (
                  <div key={r._id} className="bg-ink p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={r.avatar || 'https://cdn-icons-png.flaticon.com/512/2115/2115958.png'}
                        alt={r.name}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                      <div>
                        <p className="font-body font-medium text-sm text-paper">{r.name}</p>
                        <p className="font-mono text-xs text-gold">{r.designation}</p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-muted italic">"{r.review}"</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-mono text-xs text-gold">{'★'.repeat(r.rating)}</p>
                      <span className={`font-mono text-xs ${r.approved ? 'text-green-400' : 'text-gold'}`}>
                        {r.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio */}
            {tab === TAB.portfolio && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-border">
                {portfolio.map(item => (
                  <div key={item._id} className="bg-ink group relative aspect-square overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                      <p className="font-body text-xs font-medium text-paper">{item.title}</p>
                      <p className="font-mono text-[10px] text-gold mt-1">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Seed */}
            {tab === TAB.seed && (
              <div className="max-w-lg">
                <p className="font-body text-muted mb-8">
                  Populate the database with sample data. This will overwrite existing data for portfolio, reviews, and services.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleSeedAll}
                    disabled={loading}
                    className="btn-primary disabled:opacity-60"
                  >
                    Seed All Data
                  </button>
                  <p className="font-mono text-xs text-muted">
                    This seeds: portfolio items, testimonials, and services
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}