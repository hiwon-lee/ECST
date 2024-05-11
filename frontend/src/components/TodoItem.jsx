import React, { useRef, useState } from "react";
import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { TiMediaStopOutline } from "react-icons/ti";
import PracticeCam from "./PracticeCam.jsx";
import Camerabtn from "./Camerabtn.jsx";

const TodoItem = ({
  todoItem,
  handleCheckbox,
  handleDelete,
  setEditText,
  setStream,
  stream,
    selectedItemId,
    onRadioChange
}) => {
  const videoRef = useRef(null);
  const [startActive, setStartActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStartActive(false);
      setStopActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setStartActive(true);
      setStopActive(false);
    }
  };

  return (
    <tr key={todoItem.id} className="border-b border-black">
      <td className="p-3 text-sm text-center">
        <span
          onClick={() => handleCheckbox(todoItem.id, todoItem.study_completed)}
          className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
            todoItem.study_completed ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {todoItem.study_completed ? "Done" : "Incomplete"}
        </span>
      </td>
      <td className="p-3 text-sm" title={todoItem.id}>
        {todoItem.study_todo}
      </td>
      <td className="p-3 text-sm font-medium">{todoItem.study_duration}</td>
      <td className="p-3 font-medium grid grid-flow-col items-center mt-3">
        <span className="text-3xl cursor-pointer">
          <label htmlFor="my-modal">
            <MdEditNote
              onClick={() => setEditText(todoItem)}
              className="text-xl cursor-pointer"
            />
          </label>
        </span>
        <span className="text-2xl  cursor-pointer">
          <MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} />
        </span>
      </td>
      <td className="p-3 text-sm" title={todoItem.id}>
        <input
          type="radio"
          id={todoItem.id}
          value={todoItem.id}
          checked={selectedItemId === todoItem.id}
          onChange={() => onRadioChange(todoItem.id, todoItem.study_todo)}
        />


      </td>
    </tr>
  );
};

export default TodoItem;
