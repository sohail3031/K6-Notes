/*
PERF-008: As a performance engineer, I want to distribute virtual user behaviour so that 60% run the read journey and 40% run the write journey within the same test run, So that the load test reflects realistic mixed traffic instead of all users performing identical actions.

Acceptance Criteria:
- Traffic split is implemented via Math.random() in the default function
- Both journeys run concurrently under the same VU pool
- Metrics are tagged so read and write traffic can be filtered separately in reports
- Overall error rate stays below 2% across both journey types
- handleSummary output clearly shows metrics for both traffic types
*/

import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.02"],
  },
};

function readJourney() {
  let postId = Math.floor(Math.random() * 100) + 1;
  const params = {
    tags: {
      journey: "read",
    },
  };

  let readPost = http.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    params,
  );

  check(readPost, {
    "check read post status code": (r) => r.status === 200,
  });

  let readComments = http.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    params,
  );

  check(readComments, {
    "check read comment status code": (r) => r.status === 200,
  });

  sleep(1);
}

function writeJourney() {
  const payload = JSON.stringify({
    title: "New Post Title",
    body: "New Post Body",
    userId: 1,
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: {
      journey: "write",
    },
  };
  let res = http.post(
    "https://jsonplaceholder.typicode.com/posts",
    payload,
    params,
  );

  check(res, {
    "check create post status": (r) => r.status === 201,
  });

  sleep(1);
}

export default function () {
  if (Math.random() < 0.6) {
    readJourney();
  } else {
    writeJourney();
  }
}

export function handleSummary(data) {
  const m = data.metrics;

  const readReqs = m["http_reqs{journey:read}"]?.values.count ?? "N/A";
  const writeReqs = m["http_reqs{journey:write}"]?.values.count ?? "N/A";
  const readErr = m["http_req_failed{journey:read}"]
    ? (m["http_req_failed{journey:read}"].values.rate * 100).toFixed(2) + "%"
    : "N/A";
  const writeErr = m["http_req_failed{journey:write}"]
    ? (m["http_req_failed{journey:write}"].values.rate * 100).toFixed(2) + "%"
    : "N/A";

  const stdout = `
─────────────────────────────────────
 Journey Breakdown
─────────────────────────────────────
 Read  → requests: ${readReqs}  | errors: ${readErr}
 Write → requests: ${writeReqs} | errors: ${writeErr}
─────────────────────────────────────
`;

  return {
    "s4FullReport.html": htmlReport(data),
    stdout,
  };
}
