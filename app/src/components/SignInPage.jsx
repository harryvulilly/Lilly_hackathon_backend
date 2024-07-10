import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LCC from "./assets/LCC.jpg"

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.access) {
        console.log("User exists:", data);
      } else {
        console.log("No user found", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  checkUser(email, password);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center">
      <div 
       className="min-w-full min-h-screen fixed -z-10 opacity-30 bg-black"
      />

      <img
        alt="Lilly Corporate Center"
        src={LCC}
        className="opacity-50 fixed -z-20 w-screen h-screen blur-md"
      />
      <div className="flex flex-col bg-white text-[#000000] w-1/3 py-5 px-10 rounded-lg">
        <label className="text-3xl text-center">Welcome to LillyOnboard!</label>

        <label htmlFor="email" className="text-xl">
          Lilly Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-[#000000] rounded-md py-2.5 px-2.5 -mx-2.5 my-2"
        />
        <label htmlFor="password" className="text-xl">
          Passphrase
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-[#000000] rounded-md py-2.5 px-2.5 -mx-2.5 my-2"
        />

        <div className="pt-5 flex justify-center">
          <button
            onClick={(e) => handleSubmit(e)}
            className="border-[1px] border-black p-2.5 rounded-2xl text-xl"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
