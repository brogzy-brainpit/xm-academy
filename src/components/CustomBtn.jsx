import Link from 'next/link'
import React from 'react'

function CustomBtn({href='/',title='register now',className='bg-brand-accent'}) {
  return (
    <div className={`${className} rounded-full text-center font-body capitalize text-para font-bold px-4 py-2  text-white`}>
        <Link href={href}>
        {title}
        </Link>
    </div>
  )
}

export default CustomBtn