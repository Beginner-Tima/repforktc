-- Deny all INSERT operations on chat_rooms (admin-only via database)
CREATE POLICY "No public insert on chat_rooms"
ON public.chat_rooms
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Deny all UPDATE operations on chat_rooms (admin-only via database)
CREATE POLICY "No public update on chat_rooms"
ON public.chat_rooms
FOR UPDATE
TO authenticated
USING (false);

-- Deny all DELETE operations on chat_rooms (admin-only via database)
CREATE POLICY "No public delete on chat_rooms"
ON public.chat_rooms
FOR DELETE
TO authenticated
USING (false);