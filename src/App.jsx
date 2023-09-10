import "./App.css";
import { useState, useEffect } from "react";

import Layout from "./ui/layout";

import {
  buildListOfStudentsWithGender,
  findTwoRandomStudents,
  shuffleArray,
  buildDataArrayFromImageUrls,
} from "./functions";

import logo from "/icon128.png";

import fakes from "./fakes.json";
import fakeUrls from "./fakeUrls.json";

const buttonClassName =
  "bg-sky-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow hover:shadow-lg";

function getBgForStatus(status) {
  switch (status) {
    case "success":
      return "bg-green-500";
    case "fail":
      return "bg-red-400";
    default:
      return "bg-indigo-400";
  }
}

function getTitleForStatus(status) {
  switch (status) {
    case "success":
      return "Oui !";
    case "fail":
      return "Non :(";
    default:
      return "Qui suis-je ?";
  }
}

function App({ dataArray }) {
  const genderedList = buildListOfStudentsWithGender(dataArray);
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
    if (student.url === currentList[count].url) {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  };
  const seeNext = () => {
    if (status === "fail") {
      setMistakesList([...mistakesList, currentList[count]]);
    }
    setStatus("wait");
    setCount(count + 1);
  };
  if (count === currentList.length) {
    return (
      <div className="content flex justify-center">
        <div
          className={`${getBgForStatus(status)} p-8 w-80 h-[600px] relative`}
        >
          <div className="w-full flex justify-center">
            <img src={logo} alt="Mystery student" />
          </div>
          <p className="mt-8 text-white font-extralight text-4xl uppercase text-center">
            {mistakesList.length === 0 ? "FÉLICITATIONS" : "FIN DE LA PARTIE !"}
          </p>
          <div className="mt-6 text-center">
            {mistakesList.length === 0 ? (
              <div>
                <p>Vous avez reconnu</p>
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
      <div className={`${getBgForStatus(status)} p-8 w-80 h-[600px] relative`}>
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
          {status === "fail" && (
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
                <p className="text-sm">
                  {student?.firstname} {student?.lastname}
                </p>
              </button>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
          {status !== "wait" && (
            <div className="mt-8">
              <button
                className={`w-full ${buttonClassName}`}
                onClick={() => seeNext()}
              >
                Voir le suivant
              </button>
              <p className="mt-8 text-sm font-light text-center">
                {currentList.length - count - 1} élèves restants sur{" "}
                {currentList.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckDataArray({ imageUrls }) {
  const [dataArray, setDataArray] = useState([]);
  const [greenLight, setGreenLight] = useState(false);
  useEffect(() => {
    if (imageUrls.length === 0) {
      return;
    }
    const { students, mistakes } = buildDataArrayFromImageUrls(imageUrls);
    setDataArray(students);
    setGreenLight(true);
  }, [imageUrls]);
  if (!greenLight) {
    return (
      <Layout status="check">
        <p className="text-white text-center text-sm opacity-70 mt-8">
          Vérification des images...
        </p>
      </Layout>
    );
  }
  return <App dataArray={dataArray} />;
}

function AppWithData() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome?.tabs) {
      console.log("chrome detected, I'll fetch the data");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(
          activeTab.id,
          { message: "fetch_images" },
          function (response) {
            console.log("images are fetched", response?.imageUrls);
            setImageUrls(response?.imageUrls);
            setLoading(false);
          }
        );
      });
    } else {
      console.log("chrome not detected, I won't fetch the data");
      setTimeout(() => {
        setImageUrls(fakeUrls);
        setLoading(false);
      }, 10000);
    }
  }, []);
  if (loading) {
    return (
      <Layout status="welcome">
        <p className="text-white text-center text-sm opacity-70 mt-8">
          Merci de patienter pendant le chargement des images...
        </p>
      </Layout>
    );
  }
  return <CheckDataArray imageUrls={imageUrls} />;
}

export default AppWithData;
