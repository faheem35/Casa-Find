import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

//registerAPI called by Auth component
export const registerAPI=async(reqBody)=>{
          return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//loginAPI called by Auth component 
export const loginAPI=async(reqBody)=>{
          return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//adminLoginAPI called by AdminAuth component
export const adminLoginAPI=async(reqBody)=>{
          return await commonAPI("POST",`${SERVER_URL}/adminlogin`,reqBody)
}