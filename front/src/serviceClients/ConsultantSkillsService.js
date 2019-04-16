import Axios from "axios";
import { getToken } from "../adalconfig";

const API = "http://localhost:5000/api/";
const AuthStr = 'Bearer ' + getToken();

export function GetSkillsStackOptions(callback) {
  Axios.get(API + "Skills", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
