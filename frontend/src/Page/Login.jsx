import React from 'react';
import {IoLogoGoogleplus} from 'react-icons/io';
import {IoLogoFacebook, IoLogoTwitter} from "react-icons/io5";
import { useHistory } from 'react-router-dom';

import Loginerror from "../Page/Loginerror.jsx";
import { MdTimer } from "react-icons/md";



function Login() {
    const history = useHistory();

    const handlepage = () => {
        history.push('/signup');
    }

    const Myicon = () => {
        return (
            <div className="socialcontainer flex justify-center items-center">

                <button type="button"
                        className="w-10 h-10 flex justify-center items-center mx-2 rounded-full shadow-lg cursor-pointer">
                    <IoLogoGoogleplus/>
                </button>

                <button type="button"
                        className="w-10 h-10 flex justify-center items-center mx-2 rounded-full shadow-lg cursor-pointer">
                    <IoLogoFacebook/>
                </button>

                <button type="button"
                        className="w-10 h-10 flex justify-center items-center mx-2 rounded-full shadow-lg cursor-pointer">
                    <IoLogoTwitter/>
                </button>

            </div>


        );
    }


    return (
        <div>
            <div className="flex items-center justify-center text-center text-5sm font-bold text-sky-400 my-5">
                <h1 className="inline-flex items-center">LEARNING MATE</h1>
                <MdTimer className="inline-block "/>
            </div>
            <div className="mx-auto max-w-md">
                {/*로그인 모듈*/}
                <div className="bg-white-200 p-6 rounded-lg w-full ">
                    <div className="text-4xl font-bold text-center">
                    <h2>Welcome back!</h2>
                    </div>
                    <div className="my-5">
                        <Myicon/>
                    </div>
                    <div className="text-center mb-4">
          <span className="text-xs text-black tracking-wider mb-4 text-center">
            or use your account
          </span>
                    </div>
                    <div>
                        <Loginerror/>
                    </div>


                </div>
                {/*회원가입 모듈*/}
                <div className="bg-white p-6 rounded-lg mt-4 w-full shadow-md">
                    <div className="text-zinc-800 text-2xl text-center font-bold mb-4 text-left">
                        <h2>Hello, Friend!</h2>
                    </div>
                    <div >
                        <div className="text-black text-sm  text-center ">
                            아직 계정이 없으신가요?
                        </div>
                        <div className="p-5 text-center">
                            <button
                                className="relative  text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-transparent hover:text-sky-400 transition duration-300 w-20 h-5"
                                onClick={handlepage}
                            >
                                <span className="relative z-10 items-center text-sm">회원가입</span>
                                <span
                                    className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-0 transition duration-300"></span>
                            </button>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


