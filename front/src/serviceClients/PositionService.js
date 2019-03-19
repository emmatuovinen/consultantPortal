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
  Axios.post(API + "positions/", newPosition)
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
    });
}

export function EditPosition(positionId, position, callback) {
  Axios.put(API + "positions/" + positionId, position)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
}

export default function() {}
