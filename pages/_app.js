import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  );
}