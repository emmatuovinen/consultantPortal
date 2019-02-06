import Axios from "axios";

const API = "http://localhost:5000/api/";

export function GetTechStackOptions(callback) {
    Axios.get(API + "TechTree")
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export default function() {}