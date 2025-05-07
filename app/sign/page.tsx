// app/about/page.tsx
"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-vue/styles.css";

export default function SignInPage() {
    return (
        <Authenticator>
        {({ signOut, user }) => (
          <div className="flex flex-col items-center gap-4">
            
  
            <button
              onClick={() => window.location.href = "/sign/add"}>Go to Add Page</button>
  
            <button
              onClick={signOut}>Sign Out</button>
          </div>
        )}
      </Authenticator>


        
    );

    
  }
  