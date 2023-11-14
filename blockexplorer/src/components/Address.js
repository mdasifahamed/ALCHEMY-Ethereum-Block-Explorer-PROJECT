import React, { useCallback, useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import {alchemy} from "../sever.js";
import Loading from './AddressSpinners';
import { Utils } from 'alchemy-sdk';


const Address = () => {

  const{ add } =useParams();
  const address = add;

  const[transactions,setTransactions] = useState([]);
  const[balance,setBalance] = useState(0);
  const[loading1,setLoading1] = useState(true)
  const[loading2,setLoading2] = useState(true)
  const[error, setError] = useState(false);


  const getTransactions = useCallback(async (addr) => {
    try {
      const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: addr,
        excludeZeroValue: true,
        category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
        maxCount: Utils.hexlify(100),
      });
        setTransactions(data);
        setLoading2(false);

    } catch (error) {
      setLoading2(false);
      setError(true);
    }
  }, []);

  const getBalance =useCallback(async(addr)=>{
    try {
    const balance = await alchemy.core.getBalance(addr);
    
      setBalance(balance)
      setLoading1(false)
 
    } catch (error) {
      setError(true);
      setLoading1(false);
    }
  },[]);
  

  useEffect(()=>{
    getBalance(add)
    getTransactions(add)
     
  },[add,getTransactions,getBalance])


  return  (
    <>
      <div className="w-4/5 h-20 flex flex-row items-center justify-start gap-2 bg-slate-100 shadow-l rounded-md m-4 p-4">
        <div>
          <h1 className="font-medium font-serif text-xl">Account Details For</h1>
        </div>
        <div>
          <h1 className="font-serif text-xl text-gray-600">{address}</h1>
        </div>
      </div>
  
      <div className="w-52 h-40 bg-slate-50 shadow-xl rounded-md flex flex-col items-start justify-center gap-2 p-6 m-4">
        <div>
          <h1>Current Account Balance</h1>
        </div>
  
        {loading1 ? (
          <Loading></Loading>
        ) : error ? (
          <div>
            <h1>Invalid Address</h1>
          </div>
        ) : (
          <div>
            <h1>{(balance._hex / (10 ** 18)).toFixed(4)} ETH</h1>
          </div>
        )}
      </div>
  
      <div className="flex flex-row items-center justify-center">
        <h1 className="font-bold text-2xl">Last 100 Transactions History</h1>
      </div>
  
      <div className="bg-slate-50 shadow-xl rounded-md m-4 flex flex-col gap-2 p-1 items-center justify-between">
        <div className="w-11/12 flex flex-row p-1 items-center justify-between">
          <div>
            <h1 className="font-mono font-bold w-20">Txn Hash</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">Category</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">Block</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">From</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">To</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">Value</h1>
          </div>
          <div>
            <h1 className="font-mono font-bold w-20">Asset</h1>
          </div>
        </div>
        {transactions.transfers?.map((el) => {
          return (
            <div className="w-11/12 flex flex-row p-1 items-center justify-between">
              {loading2 ? (
                <Loading></Loading>
              ) : error ? (
                <div>
                  <h1>Invalid Address</h1>
                </div>
              ) : (
                <>
                  <div>
                    <Link to={`/transaction/${el?.hash}`}>
                      <h1 className="font-mono text-blue-400 hover:text-blue-700 font-bold w-20 truncate ...">
                        {el?.hash}
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <h1 className="font-mono font-bold w-20">
                      {el?.category ?? 'N/A'}
                    </h1>
                  </div>
                  <div>
                    <Link to={`/block/${el?.blockNum}`}>
                      <h1 className="font-mono text-blue-400 hover:text-blue-700 font-bold w-20">
                        {parseInt(el?.blockNum)}
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/address/${el?.from}`}>
                      <h1 className="font-mono text-blue-400 hover:text-blue-700 font-bold w-20 truncate ...">
                        {el?.from}
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/address/${el?.to}`}>
                      <h1 className="font-mono text-blue-400 hover:text-blue-700 font-bold w-20 truncate ...">
                        {el?.to}
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <h1 className="font-mono font-bold w-20 truncate ...">
                      {el?.value}
                    </h1>
                  </div>
                  <div>
                    <h1 className="font-mono font-bold w-20">
                      {el?.asset ?? 'N/A'}
                    </h1>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
  
 
}

export default Address
