import axios from 'axios';

function buildClient({ req }) {
  if (typeof window === 'undefined') {
    return axios.create({
      // baseURL:
      //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      baseURL: 'http://159.89.222.146',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
}

export default buildClient;
