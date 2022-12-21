/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import ProgressBar from "./components/ProgressBar";
import questions from "./questions.json";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScorePage, setShowScorePage] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0); //all questions for 1 mark
  const [timeRemaining, setTimeRemaining] = useState(60); //random time
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (!isStopped) {
      if (timeRemaining > 0) {
        const timer = setTimeout(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        handleSubmit();
      }
    }
  }, [timeRemaining]);

  const handleSubmit = () => {
    setIsStopped(true);
    let newScore = 0;
    questions.forEach((question, index) => {
      question.options.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[index]?.ans &&
          (newScore += 1)
      );
    });
    setScore(newScore);
    setShowScorePage(true);
  };

  const handleAnswer = (answer) => {
    setSelectedOptions([(selectedOptions[currentQuestion] = { ans: answer })]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScorePage(true);
    }
  };

  const handlePrevQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScorePage(false);
    setSelectedOptions([]);
    setTimeRemaining(60);
    setIsStopped(false);
  };

  console.log(timeRemaining);

  return (
    <div className="bg-violet-200 flex">
      <SideBar
        selected={selectedOptions}
        showScorePage={showScorePage}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />

      <div className="flex-1 flex justify-center min-h-screen">
        <div className=" flex-col ">
          {showScorePage ? (
            <div className="mt-28">
              <h1 className="text-3xl font-semibold text-center text-black mb-10">
                Congratulations! You have sucessfully completed the test
              </h1>
              <p className="text-center text-xl text-black font-medium">
                Total Questions: {questions.length}
              </p>
              <p className="text-center text-xl text-black font-medium">
                Correct Answers: {score}
              </p>
              <h1 className="text-3xl font-semibold text-center text-black mt-10">
                Your score: {(score / questions.length) * 100}%
              </h1>
              <div className="flex justify-center mt-20">
                <button
                  onClick={restartQuiz}
                  className="w-[32%] py-3 font-semibold bg-white text-black border-[2px] border-stone-700 hover:bg-black hover:text-white rounded-lg"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          ) : (
            <>
              <ProgressBar progress={(timeRemaining / 60) * 100} />
              <h1 className="flex justify-end text-black font-semibold">
                Time Remaining: {timeRemaining}
              </h1>
              <div className="bg-white w-[900px] mt-28 space-x-2 h-min min-h-[300px] border-[2px] border-stone-800 rounded-2xl p-5 flex">
                <div className="flex flex-col  items-start w-full">
                  <h4 className="mt-10 text-xl text-black font-bold">
                    Question {currentQuestion + 1} / {questions.length}
                  </h4>
                  <div className="mt-4 text-lg text-black">
                    {questions[currentQuestion].question}
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  {questions[currentQuestion].options.map((answer, index) => (
                    <div
                      key={index}
                      className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-[2px] border-stone-800 cursor-pointer rounded-xl"
                      onClick={(e) => handleAnswer(answer.answer)}
                    >
                      <input
                        type="radio"
                        name={answer.answer}
                        value={answer.answer}
                        checked={
                          answer.answer ===
                          selectedOptions[currentQuestion]?.ans
                        }
                        onChange={(e) => handleAnswer(answer.answer)}
                        className="w-6 h-6 bg-black focus-within:border-green-500"
                      />
                      <p className="ml-6 text-black">{answer.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between w-full mt-4 text-black ">
                <button
                  onClick={handlePrevQuestion}
                  className="w-[49%] py-3 bg-white border-[2px] border-stone-700 hover:bg-black hover:text-white rounded-lg"
                >
                  Previous
                </button>
                <button
                  onClick={
                    currentQuestion + 1 === questions.length
                      ? handleSubmit
                      : handleNextQuestion
                  }
                  className="w-[49%] py-3 bg-white hover:bg-black border-[2px] border-stone-700 hover:text-white rounded-lg"
                >
                  {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
