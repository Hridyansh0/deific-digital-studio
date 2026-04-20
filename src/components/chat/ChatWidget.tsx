import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "How long does a website take?",
  "Can you help with 3D animation?",
  "¿Cuánto cuesta un sitio web?",
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Aria from Deific Digital ✨ I can chat in any language. How can I help you today?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Msg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: next },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "..." }]);
    } catch (e: any) {
      const msg = e?.message ?? "Something went wrong";
      if (msg.includes("429")) toast.error("Too many requests — please wait a moment.");
      else if (msg.includes("402")) toast.error("AI credits exhausted. Please add credits.");
      else toast.error(msg);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I had trouble responding. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow grid place-items-center text-primary-foreground"
            aria-label="Open chat"
          >
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-glow-pulse" />
            <MessageCircle className="w-6 h-6 relative" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[calc(100vh-3rem)] glass rounded-2xl shadow-elegant flex flex-col overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/20 to-accent/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold leading-tight">Aria</p>
                  <p className="text-[10px] text-accent flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online · multilingual
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a href="tel:+919999988888" className="w-9 h-9 grid place-items-center rounded-lg hover:bg-secondary transition">
                  <Phone className="w-4 h-4" />
                </a>
                <button onClick={() => setOpen(false)} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-secondary transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full glass border border-border hover:border-primary/50 hover:text-primary transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="p-3 border-t border-border flex items-end gap-2"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Type in any language..."
                rows={1}
                className="flex-1 resize-none bg-secondary/60 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 max-h-32"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-br from-primary to-accent text-primary-foreground shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
