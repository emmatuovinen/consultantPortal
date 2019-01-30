import Axios from "axios";

const API = "http://localhost:5000/api/";

export function CreateUser(userData, callback) {
    let newUser = {firstName: userData.firstName, 
        lastName: userData.lastName, 
        email: userData.email, 
        role: userData.role,
        phoneNumber: userData.phoneNumber,
        description: userData.description
    }
    Axios.post(API + "Users/", newUser).then(response => {
        console.dir(response)
    });
}

export function GetAllConsultants(callback) {
    Axios.get(API + "Users/consultants").then(response => {
        callback(response.data);
    });
}

export function GetAllUsers(callback) {
    Axios.get(API + "Users/").then(response => {
        callback(response.data);
    });
}

export function GetConsultantInfo(userId, callback) {
    Axios.get(API + "Users/" + userId).then(response => {
        callback(response.data)
    });
}

export function DeleteUser(userId) {
    Axios.delete(API + "Users/" + userId).then(response => {
        console.dir(response)
    });
}

export function EditProfile(userId, user) {
    Axios.put(API + "Users/" + userId, user).then(response => {
        console.dir(response)
    });
}

export function GetOpportunities(callback) {
    // here we list all job opportunities
}


export default function() {}