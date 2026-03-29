import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.login(values);
      login(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="font-display text-2xl font-semibold block mb-12 text-center">
          <span className="gold-text">Creato</span>
          <span className="text-paper opacity-60">Graphix</span>
        </Link>

        <div className="border border-border p-10">
          <div className="section-label justify-center mb-2">Admin Access</div>
          <h1 className="font-display text-3xl font-semibold text-center mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-surface border border-border hover:border-muted focus:border-gold px-5 py-4 text-paper placeholder-muted/50 font-body text-sm outline-none transition-colors"
                aria-label="Email"
                autoComplete="email"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-surface border border-border hover:border-muted focus:border-gold px-5 py-4 text-paper placeholder-muted/50 font-body text-sm outline-none transition-colors"
                aria-label="Password"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-4 disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="font-mono text-xs text-center text-muted mt-6">
            <Link to="/" className="hover:text-gold transition-colors">← Back to Portfolio</Link>
          </p>
        </div>
      </div>
    </div>
  );
}