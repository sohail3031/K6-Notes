/**
PERF-002: As a QA engineer, I want to verify that GET /posts/1 returns a response containing all expected fields (id, title, body, userId), So that I can confirm the API response schema is intact and no fields are missing or null.
Acceptance Criteria:
- HTTP status is 200
- Response contains id, title, body, userId
- id value equals 1
- title and body are non-empty strings
- Response time is under 500ms
 */

import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/posts/1");

  check(res, {
    "HTTP status is 200": (r) => r.status === 200,
    "Response contains id, title, body, userId": (r) =>
      Object.hasOwn(JSON.parse(res.body), "id") === true &&
      Object.hasOwn(JSON.parse(res.body), "title") === true &&
      Object.hasOwn(JSON.parse(res.body), "body") === true &&
      Object.hasOwn(JSON.parse(res.body), "userId") === true,
    "id value equals 1": (r) => JSON.parse(res.body).id === 1,
    "title and body are non-empty strings": (r) =>
      JSON.parse(res.body).title !== "" && JSON.parse(res.body).body !== "",
    "Response time is under 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
