import axios from "axios";

export const getAnimeChan = async () => {
  let quote = {};
  try {
    const result = await axios.get("https://animechan.xyz/api/random");
    quote = result.data;
    return quote;
  } catch (error) {
    try {
      const res = await axios.get("http://animechan.melosh.space/random");
      quote = res.data;
      return quote;
    } catch (error) {
      return false;
    }
  }
};
