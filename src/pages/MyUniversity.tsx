import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Trash2, GraduationCap, CheckCircle2, Circle,
  Calendar as CalendarIcon, FileText, Upload, Download, Loader2, Building
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { countryGroups } from "@/data/universitiesData";

interface UserUniversity {
  id: string;
  university_name: string;
  university_name_ru: string | null;
  country: string | null;
  target_program: string | null;
  deadline: string | null;
  notes: string | null;
}

interface RequirementItem {
  id: string;
  user_university_id: string;
  title: string;
  completed: boolean;
}

interface UserDoc {
  id: string;
  user_university_id: string;
  file_name: string;
  storage_path: string;
  doc_type: string | null;
  size_bytes: number | null;
}

const DEFAULT_REQUIREMENTS = [
  "IELTS / TOEFL",
  "SAT / ACT",
  "GPA / аттестат",
  "Мотивационное письмо (Personal Statement)",
  "Рекомендательные письма",
  "Портфолио",
  "CV / Резюме",
  "Подача заявки онлайн",
  "Оплата application fee",
  "Студенческая виза",
];

const DOC_TYPES = ["CV", "Сертификат", "Портфолио", "Мотивационное письмо", "Транскрипт", "Другое"];

const MyUniversity = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [items, setItems] = useState<UserUniversity[]>([]);
  const [reqs, setReqs] = useState<RequirementItem[]>([]);
  const [docs, setDocs] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [program, setProgram] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<string>("CV");

  const [customReqOpen, setCustomReqOpen] = useState<string | null>(null);
  const [customReqTitle, setCustomReqTitle] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) loadAll();
  }, [user]);

  const loadAll = async () => {
    setLoading(true);
    const [{ data: uu }, { data: ri }, { data: dd }] = await Promise.all([
      supabase.from("user_universities").select("*").order("created_at", { ascending: false }),
      supabase.from("requirement_items").select("*").order("sort_order", { ascending: true }),
      supabase.from("user_documents").select("*").order("created_at", { ascending: false }),
    ]);
    setItems((uu as UserUniversity[]) || []);
    setReqs((ri as RequirementItem[]) || []);
    setDocs((dd as UserDoc[]) || []);
    setLoading(false);
  };

  const allUniversities = useMemo(() => {
    const list: { country: string; flag: string; name: string; nameRu?: string }[] = [];
    countryGroups.forEach((g) =>
      g.countries.forEach((c) =>
        c.universities.forEach((u) =>
          list.push({ country: c.name, flag: c.flag, name: u.name, nameRu: u.nameRu })
        )
      )
    );
    return list;
  }, []);

  const countriesList = useMemo(() => {
    const set = new Map<string, string>();
    allUniversities.forEach((u) => set.set(u.country, ""));
    return Array.from(set.keys()).sort();
  }, [allUniversities]);

  const universitiesForCountry = useMemo(
    () => allUniversities.filter((u) => u.country === selectedCountry),
    [allUniversities, selectedCountry]
  );

  const addUniversity = async () => {
    if (!user || !selectedUniversity) return;
    const uni = allUniversities.find((u) => u.name === selectedUniversity);
    if (!uni) return;

    const { data: created, error } = await supabase
      .from("user_universities")
      .insert({
        user_id: user.id,
        university_name: uni.name,
        university_name_ru: uni.nameRu || null,
        country: uni.country,
        target_program: program.trim() || null,
        deadline: deadline || null,
        notes: notes.trim() || null,
      })
      .select()
      .single();

    if (error || !created) {
      toast({ title: "Ошибка", description: error?.message, variant: "destructive" });
      return;
    }

    // Insert default checklist
    const reqRows = DEFAULT_REQUIREMENTS.map((title, idx) => ({
      user_id: user.id,
      user_university_id: created.id,
      title,
      sort_order: idx,
    }));
    await supabase.from("requirement_items").insert(reqRows);

    toast({ title: "Университет добавлен 🎓" });
    setAddOpen(false);
    setSelectedCountry(""); setSelectedUniversity(""); setProgram(""); setDeadline(""); setNotes("");
    loadAll();
  };

  const deleteUniversity = async (id: string) => {
    await supabase.from("user_universities").delete().eq("id", id);
    toast({ title: "Удалено" });
    loadAll();
  };

  const toggleReq = async (req: RequirementItem) => {
    const next = !req.completed;
    await supabase.from("requirement_items").update({ completed: next }).eq("id", req.id);
    setReqs((prev) => prev.map((r) => (r.id === req.id ? { ...r, completed: next } : r)));
  };

  const deleteReq = async (id: string) => {
    await supabase.from("requirement_items").delete().eq("id", id);
    setReqs((prev) => prev.filter((r) => r.id !== id));
  };

  const addCustomReq = async (uuId: string) => {
    if (!user || !customReqTitle.trim()) return;
    const { data, error } = await supabase
      .from("requirement_items")
      .insert({
        user_id: user.id,
        user_university_id: uuId,
        title: customReqTitle.trim(),
        sort_order: 999,
      })
      .select()
      .single();
    if (error || !data) {
      toast({ title: "Ошибка", description: error?.message, variant: "destructive" });
      return;
    }
    setReqs((prev) => [...prev, data as RequirementItem]);
    setCustomReqTitle("");
    setCustomReqOpen(null);
  };

  const handleUpload = async (uuId: string, file: File) => {
    if (!user) return;
    setUploadingFor(uuId);
    try {
      const path = `${user.id}/${uuId}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage
        .from("university-docs")
        .upload(path, file);
      if (upErr) throw upErr;

      const { error: dbErr } = await supabase.from("user_documents").insert({
        user_id: user.id,
        user_university_id: uuId,
        file_name: file.name,
        storage_path: path,
        doc_type: uploadType,
        size_bytes: file.size,
      });
      if (dbErr) throw dbErr;

      toast({ title: "Файл загружен 📄" });
      loadAll();
    } catch (e: any) {
      toast({ title: "Ошибка загрузки", description: e.message, variant: "destructive" });
    } finally {
      setUploadingFor(null);
    }
  };

  const downloadDoc = async (doc: UserDoc) => {
    const { data, error } = await supabase.storage
      .from("university-docs")
      .createSignedUrl(doc.storage_path, 60);
    if (error || !data) {
      toast({ title: "Не удалось скачать", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const deleteDoc = async (doc: UserDoc) => {
    await supabase.storage.from("university-docs").remove([doc.storage_path]);
    await supabase.from("user_documents").delete().eq("id", doc.id);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
    toast({ title: "Файл удалён" });
  };

  const computeProgress = (uuId: string) => {
    const list = reqs.filter((r) => r.user_university_id === uuId);
    if (list.length === 0) return 0;
    const done = list.filter((r) => r.completed).length;
    return Math.round((done / list.length) * 100);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 ktc-gradient-text">
            Мой университет
          </h1>
          <p className="text-muted-foreground">Твой персональный трек поступления</p>
        </motion.div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="mb-6">
              <Plus className="w-5 h-5" /> Добавить университет
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Выбор университета</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Страна</Label>
                <Select value={selectedCountry} onValueChange={(v) => { setSelectedCountry(v); setSelectedUniversity(""); }}>
                  <SelectTrigger><SelectValue placeholder="Выбери страну" /></SelectTrigger>
                  <SelectContent>
                    {countriesList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {selectedCountry && (
                <div>
                  <Label>Университет</Label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger><SelectValue placeholder="Выбери университет" /></SelectTrigger>
                    <SelectContent>
                      {universitiesForCountry.map((u) => (
                        <SelectItem key={u.name} value={u.name}>
                          {u.name}{u.nameRu ? ` — ${u.nameRu}` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label>Программа / специальность</Label>
                <Input value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Например, Computer Science" />
              </div>
              <div>
                <Label>Дедлайн подачи</Label>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
              <div>
                <Label>Заметки</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addUniversity} disabled={!selectedUniversity}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {items.length === 0 ? (
          <div className="ktc-card p-12 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Пока нет выбранных университетов. Добавь первый!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {items.map((uu) => {
                const progress = computeProgress(uu.id);
                const myReqs = reqs.filter((r) => r.user_university_id === uu.id);
                const myDocs = docs.filter((d) => d.user_university_id === uu.id);
                return (
                  <motion.div
                    key={uu.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ktc-card p-6"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Building className="w-5 h-5 text-primary flex-shrink-0" />
                          <h3 className="text-xl font-heading font-semibold">{uu.university_name}</h3>
                        </div>
                        {uu.university_name_ru && (
                          <p className="text-sm text-muted-foreground">{uu.university_name_ru}</p>
                        )}
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          {uu.country && <span>🌍 {uu.country}</span>}
                          {uu.target_program && <span>🎯 {uu.target_program}</span>}
                          {uu.deadline && (
                            <span className="inline-flex items-center gap-1">
                              <CalendarIcon className="w-3.5 h-3.5" />
                              до {new Date(uu.deadline).toLocaleDateString("ru-RU")}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteUniversity(uu.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold">Готовность к поступлению</span>
                        <span className="text-sm font-bold text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      {progress >= 80 && (
                        <p className="text-xs text-primary mt-2">🔥 Отличный прогресс! Финишная прямая</p>
                      )}
                    </div>

                    {/* Checklist */}
                    <div className="mb-5">
                      <h4 className="font-heading font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> Чеклист требований
                      </h4>
                      <div className="space-y-1.5">
                        {myReqs.map((r) => (
                          <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                            <button onClick={() => toggleReq(r)} className="flex-shrink-0">
                              {r.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                              )}
                            </button>
                            <span className={`flex-1 text-sm ${r.completed ? "line-through text-muted-foreground" : ""}`}>
                              {r.title}
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => deleteReq(r.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {customReqOpen === uu.id ? (
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={customReqTitle}
                            onChange={(e) => setCustomReqTitle(e.target.value)}
                            placeholder="Своё требование"
                            onKeyDown={(e) => e.key === "Enter" && addCustomReq(uu.id)}
                          />
                          <Button size="sm" onClick={() => addCustomReq(uu.id)}>Добавить</Button>
                          <Button size="sm" variant="outline" onClick={() => { setCustomReqOpen(null); setCustomReqTitle(""); }}>×</Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => setCustomReqOpen(uu.id)}>
                          <Plus className="w-4 h-4" /> Своё требование
                        </Button>
                      )}
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-heading font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" /> Документы
                      </h4>
                      <div className="space-y-1.5 mb-3">
                        {myDocs.length === 0 && (
                          <p className="text-sm text-muted-foreground">Пока нет файлов</p>
                        )}
                        {myDocs.map((d) => (
                          <div key={d.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                            <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">{d.file_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {d.doc_type} {d.size_bytes ? `· ${(d.size_bytes / 1024).toFixed(0)} KB` : ""}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => downloadDoc(d)}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteDoc(d)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Select value={uploadType} onValueChange={setUploadType}>
                          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {DOC_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <label className="inline-flex">
                          <input
                            type="file"
                            className="hidden"
                            disabled={uploadingFor === uu.id}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleUpload(uu.id, f);
                              e.target.value = "";
                            }}
                          />
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                            {uploadingFor === uu.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Загрузить файл
                          </span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUniversity;
