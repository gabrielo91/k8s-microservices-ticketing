import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient(ctx);
  const { data } = await client.get('api/users/current-user');
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, client, data.currentUser);
  }

  return { pageProps, ...data };
};

export default AppComponent;
