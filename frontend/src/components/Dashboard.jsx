import { useEffect, useState } from "react"
import axios from 'axios';
import SendMoney from "./SendMoney";

export default function Dashboard(){
    const authHeader=window.localStorage.getItem('Authorization');
    const headers={
        'Authorization':authHeader
    }
    
    const[sendMoney,setSendMoney]=useState(false);
    const[balance,setBalance]=useState(0);
    const[searchInput,setSeachInput]=useState("");
    const[users,setUsers]=useState([]);
    const [name,setName]=useState("");
    const[currentUser,setCurrentUser]=useState("");
    const[to,setTo]=useState("");
    const params={
        filter:searchInput
    }

    useEffect(() => {
        // Corrected syntax here
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance', { headers });
            setBalance(response.data.balance);
            const res=await axios.get('http://localhost:3000/api/v1/user/currentUser', { headers });
            setCurrentUser(res.data.firstName);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, []); 

    if(!sendMoney){
        return(
            <div>
                <div className="flex justify-between mb-4 mx-4">
                <h1 className="text-3xl font-bold">EzeePay</h1>
                <div className="flex">
                <p className="text-xl font-semibold mr-2">Hello {currentUser}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>
    
                </div>
                </div>
                <hr />
                <div>
                <h1 className="text-xl font-bold mt-4 mb-4 mx-4">Your Balance ${balance}</h1>
                
                <h1 className="text-xl font-bold mt-4  mx-4">Users</h1>
                <div className="flex items-center justify-between " >
                <input onChange={async (e)=>{
                    setSeachInput(e.target.value);
                    const response=await axios.get("http://localhost:3000/api/v1/user/bulk",{params,headers})
                    setUsers(response.data.user);
                }}
                 className="w-full mt-4 mb-4 mx-4 p-2 border rounded-md focus:outline-none focus:border-black"
                  type="text"
                  placeholder="Search" />
                </div>
                <div>
      {users.map((user) => (
        <div key={user.id}>
          <div className="flex justify-between mb-4 mx-4">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <h1 className="text-xl font-semibold ml-4 ">{user.firstName+" "+user.lastName}</h1>
            </div>
            <button onClick={()=>{setName(user.firstName+" "+user.lastName);
            setTo(user.username)
            setSendMoney(true);}} className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray">
              Send money
            </button>
          </div>
        </div>
      ))}
    </div>
                
                
                </div>
    
            </div>
        )
    }
    else{
        return <SendMoney to={to} name={name} />
    }
}