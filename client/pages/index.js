import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Hello from landing</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    // request should be performed to nginx-ingress ...
    const { data } = await axios.get(
      // Remember SERVICE_NAME.NAMESPACE.svc.cluster.local
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user",
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    // we are in browser
    const { data } = await axios.get("api/users/current-user");
    return data;
  }
};

export default LandingPage;
