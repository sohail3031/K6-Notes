/**
PERF-001: As a QA engineer, I want to verify that the /posts endpoint returns a valid 200 response with a non-empty array within 500ms using 1 virtual user, So that I can confirm the API is reachable and healthy before any heavier test runs.
Acceptance Criteria:
- HTTP status is 200
- Response body is a JSON array
- Array length is greater than 0
- Response time is under 500ms
- Test aborts immediately if any criterion fails
*/

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
};

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/posts");

  check(res, {
    "HTTP status is 200": (r) => r.status === 200,
    "Response body is a JSON array": (r) =>
      Array.isArray(JSON.parse(res.body)) === true,
    "Array length is greater than 0": (r) => res.body.length > 0,
    "Response time is under 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
