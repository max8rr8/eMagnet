import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

/**
 * Страничка со входом
 *
 * @returns {React.ReactElement}
 */
function Login() {
  return (
    <div>
      <Link href="/register">
        <Button>Register</Button>
      </Link>
    </div>
  )
}

Login.title = 'Вход'
Login.login = 'restricts'

export default Login
