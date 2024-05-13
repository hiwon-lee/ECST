import 'react-datepicker/dist/react-datepicker.css';
import React, {useEffect, useState} from 'react';
import {CgProfile} from "react-icons/cg";
import {Link} from "react-router-dom";
import axios from "axios";

function Mypage() {


    const [user, setUser] = useState("로그인 필요");
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            if (location.state && location.state.email) {
                // 서버에서 받은 응답 데이터에서 사용자 이메일을 가져옴
                const email = location.state.email;
                console.log(email);

                // study_todo 가져오기 위한 axios
                const response = await axios.get("http://127.0.0.1:8000/api/study/", {
                    params: {
                        email: email,
                    },
                });
                setUser(response.data.user);

                console.log(response.data.feeds);
                await setStudy(response.data.feeds);
                setisLoading(false);
            } else {
                // 로그인 필요한 경우
                setUser("로그인 필요");
                //setStudy([]);
                setisLoading(true);
                if (!location.state || !location.state.email) {
                    history.push("/login");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Calendar = () => {
        const [selectedDate, setSelectedDate] = useState(new Date());

        return (
            <DatePicker
                dateFormat="yyyy.MM.dd" // 날짜 형태
                shouldCloseOnSelect={true} // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
            />
        );
    };

    const MenuBtn = () => {
        return (
            <nav className="menu" style={{textAlign: "center"}}>
                <div>
                    <Link to="/" className="m-5 outline-none custom-btn btn-1 text-xl">
                        홈
                    </Link>
                    <Link
                        to="/focus-analysis"
                        className="m-5 outline-none custom-btn btn-1 text-xl">
                        집중도 분석
                    </Link>
                    <Link
                        to="/my-page"
                        className="m-5 outline-none custom-btn btn-1 text-xl">
                        마이페이지
                    </Link>
                </div>
            </nav>
        );
    };
    const handletologin = () => {
        history.push("/login");
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="text-5xl font-bold ml-6">
                    <h1>Learning Mate</h1>
                </div>
                <div style={{textAlign: "center", margin: "10px", marginTop: "30px"}}>
                    <div
                        className="items-center"
                        style={{marginLeft: "auto", marginRight: "auto", width: "50%"}}>
                        <CgProfile className="text-3xl text-left"/>
                    </div>
                    <div onClick={handletologin}>{user}</div>
                </div>
            </div>
            <hr/>
            {/*메뉴바*/}
            <div className="p-2 bg-sky-300 text-white font-bold">
                <MenuBtn/>
                {/*{user}*/}
            </div>
            <hr/>


            <h1>내 정보로 가득참</h1>
        </div>

    );
}

export default Mypage;