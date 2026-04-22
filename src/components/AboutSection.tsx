import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Rocket, MessageCircle, Star } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Найди своё направление",
    description: "Понять, какие профессии и направления тебе подходят",
  },
  {
    icon: Rocket,
    title: "Возможности по всему миру",
    description: "Найти обучение, стажировки и возможности в разных странах",
  },
  {
    icon: Star,
    title: "Попробуй новое",
    description: "Попробовать себя в хобби и новых сферах",
  },
  {
    icon: Users,
    title: "Мероприятия и проекты",
    description: "Участвовать в мероприятиях, проектах и волонтёрстве",
  },
  {
    icon: Heart,
    title: "Найди своих людей",
    description: "Найти людей с похожими интересами и ценностями",
  },
  {
    icon: MessageCircle,
    title: "Поддержка",
    description: "Быть услышанным и получить поддержку",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Кто мы?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-primary">KTC (KazTeenCommunity)</span> — это не просто онлайн платформа.
            Это сообщество подростков, которые ищут себя, растут и поддерживают друг друга.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="ktc-card p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <p className="text-lg text-foreground/90 leading-relaxed">
            В KTC важно не «кем ты должен быть», а{" "}
            <span className="font-semibold text-primary">кем ты хочешь стать</span>.
            Здесь можно задавать вопросы, сомневаться, пробовать и ошибаться — и всё равно двигаться вперёд.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Мы специально для подростков, собрали в одном месте возможности,
            чтобы саморазвитие было не одиночным путём, а{" "}
            <span className="font-semibold text-primary">общим движением</span>.
          </p>
          <div className="pt-6">
            <p className="text-2xl font-heading font-bold text-primary">
              Добро пожаловать в KTC.
            </p>
            <p className="text-xl text-muted-foreground mt-2">
              Здесь начинается твой рост 🌱
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
