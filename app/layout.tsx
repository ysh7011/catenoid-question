"use client"

import './globals.css'

import Script from 'next/script'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head/>
      <Script 
        src="https://file.kollus.com/vgcontroller/vg-controller-client.latest.min.js" 
        strategy="afterInteractive"
        onLoad={() =>
          console.log(`script 로드 잘됨`)
        }
      />
      <body>
        <>
          {children}
        </>
      </body>
    </html>
  )
}
