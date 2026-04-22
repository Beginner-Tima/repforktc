import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Target, CheckCircle2, Circle, Calendar as CalendarIcon, Flag, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  deadline: string | null;
  progress: number;
}

interface Task {
  id: string;
  goal_id: string | null;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
}

const CATEGORIES = ["Учёба", "Портфолио", "Экзамены", "Спорт", "Хобби", "Карьера", "Другое"];
const PRIORITIES = [
  { value: "low", label: "Низкий", color: "text-muted-foreground" },
  { value: "medium", label: "Средний", color: "text-primary" },
  { value: "high", label: "Высокий", color: "text-destructive" },
];

const Planner = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);

  // Goal form
  const [gTitle, setGTitle] = useState("");
  const [gDesc, setGDesc] = useState("");
  const [gCategory, setGCategory] = useState<string>("Учёба");
  const [gDeadline, setGDeadline] = useState("");

  // Task form
  const [tTitle, setTTitle] = useState("");
  const [tPriority, setTPriority] = useState("medium");
  const [tDue, setTDue] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const [{ data: g }, { data: t }] = await Promise.all([
      supabase.from("goals").select("*").order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").order("created_at", { ascending: true }),
    ]);
    setGoals((g as Goal[]) || []);
    setTasks((t as Task[]) || []);
    setLoading(false);
  };

  const recalcProgress = async (goalId: string) => {
    const goalTasks = tasks.filter((t) => t.goal_id === goalId);
    if (goalTasks.length === 0) return;
    const done = goalTasks.filter((t) => t.status === "done").length;
    const progress = Math.round((done / goalTasks.length) * 100);
    await supabase.from("goals").update({ progress }).eq("id", goalId);
  };

  const createGoal = async () => {
    if (!gTitle.trim() || !user) return;
    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title: gTitle.trim(),
      description: gDesc.trim() || null,
      category: gCategory,
      deadline: gDeadline || null,
    });
    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
      return;
    }
    setGTitle(""); setGDesc(""); setGDeadline(""); setGCategory("Учёба");
    setGoalDialogOpen(false);
    toast({ title: "Цель создана 🎯" });
    loadData();
  };

  const deleteGoal = async (id: string) => {
    await supabase.from("goals").delete().eq("id", id);
    toast({ title: "Цель удалена" });
    loadData();
  };

  const openTaskDialog = (goalId: string) => {
    setActiveGoalId(goalId);
    setTaskDialogOpen(true);
  };

  const createTask = async () => {
    if (!tTitle.trim() || !user) return;
    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      goal_id: activeGoalId,
      title: tTitle.trim(),
      priority: tPriority,
      due_date: tDue || null,
    });
    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
      return;
    }
    setTTitle(""); setTPriority("medium"); setTDue("");
    setTaskDialogOpen(false);
    await loadData();
    if (activeGoalId) await recalcProgress(activeGoalId);
    loadData();
  };

  const toggleTask = async (task: Task) => {
    const newStatus = task.status === "done" ? "pending" : "done";
    await supabase.from("tasks").update({ status: newStatus }).eq("id", task.id);
    const updated = tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t));
    setTasks(updated);
    if (task.goal_id) {
      const goalTasks = updated.filter((t) => t.goal_id === task.goal_id);
      const done = goalTasks.filter((t) => t.status === "done").length;
      const progress = goalTasks.length ? Math.round((done / goalTasks.length) * 100) : 0;
      await supabase.from("goals").update({ progress }).eq("id", task.goal_id);
      setGoals((prev) => prev.map((g) => (g.id === task.goal_id ? { ...g, progress } : g)));
    }
  };

  const deleteTask = async (task: Task) => {
    await supabase.from("tasks").delete().eq("id", task.id);
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    if (task.goal_id) {
      const goalTasks = updated.filter((t) => t.goal_id === task.goal_id);
      const done = goalTasks.filter((t) => t.status === "done").length;
      const progress = goalTasks.length ? Math.round((done / goalTasks.length) * 100) : 0;
      await supabase.from("goals").update({ progress }).eq("id", task.goal_id);
      setGoals((prev) => prev.map((g) => (g.id === task.goal_id ? { ...g, progress } : g)));
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Stats
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const overallProgress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 ktc-gradient-text">
            Умный планер
          </h1>
          <p className="text-muted-foreground">Цели, задачи и твой прогресс в одном месте</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="ktc-card p-5">
            <div className="text-sm text-muted-foreground mb-1">Целей</div>
            <div className="text-3xl font-bold">{goals.length}</div>
          </div>
          <div className="ktc-card p-5">
            <div className="text-sm text-muted-foreground mb-1">Задач выполнено</div>
            <div className="text-3xl font-bold">{doneTasks} / {totalTasks}</div>
          </div>
          <div className="ktc-card p-5">
            <div className="text-sm text-muted-foreground mb-2">Общий прогресс</div>
            <Progress value={overallProgress} className="h-2 mb-1" />
            <div className="text-sm font-semibold">{overallProgress}%</div>
          </div>
        </div>

        {/* Add goal */}
        <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="mb-6">
              <Plus className="w-5 h-5" /> Новая цель
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать цель</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input value={gTitle} onChange={(e) => setGTitle(e.target.value)} placeholder="Например, поступить в KBTU" />
              </div>
              <div>
                <Label>Описание (необязательно)</Label>
                <Textarea value={gDesc} onChange={(e) => setGDesc(e.target.value)} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Категория</Label>
                  <Select value={gCategory} onValueChange={setGCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Дедлайн</Label>
                  <Input type="date" value={gDeadline} onChange={(e) => setGDeadline(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createGoal} disabled={!gTitle.trim()}>Создать</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Goals list */}
        {goals.length === 0 ? (
          <div className="ktc-card p-12 text-center">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Пока нет целей. Создай первую!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {goals.map((goal) => {
                const goalTasks = tasks.filter((t) => t.goal_id === goal.id);
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ktc-card p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Target className="w-5 h-5 text-primary flex-shrink-0" />
                          <h3 className="text-lg font-heading font-semibold">{goal.title}</h3>
                          {goal.category && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {goal.category}
                            </span>
                          )}
                        </div>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                        )}
                        {goal.deadline && (
                          <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            до {new Date(goal.deadline).toLocaleDateString("ru-RU")}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Прогресс</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="space-y-2 mb-3">
                      {goalTasks.map((task) => {
                        const prio = PRIORITIES.find((p) => p.value === task.priority);
                        return (
                          <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                            <button onClick={() => toggleTask(task)} className="flex-shrink-0">
                              {task.status === "done" ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                                {task.title}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className={`inline-flex items-center gap-1 ${prio?.color}`}>
                                  <Flag className="w-3 h-3" /> {prio?.label}
                                </span>
                                {task.due_date && (
                                  <span>· {new Date(task.due_date).toLocaleDateString("ru-RU")}</span>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteTask(task)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    <Button variant="outline" size="sm" onClick={() => openTaskDialog(goal.id)}>
                      <Plus className="w-4 h-4" /> Добавить задачу
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Task dialog */}
        <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая задача</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input value={tTitle} onChange={(e) => setTTitle(e.target.value)} placeholder="Например, подготовить эссе" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Приоритет</Label>
                  <Select value={tPriority} onValueChange={setTPriority}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Дедлайн</Label>
                  <Input type="date" value={tDue} onChange={(e) => setTDue(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createTask} disabled={!tTitle.trim()}>Создать</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Planner;
