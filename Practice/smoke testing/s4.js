/**
PERF-004: As a QA engineer, I want to verify that GET /users/1/posts returns an array where every item belongs to user 1, So that I can confirm nested resource filtering is working correctly at the API level.
Acceptance Criteria:
- HTTP status is 200
- Response is a non-empty JSON array
- Every item in the array has userId === 1
- Response time is under 500ms
 */

import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  let res = http.get("https://jsonplaceholder.typicode.com/users/1/posts");
  const jsonArray = JSON.parse(res.body);

  check(res, {
    "HTTP status is 200": (r) => r.status === 200,
    "Response is a non-empty JSON array": (r) =>
      JSON.parse(res.body).length > 0,
    "Every item in the array has userId === 1": (r) => {
      const data = r.json();

      return Array.isArray(data) && data.every((item) => item.userId === 1);
    },
    "Response time is under 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
