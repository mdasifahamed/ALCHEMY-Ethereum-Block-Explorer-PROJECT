import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './AddressSpinners';
import {alchemy} from "../sever.js";





const Acoount = () => {
  const [errors,setErrors] = useState(false);
  const [fromTransactions,setFromTransactions]= useState([]);
  const [toTransactions,setToTransactions]= useState([]);
  const [balance,setBalance]= useState([]);
  const [input,setInput]= useState('');
  const [loading1,setLoading1] =useState(false);
  const [loading2,setLoading2] =useState(false);
  const [loading3,setLoading3] =useState(false);
  
  // Serach Button handle
  const handleSearch=()=>{
    setLoading1(true)
    setLoading2(true)
    setLoading3(true)
    getBlanace(input)
    getFromTransaction(input)
    getToTransaction(input)
  }

  //Get balance Of The Given Address
const getBlanace=useCallback(async(inp)=>{
  try {
    const balance = await alchemy.core.getBalance(inp);
    setBalance(balance);
    setLoading1(false);
  } catch (error) {
    setErrors(true);
    setLoading1(false);
    
  }
  
  
},[]);

 //Get Outgoing Transaction  Of The Given Address
const getFromTransaction= useCallback(async(addr)=>{
  try {
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: addr,
      excludeZeroValue: true,
      category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
      // maxCount: Utils.hexlify(100)
    })
    setFromTransactions(data);
    setLoading2(false);
  } catch (error) {
    setErrors(true);
    setLoading2(false);
  }
},[])

//Get Incoming Transaction  Of The Given Address
const getToTransaction= useCallback(async(addr)=>{
  try {
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: addr,
      excludeZeroValue: true,
      category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
      // maxCount: Utils.hexlify(100)
    })
    setToTransactions(data);
    setLoading3(false);
  } catch (error) {
    setErrors(true);
    setLoading3(false);
  }
},[])

useEffect(()=>{

  

},[input,fromTransactions,toTransactions])


  

  
  return (

    <>
      <div className='w-full flex flex-row items-center justify-start m-3 gap-3'>
        <p className='text-2xl text-fuchsia-500 font-bold'>Search For An Address</p>
        <input
          className='w-1/2 h-9 bg-gray border border-gray-950 rounded-lg focus:none'
          placeholder=" Search By Address... 20 bytes hash"
          value={input}
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className='text-l rounded-full w-16 h-8 bg-orange-400 hover:border-2 border-black' onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="w-4/5 h-20 flex flex-row items-center justify-start gap-2 bg-slate-100 shadow-l rounded-md m-4 p-4">
        <div>
          <h1 className="font-medium font-serif text-xl">Account Details For</h1>
        </div>
        <div>
          <h1 className="font-serif text-xl text-gray-600">{input}</h1>
        </div>
      </div>

      <div className="w-52 h-40 bg-slate-50 shadow-xl rounded-md flex flex-col items-start justify-center gap-2 p-6 m-4">
        <div>
          <h1>Current Account Balance</h1>
        </div>
        {loading1 ? (
          <Loading></Loading>
        ) : (
          <>
            <div>
              <h1>{((parseInt(balance?._hex ?? 0)) / 10 ** 18).toFixed(4)}ETH</h1>
            </div>
          </>
        )}
      </div>

      {errors ? (
        <>
          <div className="flex flex-row items-center justify-center">
            <h1 className="font-bold text-2xl">Invalid Address</h1>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center">
            <h1 className="font-bold text-2xl">Last 100 Transactions History</h1>
          </div>
          {/* Changes Start Form here */}

          <div className="flex flex-row pl-24 pr-36 items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl ">Outgoing Transactions</h1>
            </div>
            <div>
              <h1 className="font-bold text-2xl ">Incoming Transactions</h1>
            </div>
          </div>
          <div className="w-full flex flex-row gap-2">
            {/* Form account here */}
            <div className="w-1/2 bg-slate-50 shadow-xl rounded-md m-4 flex flex-col gap-2 items-start justify-start">
              <div className="w-full flex flex-row pl-8 gap-4 items-center justify-center">
                <div>
                  <h1 className="font-mono font-bold w-32">Txn</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32">From</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32">To</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32">Value</h1>
                </div>
              </div>
              {/* From Account*/}
              {loading2 ? (
                <Loading></Loading>
              ) : (
                fromTransactions.transfers?.map((el, index) => (
                  <div key={index} className="w-full flex flex-row pl-8 gap-4 items-center justify-center">
                    <Link to={`/transaction/${el?.hash}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 w-32 font-bold truncate overflow-hidden ... ">{el?.hash}</h1>
                      </div>
                    </Link>

                    <Link to={`/address/${el?.from}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 w-32 font-bold truncate overflow-hidden ... ">{el?.from}</h1>
                      </div>
                    </Link>

                    <Link to={`/address/${el?.to}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 font-bold w-32 truncate overflow-hidden ... ">{el?.to}</h1>
                      </div>
                    </Link>
                    <div>
                      <h1 className="font-mono text-base  font-bold w-32 truncate overflow-hidden ...">{el.value?.toFixed(2) ?? 0}</h1>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* To account here */}
            <div className="w-1/2 bg-slate-50 shadow-xl rounded-md m-4 flex flex-col gap-2 items-start justify-start">
              <div className="w-full flex flex-row pl-8 gap-4 items-center justify-center">
                <div>
                  <h1 className="font-mono font-bold w-32 truncate overflow-hidden ... ">Txn</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32 truncate overflow-hidden ... ">From</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32 truncate overflow-hidden ... ">To</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold w-32">Value</h1>
                </div>
              </div>

              {loading3 ? (
                <Loading></Loading>
              ) : (
                toTransactions.transfers?.map((el, index) => (
                  <div key={index} className="w-full flex flex-row pl-8 gap-4 items-center justify-center">
                    <Link to={`/transaction/${el?.hash}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 font-bold w-32 truncate overflow-hidden ... ">{el?.hash}</h1>
                      </div>
                    </Link>

                    <Link to={`/address/${el?.from}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 font-bold w-32 truncate overflow-hidden ... ">{el?.from}</h1>
                      </div>
                    </Link>

                    <Link to={`/address/${el?.to}`}>
                      <div>
                        <h1 className="font-mono text-base text-blue-400 hover:text-blue-700 font-bold w-32 truncate overflow-hidden ... ">{el?.to}</h1>
                      </div>
                    </Link>
                    <div>
                      <h1 className="font-mono text-base  font-bold w-32 truncate overflow-hidden ...">{el?.value ?? 0}</h1>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  

  )
}

export default Acoount