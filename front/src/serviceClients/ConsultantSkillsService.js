import Axios from "axios";
import { getToken } from "../adalconfig";

const constants = require('./constants');
const AuthStr = 'Bearer ' + getToken();

export function GetSkillsStackOptions(callback) {
  Axios.get(constants.API + "Skills", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
