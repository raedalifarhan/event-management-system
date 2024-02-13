import { ReactNode } from 'react'

const PaddingContainer = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-full px-10 mx-auto max-w-8xl'>{children}</div>
  )
}

export default PaddingContainer 