-- Create security definer function to check room membership without recursion
CREATE OR REPLACE FUNCTION public.is_room_member(check_room_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.room_members
    WHERE room_id = check_room_id
    AND user_id = auth.uid()
  )
$$;

-- Update room_members SELECT policy to only show memberships for user's own rooms
DROP POLICY IF EXISTS "Authenticated users can view room memberships" ON public.room_members;

CREATE POLICY "Users can view memberships in their own rooms"
ON public.room_members
FOR SELECT
USING (public.is_room_member(room_id));