"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { TestaDiMoroIcon } from "@/components/Icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Use window.location for a full refresh to ensure proxy catches the session correctly
        window.location.href = "/admin/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-espresso bg-noise flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wine/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Double-Bezel Architecture */}
        <div className="p-2 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="bg-espresso/60 rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-10 md:p-12">
            
            <div className="flex justify-center mb-10">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                <TestaDiMoroIcon className="w-10 h-10 text-sicilian-yellow opacity-80" />
              </div>
            </div>
            
            <div className="text-center mb-10">
              <h1 className="text-3xl font-display text-cream mb-2 tracking-tight">Staff Portal</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-cream/30">Locanda dei Mori</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 pl-1">
                  Credentials
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-cream focus:outline-none focus:ring-2 focus:ring-sicilian-yellow/50 transition-all placeholder:text-cream/20 font-body text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-cream focus:outline-none focus:ring-2 focus:ring-sicilian-yellow/50 transition-all placeholder:text-cream/20 font-body text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-wine/20 border border-wine/30 rounded-xl"
                >
                  <p className="text-terracotta text-xs font-bold leading-relaxed">
                    {error}
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-between gap-6 px-2 py-2 bg-cream text-espresso font-bold rounded-full overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-sicilian-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-espresso hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-sicilian-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                <span className="relative z-10 pl-6 uppercase tracking-widest text-[10px] transition-colors duration-500">
                  {loading ? "Authenticating..." : "Sign In"}
                </span>
                <div className="relative z-10 w-10 h-10 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-espresso/10 transition-all duration-500">
                  <span className="text-sm">→</span>
                </div>
              </button>
            </form>

            <div className="mt-12 text-center border-t border-white/5 pt-8">
              <Link href="/" className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/30 hover:text-cream transition-colors">
                ← Return to Website
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
