import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Loader2 } from "lucide-react";
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
    text: "Как ты предпочитаешь проводить свободное время?",
    options: [
      "В одиночестве, занимаясь чем-то творческим",
      "С друзьями, активно двигаясь",
      "Изучая что-то новое онлайн",
      "На свежем воздухе, исследуя мир"
    ]
  },
  {
    id: 2,
    text: "Какой темп активности тебе ближе?",
    options: [
      "Спокойный, медитативный",
      "Динамичный, энергичный",
      "Умеренный, с возможностью отдыха",
      "Переменный — люблю разнообразие"
    ]
  },
  {
    id: 3,
    text: "Что тебя больше привлекает?",
    options: [
      "Создавать что-то руками",
      "Выражать эмоции через движение или звук",
      "Решать сложные задачи и головоломки",
      "Соревноваться и достигать результатов"
    ]
  },
  {
    id: 4,
    text: "Как ты относишься к работе в команде?",
    options: [
      "Предпочитаю работать один",
      "Люблю командные активности",
      "Мне комфортно в небольших группах",
      "Зависит от задачи и настроения"
    ]
  },
  {
    id: 5,
    text: "Какая среда тебе ближе?",
    options: [
      "Тихая студия или мастерская",
      "Спортзал или танцевальный класс",
      "Компьютер и технологии",
      "Природа и открытые пространства"
    ]
  },
  {
    id: 6,
    text: "Что ты хочешь развивать в себе?",
    options: [
      "Креативность и воображение",
      "Физическую форму и координацию",
      "Логическое мышление и навыки",
      "Уверенность и коммуникабельность"
    ]
  },
  {
    id: 7,
    text: "Как ты относишься к публичным выступлениям?",
    options: [
      "Избегаю их всеми способами",
      "Обожаю быть в центре внимания",
      "Могу, если нужно, но не ищу",
      "Нравится выступать в своей нише"
    ]
  },
  {
    id: 8,
    text: "Какой результат тебе важнее?",
    options: [
      "Процесс важнее результата",
      "Конкретные достижения и награды",
      "Новые знания и навыки",
      "Хорошее настроение и эмоции"
    ]
  }
];

interface Recommendation {
  category: string;
  subcategory: string;
  reason: string;
  tips: string;
}

const categoryIcons: Record<string, string> = {
  "Творчество": "🎨",
  "Музыка": "🎵",
  "Танцы": "💃",
  "Спорт": "⚽",
  "Технологии": "💻",
  "Языки и общение": "🗣️",
  "Наука и исследования": "🔬",
  "Фотография и видео": "📸",
};

const HobbyTest = () => {
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
      const { data, error } = await supabase.functions.invoke("hobby-ai-test", {
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
              🎯 ИИ-тест по подбору хобби
            </h1>
            <p className="text-muted-foreground">
              Ответь на 8 вопросов, и ИИ подберёт тебе идеальные хобби
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
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold mb-2">
                    ИИ подобрал для тебя хобби! 🎉
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
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {categoryIcons[rec.category] || "🎯"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">{rec.category}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            index === 0 ? "bg-primary/20 text-primary" : "bg-muted"
                          }`}>
                            #{index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2">
                          {rec.subcategory}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {rec.reason}
                        </p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">
                            <span className="font-medium">💡 Совет:</span> {rec.tips}
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

export default HobbyTest;
