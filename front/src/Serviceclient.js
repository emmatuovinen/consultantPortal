import Axios from "axios";

const localhost = "http://localhost:5000";

export function GetAllConsultants(callback) {
    Axios.get(localhost + "/api/Users/consultants").then(response => {
        callback(response.data);
    })
}

export function GetAllUsers(callback) {
    Axios.get(localhost + "/api/Users").then(response => {
        callback(response.data);
    })
}

export function GetConsultantInfo(userId, callback) {
    Axios.get(localhost + "/api/Users/" + userId).then(response => {
        callback(response.data)
    })
}

export function DeleteUser(userId) {
    Axios.delete(localhost)
}

export default function() {}