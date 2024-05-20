import React, { useEffect, useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import { useSelector } from "react-redux";

const loadModel = async (model_url) => {
  const modelURL = model_url + "model.json";
  const metadataURL = model_url + "metadata.json";
  return await tmImage.load(modelURL, metadataURL);
};

const setupWebcam = async (size) => {
  const flip = true; // whether to flip the webcam
  const webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  return webcam;
};

const predict = async (model, webcam, setPrediction, setResult, onPredict, calculateAverage) => {
  console.log("predict");
  const prediction = await model.predict(webcam.canvas);
  setPrediction(prediction);
  setResult(prediction);
  console.log("category", prediction);
  if (onPredict) {
    onPredict(prediction);
  }
  const concentration = prediction.find((p) => p.className === "Concentration");
  if (concentration) {
    calculateAverage(concentration.probability * 100);
  }
};

const loop = (webcam, predictFunc, interval, requestRef, intervalRef) => {
  if (webcam !== null) {
    webcam.update(); // update the webcam frame
    predictFunc();
  }
  if (interval === null) {
    requestRef.current = window.requestAnimationFrame(() => loop(webcam, predictFunc, interval, requestRef, intervalRef));
  } else {
    intervalRef.current = setTimeout(() => loop(webcam, predictFunc, interval, requestRef, intervalRef), interval);
  }
};

const Image = ({
  model_url,
  onPredict,
  preview = true,
  size,
  info = true,
  interval = null,
  setGraphActive,
  handleStart,
  handleStop,
}) => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [concentrationSum, setConcentrationSum] = useState(0);
  const [concentrationCount, setConcentrationCount] = useState(0);
  const [averageConcentration, setAverageConcentration] = useState(0);
  const [result, setResult] = useState("");
  let [webcam, setWebcam] = useState(null);
  const previewRef = useRef();
  const requestRef = useRef();
  const intervalRef = useRef();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);

  const calculateAverage = (newConcentration) => {
    setConcentrationSum((prevSum) => {
      const newSum = prevSum + newConcentration;
      setConcentrationCount((prevCount) => {
        const newCount = prevCount + 1;
        setAverageConcentration(newSum / newCount);
        return newCount;
      });
      return newSum;
    });
  };


  const start = async () => {
    const loadedModel = await loadModel(model_url);
    const setupWebcamInstance = await setupWebcam(size);

    setModel(loadedModel);
    setWebcam(setupWebcamInstance);

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(() =>
        loop(setupWebcamInstance, () => predict(loadedModel, setupWebcamInstance, setPrediction, setResult, onPredict, calculateAverage), interval, requestRef, intervalRef)
      );
      setGraphActive(true);
    } else {
      intervalRef.current = setTimeout(() =>
        loop(setupWebcamInstance, () => predict(loadedModel, setupWebcamInstance, setPrediction, setResult, onPredict, calculateAverage), interval, requestRef, intervalRef), interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(setupWebcamInstance.canvas);
    }
  };

  const stop = async () => {
    if (webcam) {
      webcam.stop(); // 웹캠 정지
      setWebcam(null); // 웹캠 상태 초기화
      console.log("그래프 멈추라");
    }
  };

  useEffect(() => {
    if (!isStudy) {
      setGraphActive(false);
      console.log("Stop state detected");
      stop();
      setGraphActive(false); // 웹캠이 정지될 때 그래프도 비활성화
    } else {
      console.log("Start state detected=========");
      start();
    }

    return () => {
      stop(); // 컴포넌트가 언마운트될 때 웹캠 정지
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
    };
  }, [model_url, isStudy, setGraphActive]);

  return (
    <div>
      <div id="webcam-container" ref={previewRef} />
      {result && (
        <div>
          현재 상태 : {result[0].className} {(result[0].probability * 100).toFixed(1) + "%"}
        </div>
      )}
      {info && (
        <div>
          <p>Average Concentration: {averageConcentration.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default Image;
