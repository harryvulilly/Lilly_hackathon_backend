import React, { useState } from "react";

function Checklist({ data, name }) {
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (key) => {
    setCheckedItems({
      ...checkedItems,
      [key]: !checkedItems[key],
    });
  };
  return (
    <div>
      {" "}
      Here's what {name} will see:
      <div className="checklist p-8 bg-white border border-gray-300 shadow-lg rounded-lg">
        {" "}
        {/* Updated this line */}
        <h2 className="text-2xl font-bold mb-4 text-black">
          {" "}
          {name}'s Onboarding Checklist
        </h2>
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
