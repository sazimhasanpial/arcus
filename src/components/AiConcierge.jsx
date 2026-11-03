import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShoppingBag,
  ArrowRight,
  Tag,
  Bell,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function AiConcierge() {
  const {
    PRODUCTS,
    setQuickViewProduct,
    applyPromo,
    setIsAccountOpen,
    userProfile,
    formatPrice,
    showToast
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [adminNoteText, setAdminNoteText] = useState('');
  const [adminNotified, setAdminNotified] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `নমস্কার / Assalamu Alaikum! I'm SaaZ AI, your 24/7 personal shopping concierge for SaaZ™ Official Store by Sazim Hasan Pial.

Ask me about flagship acoustics, titanium wearables, bKash payments, Pathao courier delivery, or request to notify an admin directly!`,
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showAdminForm]);

  const quickPrompts = [
    'Recommend Top Audio',
    'Discount Codes?',
    'Track My Package',
    'Delivery & Couriers',
    'Payment Methods',
    '🔔 Notify Admin'
  ];

  // Dispatch notification to store administrator
  const handleNotifyAdmin = (customMessage) => {
    const msg = customMessage || adminNoteText || 'Customer requests priority human support from store administrator.';
    setAdminNotified(true);
    setShowAdminForm(false);
    setAdminNoteText('');

    showToast('🔔 Store Administrator has been notified of your inquiry!', 'success');

    // Add confirmation message from bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `✅ **Admin Alert Dispatched Successfully!**\n\n• **Ticket Ref**: #ADM-8291 (Priority: HIGH)\n• **Recipient**: Arcus Store Administrator\n• **Status**: Logged in Admin Operations Center\n\nOur store manager has received your alert. If you provided your phone or email, we will follow up with you directly.`,
          adminAlertSuccess: true,
          time: 'Just now'
        }
      ]);
    }, 400);
  };

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // If user clicked or typed notify admin
    if (textToSend.includes('Notify Admin') || textToSend.toLowerCase().includes('admin') || textToSend.toLowerCase().includes('human') || textToSend.toLowerCase().includes('manager')) {
      setShowAdminForm(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: `I can alert our store administrator right now! Please enter your inquiry below or click the quick dispatch button to send an instant priority alert to the Arcus admin team.`,
            showAdminAction: true,
            time: 'Just now'
          }
        ]);
      }, 400);
      return;
    }

    // AI intelligent answer generation
    setTimeout(() => {
      let botResponse = {};
      const q = textToSend.toLowerCase();

      // 1. Audio / Headphones / Sound
      if (q.includes('audio') || q.includes('headphone') || q.includes('sound') || q.includes('music') || q.includes('earbud')) {
        const audioProduct = PRODUCTS.find((p) => p.id === 'arc-01');
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `For acoustic perfection, our flagship is the **${audioProduct.name}** (${formatPrice(audioProduct.price)}).\n\n• **Drivers**: Custom 40mm Beryllium acoustic chambers\n• **Noise Cancellation**: 45dB spatial adaptive hybrid ANC\n• **Battery**: 60-Hour endurance with USB-C fast charging\n\nTap below to inspect full specifications or add to cart!`,
          productLink: audioProduct,
          time: 'Just now'
        };
      }
      // 2. Watches / Wearables
      else if (q.includes('watch') || q.includes('titanium') || q.includes('ring') || q.includes('wearable')) {
        const watch = PRODUCTS.find((p) => p.id === 'arc-02');
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Our premier wearable is the **${watch.name}** (${formatPrice(watch.price)}).\n\n• **Chassis**: Grade 5 Aerospace Titanium with DLC sapphire crystal\n• **Display**: 1.43" Ultra-Bright AMOLED (1,500 nits)\n• **Endurance**: 14 days of autonomous battery life`,
          productLink: watch,
          time: 'Just now'
        };
      }
      // 3. Keyboards / Desks / Home
      else if (q.includes('keyboard') || q.includes('desk') || q.includes('sand') || q.includes('art') || q.includes('lamp')) {
        const keyboard = PRODUCTS.find((p) => p.id === 'arc-03');
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Engineered for mechanical purists: **${keyboard.name}** (${formatPrice(keyboard.price)}).\n\n• CNC machined solid aluminum unibody with gasket isolation\n• Hot-swappable tactile switches with factory pre-lubed stabilizers\n• Multi-device Bluetooth 5.3 + 2.4GHz low-latency wireless.`,
          productLink: keyboard,
          time: 'Just now'
        };
      }
      // 4. Discounts & Coupons
      else if (q.includes('discount') || q.includes('coupon') || q.includes('code') || q.includes('promo') || q.includes('sale') || q.includes('offer')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Here are our verified exclusive discount codes for today:\n\n• **ARCUS20** — 20% Off Storewide on all collections\n• **VIP50** — 25% Off VIP Elite Hardware Pass\n\nClick the button below to apply ARCUS20 instantly to your shopping cart!`,
          promoCode: 'ARCUS20',
          time: 'Just now'
        };
      }
      // 5. Package Tracking & Order status
      else if (q.includes('track') || q.includes('package') || q.includes('order') || q.includes('status')) {
        const order = userProfile.currentOrder;
        const currentStepTitle = order.steps[order.statusStep]?.title;
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Active Order Status: **#${order.id}**\n\n• **Status**: ${currentStepTitle}\n• **Courier**: ${order.carrier}\n• **Tracking #**: ${order.trackingNumber}\n• **Assigned Delivery Agent**: ${order.rider}\n\nClick below to open the interactive 5-step live tracker!`,
          actionType: 'open-tracker',
          time: 'Just now'
        };
      }
      // 6. Delivery & Couriers
      else if (q.includes('deliver') || q.includes('courier') || q.includes('pathao') || q.includes('redx') || q.includes('shipping') || q.includes('time')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `🚚 **Nationwide Delivery Across Bangladesh**:\n\n• **Dhaka Metro**: 24 to 48 hours via Pathao Express Priority Van\n• **All Other Districts (Chattogram, Sylhet, Rajshahi, etc.)**: 2 to 4 business days via RedX & Steadfast\n• **Free Shipping**: Unlocked on all orders over $200 (৳24,000)! All parcels are shipped with tamper-evident barcoded seals.`,
          time: 'Just now'
        };
      }
      // 7. Payment Methods (bKash, Nagad, Card, COD)
      else if (q.includes('payment') || q.includes('bkash') || q.includes('nagad') || q.includes('rocket') || q.includes('card') || q.includes('cod') || q.includes('cash')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `💳 **Accepted Payment Gateways**:\n\n• **Mobile Financial Services (MFS)**: Instant bKash Merchant Pay, Nagad, and DBBL Rocket\n• **Credit & Debit Cards**: Visa, Mastercard, American Express with 3D Secure 2.0\n• **Cash on Delivery (COD)**: Available nationwide across all 64 districts of Bangladesh with zero advance fee!`,
          time: 'Just now'
        };
      }
      // 8. Warranty & Returns
      else if (q.includes('warranty') || q.includes('return') || q.includes('guarantee') || q.includes('replacement')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `🛡️ **Warranty & Assurance Policy**:\n\n• **Official Warranty**: 2-Year instant hardware replacement warranty\n• **Hassle-Free Returns**: 30-day contactless return pickup\n• **Tax & Compliance**: Every purchase includes an official NBR-standard Mushak-6.3 VAT Tax Invoice and registered Govt. DBID certification.`,
          time: 'Just now'
        };
      }
      // 9. Location & Showroom
      else if (q.includes('location') || q.includes('address') || q.includes('office') || q.includes('store') || q.includes('banani') || q.includes('dhaka')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `📍 **Arcus Flagship Experience Center**:\n\n• **Address**: Level 8, Arcus Tower, Road 11, Banani Model Town, Dhaka-1213\n• **Hours**: 10:00 AM – 10:00 PM (Open 7 Days a Week)\n• **Experience**: Live acoustic listening lounge & tactile hardware test bench.`,
          time: 'Just now'
        };
      }
      // 10. General / Fallback
      else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `I'm happy to help! You can ask about our 12 premium products across Electronics, Apparel, Accessories, and Home, request delivery updates, apply discount vouchers, or tap below to notify our store admin.`,
          showAdminAction: true,
          time: 'Just now'
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          title="Open AI Shopping Concierge"
          aria-label="AI Shopping Concierge"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 animate-pulse" />
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[11px] sm:text-xs font-bold hidden sm:inline pr-1">AI Concierge</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] sm:w-[410px] rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px] sm:h-[540px] animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>SaaZ™ AI Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-brand-100">Live Intelligent Assistant</p>
              </div>
            </div>

            {/* Quick Notify Admin Header Pill & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNotifyAdmin('User triggered priority admin alert from header.')}
                className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
                title="Alert Store Administrator"
              >
                <Bell className="w-3 h-3 text-amber-300" />
                <span>Notify Admin</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 border-b border-slate-200/60 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className={`px-2.5 py-1 rounded-full border whitespace-nowrap transition-all ${
                  prompt.includes('Notify Admin')
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500/25'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl space-y-2.5 ${
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm shadow-md'
                      : 'glass border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  {/* Optional Interactive Product Card */}
                  {m.productLink && (
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setQuickViewProduct(m.productLink);
                          setIsOpen(false);
                        }}
                        className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-left hover:scale-[1.02] transition-transform shadow-sm"
                      >
                        <img
                          src={m.productLink.image}
                          alt={m.productLink.name}
                          className="w-11 h-11 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[11px] truncate text-slate-900 dark:text-white">
                            {m.productLink.name}
                          </div>
                          <div className="text-brand-600 dark:text-brand-400 font-extrabold text-[11px]">
                            {formatPrice(m.productLink.price)}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    </div>
                  )}

                  {/* Optional Promo Pill */}
                  {m.promoCode && (
                    <button
                      onClick={() => applyPromo(m.promoCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 text-white font-bold text-[10px] shadow-sm hover:bg-brand-700 active:scale-95 transition-all"
                    >
                      <Tag className="w-3 h-3" />
                      <span>Apply {m.promoCode} (-20%)</span>
                    </button>
                  )}

                  {/* Optional Tracker Action */}
                  {m.actionType === 'open-tracker' && (
                    <button
                      onClick={() => {
                        setIsAccountOpen(true);
                        setIsOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[10px] shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Open Live Package Tracker</span>
                    </button>
                  )}

                  {/* Optional Notify Admin Action Button */}
                  {m.showAdminAction && !adminNotified && (
                    <div className="pt-1">
                      <button
                        onClick={() => handleNotifyAdmin('User requested priority support via inline bot button.')}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                        <span>Notify Admin Now (Priority Ticket)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Custom Interactive Admin Notification Dispatch Box */}
            {showAdminForm && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300 text-xs">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>Send Direct Note to Admin</span>
                </div>
                <input
                  type="text"
                  value={adminNoteText}
                  onChange={(e) => setAdminNoteText(e.target.value)}
                  placeholder="Type your message for the store manager..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-amber-500/30 text-slate-900 dark:text-white focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNotifyAdmin(adminNoteText)}
                    className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Dispatch Alert to Admin</span>
                  </button>
                  <button
                    onClick={() => setShowAdminForm(false)}
                    className="px-3 py-1.5 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[11px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 glass flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask gear, audio, bKash, delivery, or 'notify admin'..."
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all active:scale-95"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
