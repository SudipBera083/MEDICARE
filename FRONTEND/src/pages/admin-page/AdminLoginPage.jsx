import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FlaskConical, 
  Mail, 
  Lock, 
  ArrowRight, 
   Eye,
  EyeOff
} from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@labeasy.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password }); // later will add remember me feature 
  };

  return (
    <div className="font-sans bg-background-light text-charcoal min-h-screen flex items-center justify-center relative overflow-hidden">
      
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        <div className="bg-white rounded-[16px] shadow-xl border border-slate-200/60 p-10">
         
         
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <FlaskConical className="text-primary w-8 h-8" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-primary tracking-tight">Labeasy</h1>
            <p className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase mt-1">
              Intelligent Management
            </p>
          </div>

         
         
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-charcoal">Admin Login</h2>
            <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the panel</p>
          </div>

          
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
                  <Mail size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  id="email"
                  name="email"
                  placeholder="admin@labeasy.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                
              </div>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
                  <Lock size={18} />
                </div>
                <input
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center gap-2 pt-2">
              <input
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="text-xs font-medium text-slate-500 cursor-pointer select-none" htmlFor="remember">
                Keep me logged in for 30 days
              </label>
            </div> */}

            <button
              className="w-full bg-primary text-white font-display font-bold py-4 rounded-xl shadow-glow hover:bg-[#086d8d] hover:shadow-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 group"
              type="submit"
            >
              Let's Go
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              © Droham. All rights reserved. <br />
              <span className="inline-block mt-2 font-medium">Secure Science-Tech Infrastructure</span>
            </p>
          </div>
        </div>

        {/* Support Button
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/50 border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:bg-white transition-colors">
            <Headphones size={14} />
            Contact Support
          </button>
        </div> */}
      </motion.div>
    </div>
  );
}
