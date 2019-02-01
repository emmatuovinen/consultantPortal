import Axios from "axios";

const API = "http://localhost:5000/api/";

export function GetAllPositions(callback) {
    Axios.get(API + "Positions")
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error.response);
      });
  }

  export default function () { }