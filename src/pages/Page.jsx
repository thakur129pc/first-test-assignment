import { useEffect, useState } from "react";
import "./page.css";

// Checkbox icon component
const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={25}
    height={25}
    fill={"none"}
  >
    <path
      d="M5 14L8.5 17.5L19 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Page = () => {
  // Array to save initial list of pages
  const PagesList = ["Page 1", "Page 2", "Page 3", "Page 4"];
  // State for managing "All" checkbox
  const [allCheck, setAllCheck] = useState(false);
  // State to save selected pages
  const [selectedPages, setSelectedPages] = useState([]);
  // Combined State to manage the list of pages
  const [pagesStates, setPagesStates] = useState(
    PagesList.reduce((acc, page) => ({ ...acc, [page]: false }), {})
  );

  // Function to select all the pages at once
  const selectAllPages = (isSelected) => {
    setAllCheck(isSelected);
    if (isSelected) {
      // Will select all the pages if we select "All" checkbox
      setPagesStates(
        PagesList.reduce((acc, page) => ({ ...acc, [page]: true }), {})
      );
    } else {
      // Will un-select all the pages if we un-select "All" checkbox
      setPagesStates(
        PagesList.reduce((acc, page) => ({ ...acc, [page]: false }), {})
      );
    }
  };

  // Function to select the page
  const handlePageCheckbox = (page) => {
    // Will select the selected page
    setPagesStates((prevStates) => ({
      ...prevStates,
      [page]: !prevStates[page],
    }));
  };

  // Function to handle "Done" button
  const handleSubmit = () => {
    // To fetch and set the selected pages
    setSelectedPages(
      Object.keys(pagesStates).filter((key) => pagesStates[key] === true)
    );
  };

  useEffect(() => {
    // Will check if all the pages are selected of not
    const isAllPagesSelected = Object.values(pagesStates).every(
      (value) => value === true
    );
    if (isAllPagesSelected) {
      // Will select the "All" checkbox if we select all the pages
      setAllCheck(true);
    } else {
      // Will un-select the "All" checkbox if we un-select any page
      setAllCheck(false);
    }
  }, [pagesStates]);

  return (
    <div className="pageDiv">
      <div className="container">
        <label htmlFor="all" className="checkbox-item">
          <div>All pages</div>
          <input
            id="all"
            className="displayHidden"
            type="checkbox"
            checked={allCheck}
            onChange={(e) => selectAllPages(e.target.checked)}
          />
          <span className="checkmark">
            <TickIcon />
          </span>
        </label>
        <hr />
        {/* List of all the pages */}
        {PagesList.map((page) => (
          <label
            key={page}
            htmlFor={page.split(" ").join("")}
            className="checkbox-item"
          >
            <div>{page}</div>
            <input
              id={page.split(" ").join("")}
              className="displayHidden"
              type="checkbox"
              checked={pagesStates[page]}
              onChange={() => handlePageCheckbox(page)}
            />
            <span className="checkmark">
              <TickIcon />
            </span>
          </label>
        ))}
        <hr />
        {/* Button */}
        <button className="done-button" onClick={() => handleSubmit()}>
          Done
        </button>
      </div>
      {/* To show selected pages */}
      <div style={{ marginTop: "15px" }}>
        <b>Selected Pages: </b>
        {selectedPages.length > 0
          ? selectedPages.join(", ")
          : "No page selected"}
      </div>
    </div>
  );
};

export default Page;
