import React, { useState,useCallback, useEffect } from 'react'
import {alchemy} from "../sever.js";
import Loading from "./AddressSpinners.js";

const Nft = () => {
  const[searcOption,setSearchOptions]=useState("");
  const[loading,setLoading]=useState(false);
  const [data,setData] = useState([]);
  const [contracAdd,setContracAdd] = useState("")
  const [tokenId,setTokenId] = useState();
  const [isFloorPrice,setFloorPrice] = useState(false); 
  const [isMetadata,setMetadata] = useState(false); 
  const[error,setError]=useState(false);
  const[imgUrl,setimageUrl]=useState("");

  const handleClick = ()=>{
    if (searcOption==="nftm") {
     setLoading(true);
     getMetadata(contracAdd,tokenId);
     setMetadata(true);
    }else if(searcOption==="fp"){
      setLoading(true);
      getFloorPrice(contracAdd)
      setFloorPrice(true);
      setError(false);
    }else{
      setLoading(false);
      setFloorPrice(false);
      setError(true);
     
    }
  }
  const getMetadata = useCallback( async (contracAdd,tokenId)=>{
    try {
      const data = await alchemy.nft.getNftMetadata(contracAdd,parseInt(tokenId));
      setData(data);
      setimageUrl(data.media[0].thumbnail);
      setLoading(false);
      setError(false);
      setMetadata(true)
      

    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  },[])

  const getFloorPrice = useCallback(async(contadaddr)=>{
    try {
      const data = await alchemy.nft.getFloorPrice(contadaddr);
      setData(data);
      setLoading(false);
      setFloorPrice(true);
      setError(false)
 
      
    } catch (error) {
      setLoading(false)
      setError(true);
    }
    
  
  },[])


  useEffect(()=>{

  },[contracAdd,tokenId,searcOption])

 

 
  return (
    <>
      <div className="w-full mt-2 p-2 flex flex-col gap-2 items-center shadow-lg justify-center">
        <h1 className="text-6xl font-bold font-serif">Explore NFTS</h1>
        <h1 className="text-3xl font-bold font-sans">Check Metadata And Floor Price</h1>
      </div>
      <div className="w-1/2 h-20 bg-divbg flex flex-row p-1 pl-8 mt-2 items-center gap-4 justify-start  rounded-e-md" >
        <select name="" id="nftop" className="h-10 p-1 rounded-md bg-select text-divbg text-lg"
        onChange={(e)=>{
          if(e.target.value==='nftm'){
            document.getElementById('tokenid').classList.remove('hidden')
            document.getElementById('tokenid').classList.add('inline')
            setSearchOptions(e.target.value);
            setFloorPrice(false)
            setData("");
            setMetadata(false)
          }else{
            document.getElementById('tokenid').classList.remove('inline')
            document.getElementById('tokenid').classList.add('hidden')
            setSearchOptions(e.target.value);
            
          }
          
        }}>
          <option disabled selected value="none" >Choose Option</option>
          <option value="nftm">NFT Metadata</option>
          <option value="fp">NFT Floor Price</option>
        </select>
        <input className="w-1/3 h-10 rounded-md bg-green-50 border  border-gray-900 focus:outline-none p-2" type="text" placeholder="Contract Address"
        onChange={(e)=>{
          setContracAdd(e.target.value);
        }}/>
          <input id="tokenid" className="w-20 hidden h-10 rounded-md bg-green-50 border  border-gray-900 focus:outline-none p-2" type="text" placeholder="Token Id" 
          onChange={(e)=>{
            setTokenId(e.target.value);
          }}/>
            <button className="w-24 h-8 text-lg text-zinc-300 bg-red-700 rounded-md hover:border border-amber-200 text-zinc-50 " onClick={handleClick}>Search</button>
        </div>
        {
          loading? (
            <>
            <div className='w-full flex flex-row items-center mt-6 justify-center'>
              <Loading></Loading>
            </div>
            </>
          ):(
            error? (
              <>
                <div className="w-4/5 m-auto mt-10  flex flex-row gap-2 items-center justify-center">
                  <h1 className="text-2xl font-bold text-red-500 ">Invalid Request Try Again .......</h1>
                </div>
              </>
            ):(
              isFloorPrice?(
                <>
                <div className='w-1/2 m-auto shadow-lg mt-4 p-1 flex flex-col gap-1 items-center'>
                <h1 className="text-2xl font-bold font-serif">Floor For</h1>
                <h1 className="text-base font-bold font-sans">{contracAdd}</h1>
                
                <div className="w-full flex flex-row gap-2">
                    <h1 className="text-base font-bold font-mono">MarketPlace:</h1>
                    <h1 className="text-base font-bold font-mono">Opensea</h1>
                </div>
            
                <div className="w-full flex flex-row gap-2">
                    <h1 className="text-base font-bold font-mono">Floor Price:</h1>
                    <h1 className="text-base font-bold font-mono">{data.openSea?.floorPrice}</h1>
                </div>
            
                <div className="w-full flex flex-row gap-2">
                    <h1 className="text-base font-bold font-mono">Price Currency:</h1>
                    <h1 className="text-base font-bold font-mono">{data.openSea?.priceCurrency}</h1>
                </div>
            
                <div className="w-full flex flex-row gap-2">
                    <h1 className="text-base font-bold font-mono">Collection At:</h1>
                   <a href={data.openSea?.collectionUrl} target="_blank" rel="noopener noreferrer">
                   <h1 className="text-base font-bold font-mono text-blue-500 hover:text-blue-900 w-52">{data.openSea?.collectionUrl}</h1>
                   </a> 
                </div>
            
                <div className="w-full flex flex-row gap-2">
                    <h1 className="text-base font-bold font-mono">Price Received Time:</h1>
                    <h1 className="text-base font-bold font-mono">{data.openSea?.retrievedAt}</h1>
                </div>
            </div>
                </>
              ):
              ( isMetadata?(
                <>
                <div className="w-3/5 m-auto mt-4 shadow-lg grid grid-col-1 gap-1  items-center ">
                  <div className="flex flex-row items-center justify-center text-3xl">
                    <h1>{data.contract?.name} NFT</h1>
                  </div>
                  <div className="flex flex-row p-2 justify-center items-center gap-1 ">
                    <div className="w-1/2 h-80">
                      <img className="object-scale-down max-w-full max-h-full" src={imgUrl} alt="newtorkerror"/>
                    </div>
                    <div className="w-1/2 h-80">
                      <div className="flex flex-col gap-1  p-1">
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Contract:</h1>
                          <h1 className=" text-l text-blue-500 hover:text-blue-900 w-9/12 truncate  ...">{data.contract?.address}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Name:</h1>
                          <h1 className=" text-l ">{data.contract?.name}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Symbol:</h1>
                          <h1 className=" text-l ">{data.contract?.symbol}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Total Supply:</h1>
                          <h1 className=" text-l ">{data.contract?.totalSupply ?? "Not Fixed Yet"}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Token Type:</h1>
                          <h1 className=" text-l ">{data.contract?.tokenType}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Token Id:</h1>
                          <h1 className=" text-l">{data?.tokenId}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Last Upadated:</h1>
                          <h1 className=" text-l text-blue-500">{data?.timeLastUpdated}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Title:</h1>
                          <h1 className=" text-l ">{data?.title}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                          <h1 className="text-l font-medium">Spam Info</h1>
                          <h1 className=" text-l ">{data?.spamInfo ?? "Not Known"}</h1>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
          </>

              ):(<div></div>)

                   
                
              )
            )
          )
        }
    </>
  )
}

export default Nft;