import React from 'react'
import { Link } from "react-router-dom";


export const Navbar = () => {
 
  return (
    <>

      <div className='w-full h-20 flex flex-row items-center justify-center gap-5 mr-2 bg-neutral-900'>
        <Link to={"/"}>
          <p className='text-3xl display:block text-amber-400 hover:text-rose-200'>Block Explore</p>
        </Link>
        <Link to={"/nft"}>
          <p className='text-3xl display:block  text-amber-400  hover:text-rose-200'>NFT Explore</p>
        </Link>
        <Link to={"/account"}>
          <p className='text-3xl display:block   text-amber-400  hover:text-rose-200'>Account History</p>
        </Link>
      </div>
     
    </>
  )
}
