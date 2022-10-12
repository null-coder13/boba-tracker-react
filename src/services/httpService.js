import axios from "axios";
const host = "https://localhost:5001/"
const apiEndpoint = host + "api/Entry";

export function addEntry(hasPooped, hasPeed) {
  return axios.post(`${apiEndpoint}/AddEntry?hasPooped=${hasPooped}&hasPeed=${hasPeed}`);
}

export function getLastEntry() {
  return axios.get(`${apiEndpoint}/GetLastEntry`);
}

export function getLastPoo() {
  return axios.get(`${apiEndpoint}/GetLastPoo`);
}

export function deleteLastEntry() {
  return axios.delete(`${apiEndpoint}/DeleteLastEntry`);
}
