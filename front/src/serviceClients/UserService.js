import Axios from "axios";
import { getToken } from "../adalconfig";

const constants = require('./constants');
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
  Axios.post(constants.API + "Users/", newUser, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}


export function GetAllConsultants(callback) {
  Axios.get(constants.API + "Users/Consultants", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetAllUsers(callback) {
  Axios.get(constants.API + "Users/",  { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetConsultantInfo(userId, callback) {
  Axios.get(constants.API + "Users/" + userId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

//Get consultant by email
export function GetConsultantInfobyEmail(userEmail, callback) {
  Axios.get(constants.API + "Users/" + userEmail, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}


export function DeleteUser(userId, callback) {
  Axios.delete(constants.API + "Users/" + userId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function EditProfile(userId, user, callback) {
  Axios.put(constants.API + "Users/" + userId, user, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
