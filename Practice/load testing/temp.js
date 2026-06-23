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
import { Counter, Trend } from "k6/metrics";
import { tagScope } from "k6/execution";

// ─── Custom metrics ────────────────────────────────────────────────────────────
const readErrors = new Counter("read_errors");
const writeErrors = new Counter("write_errors");
const readDuration = new Trend("read_duration", true);
const writeDuration = new Trend("write_duration", true);

// ─── Options ───────────────────────────────────────────────────────────────────
export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 20 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    // Overall error rate < 2%
    http_req_failed: ["rate<0.02"],

    // Per-journey error rate < 2%
    "http_req_failed{journey:read}": ["rate<0.02"],
    "http_req_failed{journey:write}": ["rate<0.02"],

    // Optional: p95 latency guards per journey
    read_duration: ["p(95)<2000"],
    write_duration: ["p(95)<2000"],
  },
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ─── Read journey (60%) ────────────────────────────────────────────────────────
function readJourney() {
  const start = Date.now();

  // Tag every request in this block with journey=read
  const params = { tags: { journey: "read" } };

  const listRes = http.get(`${BASE_URL}/posts`, params);
  check(listRes, { "list posts 200": (r) => r.status === 200 }) ||
    readErrors.add(1);

  const postId = Math.floor(Math.random() * 100) + 1;
  const postRes = http.get(`${BASE_URL}/posts/${postId}`, params);
  check(postRes, { "get post 200": (r) => r.status === 200 }) ||
    readErrors.add(1);

  const commentsRes = http.get(`${BASE_URL}/posts/${postId}/comments`, params);
  check(commentsRes, { "get comments 200": (r) => r.status === 200 }) ||
    readErrors.add(1);

  readDuration.add(Date.now() - start);
  sleep(1);
}

// ─── Write journey (40%) ───────────────────────────────────────────────────────
function writeJourney() {
  const start = Date.now();

  const params = {
    headers: { "Content-Type": "application/json" },
    tags: { journey: "write" },
  };

  // CREATE
  const createRes = http.post(
    `${BASE_URL}/posts`,
    JSON.stringify({ title: "perf test", body: "load run", userId: 1 }),
    params,
  );
  const created = check(createRes, {
    "create post 201": (r) => r.status === 201,
  });
  if (!created) writeErrors.add(1);

  // UPDATE (use a fixed id – JSONPlaceholder ignores the body but returns 200)
  const updateRes = http.put(
    `${BASE_URL}/posts/1`,
    JSON.stringify({
      id: 1,
      title: "updated",
      body: "updated body",
      userId: 1,
    }),
    params,
  );
  check(updateRes, { "update post 200": (r) => r.status === 200 }) ||
    writeErrors.add(1);

  // DELETE
  const deleteRes = http.del(`${BASE_URL}/posts/1`, null, params);
  check(deleteRes, { "delete post 200": (r) => r.status === 200 }) ||
    writeErrors.add(1);

  writeDuration.add(Date.now() - start);
  sleep(1);
}

// ─── Default function — the traffic router ────────────────────────────────────
export default function () {
  if (Math.random() < 0.6) {
    readJourney();
  } else {
    writeJourney();
  }
}

// ─── handleSummary ─────────────────────────────────────────────────────────────
// export function handleSummary(data) {
//   const m = data.metrics;

//   function rate(counter, total) {
//     if (!counter || !total) return "N/A";
//     return ((counter.values.count / total.values.count) * 100).toFixed(2) + "%";
//   }

//   function p95(trend) {
//     return trend ? trend.values["p(95)"].toFixed(0) + " ms" : "N/A";
//   }

//   const totalReqs = m["http_reqs"];
//   const readReqs = m["http_reqs{journey:read}"];
//   const writeReqs = m["http_reqs{journey:write}"];
//   const readFailed = m["http_req_failed{journey:read}"];
//   const writeFailed = m["http_req_failed{journey:write}"];

//   const summary = `
// ═══════════════════════════════════════════════
//   PERF-008  Mixed Traffic Summary
// ═══════════════════════════════════════════════

//   Total requests : ${totalReqs?.values.count ?? "N/A"}

//   ── Read journey (target 60%) ──────────────
//   Requests       : ${readReqs?.values.count ?? "N/A"}
//   Error rate     : ${readFailed ? (readFailed.values.rate * 100).toFixed(2) + "%" : "N/A"}
//   p95 duration   : ${p95(m["read_duration"])}

//   ── Write journey (target 40%) ─────────────
//   Requests       : ${writeReqs?.values.count ?? "N/A"}
//   Error rate     : ${writeFailed ? (writeFailed.values.rate * 100).toFixed(2) + "%" : "N/A"}
//   p95 duration   : ${p95(m["write_duration"])}

// ═══════════════════════════════════════════════
// `;

//   return {
//     stdout: summary,
//     "summary.json": JSON.stringify(data, null, 2),
//   };
// }
