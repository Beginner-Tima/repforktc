import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    categories: string[];
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Как ты предпочитаешь проводить свободное время?",
    options: [
      { text: "Читаю книги, изучаю новое", categories: ["наука", "образование"] },
      { text: "Рисую, занимаюсь творчеством", categories: ["искусство", "дизайн"] },
      { text: "Общаюсь с друзьями, организую мероприятия", categories: ["коммуникации", "менеджмент"] },
      { text: "Решаю головоломки, программирую", categories: ["IT", "инженерия"] }
    ]
  },
  {
    id: 2,
    text: "Какой предмет в школе тебе нравится больше всего?",
    options: [
      { text: "Математика и физика", categories: ["IT", "инженерия", "наука"] },
      { text: "Литература и языки", categories: ["гуманитарные науки", "журналистика"] },
      { text: "Биология и химия", categories: ["медицина", "наука"] },
      { text: "История и обществознание", categories: ["право", "политология"] }
    ]
  },
  {
    id: 3,
    text: "В командной работе ты обычно...",
    options: [
      { text: "Берешь на себя роль лидера", categories: ["менеджмент", "предпринимательство"] },
      { text: "Генерируешь идеи", categories: ["маркетинг", "дизайн"] },
      { text: "Анализируешь информацию", categories: ["аналитика", "финансы"] },
      { text: "Помогаешь решать конфликты", categories: ["психология", "HR"] }
    ]
  },
  {
    id: 4,
    text: "Какая рабочая среда тебе ближе?",
    options: [
      { text: "Офис с командой", categories: ["менеджмент", "маркетинг"] },
      { text: "Удалённая работа из дома", categories: ["IT", "дизайн"] },
      { text: "Лаборатория или исследовательский центр", categories: ["наука", "медицина"] },
      { text: "Работа с людьми (школа, больница)", categories: ["образование", "медицина", "психология"] }
    ]
  },
  {
    id: 5,
    text: "Что для тебя важнее в работе?",
    options: [
      { text: "Высокая зарплата", categories: ["финансы", "IT", "право"] },
      { text: "Творческая свобода", categories: ["искусство", "дизайн", "журналистика"] },
      { text: "Помощь людям", categories: ["медицина", "психология", "образование"] },
      { text: "Стабильность и карьерный рост", categories: ["менеджмент", "госслужба"] }
    ]
  },
  {
    id: 6,
    text: "Как ты относишься к публичным выступлениям?",
    options: [
      { text: "Люблю выступать перед публикой", categories: ["журналистика", "маркетинг", "образование"] },
      { text: "Могу, если нужно", categories: ["менеджмент", "право"] },
      { text: "Предпочитаю работать за кулисами", categories: ["IT", "аналитика", "дизайн"] },
      { text: "Мне комфортнее в небольших группах", categories: ["психология", "наука"] }
    ]
  },
  {
    id: 7,
    text: "Какой тип задач тебе нравится больше?",
    options: [
      { text: "Логические и аналитические", categories: ["IT", "финансы", "инженерия"] },
      { text: "Творческие и визуальные", categories: ["дизайн", "искусство"] },
      { text: "Социальные и коммуникативные", categories: ["HR", "психология", "маркетинг"] },
      { text: "Исследовательские и экспериментальные", categories: ["наука", "медицина"] }
    ]
  },
  {
    id: 8,
    text: "Как ты принимаешь решения?",
    options: [
      { text: "Логически анализирую факты", categories: ["аналитика", "финансы", "право"] },
      { text: "Доверяю интуиции", categories: ["искусство", "предпринимательство"] },
      { text: "Советуюсь с другими", categories: ["HR", "психология"] },
      { text: "Ищу нестандартные решения", categories: ["IT", "дизайн", "маркетинг"] }
    ]
  },
  {
    id: 9,
    text: "Что тебя мотивирует больше всего?",
    options: [
      { text: "Признание и успех", categories: ["предпринимательство", "маркетинг"] },
      { text: "Новые знания и открытия", categories: ["наука", "образование"] },
      { text: "Благодарность людей", categories: ["медицина", "психология", "образование"] },
      { text: "Решение сложных задач", categories: ["IT", "инженерия"] }
    ]
  },
  {
    id: 10,
    text: "Каким ты видишь своё будущее через 10 лет?",
    options: [
      { text: "Руководителем своей компании", categories: ["предпринимательство", "менеджмент"] },
      { text: "Экспертом в своей области", categories: ["наука", "IT", "медицина"] },
      { text: "Известным творческим человеком", categories: ["искусство", "дизайн", "журналистика"] },
      { text: "Человеком, который изменил чьи-то жизни", categories: ["психология", "образование", "медицина"] }
    ]
  }
];

