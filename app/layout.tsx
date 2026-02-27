// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import ConvexClientProvider from "../ConvexClientProvider";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#6366f1' } // Matches your indigo-500 brand color
      }}
    >
      <html lang="en">
        <body className="bg-black text-white">
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}