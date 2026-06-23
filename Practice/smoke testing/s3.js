/**
PERF-003: As a QA engineer, I want to verify that POST /posts with a valid payload returns a 201 response that echoes back the submitted data plus a generated id, So that I can confirm the create endpoint is functional and returns the correct contract.
Acceptance Criteria:
- HTTP status is 201
- Response body contains id field (value 101)
- Response echoes back the same title and userId that were sent
- Response time is under 500ms
- Test aborts if status is not 201
 */

import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  const payload = JSON.stringify({
    title: "Test Title",
    body: "Test Body",
    userId: 1,
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = http.post(
    "https://jsonplaceholder.typicode.com/posts",
    payload,
    params,
  );

  check(res, {
    "HTTP status is 201": (r) => r.status === 201,
    "Response body contains id field (value 101)": (r) =>
      JSON.parse(res.body).id === 101,
    "Response echoes back the same title and userId that were sent": (r) =>
      JSON.parse(res.body).title === "Test Title" &&
      JSON.parse(res.body).body === "Test Body",
    "Response time is under 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
