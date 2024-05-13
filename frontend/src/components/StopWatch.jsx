import React, {useState,useCallback} from "react";
// import "./StopWatch.css";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from '../TodoRedux/counterSlice'
import {studyStop} from "../TodoRedux/currTodo.jsx";

function StopWatch() {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const isStudy = useSelector((state) => state.todoModifier.isStudy);

    React.useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        if (isStudy) {
            handleStart()
        } else {
            handleReset()
        }
        return () => {
            clearInterval(interval);
        };


    }, [isActive, isPaused, isStudy]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        //setIsPaused(!isPaused);
        setIsPaused((isPaused) => !isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        dispatch(studyStop())
        setIsPaused(true);
        setTime(0);
        setTime(0);
    };

    return (
        <div className="flex space-x-10">
            <Timer time={time}/>
            <ControlButtons
                active={isActive}
                isPaused={isPaused}
                handleStart={handleStart}
                handlePauseResume={handlePauseResume}
                handleReset={handleReset}
            />
        </div>
    );
}

export default React.memo(StopWatch);
;
