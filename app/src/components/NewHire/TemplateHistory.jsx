import React from "react";
import Navigation from "../Navigation";
import template from "./templates/template01.png"

function TemplateHistory() {
  return (
    <div>
      <Navigation />

      <h1 className="text-3xl text-center my-2.5">Past Templates</h1>

      <div className="grid grid-rows-2 grid-cols-3 gap-5 px-2.5 mb-5 w-full text-center">
        {Array.from(Array(5)).map((_, index) => (
          <div className="px-5 py-2.5 border-black border-2">
            <img 
              alt={`Template ${index}`}
              src={template}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateHistory;
