-- Fix: Restrict room_members visibility to only rooms the user has joined
DROP POLICY IF EXISTS "Users can view room memberships" ON public.room_members;

CREATE POLICY "Users can view memberships in their rooms"
ON public.room_members
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.room_members rm
        WHERE rm.room_id = room_members.room_id
        AND rm.user_id = auth.uid()
    )
);