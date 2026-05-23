"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Phone, User, CheckCircle2, MessageCircle, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";

// Strict Booking Schema
const bookingSchema = z.object({
  name: z.string().min(3, "Please enter your full name").max(50),
  date: z.string().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }, "Please select a future date"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  guests: z.number().min(1).max(20),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number (use international format)"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 2,
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);

    const dateTime = `${data.date}T${data.time}:00Z`;

    try {
      const { error } = await supabase.from("reservations").insert([
        {
          guest_name: data.name,
          date_time: dateTime,
          guests_count: data.guests,
          contact_number: data.phone,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      
      // WhatsApp Message Logic
      const message = `Nuova prenotazione da Locanda dei Mori!%0A%0A` +
                      `Nome: ${encodeURIComponent(data.name)}%0A` +
                      `Data: ${encodeURIComponent(data.date)}%0A` +
                      `Ora: ${encodeURIComponent(data.time)}%0A` +
                      `Ospiti: ${encodeURIComponent(data.guests)}%0A` +
                      `Cell: ${encodeURIComponent(data.phone)}`;
      
      const whatsappUrl = `https://wa.me/393348497735?text=${message}`;
      
      // Open WhatsApp in a new tab immediately
      const newWindow = window.open(whatsappUrl, "_blank");
      
      // If popup blocker blocked the window, fallback to current window redirect
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          window.location.href = whatsappUrl;
      }
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
        reset();
      }, 2000);

    } catch (err) {
      console.error("Booking error:", err);
      alert("Si è verificato un errore. Per favore riprova o chiamaci.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-espresso/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl overflow-hidden"
          >
            <div className="p-1.5 rounded-[2.5rem] bg-white/10 ring-1 ring-white/20 shadow-2xl">
              <div className="bg-cream bg-noise rounded-[calc(2.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden relative">
                
                <div className="absolute inset-0 bg-majolica opacity-10 pointer-events-none" />

                <div className="relative p-6 md:p-12 z-10">
                  <button 
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <X className="w-6 h-6 text-espresso/40" />
                  </button>

                  {!success ? (
                    <>
                      <div className="mb-10">
                        <div className="mb-4 inline-flex items-center justify-center rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.2em] font-bold border border-terracotta/20 bg-terracotta/5 text-terracotta">
                          {t("booking.title")}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display text-espresso tracking-tight">
                          {t("booking.subtitle")}
                        </h2>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name */}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1 flex items-center gap-2">
                              <User className="w-3 h-3" /> {t("booking.name")}
                            </label>
                            <input
                              {...register("name")}
                              className={cn(
                                "w-full px-5 py-3.5 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body text-sm",
                                errors.name ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                              )}
                              placeholder="Giacomo Leopardi"
                            />
                            {errors.name && (
                              <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1 ml-1">
                                <AlertCircle className="w-3 h-3" /> {errors.name.message}
                              </p>
                            )}
                          </div>

                          {/* Guests */}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1 flex items-center gap-2">
                              <Users className="w-3 h-3" /> {t("booking.guests")}
                            </label>
                            <select
                              {...register("guests", { valueAsNumber: true })}
                              className="w-full px-5 py-3.5 bg-black/5 border border-black/5 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition-all font-body text-sm appearance-none"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>

                          {/* Date */}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1 flex items-center gap-2">
                              <Calendar className="w-3 h-3" /> {t("booking.date")}
                            </label>
                            <input
                              type="date"
                              {...register("date")}
                              className={cn(
                                "w-full px-5 py-3.5 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body text-sm",
                                errors.date ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                              )}
                            />
                            {errors.date && (
                              <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1 ml-1">
                                <AlertCircle className="w-3 h-3" /> {errors.date.message}
                              </p>
                            )}
                          </div>

                          {/* Time */}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1 flex items-center gap-2">
                              <Clock className="w-3 h-3" /> {t("booking.time")}
                            </label>
                            <input
                              type="time"
                              {...register("time")}
                              className={cn(
                                "w-full px-5 py-3.5 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body text-sm",
                                errors.time ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                              )}
                            />
                            {errors.time && (
                              <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1 ml-1">
                                <AlertCircle className="w-3 h-3" /> {errors.time.message}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div className="col-span-full space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40 ml-1 flex items-center gap-2">
                              <Phone className="w-3 h-3" /> {t("booking.phone")}
                            </label>
                            <input
                              {...register("phone")}
                              className={cn(
                                "w-full px-5 py-3.5 bg-black/5 border rounded-xl text-espresso focus:outline-none focus:ring-2 transition-all font-body text-sm",
                                errors.phone ? "border-lava/50 ring-lava/10" : "border-black/5 focus:ring-terracotta/20"
                              )}
                              placeholder="+39 333 123 4567"
                            />
                            {errors.phone && (
                              <p className="text-[10px] text-lava font-bold uppercase tracking-wider flex items-center gap-1 ml-1">
                                <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="group relative w-full inline-flex items-center justify-between gap-6 px-2 py-2 bg-espresso text-cream rounded-full overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-50 shadow-xl"
                        >
                          <div className="absolute inset-0 bg-terracotta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                          <span className="relative z-10 pl-8 uppercase tracking-[0.3em] font-bold text-[10px] transition-colors duration-500">
                            {loading ? t("booking.pending") : t("booking.confirm")}
                          </span>
                          <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                            <span className="text-lg">→</span>
                          </div>
                        </button>
                      </form>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-24 h-24 bg-cobalt/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                         <div className="absolute inset-0 bg-majolica opacity-20 rounded-full" />
                        <CheckCircle2 className="w-12 h-12 text-cobalt relative z-10" />
                      </div>
                      <h3 className="text-4xl font-display text-espresso mb-4">Grazie!</h3>
                      <p className="text-espresso/60 font-body mb-8 leading-relaxed max-w-sm mx-auto">
                        {t("booking.success")}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
