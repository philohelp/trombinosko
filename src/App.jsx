import "./App.css";
import { useState, useEffect } from "react";

import FinalScreen from "./screens/final_screen";
import GameScreen from "./screens/game_screen";
import Layout from "./ui/layout";
import Message from "./ui/message";

import {
  buildListOfStudentsWithGender,
  findTwoRandomStudents,
  shuffleArray,
  buildDataArrayFromImageUrls,
} from "./functions";

import fakeUrls from "./fakeCelebritiesUrls.json";

function App({ dataArray }) {
  const genderedList = buildListOfStudentsWithGender(dataArray);
  const shuffledList = shuffleArray(genderedList);
  useEffect(() => {
    setCurrentList(shuffledList);
  }, [dataArray]);
  const [currentList, setCurrentList] = useState([]);
  const [mistakesList, setMistakesList] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("guess");
  const reset = () => {
    setCurrentList(shuffledList);
    setMistakesList([]);
    setCount(0);
    setStatus("guess");
  };
  const replayMistakes = () => {
    setCurrentList(mistakesList);
    setMistakesList([]);
    setCount(0);
    setStatus("guess");
  };
  const twoRandoms = findTwoRandomStudents(currentList[count], genderedList);
  const threeChoices = shuffleArray(twoRandoms.concat(currentList[count]));
  const checkAnswer = (student) => {
    if (student.url === currentList[count].url) {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  };
  const goOn = () => {
    if (status === "fail") {
      setMistakesList([...mistakesList, currentList[count]]);
    }
    if (count + 1 === currentList.length) {
      setCount(count + 1);
      if (mistakesList.length === 0) {
        setStatus("finalWithoutMistakes");
      } else {
        setStatus("finalWithMistakes");
      }
      return;
    }
    setStatus("guess");
    setCount(count + 1);
  };
  if (count === currentList.length) {
    return (
      <FinalScreen
        numberOfMistakes={mistakesList.length}
        reset={reset}
        replayMistakes={replayMistakes}
      />
    );
  }
  return (
    <GameScreen
      status={status}
      currentList={currentList}
      count={count}
      checkAnswer={checkAnswer}
      goOn={goOn}
      threeChoices={threeChoices}
    />
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
        <Message text="Vérification des images..." />
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
      }, 3000);
    }
  }, []);
  if (loading) {
    return (
      <Layout status="welcome">
        <Message text="Merci de patienter pendant le chargement des images..." />
      </Layout>
    );
  }
  return <CheckDataArray imageUrls={imageUrls} />;
}

export default AppWithData;
