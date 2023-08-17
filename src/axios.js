import axios from "axios";


const guide = axios.create({ baseURL: "http://localhost:5000" });
export const guideRequest = ({ ...options }) => {
  guide.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axerr", error);
    return error;
  };
  return guide(options).then(onSuccess).catch(onError);
};


const guest=axios.create({baseURL: "http://localhost:5000"})
export const guestRequest=({ ...options })  =>{
    guest.defaults.headers.common.Authorization=`Bearer ${localStorage.getItem("guesttoken")}`;
    const onSuccess=(response)=>response
    const onError=(error)=>{
        return error
    };
    return guest(options).then(onSuccess).catch(onError)
}