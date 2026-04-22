import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Loader2, GraduationCap, MapPin, Star, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Какое направление обучения тебя интересует больше всего?",
    options: [
      "IT, программирование, технологии",
      "Бизнес, экономика, менеджмент",
      "Медицина, биология, здравоохранение",
      "Инженерия, архитектура, строительство",
      "Искусство, дизайн, творческие профессии",
      "Право, политология, международные отношения"
    ]
  },
  {
    id: 2,
    text: "Какой бюджет на обучение ты рассматриваешь?",
    options: [
      "До $5,000 в год (бесплатное или недорогое)",
      "$5,000 - $15,000 в год",
      "$15,000 - $30,000 в год",
      "Более $30,000 в год (топовые университеты)",
      "Рассчитываю на грант или стипендию"
    ]
  },
  {
    id: 3,
    text: "На каком языке ты готов учиться?",
    options: [
      "Английский",
      "Русский",
      "Немецкий",
      "Готов выучить новый язык",
      "Предпочитаю программы с несколькими языками"
    ]
  },
  {
    id: 4,
    text: "Какой климат тебе предпочтительнее?",
    options: [
      "Тёплый, солнечный (Средиземноморье, Азия)",
      "Умеренный, четыре сезона (Центральная Европа)",
      "Прохладный (Скандинавия, Канада)",
      "Климат не имеет значения"
    ]
  },
  {
    id: 5,
    text: "Какой размер города тебе ближе?",
    options: [
      "Мегаполис (Лондон, Нью-Йорк, Токио)",
      "Крупный город (Мюнхен, Барселона, Сеул)",
      "Средний город с уютной атмосферой",
      "Небольшой университетский городок"
    ]
  },
  {
    id: 6,
    text: "Что для тебя важнее всего в университете?",
    options: [
      "Высокий рейтинг и престиж",
      "Практическая направленность и стажировки",
      "Исследовательские возможности",
      "Студенческая жизнь и комьюнити",
      "Возможность работать во время учёбы"
    ]
  },
  {
    id: 7,
    text: "Какие у тебя планы после окончания университета?",
    options: [
      "Остаться и работать в стране обучения",
      "Вернуться в Казахстан",
      "Работать в международной компании",
      "Открыть свой бизнес",
      "Продолжить обучение (магистратура, PhD)"
    ]
  },
  {
    id: 8,
    text: "Насколько важна культурная близость?",
    options: [
      "Хочу быть среди похожей культуры",
      "Хочу полностью погрузиться в новую культуру",
      "Предпочитаю место с большим казахстанским/русскоязычным сообществом",
      "Культура не важна, главное — качество образования"
    ]
  },
  {
    id: 9,
    text: "Какой у тебя уровень академической подготовки?",
    options: [
      "Отличник, высокие баллы ЕНТ/SAT",
      "Хорошист, стабильные результаты",
      "Средние оценки, но есть сильные стороны",
      "Готов усердно готовиться к поступлению"
    ]
  },
  {
    id: 10,
    text: "Что тебя больше всего привлекает в зарубежном образовании?",
    options: [
      "Качество образования и ресурсы",
      "Международный опыт и связи",
      "Возможность эмиграции",
      "Личностное развитие и независимость",
      "Карьерные перспективы"
    ]
  }
];

interface Recommendation {
  university: string;
  universityRu: string;
  country: string;
  countryFlag: string;
  reason: string;
  strengths: string[];
  tips: string;
}

const UniversityTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: questions[currentQuestion].text,
      answer: questions[currentQuestion].options[selectedOption]
    };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers[currentQuestion - 1];
      if (prevAnswer) {
        const optionIndex = questions[currentQuestion - 1].options.indexOf(prevAnswer.answer);
        setSelectedOption(optionIndex >= 0 ? optionIndex : null);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null) return;

    const finalAnswers = [...answers];
    finalAnswers[currentQuestion] = {
      question: questions[currentQuestion].text,
      answer: questions[currentQuestion].options[selectedOption]
    };

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("university-ai-test", {
        body: { answers: finalAnswers }
      });

      if (error) {
        throw error;
      }

      if (data.recommendations) {
        setRecommendations(data.recommendations);
        setShowResult(true);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error getting recommendations:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось получить рекомендации. Попробуйте ещё раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setRecommendations([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              🎓 ИИ-тест по подбору университета
            </h1>
            <p className="text-muted-foreground">
              Ответь на 10 вопросов, и ИИ подберёт тебе идеальные университеты
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="ktc-card p-6"
                >
                  <h2 className="text-xl font-heading font-semibold mb-6">
                    {questions[currentQuestion].text}
                  </h2>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedOption === index
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>

                  {isLastQuestion ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedOption === null || isLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ИИ анализирует...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Получить рекомендации
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={selectedOption === null}
                    >
                      Далее
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="ktc-card p-6 text-center">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold mb-2">
                    ИИ подобрал для тебя университеты! 🎉
                  </h2>
                  <p className="text-muted-foreground">
                    На основе твоих ответов мы нашли идеальные варианты
                  </p>
                </div>

                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="ktc-card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {rec.countryFlag || "🎓"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {rec.country}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            index === 0 ? "bg-primary/20 text-primary" : "bg-muted"
                          }`}>
                            #{index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-1">
                          {rec.university}
                        </h3>
                        {rec.universityRu && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {rec.universityRu}
                          </p>
                        )}
                        <p className="text-foreground/80 mb-4">
                          {rec.reason}
                        </p>
                        
                        {rec.strengths && rec.strengths.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 text-primary" />
                              <span className="font-medium text-sm">Сильные стороны:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {rec.strengths.map((strength, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-muted rounded-full text-sm"
                                >
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span><span className="font-medium">Совет:</span> {rec.tips}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex gap-4 justify-center mt-8">
                  <Button variant="outline" onClick={resetTest}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Пройти заново
                  </Button>
                  <Button onClick={() => navigate("/")}>
                    На главную
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  🤖 Рекомендации сгенерированы искусственным интеллектом на основе твоих ответов
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UniversityTest;
