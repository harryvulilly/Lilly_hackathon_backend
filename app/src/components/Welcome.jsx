import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scientist from "./assets/scientist.jpg"

function Welcome() {
  const [role, setRole] = useState("");

  // setRole should be based on result from fetch
  useEffect(() => {
    setRole("new-hire");
  }, []);

  return (
    <main className={`flex flex-col justify-center min-h-screen text-white`}>
      <div 
       className="min-w-full min-h-screen fixed -z-10 opacity-30 bg-black"
      />
      <img
        alt="lilly scientist"
        src={Scientist}
        className="opacity-50 fixed -z-20 w-screen h-screen blur-md"
      />
      <div className="py-4 z-10">
        <h1 className="text-5xl text-center drop-shadow-xl">LillyOnboard</h1>
        <h2 className="pt-5 w-8/12 mx-auto text-3xl text-center drop-shadow-xl">
          One stop shop for new employees
        </h2>
      </div>

      <div className="pt-5 flex justify-center">
        <Link to={`${role}`} className="border-[1px] p-2.5 rounded-2xl text-xl drop-shadow-xl">
          Getting Started
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
