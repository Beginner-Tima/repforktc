-- Add explicit UPDATE policy to deny all updates on room_members
-- This table's fields (id, room_id, user_id, joined_at) should never be modified
-- Users should delete and re-insert to change room membership

CREATE POLICY "Room memberships cannot be updated"
ON public.room_members
FOR UPDATE
USING (false);