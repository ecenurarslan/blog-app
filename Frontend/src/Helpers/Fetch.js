import { Redirect } from "react-router";

const Fetch = async (url, options) => {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        localStorage.removeItem("user");
      } else {
        throw new Error();
      }
      return false;
    })
    .then((json) => {
      return json;
    })
    .catch(() => {
      return false;
    });
};

export default Fetch;
