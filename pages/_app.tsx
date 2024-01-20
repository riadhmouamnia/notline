import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import RootLayout from "./layout";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default appWithTranslation(App);
