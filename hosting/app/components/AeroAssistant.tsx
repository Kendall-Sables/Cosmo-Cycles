'use client';
import { useState } from 'react';
import { chatWithAero } from '../actions/ai-assistant';
import { MessageSquare, Send, Camera, X, Zap } from 'lucide-react';

export default function AeroAssistant({ products }: { products: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!input && !image) return;
    
    const userMsg = input || "Optical Scan Initiated...";
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    setInput('');
    
    const response = await chatWithAero(input, products, image || undefined);
    
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
    setImage(null);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {isOpen ? (
        <div className="bg-slate-950 border border-emerald-900/50 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-emerald-900/20 border-b border-emerald-900/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-emerald-500 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Aero-Assistant v1.0</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
            {messages.length === 0 && (
              <p className="text-emerald-500/50 italic">System ready. Upload a photo or describe your ideal ride...</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'ml-auto bg-emerald-600 text-white' : 'mr-auto bg-slate-900 text-emerald-100 border border-emerald-900/30'} p-3 rounded-xl max-w-[85%]`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="animate-pulse text-emerald-500 text-[10px] font-bold">ANALYZING DATA...</div>}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900/50 border-t border-emerald-900/50">
            {image && <div className="mb-2 relative w-12 h-12 border border-emerald-500"><img src={image} className="object-cover w-full h-full" /><button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5"><X size={10}/></button></div>}
            <div className="flex gap-2">
              <label className="cursor-pointer p-2 hover:bg-emerald-900/30 rounded-lg transition text-emerald-500">
                <Camera size={20} />
                <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
              </label>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-white" 
                placeholder="Talk to the lab..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button onClick={handleSubmit} className="text-emerald-500 hover:scale-110 transition"><Send size={20}/></button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 text-emerald-950 p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase text-[10px] tracking-widest">
            Aero-Intelligence
          </span>
        </button>
      )}
    </div>
  );
}