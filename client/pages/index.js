import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Hello from landing</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = await buildClient(context);
  const { data } = client.get("/api/users/current-user");

  return data;
};

export default LandingPage;
