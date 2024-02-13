import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import React from 'react'

function LoginButton () {
  return (
    <Button outline onClick={() => signIn('id-server', {callbackUrl: '/'} )}>
        دخول
    </Button>
  )
}

export default LoginButton