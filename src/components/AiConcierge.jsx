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
  Tag
} from 'lucide-react';

export default function AiConcierge() {
  const {
    PRODUCTS,
    setQuickViewProduct,
    applyPromo,
    setIsAccountOpen,
    userProfile,
    formatPrice
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${userProfile.name.split(' ')[0]}! I'm Arcus AI, your personal shopping concierge. How can I assist you with modern tech, acoustics, or delivery today?`,
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
  }, [messages, isOpen]);

  const quickPrompts = [
    'Recommend Top Audio',
    'Discount Codes?',
    'Track My Package',
    'Best Minimalist Gear'
  ];

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

    // AI intelligent answer generation
    setTimeout(() => {
      let botResponse = {};
      const q = textToSend.toLowerCase();

      if (q.includes('audio') || q.includes('headphone') || q.includes('sound') || q.includes('music')) {
        const audioProduct = PRODUCTS.find((p) => p.id === 'arc-01');
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `For acoustic perfection, our flagship is the **${audioProduct.name}** ($${audioProduct.price}). It features custom 40mm beryllium drivers, active 45dB spatial ANC, and 60 hours battery!`,
          productLink: audioProduct,
          time: 'Just now'
        };
      } else if (q.includes('discount') || q.includes('coupon') || q.includes('code') || q.includes('promo') || q.includes('sale')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Here are our top exclusive discounts for you:\n• **ARCUS20** — 20% Off Storewide\n• **VIP50** — 25% Off VIP Exclusive\nClick below to apply instantly!`,
          promoCode: 'ARCUS20',
          time: 'Just now'
        };
      } else if (q.includes('track') || q.includes('package') || q.includes('order') || q.includes('delivery')) {
        const order = userProfile.currentOrder;
        const currentStepTitle = order.steps[order.statusStep]?.title;
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Your active package **#${order.id}** is currently at: **${currentStepTitle}** via ${order.carrier}.\nExpected delivery: Today!`,
          actionType: 'open-tracker',
          time: 'Just now'
        };
      } else if (q.includes('watch') || q.includes('titanium') || q.includes('gear')) {
        const watch = PRODUCTS.find((p) => p.id === 'arc-02');
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `You'll love the **${watch.name}** ($${watch.price})—precision-machined from Grade 5 aerospace titanium with sapphire AMOLED glass and 14-day battery life.`,
          productLink: watch,
          time: 'Just now'
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Great choice! We have 12 premium products across Electronics, Apparel, Accessories, and Home. You can filter by category above or tap below to compare specs side-by-side.`,
          time: 'Just now'
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
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
        <div className="w-[calc(100vw-1.5rem)] sm:w-96 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[450px] sm:h-[500px] animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Arcus AI Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-brand-100">Smart Product Guide & Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 border-b border-slate-200/60 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full glass border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages */}
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
                  className={`max-w-[80%] p-3 rounded-2xl space-y-2 ${
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'glass border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'
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
                        className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-left hover:scale-[1.02] transition-transform"
                      >
                        <img
                          src={m.productLink.image}
                          alt={m.productLink.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[11px] truncate text-slate-900 dark:text-white">
                            {m.productLink.name}
                          </div>
                          <div className="text-brand-600 dark:text-brand-400 font-extrabold text-[10px]">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-600 text-white font-bold text-[10px] shadow-sm hover:bg-brand-700"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[10px] shadow-sm hover:bg-emerald-700"
                    >
                      <span>Open Live Package Tracker</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
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
              placeholder="Ask anything about gear, specs..."
              className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
