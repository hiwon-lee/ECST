// src/utils/api.js
import { http } from "./http";
import { clearLocalStorage } from "./storage";

export const fetchData = async (email, setUser, setStudy, setisLoading, history, location) => {
  try {
    if (location.state && location.state.email) {
      const { data } = await http.get("/api/study/", { params: { email } });
      setUser(data.user);
      await setStudy(data.feeds);
      setisLoading(false);
    } else {
      setUser("로그인 필요");
      setisLoading(true);
      if (!location.state || !location.state.email) history.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveRecordConcentrate = async (email, date, data) => {
  try {
    const res = await http.post("/api/concentrate/record/", {
      study_user_email: email,
      concentrate_date: date,
      concentrate_average_value: data.average.toFixed(2),
      concentrate_time: data.count,
    });
    console.log("response", res);
  } catch (e) {
    console.error("Error saving data to database", e);
  }
};

export const getRecordConcentrate = async (email) => {
  try {
    const { data } = await http.get("/api/concentrate/record/", {
      params: { study_user_email: email },
    });
    return data;
  } catch (e) {
    alert("사용자정보가 잘못되었습니다.");
    console.error(e);
  }
};
