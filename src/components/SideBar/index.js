import React from "react";

const Index = ({ selected, showScorePage, setCurrentQuestion }) => {
  return (
    <div
      className={`border-r-2 bg-green-100 border-black w-[300px] ${
        showScorePage && "hidden"
      }`}
    >
      <h1 className="mt-10 flex text-black font-bold justify-center">
        Review your answers
      </h1>
      <ul className="flex flex-col w-full px-4 mt-5">
        {selected.map((ans, index) => (
          <li
            key={index}
            className="my-2 text-black cursor-pointer border-2 rounded-xl p-2 border-gray-800 bg-violet-200"
            onClick={() => setCurrentQuestion(index)}
          >
            Question {index + 1} :{" "}
            {ans !== undefined ? ans.ans : `Not Answered`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
