import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Users, MessageSquare, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string;
}

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  room_id: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
}

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.id);
      
      // Subscribe to new messages
      const channel = supabase
        .channel(`room-${selectedRoom.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `room_id=eq.${selectedRoom.id}`,
          },
          async (payload) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("user_id", payload.new.user_id)
              .single();
            
            const newMsg = {
              ...payload.new as Message,
              profiles: profile || { username: "Аноним", avatar_url: null },
            };
            setMessages((prev) => [...prev, newMsg]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .order("created_at");

    if (error) {
      if (import.meta.env.DEV) console.error("Error fetching rooms:", error);
      return;
    }

    setRooms(data || []);
  };

  const fetchMessages = async (roomId: string) => {
    setIsLoading(true);
    const { data: messagesData, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at");

    if (error) {
      if (import.meta.env.DEV) console.error("Error fetching messages:", error);
      setIsLoading(false);
      return;
    }

    // Fetch profiles for all unique user_ids
    const userIds = [...new Set(messagesData?.map((m) => m.user_id) || [])];
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("user_id, username, avatar_url")
      .in("user_id", userIds);

    const profilesMap = new Map(
      profilesData?.map((p) => [p.user_id, { username: p.username, avatar_url: p.avatar_url }]) || []
    );

    const messagesWithProfiles = messagesData?.map((msg) => ({
      ...msg,
      profiles: profilesMap.get(msg.user_id) || { username: "Аноним", avatar_url: null },
    })) || [];

    setMessages(messagesWithProfiles);
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !user) return;

    const { error } = await supabase.from("messages").insert({
      content: newMessage.trim(),
      room_id: selectedRoom.id,
      user_id: user.id,
    });

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-2">Требуется авторизация</h1>
          <p className="text-muted-foreground mb-6">
            Войдите, чтобы присоединиться к сообществам
          </p>
          <Link to="/auth">
            <Button className="ktc-gradient-bg">Войти / Регистрация</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ktc-gradient-bg p-4">
        <div className="container mx-auto flex items-center gap-4">
          {selectedRoom ? (
            <button
              onClick={() => setSelectedRoom(null)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          ) : (
            <Link
              to="/"
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
          )}
          <div>
            <h1 className="text-xl font-heading font-bold text-white">
              {selectedRoom ? selectedRoom.name : "Сообщества KTC"}
            </h1>
            {selectedRoom && (
              <p className="text-sm text-white/70">{selectedRoom.description}</p>
            )}
          </div>
        </div>
      </header>

      {!selectedRoom ? (
        /* Room List */
        <div className="container mx-auto p-4">
          <div className="grid gap-4 max-w-2xl mx-auto">
            {rooms.map((room) => (
              <motion.button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ktc-card p-4 flex items-center gap-4 text-left w-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {room.icon || "💬"}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        /* Chat View */
        <div className="flex flex-col h-[calc(100vh-80px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                Загрузка сообщений...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Начните обсуждение!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    msg.user_id === user.id ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                    {msg.profiles?.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.user_id === user.id
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-70">
                      {msg.profiles?.username || "Аноним"}
                    </p>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] opacity-50 mt-1 text-right">
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-3 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                size="icon"
                className="w-12 h-12 rounded-full ktc-gradient-bg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
