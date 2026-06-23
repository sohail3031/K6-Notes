/**
PERF-005: As a performance engineer, I want to ramp virtual users from 0 to 50 over 2 minutes, hold for 5 minutes, then ramp down over 1 minute, So that I can validate that the API maintains acceptable response times and error rates under expected production traffic levels.

Acceptance Criteria:
- p(90) response time stays below 800ms throughout all stages
- p(95) response time stays below 1200ms throughout all stages
- Error rate stays below 2% at peak load
- Check pass rate remains above 95%
- No abrupt spike in latency during ramp-up
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

let successRate = new Rate("success_rate");

export const options = {
  stages: [
    { duration: "2m", target: 50 },
    { duration: "5m", target: 50 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(90)<800", "p(95)<1200"],
    http_req_failed: ["rate<0.02"],
    success_rate: ["rate>0.95"],
  },
};

export default function () {
  let res = http.get("https://reqres.in");

  successRate.add(res.status === 200);

  sleep(1);
}
