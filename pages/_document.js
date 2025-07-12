import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-customPrimary-bg text-text-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}