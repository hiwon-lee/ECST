import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import EmailorPwdError from "../components/EmailorPwdError.jsx";
import { http } from "../Utils/http";


function Loginerror() {

    const history = useHistory();

    //로그인 요소
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    //이메일 혹은 비밀번호 잘못 입력 시, 오류 모달창
    const [errormodal, setErrormodal] = useState(false);
    const USER_EMAIL = "user_email";
  const handlesignin = async () => {
    console.log("로그인 성공");
    try {
      // 백엔드가 GET /api/login/ 를 받는다고 하셨으니 그대로 둡니다.
      const { data } = await http.get("/api/login/", {
        params: {
          signin_email: email,
          signin_pwd: pwd,
        },
      });

      // 성공 처리
      console.log("login response:", data);
      localStorage.setItem(USER_EMAIL, email);

      history.push({
        pathname: "/",
        state: { email },
      });
    } catch (err) {
      console.error("로그인 실패:", err);
      setErrorMsg("이메일 혹은 비밀번호가 올바르지 않습니다.");
      setErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  const modalClose = () => {
    setErrorModal(false);
    setErrorMsg("");
  };

    return (

        <div>


            <form>
                <label htmlFor='signin_email'></label>
                <input
                    type='email'
                    id="signin_email"
                    className="bg-gray-200 border-none px-4 py-3 my-2 w-full"
                    name="signin_email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />
                <br/>
                <label htmlFor='signin_pwd'></label>
                <input
                    className="bg-gray-200 border-none px-4 py-3 my-2 w-full"
                    type='password'
                    id="signin_pwd"
                    name='signin_pwd'
                    value={pwd}
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <br/>
                <div className="text-center">
                    <button
                        type="button"
                        onClick={handlesignin}
                        className="relative bg-sky-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-transparent hover:text-black transition duration-300"
                    >

                        <span className="relative z-10">Sign in</span>
                        <span
                            className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-0 transition duration-300"></span>

                    </button>
                </div>
            </form>

            <div>
                <EmailorPwdError isOpen={errormodal} onClose={() => setErrormodal(false)}/>
            </div>

        </div>


    );

}

export default Loginerror;
