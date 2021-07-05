import { createStore } from "vuex";
import axios from "axios"
import { BASE_API_URL } from "../constants"
export default createStore({
  state: {
    // profile: { Demo
    //   id: 1,
    //   name: "John Doe",
    //   email: "john@gmail.com"
    // }
    profile: null, // object กำหนดค่าเริ่มต้นให้เป็น null จะ check ง่ายด้วย ?.
  }, // ประกาศ global state
  mutations: {// เอาไว้ change state
    SET_USER_PROFILE( state, newProfile ) { // newProfile คือ payload คือข้อมูลใหม่
      state.profile = newProfile
    }
  }, 
  actions: {
    // สำหรับ dipatch สำหรับ asynchronous สามารถใช้ได้ทั้ง sync และ async commit สำหรับ sync เท่านั้น
    async getProfile( { commit } ) {

      // get profile from backend
      // const newProfile = { id: 1, name: "Mary", email: "mary@gmail.com"} Test Demo
      const token = JSON.parse(localStorage.getItem("token"))

      if(token) { // ถ้ามี token (login แล้ว) ให้ไปดึงข้อมูล มาจาก backend 
        const response = await axios.get(`${BASE_API_URL}/api/profile`, { 
          headers: { Authorization: "Bearer " + token.access_token } // ส่ง token หลัง Bearer ต้องเว้นวรรคด้วยนะ
        })
        const newProfile = JSON.parse(JSON.stringify(response.data?.data.user))
        commit("SET_USER_PROFILE", newProfile)
      }
    }
  }, 

    
  modules: {},
});
