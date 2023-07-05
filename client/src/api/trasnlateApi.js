import axios from "axios";
import { RAPIDAPI_KEY } from "../config";

export const translate = async (text, lang) => {
  const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
  const options = {
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
    },
  };
  const data = {
    from: "en",
    to: lang,
    q: text,
  };

  try {
    const response = await axios.post(url, data, options);
    const result = response.data;
    return result[0];
  } catch (error) {
    console.error(error);
    return false;
  }
};
