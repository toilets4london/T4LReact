import axios from "axios";

export default axios.create({
  baseURL: "https://toilets4london.eu.pythonanywhere.com/toilets/",
  headers: {
    "Content-type": "application/json"
  }
});