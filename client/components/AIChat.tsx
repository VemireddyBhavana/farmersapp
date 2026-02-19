import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Namaste! I am your AI Farming Assistant. How can I help you today? I can help with tractor booking, crop advice, or market rates.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "I'm looking into that for you. For the best tractor recommendation, could you tell me your soil type?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] sm:bottom-10 sm:right-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-3xl bg-background/80 border shadow-2xl glass dark:glass-dark sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-white/20 p-2">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Agri Assistant</h3>
                  <div className="flex items-center space-x-1 text-xs text-primary-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                    <span>AI Assistant Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Language Selection Bar */}
            <div className="flex justify-around bg-muted/50 p-2 text-xs font-medium border-b">
              <span className="cursor-pointer text-primary">English</span>
              <span className="cursor-pointer hover:text-primary transition-colors">తెలుగు</span>
              <span className="cursor-pointer hover:text-primary transition-colors">हिन्दी</span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none border"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="mt-1 text-[10px] text-muted-foreground px-1">
                    {msg.timestamp}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-muted-foreground p-2">
                  <Bot className="h-4 w-4 animate-bounce" />
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
                    <div className="h-1.5 w-1.5 animate-bounce delay-75 rounded-full bg-muted-foreground"></div>
                    <div className="h-1.5 w-1.5 animate-bounce delay-150 rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 p-2 overflow-x-auto no-scrollbar border-t bg-muted/10">
              <button className="flex-shrink-0 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground hover:bg-primary/20 transition-colors">🚜 Rent Tractor</button>
              <button className="flex-shrink-0 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground hover:bg-primary/20 transition-colors">🌾 Crop Advice</button>
              <button className="flex-shrink-0 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground hover:bg-primary/20 transition-colors">💰 Mandi Rates</button>
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="rounded-full border-muted bg-muted/50 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full flex-shrink-0"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-colors duration-300 sm:h-16 sm:w-16",
          isOpen ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <ChevronDown className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-white"
          >
            1
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
