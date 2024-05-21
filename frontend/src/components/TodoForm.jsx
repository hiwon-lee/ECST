import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ user, setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    study_todo: "",
  });

  const handleChange = (e) => {
    setNewTodo({
      study_todo: e.target.value,
    });
  };

  const postTodo = async () => {
    try {
      // 가상 데이터 생성
      const todoData = {
        study_user_email: user,
        study_todo: newTodo.study_todo,
        study_duration: 0, // Initialize duration as '00:00:00'
        // study_duration: new Date().toISOString(), // 현재 시간을 ISO 형식으로 설정
        study_completed: false, // 기본값은 false로 설정
        study_status: new Date().toISOString(), // 현재 시간을 ISO 형식으로 설정
        study_description: "This is a sample description", // 예시 설명
        // user: 1, // 사용자 ID
      };
      console.log(todoData);

      // 서버로 데이터 전송
      const response = await axios.post(`http://127.0.0.1:8000/api/study/`, todoData);

      setTodos(prevTodos => [...prevTodos, response.data]);

      // 폼 비우기
      setNewTodo({
        study_todo: "",
      });

      // 데이터 다시 불러오기
      await  fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      postTodo();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodo.study_todo}
        className="input input-bordered input-info w-full max-w-xs"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={postTodo} className="btn btn-primary ml-2 border-gray-700 bg-white text-black hover:bg-gray-400 focus:outline-none focus:shadow-outline hover:text-black transition duration-300">
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
