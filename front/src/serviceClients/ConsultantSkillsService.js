import Axios from "axios";

const API = "http://localhost:5000/api/";

export function GetSkillsStackOptions(callback) {
    Axios.get(API + "Skills")
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export default function() {}