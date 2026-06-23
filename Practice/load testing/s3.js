/**
PERF-007: As a performance engineer, I want to simulate a write journey where each VU creates a post, updates it, then deletes it — with each operation tracked as a separate group, So that I can identify which write operation is the slowest and whether write latency degrades under concurrent load.

Acceptance Criteria:
- POST, PUT, DELETE each run in their own group()
- POST asserts 201, PUT asserts 200, DELETE asserts 200 or 204
- Each operation tagged with its endpoint name for per-step metric filtering
- p(95) for each write operation stays below 1200ms at 50 VUs
- Custom api_response_time Trend metric is recorded per operation
 */

import http from "k6/http";
import { group, check, sleep } from "k6";
import { Trend } from "k6/metrics";

const postTrend = new Trend("post_trend");
const putTrend = new Trend("put_trend");
const delTrend = new Trend("del_trend");

export const options = {
  vus: "50",
  iterations: 500,
  thresholds: {
    http_req_duration: ["p(95)<1200"],
  },
};

export default function () {
  group("Create Post", function () {
    const payload = JSON.stringify({
      title: "Post Title",
      body: "Post Body",
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

    postTrend.add(res.timings.duration);

    check(res, {
      "create post status code": (r) => r.status === 201,
      "create post id": (r) => JSON.parse(res.body).id === 101,
    });
  });

  sleep(1);

  group("Update Post", function () {
    const payload = JSON.stringify({
      title: "New Post Title",
      body: "New Post Body",
      userId: 1,
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = http.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      payload,
      params,
    );

    putTrend.add(res.timings.duration);

    check(res, {
      "update post status code": (r) => r.status === 200,
      "update post title": (r) =>
        JSON.parse(res.body).title === "New Post Title",
      "update post body": JSON.parse(res.body).body === "New Post Body",
      "update post id": (r) => JSON.parse(res.body).id === 1,
    });
  });

  sleep(1);

  group("Delete Post", function () {
    let res = http.del("https://jsonplaceholder.typicode.com/posts/1");

    delTrend.add(res.timings.duration);

    check(res, {
      "delete post status code": (r) => r.status === 200 || r.status === 204,
    });
  });
}
