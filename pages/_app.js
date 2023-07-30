import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";

// Custom _app component
export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}
