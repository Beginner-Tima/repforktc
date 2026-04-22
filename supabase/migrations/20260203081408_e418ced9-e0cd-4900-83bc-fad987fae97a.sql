-- Fix: Remove recursive policy and use simple auth check
DROP POLICY IF EXISTS "Users can view memberships in their rooms" ON public.room_members;

-- Simple policy: authenticated users can view all memberships (public chat rooms)
CREATE POLICY "Authenticated users can view room memberships"
ON public.room_members
FOR SELECT
USING (auth.role() = 'authenticated');