import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
  thresholds: {
    'failed requests': ['rate<0.1'],
    http_req_duration: ['p(95)<2000'],
  },
  stages: [
    { duration: '10s', target: 200 },
    { duration: '40s', target: 1000 },
    { duration: '10s', target: 100 },

  ],
};

  export default function () {
    const id = Math.floor(Math.random() * 1000000);
    let url = http.get(
      `http://localhost:4000/products/${id}`
    );
    check(url, { 'status was 200': (r) => r.status == 200 });
  }

