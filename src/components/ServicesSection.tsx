import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Palette, 
  Calendar, 
  MessageSquare, 
  Heart, 
  Video, 
  HandHeart, 
  FileText,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Globe,
  Briefcase,
  Building,
  Sparkles,
  Send,
  Loader2,
  Target
} from "lucide-react";
import { hobbiesData } from "@/data/hobbiesData";
import { countryGroups } from "@/data/universitiesData";
import { onlineCourses, offlineBusinessSchools } from "@/data/businessData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const services = [
  {
    id: "specialties",
    icon: GraduationCap,
    title: "Специальности и университеты",
    shortDesc: "Выбери своё направление обучения",
    content: `На платформе есть раздел «Специальности», где собраны направления обучения и профессии.

Выбираешь интересующую специальность, затем страну — и получаешь список университетов, где можно учиться по этому направлению.

Для каждого университета прикреплены ссылки на официальный сайт и краткое описание программы.`,
    hasUniversities: true,
  },
  {
    id: "hobbies",
    icon: Palette,
    title: "Хобби",
    shortDesc: "Попробуй себя в новом деле",
    content: `Раздел «Хобби» создан для тех, кто хочет попробовать себя в новом деле.

Выбери категорию и найди место для занятий в Алматы!`,
    hasHobbies: true,
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Бизнес и карьера",
    shortDesc: "Предпринимательство, финансы, маркетинг",
    content: `Курсы по предпринимательству, финансовой грамотности, маркетингу и управлению проектами.

Доступны как онлайн-курсы (Coursera, Udemy, edX), так и офлайн бизнес-школы в Алматы.`,
    hasBusiness: true,
  },
  {
    id: "support",
    icon: Heart,
    title: "Поддержка",
    shortDesc: "Пространство, где тебя услышат",
    content: `Раздел «Поддержка» — пространство, где подростки могут рассказать о своих чувствах, мыслях или переживаниях.

Мы будем читать их истории, отвечать в соцсетях или делать отдельные рубрики для обсуждения важных тем.

Это место, где можно быть услышанным и понять, что ты не один.`,
    hasSupportForm: true,
  },
  {
    id: "tests",
    icon: ClipboardCheck,
    title: "Профориентационные тесты",
    shortDesc: "Определи свою примерную профессию",
    content: `Пройди наш профориентационный тест и узнай, какие профессии и сферы деятельности тебе подходят.

Тест поможет определить твои склонности и интересы.`,
    hasTest: true,
  },
  {
    id: "planner",
    icon: Target,
    title: "Умный планер",
    shortDesc: "Цели, задачи и твой прогресс",
    content: `Веди свои цели и задачи в одном месте.

Создавай долгосрочные цели (например, «поступить в KBTU»), разбивай их на подзадачи, ставь дедлайны и приоритеты — и следи за прогрессом.`,
    hasPlanner: true,
  },
  {
    id: "my-university",
    icon: Building,
    title: "Мой университет",
    shortDesc: "Персональный трек поступления",
    content: `Выбирай университет из базы, веди чеклист требований (IELTS, SAT, портфолио и др.), загружай документы и следи за прогрессом готовности к поступлению.`,
    hasMyUniversity: true,
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: "📸",
    url: "https://instagram.com/kaz_teen_community",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "TikTok",
    icon: "🎵",
    url: "https://tiktok.com/@_kaz_teen_community_",
    color: "from-gray-900 to-gray-700",
  },
  {
    name: "Telegram",
    icon: "✈️",
    url: "https://t.me/KazTeenCommunity",
    color: "from-blue-400 to-blue-600",
  },
];

