'use client';
import { useState, useRef, useEffect } from 'react';
import { chatWithAero } from '../actions/ai-assistant';
import { Send, Camera, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AeroAssistant({ products }: { products: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleOpenChat = async () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setLoading(true);
      try {
        const greeting = await chatWithAero("INITIAL_GREETING", products);
        setMessages([{ role: 'ai', content: greeting }]);
      } catch (error) {
        console.error("Greeting failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
    const userMsg = input || "Image Uploaded";
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    const currentInput = input;
    const currentImage = image;
    setInput('');
    setImage(null);
    const response = await chatWithAero(currentInput, products, currentImage || undefined);
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  const renderContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = content.split(linkRegex);
    if (parts.length === 1) return content;
    const elements = [];
    for (let i = 0; i < parts.length; i += 3) {
      elements.push(parts[i]); 
      if (parts[i + 1]) {
        elements.push(
          <Link key={i} href={parts[i + 2]} className="text-emerald-600 underline font-bold hover:text-emerald-700 transition-colors">
            {parts[i + 1]}
          </Link>
        );
      }
    }
    return elements;
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {isOpen ? (
        <div className="bg-white border border-slate-200 w-80 md:w-96 h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header - Styled like your screenshot */}
          <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Cosmo</h3>
                <p className="text-[10px] text-slate-400">Personal Store Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-hide bg-slate-50/30">
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                 <span className={`text-[10px] font-bold mb-1 uppercase tracking-tight text-slate-400 ${m.role === 'user' ? 'text-right mr-2' : 'ml-2'}`}>
                  {m.role === 'user' ? 'You' : 'Cosmo'}
                </span>
                <div className={`
                  ${m.role === 'user' 
                    ? 'ml-auto bg-emerald-500 text-white rounded-2xl rounded-tr-none shadow-sm' 
                    : 'mr-auto bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none shadow-sm'} 
                  p-4 max-w-[85%] whitespace-pre-wrap leading-relaxed
                `}>
                  {renderContent(m.content)}
                </div>
              </div>
            ))}
            {loading && <div className="ml-2 text-slate-400 text-[10px] animate-pulse">Cosmo is typing...</div>}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            {image && (
              <div className="mb-3 relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                <img src={image} className="object-cover w-full h-full" alt="Preview" />
                <button onClick={() => setImage(null)} className="absolute top-0 right-0 bg-slate-800 text-white p-0.5"><X size={8}/></button>
              </div>
            )}
            
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:border-emerald-300 transition-all">
              <label className="cursor-pointer text-slate-400 hover:text-emerald-500 transition-colors">
                <Camera size={18} />
                <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
              </label>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 outline-none" 
                placeholder="Ask Cosmo about our fleet..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className={`p-2 rounded-full transition-all ${input || image ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 cursor-not-allowed'}`}
              >
                <Send size={16}/>
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 mt-2">Cosmo only answers using Cosmo Cycles inventory.</p>
          </div>
        </div>
      ) : (
        /* The Floating Bubble */
        <button 
          onClick={handleOpenChat}
          className="bg-white border border-slate-200 text-emerald-500 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
        >
          <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}