import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body>
        {/* <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        /> */}
        {children}
        <noscript>
          {/* <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          /> */}
        </noscript>
      </body>
    </html>
  )
}
