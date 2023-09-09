import { useState, useEffect } from "react";
import {
  buildListOfStudentsWithGender,
  findTwoRandomStudents,
  shuffleArray,
} from "./functions";
import logo from "/icon128.png";
import "./App.css";
import fakes from "./fakes.json";

const buttonClassName =
  "bg-sky-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow hover:shadow-lg";

function getBgForStatus(status) {
  switch (status) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-400";
    default:
      return "bg-indigo-400";
  }
}

function getTitleForStatus(status) {
  switch (status) {
    case "success":
      return "Oui !";
    case "error":
      return "Non :(";
    default:
      return "Qui suis-je ?";
  }
}

function App() {
  const genderedList = buildListOfStudentsWithGender(fakes);
  useEffect(() => {
    console.log("genderedList", genderedList);
    setCurrentList(genderedList);
  }, [fakes]);
  const [currentList, setCurrentList] = useState([]);
  const [mistakesList, setMistakesList] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("wait");
  const reset = () => {
    setCurrentList(genderedList);
    setMistakesList([]);
    setCount(0);
  };
  const replayMistakes = () => {
    setCurrentList(mistakesList);
    setMistakesList([]);
    setCount(0);
  };
  const twoRandoms = findTwoRandomStudents(currentList[count], genderedList);
  const threeProposals = shuffleArray(twoRandoms.concat(currentList[count]));
  const checkAnswer = (student) => {
    console.log(
      "given answer:",
      student,
      "right answer:",
      currentList[count].firstname
    );
    if (student.url === currentList[count].url) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };
  const seeNext = () => {
    // setCurrentList(removeItemFromList(currentList, currentList[count]));
    if (status === "error") {
      setMistakesList([...mistakesList, currentList[count]]);
    }
    setStatus("wait");
    setCount(count + 1);
  };
  if (count === currentList.length) {
    return (
      <div className="content flex justify-center">
        <div
          className={`${getBgForStatus(status)} p-8 w-80 h-[700px] relative`}
        >
          <div className="w-full flex justify-center">
            <img src={logo} alt="Mystery student" />
          </div>
          <p className="mt-8 text-white font-extralight text-4xl uppercase text-center">
            FÉLICITATIONS
          </p>
          <div className="mt-4 text-center">
            {mistakesList.length === 0 ? (
              <div>
                <p className="mt-2">Vous avez reconnu</p>
                <p>tous les élèves !</p>
              </div>
            ) : (
              <div>
                <p>
                  Vous avez fait{" "}
                  <span className="font-bold">{mistakesList.length} </span>
                  erreurs
                </p>
                <p>
                  Vous pouvez améliorer votre score en rejouant uniquement les
                  erreurs.
                </p>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
            {mistakesList.length !== 0 && (
              <button
                className={`w-full ${buttonClassName}`}
                onClick={() => replayMistakes()}
              >
                Reprendre les erreurs
              </button>
            )}
            <button
              className={`mt-4 w-full ${buttonClassName}`}
              onClick={() => reset()}
            >
              Relancer le jeu
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="content flex justify-center">
      <div className={`${getBgForStatus(status)} p-8 w-80 h-[700px] relative`}>
        <div className="w-full flex justify-center">
          <img
            src={currentList[count] ? currentList[count].url : logo}
            alt="Mystery student"
          />
        </div>
        <p className="mt-6 text-white font-extralight text-4xl uppercase text-center">
          {getTitleForStatus(status)}
        </p>
        <div className="text-center mt-4">
          {status === "success" && (
            <div className="mt-2">
              <p>
                Je suis bien{" "}
                <span className="font-bold">
                  {currentList[count].firstname} {currentList[count].lastname}
                </span>
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="mt-2">
              <p>
                Je suis{" "}
                <span className="font-bold">
                  {currentList[count].firstname} {currentList[count].lastname}
                </span>
              </p>
            </div>
          )}
          {status === "wait" &&
            threeProposals.map((student) => (
              <button
                key={student?.url}
                className={`mt-3 w-full ${buttonClassName}`}
                onClick={() => checkAnswer(student)}
              >
                <p className="">
                  {student?.firstname} {student?.lastname}
                </p>
              </button>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
          {status !== "wait" && (
            <button
              className={`mt-8 w-full ${buttonClassName}`}
              onClick={() => seeNext()}
            >
              Voir le suivant
            </button>
          )}
          <p className="mt-8 text-sm font-light text-center">
            {currentList.length - count} élèves restants sur{" "}
            {currentList.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
