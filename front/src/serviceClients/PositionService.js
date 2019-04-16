import Axios from "axios";
import { getToken } from "../adalconfig";

const API = "http://localhost:5000/api/";
const AuthStr = 'Bearer ' + getToken();

export function GetAllPositions(callback) {
  Axios.get(API + "positions", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function CreatePosition(positionData, callback) {
  let newPosition = {
    Company: positionData.company,
    PositionDescription: positionData.positionDescription,
    PositionRole: positionData.positionRole,
    Location: positionData.location,
    IsActive: positionData.isActive,
    PositionStatus: positionData.positionStatus,
    PositionSkills: positionData.skills
  };
  console.log(
    "Axios createposition: ",
    newPosition,
    "PositionData: ",
    positionData
  );
  Axios.post(API + "positions/", newPosition, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetActivePositions(callback) {
  Axios.get(API + "positions/getActivePositions", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetPositionInfo(positionId, callback) {
  Axios.get(API + "positions/" + positionId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function EditPosition(positionId, position, callback) {
  Axios.put(API + "positions/" + positionId, position, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
