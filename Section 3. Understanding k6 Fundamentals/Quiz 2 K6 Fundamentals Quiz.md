## Question 1:

**What are the four custom metrics available in K6?**
1. Counter, Gauge, Trend, Rate
2. Speed, Time, Trend, Rate
3. Count, Measure, Trend, Rate
4. Counter, Measure, Time, Rate

### ✅ Correct Answer:

**1. Counter, Gauge, Trend, Rate**

### Why this is correct:

K6 provides **four built-in custom metric types** that you can create manually in your script:

- **Counter** → counts occurrences (for example, number of successful requests)    
- **Gauge** → stores the latest value added, often used for values like response time
- **Trend** → records a series of values and gives statistics like average, p(90), p(95), etc.
- **Rate** → measures the rate of values that are true/non-zero, usually used for success/failure ratios

### Why the other options are wrong:

- **2. Speed, Time, Trend, Rate** ❌  
    `Speed` and `Time` are **not valid K6 custom metric types**.
- **3. Count, Measure, Trend, Rate** ❌  
    `Count` is not the official K6 metric name; the correct one is **Counter**.  
    `Measure` is also not a K6 metric type.
- **4. Counter, Measure, Time, Rate** ❌  
    `Measure` and `Time` are not valid K6 custom metric types.

---

## Question 2:

**In K6, what is the purpose of using a `Counter` custom metric?**
1. To measure the success rate of requests
2. To count the number of successful requests
3. To record the response time trend
4. To measure the response time of requests

### ✅ Correct Answer:

**2. To count the number of successful requests**

### Why this is correct:

A **Counter** is used to **increment a value over time**.  
For example:

```javascript
successfulRequests.add(1);
```

This is commonly used to count:

- successful requests
- failed requests
- total processed records
- number of logins performed

### Why the other options are wrong:

- **1. To measure the success rate of requests** ❌  
    Success **rate** is measured using a **Rate** metric, not Counter.
- **3. To record the response time trend** ❌  
    Response time trends over multiple requests are measured using **Trend**.
- **4. To measure the response time of requests** ❌  
    Response time as a current/individual value is usually measured using **Gauge** (or recorded statistically using Trend).

---

## Question 3:

**Which custom metric in K6 is used to measure the response time of requests?**
1. Counter
2. Gauge
3. Trend
4. Rate

### ✅ Correct Answer:

**2. Gauge**

### Why this is correct:

A **Gauge** stores the **latest value** that is added to it.  
In K6, it can be used to track values such as:

- response time
- memory usage
- queue size
- current active sessions

Example:

```javascript
responseTimeGauge.add(res.timings.duration);
```

This stores the response time value in the Gauge metric.

### Why the other options are wrong:

- **1. Counter** ❌  
    Counter is only for **counting occurrences**, not storing measured values like response time.
- **3. Trend** ❌  
    Trend records response times **over multiple iterations** and provides statistics like avg, p(95), etc.  
    It is more for **distribution analysis**, whereas the quiz is asking for the metric used to **measure response time** directly in the example context, which is **Gauge**.
- **4. Rate** ❌  
    Rate measures the proportion of successful/true values, not response time.

> **Important note:**  
> In practice, **Trend** is also heavily used for response times because it gives statistical analysis. But based on your course example, **Gauge** is the expected answer for “measure the response time of requests,” while **Trend** is used to record the response time trend over time.

---

## Question 4:

**What is the purpose of the `Trend` custom metric in K6?**
1. To count the number of failed requests
2. To measure the success rate of requests
3. To record the response time trend over multiple iterations
4. To measure the response time of a single request

### ✅ Correct Answer:

**3. To record the response time trend over multiple iterations**

### Why this is correct:

A **Trend** metric is used to record a sequence of values over time and generate statistics such as:

- average
- min / max
- median
- p(90), p(95), etc.

This makes it ideal for tracking **response time patterns over multiple iterations**.

Example:

```javascript
responseTimeTrend.add(res.timings.duration);
```

### Why the other options are wrong:

- **1. To count the number of failed requests** ❌  
    That would be done using **Counter**.
- **2. To measure the success rate of requests** ❌  
    Success rate is measured using **Rate**.
- **4. To measure the response time of a single request** ❌  
    A single/latest value is better represented using **Gauge**. Trend is used to analyze values **across many iterations**.

---

## Question 5:

**What does the `Rate` custom metric in K6 measure?**
1. The number of requests per second
2. The success rate of requests
3. The average response time
4. The number of users

### ✅ Correct Answer:

**2. The success rate of requests**

### Why this is correct:

A **Rate** metric measures the proportion of times a condition is true.  
It is commonly used for:

- request success rate
- login success rate
- validation pass rate
- error rate (by reversing the condition)

Example:

```javascript
successRate.add(res.status === 200);
```

If the condition is true most of the time, the rate will be high.

### Why the other options are wrong:

- **1. The number of requests per second** ❌  
    That is more related to throughput, not a custom **Rate** metric in K6.
- **3. The average response time** ❌  
    Average response time is tracked using **Trend** or response duration built-in metrics, not Rate.
- **4. The number of users** ❌  
    Number of users is controlled by `vus`, not by Rate metrics.

---

## Question 6:

**Which module needs to be imported to use custom metrics in K6?**
1. k6/metrics
2. k6/custom
3. k6/measurements
4. k6/performance

### ✅ Correct Answer:

**1. `k6/metrics`**

### Why this is correct:

All custom metric classes in K6 such as:

- `Counter`
- `Gauge`
- `Trend`
- `Rate`

are imported from:

```javascript
import { Counter, Gauge, Trend, Rate } from "k6/metrics";
```

### Why the other options are wrong:

- **2. `k6/custom`** ❌  
    This module does not exist for custom metrics in K6.
- **3. `k6/measurements`** ❌  
    This is not a valid K6 module.
- **4. `k6/performance`** ❌  
    This is also not the module used for custom metrics.

---

## Question 7:

**What is the purpose of using the `stages` configuration in a K6 script?**
1. To define the duration of the test
2. To define the load pattern for the test
3. To define the response time limits
4. To define the number of iterations

### ✅ Correct Answer:

**2. To define the load pattern for the test**

### Why this is correct:

The **`stages`** option is used to define **how the load changes over time**.  
For example, you can:

- ramp up users gradually
- keep a steady load for some time
- ramp down users at the end

Example:

```javascript
stages: [
  { duration: "10s", target: 5 },
  { duration: "20s", target: 5 },
  { duration: "10s", target: 0 }
]
```

This defines the **load pattern** of the test.

### Why the other options are wrong:

- **1. To define the duration of the test** ❌  
    Not exactly. `stages` indirectly affects total duration, but its main purpose is to define **how load changes over time**, not just total duration.
- **3. To define the response time limits** ❌  
    Response time limits are defined using **thresholds**, not stages.
- **4. To define the number of iterations** ❌  
    Iterations are controlled separately using `iterations`, not `stages`.

---

# Final Correct Answers

1. **Counter, Gauge, Trend, Rate**    
2. **To count the number of successful requests**
3. **Gauge**
4. **To record the response time trend over multiple iterations**
5. **The success rate of requests**
6. **`k6/metrics`**
7. **To define the load pattern for the test**

