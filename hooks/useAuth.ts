import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signUp as signUpHelper, signIn as signInHelper, signOut as signOutHelper, getUserProfile } from '@/lib/supabase';
import { User as ProfileUser } from '@/types/database';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profileData } = await getUserProfile(session.user.id);
        setProfile(profileData);
      }

      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profileData } = await getUserProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    profile,
    loading,
    signUp: async (email: string, password: string, userData: any) => {
      return await signUpHelper(email, password, userData);
    },
    signIn: async (email: string, password: string) => {
      return await signInHelper(email, password);
    },
    signOut: async () => {
      return await signOutHelper();
    }
  };
}