const careerDescriptions: Record<string, { title: string; description: string; careers: string[] }> = {
  "IT": {
    title: "💻 IT и программирование",
    description: "Ты склонен к логическому мышлению и решению сложных задач. IT-сфера предлагает множество возможностей от разработки до аналитики данных.",
    careers: ["Программист", "Data Scientist", "UX/UI дизайнер", "DevOps инженер", "Системный аналитик"]
  },
  "дизайн": {
    title: "🎨 Дизайн и креатив",
    description: "У тебя творческое мышление и хороший вкус. Дизайн позволяет воплощать идеи в визуальную форму.",
    careers: ["Графический дизайнер", "Веб-дизайнер", "Иллюстратор", "Арт-директор", "Motion дизайнер"]
  },
  "медицина": {
    title: "⚕️ Медицина и здравоохранение",
    description: "Ты хочешь помогать людям и интересуешься биологией. Медицина — это благородная и востребованная профессия.",
    careers: ["Врач", "Медсестра", "Фармацевт", "Психотерапевт", "Биотехнолог"]
  },
  "менеджмент": {
    title: "📊 Менеджмент и управление",
    description: "Ты прирождённый лидер с организаторскими способностями. Управление командами и проектами — твоя стихия.",
    careers: ["Проектный менеджер", "HR-менеджер", "Бизнес-аналитик", "Операционный директор", "CEO"]
  },
  "психология": {
    title: "🧠 Психология и социальная работа",
    description: "Ты эмпатичен и хорошо понимаешь людей. Психология поможет тебе помогать другим справляться с трудностями.",
    careers: ["Психолог", "Коуч", "Социальный работник", "HR-специалист", "Семейный терапевт"]
  },
  "маркетинг": {
    title: "📣 Маркетинг и реклама",
    description: "Ты креативен и понимаешь, как привлечь внимание людей. Маркетинг объединяет творчество и аналитику.",
    careers: ["Маркетолог", "SMM-специалист", "Копирайтер", "Бренд-менеджер", "Таргетолог"]
  },
  "наука": {
    title: "🔬 Наука и исследования",
    description: "Тебя привлекают открытия и исследования. Научная карьера позволит тебе расширять границы знаний.",
    careers: ["Учёный-исследователь", "Лаборант", "Преподаватель ВУЗа", "Научный журналист", "R&D специалист"]
  },
  "образование": {
    title: "📚 Образование и просвещение",
    description: "Ты любишь делиться знаниями и помогать другим учиться. Педагогика — это призвание для терпеливых и заботливых.",
    careers: ["Учитель", "Преподаватель", "Репетитор", "Методист", "Тренер"]
  },
  "предпринимательство": {
    title: "🚀 Предпринимательство",
    description: "Ты амбициозен и готов рисковать ради своих идей. Создание бизнеса — это путь для смелых и целеустремлённых.",
    careers: ["Стартапер", "Владелец бизнеса", "Инвестор", "Консультант", "Фрилансер"]
  },
  "право": {
    title: "⚖️ Право и юриспруденция",
    description: "Ты справедлив и умеешь аргументировать свою позицию. Юриспруденция требует аналитического ума и внимания к деталям.",
    careers: ["Юрист", "Адвокат", "Нотариус", "Судья", "Корпоративный юрист"]
  },
  "финансы": {
    title: "💰 Финансы и экономика",
    description: "Ты хорошо работаешь с цифрами и понимаешь экономические процессы. Финансовая сфера предлагает стабильность и высокий доход.",
    careers: ["Финансовый аналитик", "Бухгалтер", "Экономист", "Трейдер", "Финансовый консультант"]
  },
  "инженерия": {
    title: "⚙️ Инженерия и технологии",
    description: "Ты любишь понимать, как устроены вещи, и создавать новое. Инженерия — это сочетание науки и практики.",
    careers: ["Инженер", "Архитектор", "Конструктор", "Робототехник", "Энергетик"]
  },
  "искусство": {
    title: "🎭 Искусство и культура",
    description: "Ты творческая личность с богатым воображением. Искусство позволяет выражать себя и вдохновлять других.",
    careers: ["Художник", "Музыкант", "Актёр", "Режиссёр", "Куратор выставок"]
  },
  "журналистика": {
    title: "✍️ Журналистика и медиа",
    description: "Ты любишь рассказывать истории и узнавать новое. Журналистика — это динамичная профессия для любознательных.",
    careers: ["Журналист", "Редактор", "Блогер", "Видеограф", "Подкастер"]
  }
};

const CareerTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {};
    
    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      selectedOption.categories.forEach(category => {
        scores[category] = (scores[category] || 0) + 1;
      });
    });

    setCategoryScores(scores);
    setShowResult(true);
  };

  const getTopCategories = () => {
    const sorted = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setCategoryScores({});
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canFinish = answers.length === questions.length;

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
              Профориентационный тест
            </h1>
            <p className="text-muted-foreground">
              Ответь на 10 вопросов и узнай, какие профессии тебе подходят
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
                          answers[currentQuestion] === index
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>

                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      onClick={calculateResults}
                      disabled={!canFinish}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Узнать результат
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      disabled={answers[currentQuestion] === undefined}
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
                    Твои результаты
                  </h2>
                  <p className="text-muted-foreground">
                    На основе твоих ответов мы определили наиболее подходящие сферы
                  </p>
                </div>

                {getTopCategories().map(([category, score], index) => {
                  const info = careerDescriptions[category];
                  if (!info) return null;
                  
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="ktc-card p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                          index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold mb-2">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {info.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {info.careers.map((career) => (
                              <span
                                key={career}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

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
                  ⚠️ Это примерный тест. Для более точного определения профессии рекомендуем обратиться к профессиональному карьерному консультанту.
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

export default CareerTest;
