-- 1. Fix profiles table - restrict to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles FOR SELECT TO authenticated
USING (true);

-- 2. Add UPDATE and DELETE policies for messages
CREATE POLICY "Users can update their own messages"
ON public.messages FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages"
ON public.messages FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- 3. Add content length constraint for messages
ALTER TABLE public.messages ADD CONSTRAINT messages_content_length 
CHECK (char_length(content) BETWEEN 1 AND 2000);