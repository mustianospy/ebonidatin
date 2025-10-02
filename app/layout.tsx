import './globals.css'

export const metadata = {
  title: 'Eboni Dating',
  description: 'Find meaningful connections in a safe, inclusive environment.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
