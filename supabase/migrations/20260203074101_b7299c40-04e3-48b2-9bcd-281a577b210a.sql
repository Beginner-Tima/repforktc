-- Fix: chat_rooms should only be visible to authenticated users
DROP POLICY IF EXISTS "Chat rooms are viewable by everyone" ON public.chat_rooms;

CREATE POLICY "Chat rooms are viewable by authenticated users only"
ON public.chat_rooms
FOR SELECT
USING (auth.role() = 'authenticated');