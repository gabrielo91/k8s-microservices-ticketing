import axios from "axios";

const LandingPage = ({ currentUser }) => {
  <h1>Hello from landing</h1>;
};

LandingPage.getInitialProps = async () => {
  let response;

  if (typeof window === "undefined") {
    // we are in server
    // request should be performed to nginx-ingress ...
    response = await axios.get("api/users/current-user");
  } else {
    // we are in browser
  }
  response = await axios.get("api/users/current-user");

  return response.data;
};

export default LandingPage;
