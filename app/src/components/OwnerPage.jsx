import React, { useState } from "react";
import Checklist from "./Checklist.jsx";
import imageUrl from "../send.png"; // Import the image
import imageUrlSent from "../sent.png"; // Import the image

function OwnerPage() {
  const [items, setItems] = useState([]);
  const [buttonVisibility, setButtonVisibility] = useState("visible");
  const [searchTerm, setSearchTerm] = useState("");
  const [sendText, setSendText] = useState("");
  const [checklistData, setChecklistData] = useState({});

  const employee = "Ellie";
  const initialOptions = [
    "Confluence",
    "Jira",
    "Github",
    "VSCode",
    "Biologica",
  ];

  const additionalOptions = [
    "JFrog Artifactory",
    "Xray Platform",
    "HPC Artifactory",
    "Docker Desktop",
    "Postgres DB",
    "AWS",
    "PGAdmin",
  ];

  const [optionLinks, setOptionLinks] = useState({
    "Confluence": "https://lilly-confluence.atlassian.net/wiki",
    "Jira": "link",
    "Github": "link",
    "VSCode": "link",
    "Biologica": "link",
    "JFrog Artifactory": "link",
    "Xray Platform": "link",
    "HPC Artifactory": "link",
    "Docker Desktop": "link",
    "Postgres DB": "link",
    "AWS": "link",
    "PGAdmin": "link",
  });

  const [optionDefinitions, setOptionDefinitions] = useState({
    "Confluence": "A collaboration tool used for project management.",
    "Jira": "A tool used for issue and project tracking.",
    "Github": "A platform for version control and collaboration.",
    "VSCode": "A source-code editor made by Microsoft.",
    "Biologica": "Biological instructions and data management tool.\nStart here and install!",
    "JFrog Artifactory": "Additional option 4 definition.",
    "Xray Platform": "Additional option 5 definition.",
    "HPC Artifactory": "Additional option 6 definition.",
    "Docker Desktop": "Additional option 7 definition.",
    "Postgres DB": "Additional option 8 definition.",
    "AWS": "Additional option 9 definition.",
    "PGAdmin": "Additional option 10 definition.",
  });

  function handleSendButton(e) {
    setButtonVisibility("hidden");
    setSendText("Email sent!");
  }

  const addItem = (item) => {
    setItems([...items, item]);
    setChecklistData((prevChecklistData) => ({
      ...prevChecklistData,
      [item]: [optionDefinitions[item], optionLinks[item]],
    }));
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i !== item));
    setChecklistData((prevChecklistData) => {
      const updatedChecklistData = { ...prevChecklistData };
      delete updatedChecklistData[item];
      return updatedChecklistData;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [newOption, setNewOption] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleNewDefinitionChange = (event) => {
    setNewDefinition(event.target.value);
  };

  const handleNewLinkChange = (event) => {
    setNewLink(event.target.value);
  };

  const addNewOption = () => {
    setOptionDefinitions((prevDefinitions) => ({
      ...prevDefinitions,
      [searchTerm]: newDefinition,
    }));
    setOptionLinks((prevLinks) => ({
      ...prevLinks,
      [searchTerm]: newLink,
    }));
    addItem(searchTerm);
    setNewOption("");
    setNewDefinition("");
    setNewLink("");
  };

  const filteredAdditionalOptions = searchTerm
    ? additionalOptions.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleDefinitionChange = (item, newDefinition) => {
    setOptionDefinitions((prevDefinitions) => ({
      ...prevDefinitions,
      [item]: newDefinition,
    }));
    setChecklistData((prevChecklistData) => ({
      ...prevChecklistData,
      [item]: [newDefinition, optionLinks[item]],
    }));
  };

  const handleLinkChange = (item, newLink) => {
    setOptionLinks((prevLinks) => ({
      ...prevLinks,
      [item]: newLink,
    }));
    setChecklistData((prevChecklistData) => ({
      ...prevChecklistData,
      [item]: [optionDefinitions[item], newLink],
    }));
  };

  return (
    <div className="owner-page p-8">
      <h2 className="text-2xl font-bold mb-4">Owner Page: Select Access</h2>
      <h3> Employee: {employee} </h3>
      <h3> Employee email: ellie.isnew@lilly.com </h3>
      <h3> Employee start date: 07/15/2024 </h3>
      <h4>
        Instructions: Select technologies and preview what {employee} will see!{" "}
      </h4>
      <div className="flex flex-row">
        <div className="flex-1 mr-8">
          <h3 className="text-xl font-bold mb-4">Selected: </h3>
          <ul className="list-disc pl-8 mb-4">
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => removeItem(item)}
                >
                  - {item}
                </button>

                <div>
                  <label htmlFor={`link-${item}`}> Link: </label>
                </div>
                <div>
                  <textarea
                    type="text"
                    id={`link-${item}`}
                    value={optionLinks[item]}
                    onChange={(e) => handleLinkChange(item, e.target.value)}
                    className="border px-2 py-1 w-full text-black"
                    rows="1"
                  />
                </div>
                <div>
                  <label htmlFor={`definition-${item}`}> Instructions: </label>
                </div>
                <div>
                  <textarea
                    type="text"
                    id={`definition-${item}`}
                    value={optionDefinitions[item]}
                    onChange={(e) =>
                      handleDefinitionChange(item, e.target.value)
                    }
                    className="border px-2 py-1 w-full text-black"
                    rows="3"
                  />
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-4">Commonly Used</h3>
          <ul className="flex flex-wrap list-none pl-0 mb-4">
            {initialOptions.map((option, index) => (
              <li key={index} className="mb-2 mr-4 flex items-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => addItem(option)}
                >
                  + {option}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-4">Search Additional Options</h3>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-4 py-2 mb-4 text-black"
          />
          <ul className="list-disc pl-8">
            {filteredAdditionalOptions.map((option, index) => (
              <li key={index} className="mb-2 flex items-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => addItem(option)}
                >
                  + {option}
                </button>
              </li>
            ))}
            {filteredAdditionalOptions.length === 0 && searchTerm && (
              <div>
                <p className="mb-2">No matches found. Add a new option:</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={addNewOption}
                >
                  Add New Option
                </button>
              </div>
            )}
          </ul>
        </div>
        <div className="flex-1">
          <Checklist data={checklistData} name={employee} />
        </div>
      </div>
      <div className="pt-5 flex justify-center">
        <div>
          {buttonVisibility === "visible" && (
            <button
              className="bg-white border-[1px] p-2.5 rounded-2xl text-xl text-black"
              onClick={(e) => handleSendButton(e)}
            >
              <img src={imageUrl} width={100} height={100} />
              Send
            </button>
          )}{" "}
          {buttonVisibility === "hidden" && (
            <img src={imageUrlSent} width={100} height={100} />
          )}
          <div> {sendText}</div>
        </div>
      </div>
    </div>
  );
}

export default OwnerPage;
