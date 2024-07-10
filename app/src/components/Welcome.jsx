import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [role, setRole] = useState("");

  // setRole should be based on result from fetch
  useEffect(() => {
    setRole("new-hire");
  }, []);

  return (
    <main className={`flex flex-col justify-center min-h-screen`}>
      <img
        alt="lilly scientist"
        src="https://cdn.thepharmaletter.com/files/2022/12/819984c0-74c3-11ed-8ccd-df2a7a949035-eli_lilly_science_large.jpg"
        className="opacity-50 fixed -z-10 w-screen h-screen blur-md"
      />
      <div className="py-4 z-10">
        <h1 className="text-5xl text-center">New Employee Resources</h1>
        <h2 className="pt-5 w-8/12 mx-auto text-3xl text-center">
          One stop shop for new employees
        </h2>
      </div>

      <div className="pt-5 flex justify-center">
        <Link to={`${role}`} className="border-[1px] p-2.5 rounded-2xl text-xl">
          Getting Started
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
