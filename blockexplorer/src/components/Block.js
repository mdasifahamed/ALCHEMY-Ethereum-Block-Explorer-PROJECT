import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './AddressSpinners';
import {alchemy} from "../sever.js";


const Block = () => {
  const {blocknum} = useParams();
  const[blockData, setBlockData] = useState(null);
  const[loading,setLoading] = useState(true);
  const [error, setError] = useState(false);


  const getData =useCallback(async(block)=>{
    try {
      const data = await alchemy.core.getBlock(block);
    
      if(data===null){
        setLoading(false)
        setError(true)
      }
      setBlockData(data);
      setLoading(false)
    } catch (error) {
 
      setLoading(false);
      setError(true)
    }
  },[])
 

  useEffect(()=>{
    if(!isNaN(blocknum)&&(blocknum.length!==66)){
 
      getData(parseInt(blocknum));
    }
    else if(blocknum===undefined){
      setLoading(false)
      setError(true)
    }
     else if(blocknum.length===66){
      let hash = blocknum.toString();
      getData(hash);
    }
    else{
      setLoading(false)
      setError(true)
    }
     


  },[blocknum,getData])

  return (
    <>
      <div className=" w-4/5 h-20 flex flex-row items-center justify-start gap-2
    bg-slate-100 shadow-l rounded-md m-4 p-4 ">
        <div>
          <h1 className="font-medium font-serif text-xl">Block</h1>
        </div>
        <div>
          <h1 className="font-serif text-xl text-gray-600" >#{blockData?.number}</h1>
        </div>
      </div>
      <div className="w-4/5 h-1/4 bg-slate-50 shadow-xl rounded-md m-4 flex flex-row gap-40 p-4 items-center">
        <div className="flex flex-col gap-8 ">
          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>blockNumber</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>blockHash</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>parentHash</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>nonce</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>difficulty</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>gasLimit</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>gasUsed</h1>
          </div>
          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>miner</h1>
          </div>

          <div className="font-mono text-l tracking-tighter text-gray-900">
            <h1>totalTransaction</h1>
          </div>

        </div>
        <div className="flex flex-col gap-8 ">
          {
            loading?(
              <Loading></Loading>
            ):(error? (<>
              <p className='text-red-500 '>Invalid Block</p>
              </>):(

                  <>
                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.number}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.hash}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.parentHash}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.nonce}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.difficulty}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{parseInt(blockData?.gasLimit._hex)}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{parseInt(blockData?.gasUsed._hex)}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.miner}</h1>
                    </div>

                    <div className="font-serif text-l text-gray-600">
                      <h1>{blockData?.transactions.length}</h1>
                    </div>

                  </>
                )
           )
          }
        </div>
      </div>
    </>
  )
}

export default Block

