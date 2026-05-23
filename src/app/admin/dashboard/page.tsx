"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Calendar, Users, Clock, LogOut, Utensils, 
  MessageCircle, CheckCircle, Circle, ChevronRight, 
  Search, Filter, MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  guest_name: string;
  date_time: string;
  guests_count: number;
  contact_number: string;
  status: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  const fetchReservations = async () => {
    const now = new Date();
    // Keep reservations visible for 1 hour after their time
    now.setHours(now.getHours() - 1);
    
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .gte("date_time", now.toISOString())
      .order("date_time", { ascending: true });
    
    if (data && !error) {
      setReservations(data);
    }
  };

  useEffect(() => {
    checkUser();
    
    // Auto-detect and remove passed reservations every minute
    const interval = setInterval(() => {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      setReservations(prev => prev.filter(r => new Date(r.date_time) >= now));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      fetchReservations().then(() => setLoading(false));
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "confirmed" : "pending";
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      fetchReservations();
    }
  };

  if (loading && reservations.length === 0) {
    return (
      <div className="min-h-screen bg-espresso bg-noise flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-sicilian-yellow border-t-transparent rounded-full animate-spin" />
          <p className="text-cream/40 uppercase tracking-[0.3em] text-[10px] font-bold">Checking Guest List...</p>
        </div>
      </div>
    );
  }

  const todayCount = reservations.filter(r => new Date(r.date_time).toDateString() === new Date().toDateString()).length;
  const pendingCount = reservations.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-cream bg-noise flex flex-col md:flex-row">
      {/* Sidebar (Matching MenuManager) */}
      <aside className="w-full md:w-80 bg-espresso text-cream flex flex-col p-8 border-r border-white/5 relative z-20 shadow-2xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
             <Calendar className="w-8 h-8 text-sicilian-yellow" />
          </div>
          <h2 className="font-display text-2xl tracking-tight mb-1">Locanda dei Mori</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Admin Experience</p>
        </div>

        <nav className="flex-1 space-y-4">
          <Link 
            href="/admin/dashboard" 
            className="group flex items-center justify-between p-4 rounded-2xl bg-sicilian-yellow border border-sicilian-yellow text-espresso shadow-2xl shadow-sicilian-yellow/20"
          >
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5" />
              <span className="font-body text-sm font-bold uppercase tracking-widest">Reservations</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-espresso animate-pulse" />
          </Link>

          <Link 
            href="/admin/menu" 
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sicilian-yellow/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <Utensils className="w-5 h-5 text-white/40 group-hover:text-sicilian-yellow transition-colors" />
              <span className="font-body text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Menu Manager</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </Link>
        </nav>

        <button 
          onClick={() => supabase.auth.signOut().then(() => { window.location.href = "/admin/login"; })}
          className="mt-8 flex items-center justify-center gap-3 p-4 rounded-2xl text-red-400 border border-red-400/20 hover:bg-red-400/5 transition-all font-bold uppercase tracking-widest text-[10px]"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-[10px] uppercase tracking-widest font-black">
              Guest Management
            </div>
            <h1 className="text-5xl md:text-6xl font-display text-espresso tracking-tight leading-[0.9]">
              Booking <span className="text-terracotta italic">Ledger</span>
            </h1>
            <p className="mt-4 text-espresso/40 font-body leading-relaxed max-w-sm">
              Review and manage your table reservations. Confirm requests to notify your staff.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-white px-8 py-6 rounded-[2rem] border border-black/5 shadow-sm">
                <span className="block text-[10px] uppercase tracking-widest text-espresso/40 font-black mb-2">Today</span>
                <span className="text-4xl font-display text-espresso tracking-tight">{todayCount} Tables</span>
             </div>
             <div className="bg-white px-8 py-6 rounded-[2rem] border border-black/5 shadow-sm">
                <span className="block text-[10px] uppercase tracking-widest text-terracotta font-black mb-2">Pending</span>
                <span className="text-4xl font-display text-terracotta tracking-tight">{pendingCount} Requests</span>
             </div>
          </div>
        </header>

        {/* Reservations List */}
        <div className="space-y-4">
          <AnimatePresence>
            {reservations.map((res, index) => {
              const dateObj = new Date(res.date_time);
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={res.id} 
                  className="group p-1 rounded-[2.5rem] bg-white/50 border border-black/5 hover:border-terracotta/20 hover:bg-white transition-all duration-500"
                >
                  <div className="bg-white rounded-[calc(2.5rem-0.25rem)] p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8 flex-1">
                       <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center">
                          <Users className="w-8 h-8 text-espresso/20" />
                       </div>

                       <div className="flex-1">
                          <h3 className="text-2xl font-display text-espresso mb-2">{res.guest_name}</h3>
                          <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-widest font-bold text-espresso/40">
                             <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-terracotta" />
                                {dateObj.toLocaleDateString("en-GB", { day: 'numeric', month: 'short' })}
                             </div>
                             <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-terracotta" />
                                {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </div>
                             <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-terracotta" />
                                {res.guests_count} Guests
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-6 justify-between lg:justify-end border-t lg:border-t-0 pt-6 lg:pt-0 border-black/5">
                       <a 
                         href={`https://wa.me/${res.contact_number.replace(/\D/g, '')}`} 
                         target="_blank" 
                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 text-jade text-[10px] uppercase tracking-widest font-black hover:bg-jade hover:text-white transition-all"
                       >
                          <MessageCircle className="w-4 h-4" />
                          Contact
                       </a>

                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black border",
                            res.status === 'confirmed' 
                              ? "bg-jade/5 border-jade/20 text-jade" 
                              : "bg-terracotta/5 border-terracotta/20 text-terracotta"
                          )}>
                            {res.status}
                          </div>

                          <button 
                            onClick={() => toggleStatus(res.id, res.status)}
                            className="p-3 rounded-full bg-black/5 text-espresso/20 hover:text-espresso hover:bg-black/10 transition-all"
                          >
                            {res.status === 'pending' ? <CheckCircle className="w-6 h-6 text-jade" /> : <Circle className="w-6 h-6" />}
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {reservations.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-black/5 rounded-[3rem]">
               <p className="text-espresso/20 font-display text-2xl">No upcoming reservations</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
