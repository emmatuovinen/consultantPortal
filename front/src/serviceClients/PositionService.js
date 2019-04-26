import Axios from "axios";
import { getToken } from "../adalconfig";

const constants = require('./constants');
const AuthStr = 'Bearer ' + getToken();

export function GetAllPositions(callback) {
  Axios.get(constants.API + "positions", { headers: { Authorization: AuthStr } })
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
  Axios.post(constants.API + "positions/", newPosition, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetActivePositions(callback) {
  Axios.get(constants.API + "positions/getActivePositions", { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetPositionInfo(positionId, callback) {
  Axios.get(constants.API + "positions/" + positionId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function EditPosition(positionId, position, callback) {
  Axios.put(constants.API + "positions/" + positionId, position, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function DeletePosition(positionId, callback) {
  Axios.delete(constants.API + "positions/" + positionId, { headers: { Authorization: AuthStr } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}


export default function() {}
