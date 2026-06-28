import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, Lock, Mail, BarChart3 } from 'lucide-react';
import logo from '@/assets/logo.svg';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    login({ username: email, password })
      .catch((error) => {
        setLoading(false);
        notify(typeof error === 'string' ? error : 'Email ou mot de passe incorrect', { type: 'warning' });
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0F19] p-4 md:p-8 selection:bg-cyan-500/30">
      <div className="bg-[#111827] w-full max-w-4xl rounded-[24px] border border-slate-800 shadow-2xl shadow-cyan-950/10 p-3 flex flex-col md:flex-row gap-4 items-stretch min-h-[540px] overflow-hidden">
        
        <div className="w-full md:w-1/2 bg-[#0d1527] rounded-[18px] flex flex-col justify-between p-8 relative overflow-hidden min-h-[320px] md:min-h-auto border border-slate-800/60">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-2.5 z-10">
            <img src={logo} alt="EventSync" className="h-8 w-auto text-cyan-400 brightness-0 invert" />
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              EventSync <span className="text-[10px] bg-cyan-500/10 text-cyan-400 font-medium px-2 py-0.5 rounded-full border border-cyan-500/20">Metrics</span>
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center z-10 py-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-transparent to-transparent z-20 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop" 
              alt="Analytics Dashboard View" 
              className="w-full h-full max-h-[260px] md:max-h-[300px] object-cover rounded-xl border border-slate-800 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="z-10 flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-900/40 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800/50 w-fit">
            <BarChart3 size={14} className="text-cyan-400" />
            <span>Suivi temps réel de vos KPIs</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8">
          <div className="max-w-sm w-full mx-auto">
            
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Welcome Back!</h1>
              <p className="text-xs text-slate-400 mt-2 font-medium">Saisissez vos identifiants pour accéder aux statistiques.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={16} />
                </div>
                <Input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border-slate-800 bg-slate-950/40 text-white focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-transparent transition-all placeholder:text-slate-500 text-sm shadow-inner"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full h-12 pl-11 pr-12 rounded-xl border-slate-800 bg-slate-950/40 text-white focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:border-transparent transition-all placeholder:text-slate-500 text-sm shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-cyan-500/10 transition-all active:scale-[0.99] pt-1 mt-4"
              >
                {loading ? 'Authentification...' : 'Se connecter au tableau de bord'}
              </Button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
