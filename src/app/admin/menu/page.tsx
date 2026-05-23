"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Utensils, Plus, Edit, Trash2, Calendar, LogOut, 
  Check, X, Search, ChevronRight, Save, Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Menu Item Schema
const menuSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  category: z.enum(["Bruschette", "Antipasti", "Primi", "Secondi di Carne", "Secondi di Pesce", "Contorni", "Dolci", "Drink List"]),
  description: z.string().max(500).optional(),
  price: z.string().min(1, "Price is required"),
  popular: z.boolean(),
});

type MenuFormData = z.infer<typeof menuSchema>;

export default function MenuManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      category: "Bruschette",
      popular: false,
    }
  });

  const isPopular = watch("popular");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      fetchMenu();
    }
  }

  async function fetchMenu() {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (data) setItems(data);
    setLoading(false);
  }

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      reset({
        name: item.name,
        category: item.category,
        description: item.description || "",
        price: item.price,
        popular: item.popular || false
      });
    } else {
      setEditingId(null);
      reset({
        name: "",
        category: "Antipasti",
        description: "",
        price: "",
        popular: false
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questo piatto?")) {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (!error) {
        setItems(items.filter(i => i.id !== id));
      }
    }
  };

  const onSubmit = async (data: MenuFormData) => {
    setLoading(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('menu_items')
          .update(data)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([data]);
        if (error) throw error;
      }
      
      await fetchMenu();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving item. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-espresso bg-noise flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-sicilian-yellow border-t-transparent rounded-full animate-spin" />
          <p className="text-cream/40 uppercase tracking-[0.3em] text-[10px] font-bold">Connecting to Kitchen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream bg-noise flex flex-col md:flex-row">
      {/* Editorial Sidebar */}
      <aside className="w-full md:w-80 bg-espresso text-cream flex flex-col p-8 border-r border-white/5 relative z-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
             <Utensils className="w-8 h-8 text-sicilian-yellow" />
          </div>
          <h2 className="font-display text-2xl tracking-tight mb-1">Locanda dei Mori</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Admin Experience</p>
        </div>

        <nav className="flex-1 space-y-4">
          <Link 
            href="/admin/dashboard" 
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sicilian-yellow/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-white/40 group-hover:text-sicilian-yellow transition-colors" />
              <span className="font-body text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Reservations</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </Link>

          <Link 
            href="/admin/menu" 
            className="group flex items-center justify-between p-4 rounded-2xl bg-sicilian-yellow border border-sicilian-yellow text-espresso shadow-2xl shadow-sicilian-yellow/20"
          >
            <div className="flex items-center gap-4">
              <Utensils className="w-5 h-5" />
              <span className="font-body text-sm font-bold uppercase tracking-widest">Menu Manager</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-espresso animate-pulse" />
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
              Kitchen Control
            </div>
            <h1 className="text-5xl md:text-6xl font-display text-espresso tracking-tight leading-[0.9]">
              Digital <span className="text-terracotta italic">Menu</span>
            </h1>
            <p className="mt-4 text-espresso/40 font-body leading-relaxed max-w-sm">
              Update your culinary offerings in real-time. Changes are immediately visible to all guests.
            </p>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="group relative inline-flex items-center justify-between gap-6 px-2 py-2 bg-espresso text-cream font-bold rounded-full overflow-hidden shadow-2xl hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-w-[200px]"
          >
            <div className="absolute inset-0 bg-terracotta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
            <span className="relative z-10 pl-6 uppercase tracking-widest text-[10px] transition-colors duration-500">Add New Plate</span>
            <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
              <Plus className="w-5 h-5" />
            </div>
          </button>
        </header>

        {/* Menu Grid */}
        <div className="space-y-4 pb-20">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="group relative p-1 rounded-[2rem] bg-white/50 border border-black/5 hover:border-terracotta/20 hover:bg-white transition-all duration-500"
            >
              <div className="bg-white rounded-[calc(2rem-0.25rem)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-black/5">
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                   {/* Item Icon/Category */}
                   <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center group-hover:bg-terracotta/5 transition-colors">
                      <Utensils className="w-8 h-8 text-espresso/20 group-hover:text-terracotta/40 transition-colors" />
                   </div>

                   <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-widest font-black text-espresso/40 bg-black/5 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.popular && (
                          <span className="text-[10px] uppercase tracking-widest font-black text-terracotta bg-terracotta/5 px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-display text-espresso leading-none mb-2">{item.name}</h3>
                      <p className="text-sm text-espresso/40 font-body line-clamp-1 max-w-lg">{item.description}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-8 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-black/5">
                   <span className="text-2xl font-display text-espresso font-bold tracking-tight">{item.price}</span>
                   <div className="flex gap-2">
                     <button 
                       onClick={() => handleOpenModal(item)}
                       className="p-3 rounded-full bg-black/5 text-espresso/40 hover:text-espresso hover:bg-black/10 transition-all"
                     >
                       <Edit className="w-5 h-5" />
                     </button>
                     <button 
                       onClick={() => handleDelete(item.id)}
                       className="p-3 rounded-full bg-red-50 text-red-300 hover:text-red-500 hover:bg-red-100 transition-all"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {items.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-black/5 rounded-[3rem]">
               <p className="text-espresso/20 font-display text-2xl">Your menu is currently empty</p>
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl"
            >
              <div className="p-1.5 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 shadow-2xl">
                <div className="bg-cream bg-noise rounded-[calc(2.5rem-0.375rem)] overflow-hidden">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center justify-between mb-10">
                      <h2 className="text-4xl font-display text-espresso">
                        {editingId ? "Edit" : "New"} <span className="text-terracotta italic">Plate</span>
                      </h2>
                      <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-black/5 transition-colors">
                        <X className="w-6 h-6 text-espresso/40" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-full">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1">Plate Name</label>
                          <input
                            {...register("name")}
                            className={cn(
                              "w-full px-5 py-3 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body",
                              errors.name ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                            )}
                            placeholder="e.g. Pistachio Lasagna"
                          />
                          {errors.name && (
                            <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1">Category</label>
                          <select
                            {...register("category")}
                            className="w-full px-5 py-3 bg-black/5 border border-black/5 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition-all font-body appearance-none"
                          >
                            <option value="Bruschette">Bruschette</option>
                            <option value="Antipasti">Antipasti</option>
                            <option value="Primi">Primi Piatti</option>
                            <option value="Secondi di Carne">Secondi di Carne</option>
                            <option value="Secondi di Pesce">Secondi di Pesce</option>
                            <option value="Contorni">Contorni</option>
                            <option value="Dolci">Dolci</option>
                            <option value="Drink List">Drink List</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1">Price (e.g. 18€)</label>
                          <input
                            {...register("price")}
                            className={cn(
                              "w-full px-5 py-3 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body",
                              errors.price ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                            )}
                            placeholder="18€"
                          />
                          {errors.price && (
                            <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.price.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 col-span-full">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1">Description</label>
                          <textarea
                            {...register("description")}
                            rows={3}
                            className="w-full px-5 py-3 bg-black/5 border border-black/5 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition-all font-body resize-none"
                            placeholder="Tell the story of this dish..."
                          />
                        </div>

                        <div className="flex items-center gap-3 col-span-full">
                          <button
                            type="button"
                            onClick={() => setValue("popular", !isPopular)}
                            className={cn(
                              "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
                              isPopular ? "bg-terracotta" : "bg-black/10"
                            )}
                          >
                            <div className={cn(
                              "w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                              isPopular ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                          <input type="hidden" {...register("popular")} />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-espresso/60">Mark as Popular / Signature</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full inline-flex items-center justify-between gap-6 px-2 py-2 bg-espresso text-cream font-bold rounded-full overflow-hidden shadow-xl hover:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-terracotta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                        <span className="relative z-10 pl-6 uppercase tracking-widest text-[10px] transition-colors duration-500">
                          {loading ? "Saving..." : "Publish Changes"}
                        </span>
                        <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                          <Save className="w-5 h-5" />
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
