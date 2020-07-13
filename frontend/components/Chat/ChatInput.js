import React, { useState, useEffect, useRef } from "react";

const ChatInput = ({ value, handleChangeValue, createMessage }) => {
  const [minRows, setMinRows] = useState(1);
  const [maxRows, setMaxRows] = useState(4);
  const [rows, setRows] = useState(1);
  const textAreaRef = useRef(null);
  const updateRows = () => {
    if (value !== "") {
      const textareaLineHeight = 24;
      const previousRows = event.target.rows;
      event.target.rows = minRows; // reset number or rows in text area
      const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
      if (currentRows === previousRows) {
        event.target.rows = currentRows;
      }
      if (currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }
      setRows((p) => (currentRows < maxRows ? currentRows : maxRows));
    } else {
      setRows((p) => 1);
    }
  };

  useEffect(updateRows, [value]);
  return (
    <div className="flex items-end flex-grow relative px-2 sm:pr-10 my-2 mx-4 sm:mx-0 rounded-lg border bg-white border-gray-400">
      <textarea
        ref={textAreaRef}
        type="textarea"
        id="about"
        onChange={(e) => {
          handleChangeValue(e);
        }}
        value={value}
        rows={rows}
        className="w-full h-full resize-none appearance-none py-2  focus:outline-none"
      />
      <div
        onClick={() => {
          createMessage();
        }}
        className="ml-2"
      >
        {value.length !== 0 && (
          <svg
            className="h-5 w-5 mb-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm2 8v5H8v-5H5l5-5 5 5h-3z" />
          </svg>
        )}
      </div>
    </div>
  );
};
export default ChatInput;
