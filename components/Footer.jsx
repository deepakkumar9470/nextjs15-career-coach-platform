import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
<footer className="bg-muted/50 py-6 dark:bg-muted/90">
  <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
    <p className="flex items-center text-md font-medium justify-center gap-4">
      Made by 
      <Heart size={20} color="#ff1414" strokeWidth={1.5} className="animate-ping dark:animate-none" /> 
      with &nbsp; Deepak &nbsp; Kumar
    </p>
  </div>
</footer>


  )
}

export default Footer
