import CssBaseline from '@mui/material/CssBaseline'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container';
import theme from './theme'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptior ChatBot',
  description: 'Developed by Manuel Barreiro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Container maxWidth="md">
              {children}
            </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
