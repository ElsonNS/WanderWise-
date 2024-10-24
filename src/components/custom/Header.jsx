import React from 'react'
import {Button} from '../ui/button'

function Header() {
  return (
   <div className= "p-3 shadow-sm flex justify-between items-center px-20">
      <img src= '/logo.svg' alt='logo'/>
      <div className='px-0 mr-0'>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
