import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex items-center justify-center min-h-screen pt-5'>
      {children}
    </div>
  )
}

export default AuthLayout
