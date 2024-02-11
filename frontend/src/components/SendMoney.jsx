import axios from "axios";
import { useState } from "react"

export default function SendMoney(props){
  const authHeader=window.localStorage.getItem("Authorization");
  const headers={
    'Authorization':authHeader
}
  const to=props.to;
  const[amount,setAmount]=useState(0);
  const body={
    to,amount
  }
    return(
        <>
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <div className="flex flex-col items-center mb-4">
      <h1 className="text-3xl font-bold mb-4">Send Money</h1>
      </div>
      
      <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>
                    <h1 className="text-xl font-bold mt-1 ml-4 ">{props.name}</h1>
                    </div> 

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Amount(in Rs)</h3>
        <input onChange={(e)=>{setAmount(e.target.value)}}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-black"
          type="text"
          placeholder="Enter amount"
        />
      </div>

     

      <button
        className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-400 focus:outline-none focus:shadow-outline-gray"
        onClick={async () => {
          const response=await axios.post("http://localhost:3000/api/v1/account/transfer",body,{headers})
          alert("transaction done!");
        }}
      >
        Initiate Transfer
      </button>
     
    </div>
        </>
    )
}