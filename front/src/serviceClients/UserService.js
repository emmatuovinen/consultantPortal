import Axios from "axios";
import { getToken } from "../adalconfig";



const API = "http://localhost:5000/api/";
const AuthStr = 'Bearer ' + getToken();

export function CreateUser(userData, callback) {
  let newUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    role: userData.role,
    phoneNumber: userData.phoneNumber,
    description: userData.description,
    linkedInUrl: userData.linkedInUrl,
    gitHubUrl: userData.gitHubUrl,
    pictureUrl: userData.pictureUrl,
    userSkills: userData.userSkills,
    preferableRoles: userData.preferableRoles,
    lessPreferableRoles: []
  };
  Axios.post(API + "Users/", newUser, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}


export function GetAllConsultants(callback) {
  Axios.get(API + "Users/Consultants", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetAllUsers(callback) {
  Axios.get(API + "Users/",  { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetConsultantInfo(dbId, callback) {
  Axios.get(API + "Users/" + dbId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

//Get consultant by email
export function GetConsultantInfobyEmail(userEmail, callback) {
  Axios.get(API + "Users/" + userEmail, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
      console.log(error.response)
    });
}


export function DeleteUser(dbId, callback) {
  Axios.delete(API + "Users/" + dbId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function EditProfile(dbId, user, callback) {
  console.log("UserService: ", dbId, user);
  Axios.put(API + "Users/" + dbId, user, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
