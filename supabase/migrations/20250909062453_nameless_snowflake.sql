/*
  # Create profiles trigger

  1. Function
    - `handle_new_user()` - Creates a profile when a new user signs up
  
  2. Trigger
    - Automatically creates a profile record when a user is created in auth.users
    - Uses the user metadata to set the role and name
*/

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'name', 'مستخدم جديد'),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();