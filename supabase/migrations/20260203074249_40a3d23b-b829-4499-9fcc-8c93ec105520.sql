-- Create room_members table for room access control
CREATE TABLE public.room_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (room_id, user_id)
);

-- Enable RLS
ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;

-- RLS policies for room_members
CREATE POLICY "Users can view room memberships"
ON public.room_members
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can join rooms"
ON public.room_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms"
ON public.room_members
FOR DELETE
USING (auth.uid() = user_id);

-- Update messages SELECT policy to check room membership
DROP POLICY IF EXISTS "Messages are viewable by authenticated users only" ON public.messages;

CREATE POLICY "Users can view messages in rooms they joined"
ON public.messages
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.room_members
        WHERE room_members.room_id = messages.room_id
        AND room_members.user_id = auth.uid()
    )
);

-- Update messages INSERT policy to check room membership
DROP POLICY IF EXISTS "Users can insert their own messages" ON public.messages;

CREATE POLICY "Users can send messages in rooms they joined"
ON public.messages
FOR INSERT
WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
        SELECT 1 FROM public.room_members
        WHERE room_members.room_id = messages.room_id
        AND room_members.user_id = auth.uid()
    )
);

-- Function to auto-join user to all public rooms on signup
CREATE OR REPLACE FUNCTION public.auto_join_all_rooms()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.room_members (room_id, user_id)
    SELECT id, NEW.id FROM public.chat_rooms
    ON CONFLICT DO NOTHING;
    RETURN NEW;
END;
$$;

-- Trigger to auto-join new users to all rooms
CREATE TRIGGER on_auth_user_created_join_rooms
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_join_all_rooms();

-- Seed existing users into all rooms
INSERT INTO public.room_members (room_id, user_id)
SELECT cr.id, au.id
FROM public.chat_rooms cr
CROSS JOIN auth.users au
ON CONFLICT DO NOTHING;