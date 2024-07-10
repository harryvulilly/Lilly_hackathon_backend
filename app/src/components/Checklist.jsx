import React, { useState } from "react";
import imageUrl from "../send.png"; 
import imageUrlSent from "../sent.png"; 
import logo from "../logo.jpg"; 


function Checklist({ data, name, handleSendButton }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [buttonVisibility, setButtonVisibility] = useState("visible");
  const [sendText, setSendText] = useState("");

  
  function handleSendButton(e) {
    setButtonVisibility("hidden");
    setSendText("Email sent!");
  }
  const handleCheckboxChange = (key) => {
    setCheckedItems({
      ...checkedItems,
      [key]: !checkedItems[key],
    });
  };
  return (
    <div>
      {" "}
      <div className = "flex-center">
      <h3> Employee: {name} (kevin.hart@lilly.com) </h3>
      <h3> Status: New Hire, Start Date 07/15/2024 </h3>
     {/* <h3> Project: Empowered Carterra Data Analytics Platform </h3> */}
     <h2 className="text-2xl font-bold mb-4 text-black"> Document Preview </h2>
      </div>
      <div className="checklist p-8 bg-white border border-gray-300 shadow-lg rounded-lg">
        {" "}
        {/* Updated this line */}
        <div className = "header flex justify-between items-center mb-4"> {/*this is the div with name and send*/}
          <div  className="header-left flex items-center"><img src={logo} width = {100} height={100} />  </div>
          <div className="header-right flex items-center">
          {buttonVisibility === "visible" && (
            <button
              className="bg-white border-[1px] p-2.5 rounded-2xl text-xl text-black"
              onClick={(e) => handleSendButton(e)}
            >
              <img src={imageUrl} width={50} height={50} />
              Send
            </button>
          )}{" "}
          {buttonVisibility === "hidden" && (
            <img src={imageUrlSent} width={50} height={50} />
          )}
          <div className= "p-2.5 rounded-2xl text-xl text-black"> {sendText}</div>
          </div>
          </div>

        <h2 className="text-2xl font-bold mb-4 text-black">
          {" "}
          {name}'s Onboarding Checklist
        </h2>
        
        <h3> Project Title: Empowered Carterra Data Analytics Platform </h3>
        <h3 className="text-xl font-bold mb-4 text-black"> Software Access</h3>
        <ul className="list-disc pl-8">
          {Object.entries(data).map(([key, value]) => (
            <li key={key} className="mb-2 flex flex-col items-start text-black">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <strong>{key}</strong>
              </div>
              <a
                href={value[1]}
                className="ml-4 text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {value[1]}
              </a>
              <pre className="ml-4 whitespace-pre-wrap">{value[0]}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Checklist;
