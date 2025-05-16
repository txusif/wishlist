import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';

export function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text mb-2">
            Wishbox
          </h1>
          <p className="text-muted-foreground">Sign in to access your wishlist</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(252 87% 67%)',
                    brandAccent: 'hsl(217 91% 60%)',
                    inputBackground: 'hsl(222 47% 13%)',
                    inputText: 'white',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
}