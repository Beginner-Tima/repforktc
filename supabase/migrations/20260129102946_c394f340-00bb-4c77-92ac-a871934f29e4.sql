-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Messages are viewable by authenticated users" ON public.messages;

-- Create a new secure policy that requires authentication
CREATE POLICY "Messages are viewable by authenticated users only"
ON public.messages
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');