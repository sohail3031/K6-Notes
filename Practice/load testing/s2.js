/**
PERF-006: As a performance engineer, I want to simulate a realistic read-heavy user journey where each VU lists posts, picks a random post, reads it, then reads its comments — with 1–3 seconds think time between each step, So that I can measure how the API performs under human-paced browsing behaviour rather than machine-gun requests.

Acceptance Criteria:
- Each VU completes the full 3-step journey per iteration
- Think time of 1–3 seconds is applied between each step
- Each step is wrapped in a group() for reporting clarity
- p(95) per step stays below 1200ms under 50 VUs
- No step has an error rate above 2%
 */

import http from "k6/http";
import { sleep, group, check } from "k6";

export const options = {
  maxVUs: 50,
  thresholds: {
    http_req_duration: ["p(95)<1200"],
  },
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function () {
  group("Lists Posts", function () {
    let res = http.get("https://jsonplaceholder.typicode.com/posts");

    check(res, {
      "list all posts": (r) => JSON.parse(res.body).length === 100,
    });
  });

  sleep(getRandomNumber(1, 3));

  let postID = getRandomNumber(1, 100);

  group("Pick Random Post", function () {
    let res = http.get(`https://jsonplaceholder.typicode.com/posts/${postID}`);

    check(res, {
      "check the post ID": (r) => JSON.parse(res.body).id,
    });
  });

  sleep(getRandomNumber(1, 3));

  group("Read Comments", function () {
    let res = http.get(
      `https://jsonplaceholder.typicode.com/posts/${postID}/comments`,
    );

    check(res, {
      "check comments post ID": (r) => {
        const data = r.json();

        return (
          Array.isArray(data) && data.every((item) => item.postId === postID)
        );
      },
    });
  });

  sleep(getRandomNumber(1, 3));
}