const ServicesSection = () => {
  const { toast } = useToast();
  const [openService, setOpenService] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const [openCountryGroup, setOpenCountryGroup] = useState<string | null>(null);
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [openBusinessTab, setOpenBusinessTab] = useState<"online" | "offline">("online");
  
  // Support form state
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [isSendingSupport, setIsSendingSupport] = useState(false);

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
    setOpenCategory(null);
    setOpenSubcategory(null);
    setOpenCountryGroup(null);
    setOpenCountry(null);
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenSubcategory(null);
  };

  const toggleSubcategory = (subcategory: string) => {
    setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
  };

  const toggleCountryGroup = (group: string) => {
    setOpenCountryGroup(openCountryGroup === group ? null : group);
    setOpenCountry(null);
  };

  const toggleCountry = (country: string) => {
    setOpenCountry(openCountry === country ? null : country);
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supportName.trim() || !supportEmail.trim() || !supportMessage.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsSendingSupport(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-support-email", {
        body: {
          name: supportName.trim(),
          email: supportEmail.trim(),
          message: supportMessage.trim(),
        },
      });

      if (error) throw error;

      toast({
        title: "Сообщение отправлено! ✉️",
        description: "Мы получили ваше обращение и скоро ответим",
      });
      
      setSupportName("");
      setSupportEmail("");
      setSupportMessage("");
    } catch (error: any) {
      console.error("Support email error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или напишите нам в соцсетях",
        variant: "destructive",
      });
    } finally {
      setIsSendingSupport(false);
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 ktc-gradient-text">
            Что мы предлагаем
          </h2>
          <div className="w-24 h-1.5 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Возможности для саморазвития, обучения и поддержки — всё в одном месте
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full ktc-card p-5 flex items-center gap-4 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.shortDesc}
                  </p>
                </div>
                {openService === service.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openService === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 ml-16">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-foreground/80 whitespace-pre-line leading-relaxed mb-4">
                          {service.content}
                        </p>

                        {/* Career Test Link */}
                        {service.hasTest && (
                          <div className="mt-4">
                            <Link
                              to="/career-test"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                              <ClipboardCheck className="w-5 h-5" />
                              Пройти тест
                            </Link>
                          </div>
                        )}

                        {/* Planner Link */}
                        {(service as any).hasPlanner && (
                          <div className="mt-4">
                            <Link
                              to="/planner"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                              <Target className="w-5 h-5" />
                              Открыть планер
                            </Link>
                            <p className="text-sm text-muted-foreground mt-2">
                              Доступно после входа в аккаунт
                            </p>
                          </div>
                        )}

                        {/* My University Link */}
                        {(service as any).hasMyUniversity && (
                          <div className="mt-4">
                            <Link
                              to="/my-university"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                              <Building className="w-5 h-5" />
                              Открыть «Мой университет»
                            </Link>
                            <p className="text-sm text-muted-foreground mt-2">
                              Доступно после входа в аккаунт
                            </p>
                          </div>
                        )}

                        {/* Universities by Countries */}
                        {service.hasUniversities && (
                          <div className="mt-4 space-y-3">
                            <div className="mb-4">
                              <Link
                                to="/university-test"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                              >
                                <Sparkles className="w-5 h-5" />
                                ИИ-тест по подбору университета
                              </Link>
                              <p className="text-sm text-muted-foreground mt-2">
                                Пройди тест и узнай, какие университеты подходят именно тебе
                              </p>
                            </div>
                            <h4 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                              <Globe className="w-5 h-5 text-primary" />
                              Страны для обучения:
                            </h4>
                            <div className="grid gap-2">
                              {countryGroups.map((group) => (
                                <div key={group.name}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCountryGroup(group.name);
                                    }}
                                    className="w-full flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                  >
                                    <span className="font-semibold">{group.name}</span>
                                    {openCountryGroup === group.name ? (
                                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    )}
                                  </button>
                                  
                                  <AnimatePresence>
                                    {openCountryGroup === group.name && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="mt-2 ml-4 space-y-2">
                                          {group.countries.map((country) => (
                                            <div key={country.name}>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleCountry(country.name);
                                                }}
                                                className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-muted/30 transition-colors"
                                              >
                                                <div className="flex items-center gap-2">
                                                  <span className="text-xl">{country.flag}</span>
                                                  <span className="font-medium">{country.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <span className="text-xs text-muted-foreground">
                                                    {country.universities.length} университетов
                                                  </span>
                                                  {openCountry === country.name ? (
                                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                                  ) : (
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                                  )}
                                                </div>
                                              </button>

                                              <AnimatePresence>
                                                {openCountry === country.name && (
                                                  <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                  >
                                                    <div className="mt-2 ml-4 space-y-2">
                                                      {country.universities.map((uni, idx) => (
                                                        <div
                                                          key={`${uni.name}-${idx}`}
                                                          className="p-3 bg-background rounded-lg border border-border"
                                                        >
                                                          <div className="flex items-start gap-3">
                                                            <Building className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                            <div>
                                                              <span className="font-medium block">{uni.name}</span>
                                                              {uni.nameRu && (
                                                                <span className="text-sm text-muted-foreground">{uni.nameRu}</span>
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Hobbies Categories */}
                        {service.hasHobbies && (
                          <div className="mt-4 space-y-3">
                            {/* AI Hobby Test Link */}
                            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 mb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-xl">🎯</span>
                                  </div>
                                  <div>
                                    <h5 className="font-heading font-semibold">ИИ-тест по подбору хобби</h5>
                                    <p className="text-sm text-muted-foreground">Узнай, какие хобби подходят именно тебе</p>
                                  </div>
                                </div>
                                <Link
                                  to="/hobby-test"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                                >
                                  Пройти тест
                                </Link>
                              </div>
                            </div>

                            {hobbiesData.map((hobby) => (
                              <div key={hobby.category}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCategory(hobby.category);
                                  }}
                                  className="w-full flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                >
                                  <span className="font-semibold">
                                    {hobby.icon} {hobby.category}
                                  </span>
                                  {openCategory === hobby.category ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </button>
                                
                                <AnimatePresence>
                                  {openCategory === hobby.category && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-2 ml-4 space-y-2">
                                        {hobby.subcategories.map((sub) => (
                                          <div key={sub.name}>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubcategory(sub.name);
                                              }}
                                              className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-muted/30 transition-colors"
                                            >
                                              <span className="font-medium">{sub.name}</span>
                                              <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">
                                                  {sub.items.length} мест
                                                </span>
                                                {openSubcategory === sub.name ? (
                                                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                                ) : (
                                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                                )}
                                              </div>
                                            </button>

                                            <AnimatePresence>
                                              {openSubcategory === sub.name && (
                                                <motion.div
                                                  initial={{ height: 0, opacity: 0 }}
                                                  animate={{ height: "auto", opacity: 1 }}
                                                  exit={{ height: 0, opacity: 0 }}
                                                  transition={{ duration: 0.2 }}
                                                  className="overflow-hidden"
                                                >
                                                  <div className="mt-2 ml-4 space-y-2 max-h-96 overflow-y-auto">
                                                    {sub.items.map((item, idx) => (
                                                      <div
                                                        key={`${item.name}-${idx}`}
                                                        className="p-3 bg-background rounded-lg border border-border"
                                                      >
                                                        <div className="flex items-start justify-between gap-2">
                                                          <div className="flex-1">
                                                            <span className="font-medium block">{item.name}</span>
                                                            <p className="text-sm text-muted-foreground">{item.type}</p>
                                                            {item.address && (
                                                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {item.address}
                                                              </p>
                                                            )}
                                                            {item.contacts && (
                                                              <p className="text-xs text-primary mt-1">{item.contacts}</p>
                                                            )}
                                                            {item.price && (
                                                              <p className="text-xs text-muted-foreground mt-1">💰 {item.price}</p>
                                                            )}
                                                          </div>
                                                          <div className="flex flex-col gap-1">
                                                            {item.instagram && (
                                                              <a
                                                                href={item.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                                                onClick={(e) => e.stopPropagation()}
                                                              >
                                                                <ExternalLink className="w-3 h-3" />
                                                                Instagram
                                                              </a>
                                                            )}
                                                            {item.website && (
                                                              <a
                                                                href={item.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                                                onClick={(e) => e.stopPropagation()}
                                                              >
                                                                <ExternalLink className="w-3 h-3" />
                                                                Сайт
                                                              </a>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Business Courses */}
                        {service.hasBusiness && (
                          <div className="mt-4 space-y-3">
                            <div className="flex gap-2 mb-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenBusinessTab("online");
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  openBusinessTab === "online"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                              >
                                🌐 Онлайн курсы
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenBusinessTab("offline");
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  openBusinessTab === "offline"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                              >
                                🏢 Офлайн в Алматы
                              </button>
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto">
                              {openBusinessTab === "online" ? (
                                onlineCourses.map((course, idx) => (
                                  <div
                                    key={`${course.name}-${idx}`}
                                    className="p-3 bg-background rounded-lg border border-border"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <span className="font-medium block">{course.name}</span>
                                        <p className="text-sm text-muted-foreground">{course.type}</p>
                                        <p className="text-xs text-muted-foreground mt-1">💰 {course.price}</p>
                                      </div>
                                      <a
                                        href={course.contacts}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        Перейти
                                      </a>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                offlineBusinessSchools.map((school, idx) => (
                                  <div
                                    key={`${school.name}-${idx}`}
                                    className="p-3 bg-background rounded-lg border border-border"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <span className="font-medium block">{school.name}</span>
                                        <p className="text-sm text-muted-foreground">{school.type}</p>
                                        {school.address && (
                                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {school.address}
                                          </p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-1">💰 {school.price}</p>
                                      </div>
                                      {school.website && (
                                        <a
                                          href={school.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:underline flex items-center gap-1"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                          Сайт
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}

                        {/* Support Form */}
                        {service.hasSupportForm && (
                          <div className="mt-4 space-y-4">
                            <h4 className="font-heading font-semibold text-lg">
                              Напиши нам:
                            </h4>
                            <form onSubmit={handleSupportSubmit} className="space-y-3">
                              <Input
                                placeholder="Твоё имя"
                                value={supportName}
                                onChange={(e) => setSupportName(e.target.value)}
                                maxLength={100}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Input
                                type="email"
                                placeholder="Твой email"
                                value={supportEmail}
                                onChange={(e) => setSupportEmail(e.target.value)}
                                maxLength={255}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Textarea
                                placeholder="Расскажи, что тебя беспокоит или о чём хочешь поговорить..."
                                value={supportMessage}
                                onChange={(e) => setSupportMessage(e.target.value)}
                                maxLength={5000}
                                rows={4}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Button
                                type="submit"
                                disabled={isSendingSupport}
                                className="w-full ktc-gradient-bg"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {isSendingSupport ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Отправляем...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Отправить
                                  </>
                                )}
                              </Button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
