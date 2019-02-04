import Axios from "axios";

const API = "http://localhost:5000/api/";

export function GetAllPositions(callback) {
  Axios.get(API + "positions")
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function CreatePosition(positionData, callback) {
  let newPosition = {
    positionDescription: positionData.description,
    positionRole: positionData.role,
    location: positionData.location,
    isActive: positionData.active
  };
  Axios.post(API + "positions", newPosition)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export function GetActivePositions(callback) {
    Axios.get(API + "positions/getActivePositions")
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export function GetPositionInfo(positionId, callback) {
    Axios.get(API + "positions/" + positionId)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        })
}

export function EditPosition(positionId, position, callback) {
    Axios.put(API + "positions" + positionId, position)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            callback(error.response);
        });
}

export default function() {}
