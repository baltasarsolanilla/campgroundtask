import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import { LoadScript } from '@react-google-maps/api';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Campgrounds</title>
        <meta
          name='description'
          content='Search campgrounds across Australia'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
      </Head>
      <div className='backgroundImage'></div>
      <div id='wrapper' className='shadow-lg'>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </LoadScript>
      </div>
    </>
  );
}

export default AppWrapper;
