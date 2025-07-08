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

//addPropertyAPI called by Add component
export const addPropertyAPI=async(reqBody,reqHeader)=>{
          return await commonAPI("POST",`${SERVER_URL}/add-property`,reqBody,reqHeader)
}

//userPropertyAPI called by view compoenent 
export const userPropertyAPI=async(reqHeader)=>{
          return await commonAPI("GET",`${SERVER_URL}/user-property`,{},reqHeader)
}

//userPropertyRemoveAPI called by View component 
export const userPropertyRemoveAPI=async(id,reqHeader)=>{
          return await commonAPI("DELETE",`${SERVER_URL}/properties/${id}/remove`,{},reqHeader)
}


//updatePropertyAPI called by Edit compoenent 
export const updatePropertyAPI=async(id,reqBody,reqHeader)=>{
          return await commonAPI("PUT",`${SERVER_URL}/properties/${id}/edit`,reqBody,reqHeader)
}


//allPropertyAPI called by properties page 
export const allPropertyAPI=async(searchKey,reqHeader)=>{
          return await commonAPI("GET",`${SERVER_URL}/all-properties?search=${searchKey}`,{},reqHeader)
}

//getPropertyDetailsAPI called by PropertyDetails page
export const getPropertyDetailsAPI = (propertyId, reqHeader) => {
  return commonAPI("GET", `${SERVER_URL}/properties/${propertyId}`, "", reqHeader)
}

//addBookmarkAPI  called by properties page
export const addBookmarkAPI = (propertyId, reqHeader) => {
  return commonAPI('POST', `${SERVER_URL}/bookmark/${propertyId}`, {}, reqHeader);
};

//removeBookmarkAPI  called by properties page
export const removeBookmarkAPI = (propertyId, reqHeader) => {
  return commonAPI('DELETE', `${SERVER_URL}/bookmark/${propertyId}`, {}, reqHeader);
};

//getBookmarksAPI  called by properties page
export const getBookmarksAPI = (reqHeader) => {
  return commonAPI('GET', `${SERVER_URL}/bookmark`, {}, reqHeader);
};

//getUserBookmarksAPI  called by BookmarkedProperties page
export const getUserBookmarksAPI = (reqHeader) => {
  return commonAPI('GET', `${SERVER_URL}/bookmark`, {}, reqHeader);
};
