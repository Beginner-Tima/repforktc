-- Create security definer function to check if users share a room
CREATE OR REPLACE FUNCTION public.shares_room_with(target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.room_members rm1
    JOIN public.room_members rm2 ON rm1.room_id = rm2.room_id
    WHERE rm1.user_id = auth.uid()
    AND rm2.user_id = target_user_id
  )
$$;

-- Update profiles SELECT policy to only show profiles of users in shared rooms
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users only" ON public.profiles;

CREATE POLICY "Users can view profiles of users in shared rooms"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = user_id  -- Can always see own profile
  OR public.shares_room_with(user_id)  -- Can see profiles of users in shared rooms
);