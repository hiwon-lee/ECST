import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import { useDispatch, useSelector, connect } from "react-redux";

import {
  todoElementMutator,
  studyStop,
  studyStart,
} from "../TodoRedux/currTodo.jsx";

import {} from //camState, STUDY_STATE
"../TodoRedux/Actions.jsx";
const Image = ({
  model_url,
  onPredict, handleStop,
  preview = true,
  size,
  info = true,
  interval = null,
  setGraphActive, graphActive,
}) => {
  const [prediction, setPrediction] = useState(null);
  let [webcam, setWebcam] = useState(null);
  const previewRef = React.useRef();
  const requestRef = React.useRef();
  const intervalRef = React.useRef();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);


  async function init() {
    const modelURL = model_url + "model.json";
    const metadataURL = model_url + "metadata.json";
    const model = await tmImage.load(modelURL, metadataURL);

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();


    setWebcam(webcam);
    setGraphActive(true); // 그래프 활성화
    console.log("graph 상채 : ", graphActive)

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(loop);
    } else {
      intervalRef.current = setTimeout(loop, interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(webcam.canvas);
    }

    async function loop() {
      if (webcam !== null) {
        webcam.update(); // update the webcam frame
        await predict();
      }
      if (interval === null) {
        requestRef.current = window.requestAnimationFrame(loop);
      } else {
        intervalRef.current = setTimeout(loop, interval);
      }

    }
    async function predict() {
      console.log("predict : ???wpqkf",isStudy);
      // predict can take in an image, video or canvas html element
      const prediction = await model.predict(webcam.canvas);
      setPrediction(prediction);

      if (onPredict) {
        onPredict(prediction);
        // console.log(prediction)
      }
    }
  }

  async function stop() {
    console.log("RJT껏다.")
    //if (webcam) {
    //   webcam.stop(); // 웹캠 정지
    //   setWebcam(null); // 웹캠 상태 초기화
      handleStop();
      setGraphActive(false);
      console.log("그래프 멈추라");
          console.log("graph 상채 stop : ", graphActive)

    //}

  }
  async function start() {
    init();
  }
  useEffect(() => {
    console.log("이미ㅣ장ㄴ : ", isStudy)
    if (isStudy) {
      console.log("시작 state detected");
      start();
      // stop();
      // setGraphActive(false); // 웹캠이 정지될 때 그래프도 비활성화
    } else {
      console.log("꺼짐")
      stop();
    }
    // else {
    //   console.log("Start state detected");
    //   start();
    //   // setGraphActive(true); // 웹캠이 시작될 때 그래프도 활성화
    // }


  }, [model_url, isStudy, setGraphActive, graphActive,studyStop]);



  let label = [];
  if (!isStudy) {
    // console.log("뚱!!!")
  }
  if (info && prediction) {
    label = (
      <table id="label-container">
        <thead>
          <tr>
            <td>class name</td>
            <td>probability</td>
          </tr>
        </thead>
        <tbody>
          {prediction.map((p, i) => (
            <tr key={i}>
              <td>{p.className}</td>
              <td>{p.probability.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
      <div>
        <div id="webcam-container" ref={previewRef}/>
        <div> status: {label}</div>


      </div>
  );
};
export default Image;
