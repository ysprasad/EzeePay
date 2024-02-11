import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate=useNavigate();
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome to EzeePay</h1>
  
        <div className="flex justify-center">
          <button
            className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray mr-10"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
  
          <button
            className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  