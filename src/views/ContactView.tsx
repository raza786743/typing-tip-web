import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: "Is Typing Tip completely free to use?",
      a: "Yes, Typing Tip is 100% free with no subscriptions, paid tiers, or hidden paywalls. It runs entirely inside your browser."
    },
    {
      q: "Can I deploy this app myself to Cloudflare Pages?",
      a: "Absolutely! The entire project is packaged as a clean static Vite application. Simply run 'npm run build' and upload the 'dist' folder or connect your Git repository."
    },
    {
      q: "How is my typing test data saved?",
      a: "All typing scores, daily challenge streaks, and preferences are stored locally on your device in your browser's localStorage. No remote databases are required."
    },
    {
      q: "How can I type Urdu if I don't have an Urdu keyboard installed?",
      a: "Typing Tip includes a built-in Phonetic Keymap Reference in the Urdu section. You can check which English key produces each Urdu character, or click characters to copy them directly."
    }
  ];

  return (
    <div className="space-y-12 py-2 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-[#0b1429] border border-blue-900/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-cyan-400 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Contact & Support</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Have feedback, feature requests, or questions about Typing Tip? Reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-[#0a1226] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Send a Message</span>
          </h2>

          {submitted ? (
            <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Message Received!</h3>
              <p className="text-xs text-emerald-300">
                Thank you for your feedback! Your message has been logged client-side.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-400 block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-400 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-400 block">
                  Subject / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white focus:outline-none"
                >
                  <option value="Feedback">Feedback & Suggestions</option>
                  <option value="Bug">Report a Bug / Typo</option>
                  <option value="Feature">Feature Request</option>
                  <option value="Other">General Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-400 block">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#091022] border border-blue-800/50 focus:border-cyan-400 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0a1226] border border-blue-900/40 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-white hover:text-cyan-300"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
