import React from "react";
import Navigation from "../Navigation";

function TemplateHistory() {
  return (
    <div>
      <Navigation />

      <h1 className="text-3xl text-center my-2.5">Past Templates</h1>
      
      <div className="grid grid-rows-2 grid-cols-3 gap-5 px-2.5 w-full text-center">
        {Array.from(Array(6)).map((_, index) => ( 
          <div className="px-5 py-2.5 h-40 border-black border-2">
            Template {index}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateHistory;
