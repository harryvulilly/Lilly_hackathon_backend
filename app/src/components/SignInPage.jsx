import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkUser = async (email, password) => {
    try {
      const response = await fetch("/checkuser", {
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
      <img
        alt="Lilly Corporate Center"
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Eli_Lilly_Corporate_Center%2C_Indianapolis%2C_Indiana%2C_USA.jpg"
        className="opacity-50 fixed -z-10 w-screen h-screen blur-md"
      />
      <div className="flex flex-col bg-white text-[#000000] w-1/3 py-5 px-10 rounded-lg">
        <label className="text-3xl text-center">Welcome to Lilly!</label>

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
