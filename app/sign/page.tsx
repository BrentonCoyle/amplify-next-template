// app/about/page.tsx
"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-vue/styles.css";

export default function SignInPage() {
    return (
        <Authenticator>
            <template v-slot="{ signOut }">
                <button onClick={() => window.location.href = "sign/add"} >Go to Add Page</button>
        
                
            </template>

        </Authenticator>


        
    );

    
  }
  