import { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  'Admin',
  'Manager',
  'Chef',
  'Warehouse Staff',
  'Delivery Staff',
  'Auditor',
];

const DEMO_CREDS = [
  { role: 'Admin', email: 'admin@pbnrestaurant.com', password: 'admin123' },
  { role: 'Manager', email: 'manager@pbnrestaurant.com', password: 'manager123' },
  { role: 'Chef', email: 'chef@pbnrestaurant.com', password: 'chef123' },
  { role: 'Warehouse Staff', email: 'warehouse@pbnrestaurant.com', password: 'warehouse123' },
  { role: 'Delivery Staff', email: 'delivery@pbnrestaurant.com', password: 'delivery123' },
  { role: 'Auditor', email: 'auditor@pbnrestaurant.com', password: 'auditor123' },
];

export default function LoginPage() {
  const { login, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function fillDemo(cred) {
    setForm({ email: cred.email, password: cred.password, role: cred.role });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(form.email, form.password, form.role);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary-dark p-10 flex flex-col justify-between text-white hidden lg:flex"
        >
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <UtensilsCrossed size={24} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">PBN Restaurant</p>
                <p className="text-white/60 text-sm">Experiment & Compliance System</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Manage. Monitor.<br />Innovate.
            </h1>
            <p className="text-white/70 text-base leading-relaxed">
              A centralized platform for experiments, inventory, orders, deliveries, and compliance auditing.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Quick Demo Login</p>
            {DEMO_CREDS.map((c) => (
              <button
                key={c.role}
                onClick={() => fillDemo(c)}
                className="w-full text-left px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm text-white transition flex items-center justify-between group"
              >
                <span className="font-medium">{c.role}</span>
                <span className="text-white/50 text-xs group-hover:text-white transition">{c.email}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 lg:p-12 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <UtensilsCrossed size={20} className="text-primary" />
            <span className="font-bold text-slate-800">PBN Restaurant</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue.</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@pbnrestaurant.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Select Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
              >
                <option value="">-- Select your role --</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 shadow-lg"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={17} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Mobile demo hint */}
          <div className="mt-6 lg:hidden">
            <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">Quick Demo</p>
            <div className="flex flex-wrap gap-2">
              {DEMO_CREDS.map((c) => (
                <button
                  key={c.role}
                  onClick={() => fillDemo(c)}
                  className="text-xs px-3 py-1.5 bg-primary-light text-primary-text rounded-lg hover:bg-primary/20 transition font-medium"
                >
                  {c.role}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
