import axios from "axios";
import configData from "../config/config.json";

/* Method to get API token from config.json file */
export const getApiToken = () => {
  return configData.API_TOKEN;
};

/* Method to get API base url from config.json file */
export const getBaseUrl = () => {
  return configData.BASE_URL;
};

/* Generic method to call get service */
export const callService = (url: string) => {
  let reqUrl =
    configData.BASE_URL + url + "&appid=" + configData.API_TOKEN + "&limit=10";
  return axios
    .get(reqUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return undefined;
    });
};
