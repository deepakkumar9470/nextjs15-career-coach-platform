import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className='container min-h-screen mt-24 mx-auto mb-20'>
      {children}
    </div>
  )
}

export default MainLayout
