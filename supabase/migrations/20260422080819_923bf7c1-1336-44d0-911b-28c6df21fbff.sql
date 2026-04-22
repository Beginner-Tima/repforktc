-- user_universities
CREATE TABLE public.user_universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  university_name TEXT NOT NULL,
  university_name_ru TEXT,
  country TEXT,
  target_program TEXT,
  deadline DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "view own uu" ON public.user_universities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own uu" ON public.user_universities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own uu" ON public.user_universities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own uu" ON public.user_universities FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_uu_updated_at BEFORE UPDATE ON public.user_universities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- requirement_items
CREATE TABLE public.requirement_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_university_id UUID NOT NULL REFERENCES public.user_universities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.requirement_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "view own ri" ON public.requirement_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own ri" ON public.requirement_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own ri" ON public.requirement_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own ri" ON public.requirement_items FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_ri_uu ON public.requirement_items(user_university_id);

-- user_documents
CREATE TABLE public.user_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_university_id UUID NOT NULL REFERENCES public.user_universities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  doc_type TEXT,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "view own docs" ON public.user_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own docs" ON public.user_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own docs" ON public.user_documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own docs" ON public.user_documents FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_docs_uu ON public.user_documents(user_university_id);

-- Storage bucket (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('university-docs', 'university-docs', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "users select own university docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'university-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users insert own university docs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'university-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users delete own university docs"
ON storage.objects FOR DELETE
USING (bucket_id = 'university-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users update own university docs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'university-docs' AND auth.uid()::text = (storage.foldername(name))[1]);