import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import Stream from 'stream'

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>   
        {children}
      </StreamVideoProvider>

    </main>


  )
}

export default RootLayout