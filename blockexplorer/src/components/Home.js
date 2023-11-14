import React, { useState } from 'react'
import block from "./images/blockchain.png"
import invoices from "./images/invoices.png"
import LoadingAnimation from './LoadingAnimation';
import { useMyContext } from '../MyContext';
import { Link,useNavigate } from "react-router-dom";




const Home = () => {
    const {loading,loading2,blockdeatils,transactionDetails} =useMyContext();
    const [error,setError]=useState(false);
    const [searcOption, setSearchOption] = useState("");
    const [input,setInput] = useState();
    const navigate = useNavigate();

   const handleClick=()=>{
       if ((searcOption === "block") && (input !== "") && (input.length!==66)) {
         
           navigate(`/block/${input}`);
       }
       else if ((searcOption === "blockhash") && (input.length===66)) {
           navigate(`/block/${input}`);
       }
       else if ((searcOption === "address") && (input.length===42)) {
          
           navigate(`/address/${input}`)
       }
       else if ((searcOption === "trx") && (input.length===66)) {

           navigate(`/transaction/${input}`)
       }
       else {
           setError(true);
       }

   }


    
  return (
      <>
         {error?(
          <>

              <div className="w-4/5 m-auto mt-10  flex flex-row gap-2 items-center justify-center">
                  <h1 className="text-2xl font-bold text-red-500 ">Invalid Request.......</h1>
                  <Link onClick={()=>{
                    setError(false)
                  }}><p className='text-sky-300 hover: text-sky-500'>Try Again</p></Link>
              </div>
          </>
         ):(
          <>
              <div className='w-full flex flex-row items-center justify-start m-3 gap-3'>
                  <select name="" id="" className="h-8 p-1 rounded-md bg-orange-400 text-slate-900 text-lg"
                      onChange={(e) => {
                          setSearchOption(e.target.value);
                      }}>
                      <option disabled selected>Choose A Option</option>
                      <option value="block">Block Number</option>
                      <option value="blockhash">Blockhash</option>
                      <option value="address">Address</option>
                      <option value="trx">Transaction</option>
                  </select>

                  <input className='w-1/2 h-9 bg-gray border border-gray-950 rounded-lg focus:none' placeholder=" Search By BlockNumber/Blockhash/TransactionHash/Address..."
                      type="text" onChange={(e)=>{
                        setInput(e.target.value);
                      }} />
                  <button className='text-l rounded-full w-16 h-8 bg-orange-400 hover:border-2 border-black ' onClick={handleClick}>Search</button>
              </div>
          </>
        )}
            <div className="w-full flex flex-row gap-2 mt-2 p-3">
            
                <div className="w-1/2 bg-slate-50 shadow-xl rounded-md flex flex-col gap-2 p-4">
                    <div className="border-b-4 h-8">
                        <p className="text-xl text-center">Last Mined 10 Blokcs</p>
                    </div>
                    {loading?(
                        
                            <div className="flex flex-row items-center justify-center">
                                <LoadingAnimation>
                                </LoadingAnimation>
                            </div>
                    
                    ):( blockdeatils.map((el,i)=>{
                        return(
                         
                            <div key={i} className="flex flex-row h-16 border-b-4 items-center justify-between p-4 text-l">
                                <div className="w-12 h-12 bg-slate-200 rounded-full p-1.5">
                                    <img className="object-fill" src={block} alt="" />
                                </div>
                                <div className="flex flex-col w-22 h-14  items-center">
                                    <p>Block No:</p>
                                    <Link to={`/block/${el?.blocknum}`}>
                                        <p  className="text-blue-400 hover:text-blue-700">{el?.blocknum}</p>
                                    </Link>
                                    
                                </div>
                                <div className="flex flex-col w-22 h-14  items-center">
                                    <p>Block Base Gas Fee:</p>
                                    <p>{el?.basgasFee} ETH</p>
                                </div>
                            </div>
                        )
                    })
                 
                    )}
                    
                    
                    
                   
                </div>
               
                <div className="w-1/2 bg-slate-50 shadow-xl rounded-md flex flex-col gap-2 p-4 ">
                    <div className="border-b-4 h-8">
                        <p className="text-xl text-center">Last 10 Transactions</p>
                    </div>
                {loading2?(

                    <div className="flex flex-row items-center justify-center">
                      <LoadingAnimation>
                      </LoadingAnimation>
                  </div>

                ):(

                    transactionDetails.map((el,i)=>{
                        return(
                             
                    <div key={i} className="flex flex-row h-16 border-b-4 items-center justify-start gap-16 p-4 text-l">
                    <div className="w-12 h-12 bg-slate-200 rounded-full p-1.5">
                        <img className="object-fill" src={invoices} alt=""/>
                    </div>
                    <div className="flex flex-col w-22 h-14  items-center">
                        <p className="truncate w-36">Transaction Hash:</p>
                        <Link to={`/transaction/${el.trans}`}>
                            <p   className="truncate w-36 text-blue-400 hover:text-blue-700"  >
                                {el?.trans}
                            </p>
                        </Link>
                        

                    </div>
                    <div className="flex flex-col w-22 h-14  items-center">
                       <Link to={`/address/${el?.from}`}>
                       <p className="truncate  text-blue-400 hover:text-blue-700 w-40"><span className="text-black">From : </span>{el?.from}</p>
                       </Link> 
                       <Link to={`/address/${el?.to}`}>
                       <p className="truncate  text-blue-400 hover:text-blue-700 w-40"><span className="text-black">From : </span>{el?.to}</p>
                       </Link> 
                    </div>

                </div>

                        )
                    })


                )}
                  
                   
                </div>
            </div>
        
    </>
  )
}

export default Home;