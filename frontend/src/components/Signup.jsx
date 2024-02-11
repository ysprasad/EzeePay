import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Signup() {
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");

  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md ">
      <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <p className="text-gray-600 mb-4">Enter your information to create an account</p>
      </div>
      

      <div className="mb-4">
        <h3 className="text-sm font-semibold">First Name</h3>
        <input onChange={(e)=>{
          setFirstName(e.target.value)
        }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="John"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Last Name</h3>
        <input  onChange={(e)=>{
          setLastName(e.target.value)
        }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Doe"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Email</h3>
        <input  onChange={(e)=>{
          setUsername(e.target.value)
        }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="johndoe@example.com"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Password</h3>
        <input onChange={(e)=>{
          setPassword(e.target.value)
        }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="password"
        />
      </div>

      <button
        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
        onClick={async () => {
          const postData={
            firstName,
            lastName,
            username,
            password
          }
          const response=await axios.post("http://localhost:3000/api/v1/user/signup",postData);
          window.localStorage.setItem("Authorization","Bearer "+response.data.token)
          navigate("/dashboard");
        }}
      >
        Sign Up
      </button>
      <div className="flex flex-col items-center">
      <p className="mt-4 text-sm text-gray-600">
        Already have an account? <a href="/signin" className="text-black">Login</a>
      </p>
      </div>
    </div>
  );
}
