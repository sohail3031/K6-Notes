## Question 1

**What is the purpose of using `graceful stop` in K6?**

1. To immediately stop all virtual users
2. To complete the current iterations of virtual users before stopping
3. To start new iterations during the stop process
4. To reduce the number of virtual users without stopping

### Correct Answer:

**2. To complete the current iterations of virtual users before stopping**

### Why this is correct:

`gracefulStop` gives already-running iterations some extra time to finish **after the scenario’s main duration ends**. This prevents k6 from abruptly terminating in-progress requests or user actions.

### Why the other options are wrong:

- **1. To immediately stop all virtual users**  
    Wrong because `gracefulStop` does the opposite—it **waits** for running iterations to finish instead of stopping immediately.
- **3. To start new iterations during the stop process**  
    Wrong because `gracefulStop` is meant for **finishing current iterations**, not starting new ones.
- **4. To reduce the number of virtual users without stopping**  
    Wrong because this sounds more like **ramp-down behavior** in `ramping-vus`, not `gracefulStop`.

---

## Question 2

**What does the `graceful ramp down` parameter do in K6?**

1. It stops virtual users immediately
2. It reduces the number of virtual users gradually without completing their iterations
3. It allows virtual users to finish their current iterations during the ramp down stage
4. It increases the number of virtual users gradually

### Correct Answer:

**3. It allows virtual users to finish their current iterations during the ramp down stage**

### Why this is correct:

`gracefulRampDown` is used with executors like `ramping-vus` and gives VUs time to finish their ongoing iteration **while the number of VUs is being reduced**.

### Why the other options are wrong:

- **1. It stops virtual users immediately**  
    Wrong because `gracefulRampDown` avoids abrupt stopping.
- **2. It reduces the number of virtual users gradually without completing their iterations**  
    Wrong because the point of `gracefulRampDown` is specifically to **allow current iterations to complete** before VUs are removed.
- **4. It increases the number of virtual users gradually**  
    Wrong because that describes **ramp-up**, not graceful ramp-down.

---

## Question 3

**What is the primary purpose of using the `constant arrival rate` executor in K6?**

1. To simulate a burst of traffic
2. To maintain a steady rate of requests or iterations per time unit
3. To gradually increase the number of virtual users
4. To randomly change the number of virtual users

### Correct Answer:

**2. To maintain a steady rate of requests or iterations per time unit**

### Why this is correct:

The `constant-arrival-rate` executor is designed to start iterations at a **fixed rate** (for example, 30 iterations per second), regardless of how many VUs are needed behind the scenes to sustain that rate.

### Why the other options are wrong:

- **1. To simulate a burst of traffic**  
    Wrong because burst traffic is sudden and short-lived, whereas `constant-arrival-rate` aims for a **steady, controlled rate**.
- **3. To gradually increase the number of virtual users**  
    Wrong because that is closer to `ramping-vus`.
- **4. To randomly change the number of virtual users**  
    Wrong because the executor is not about randomness. k6 may adjust VUs internally, but the goal is to maintain a **fixed arrival rate**, not random VU changes.

---

## Question 4

**In K6, what does the `duration` option specify in the context of the `constant arrival rate` executor?**

1. The time to ramp up virtual users
2. The total duration of the scenario excluding the graceful stop
3. The time to ramp down virtual users
4. The maximum response time allowed

### Correct Answer:

**2. The total duration of the scenario excluding the graceful stop**

### Why this is correct:

For `constant-arrival-rate`, `duration` specifies **how long the scenario should actively run and start iterations**. If `gracefulStop` is configured, that waiting period is separate from the main `duration`.

### Why the other options are wrong:

- **1. The time to ramp up virtual users**  
    Wrong because `constant-arrival-rate` is not a ramp-up duration setting. Ramp-up is more associated with `ramping-vus` or `ramping-arrival-rate`.
- **3. The time to ramp down virtual users**  
    Wrong because `duration` is the scenario run time, not a dedicated ramp-down period.
- **4. The maximum response time allowed**  
    Wrong because response time limits are usually handled through **thresholds**, not `duration`.

---

## Question 5

**What is the role of the `rate` option in the `constant arrival rate` executor in K6?**

1. To define the ramp-up time
2. To define the number of iterations to start during each time unit
3. To define the maximum number of virtual users
4. To define the time to complete each iteration

### Correct Answer:

**2. To define the number of iterations to start during each time unit**

### Why this is correct:

The `rate` defines how many iterations k6 should **start** during each `timeUnit`.  
For example:

- `rate: 30`
- `timeUnit: "1s"`

means **start 30 iterations every second**.

### Why the other options are wrong:

- **1. To define the ramp-up time**  
    Wrong because ramp-up is not controlled by `rate`.
- **3. To define the maximum number of virtual users**  
    Wrong because maximum VUs are controlled separately using options like `maxVUs`.
- **4. To define the time to complete each iteration**  
    Wrong because iteration completion time depends on the script, system performance, server response, `sleep()`, etc.—not the `rate` setting.

---

## Question 6

**What does the `pre-allocated VUs` option ensure in K6?**

1. It defines the maximum number of virtual users
2. It pre-allocates virtual users before the test starts to ensure adequate resources
3. It reduces the number of virtual users during the test
4. It measures the response time of each iteration

### Correct Answer:

**2. It pre-allocates virtual users before the test starts to ensure adequate resources**

### Why this is correct:

`preAllocatedVUs` tells k6 how many VUs to prepare in advance so the executor can begin generating load without delays caused by allocating VUs at runtime.

### Why the other options are wrong:

- **1. It defines the maximum number of virtual users**  
    Wrong because `preAllocatedVUs` is the **initial pool**, not the hard maximum. The maximum is controlled by `maxVUs`.
- **3. It reduces the number of virtual users during the test**  
    Wrong because it does not reduce VUs; it allocates them upfront.
- **4. It measures the response time of each iteration**  
    Wrong because response times are metrics collected by k6, not something controlled by `preAllocatedVUs`.

---

## Question 7

**How does the `time unit` option function in the `constant arrival rate` executor in K6?**

1. It defines the maximum duration of the test
2. It sets the period of time over which the rate value is applied
3. It measures the average response time
4. It specifies the total number of iterations

### Correct Answer:

**2. It sets the period of time over which the rate value is applied**

### Why this is correct:

`timeUnit` defines the interval used together with `rate`.  
Example:

- `rate: 30`
- `timeUnit: "1s"`

means 30 iterations per second.  
If `timeUnit` were `"1m"`, then the same rate would mean 30 iterations per minute.

### Why the other options are wrong:

- **1. It defines the maximum duration of the test**  
    Wrong because maximum duration or scenario duration is handled separately.
- **3. It measures the average response time**  
    Wrong because `timeUnit` has nothing to do with response-time calculation.
- **4. It specifies the total number of iterations**  
    Wrong because total iterations are not fixed by `timeUnit`; they depend on `rate × duration`.

---

## Question 8

**What is the benefit of using `graceful stop` and `graceful ramp down` in K6?**

1. To increase the speed of the test
2. To avoid partial and incomplete transactions
3. To immediately terminate all virtual users
4. To reduce the load on the server

### Correct Answer:

**2. To avoid partial and incomplete transactions**

### Why this is correct:

Both options help prevent abrupt termination of ongoing work:

- `gracefulStop` → at the end of a scenario
- `gracefulRampDown` → during VU reduction in ramp-down stages

This makes results more realistic and reduces incomplete requests or transactions.

### Why the other options are wrong:

- **1. To increase the speed of the test**  
    Wrong because these options are about **clean shutdown**, not performance improvement.
- **3. To immediately terminate all virtual users**  
    Wrong because they do the opposite—they allow current work to finish first.
- **4. To reduce the load on the server**  
    Wrong because although ramping down may lower load eventually, that is not the main purpose of these options.

---

## Question 9

**Which executor is used to generate a steady stream of virtual users at a fixed rate in K6?**

1. Ramping VUs executor
2. Constant VUs executor
3. Constant arrival rate executor
4. Shared iterations executor

### Correct Answer:

**3. Constant arrival rate executor**

### Why this is correct:

`constant-arrival-rate` is used when you want to maintain a **fixed iteration arrival rate** such as 10 or 30 iterations per second. k6 adjusts the VUs as needed to keep that rate.

### Why the other options are wrong:

- **1. Ramping VUs executor**  
    Wrong because `ramping-vus` changes the number of VUs over time rather than maintaining a fixed request/iteration rate.
- **2. Constant VUs executor**  
    Wrong because `constant-vus` keeps the number of VUs fixed, but the number of iterations per second can vary depending on how fast each iteration runs.
- **4. Shared iterations executor**  
    Wrong because `shared-iterations` focuses on completing a fixed **total number of iterations**, not maintaining a fixed arrival rate.

---

## Question 10

**What does the `ramping VUs` executor do in K6?**

1. It maintains a constant number of virtual users
2. It gradually increases or decreases the number of virtual users over time
3. It sets a fixed rate of iterations
4. It randomly changes the number of virtual users

### Correct Answer:

**2. It gradually increases or decreases the number of virtual users over time**

### Why this is correct:

`ramping-vus` is specifically designed to model load changes over time by defining stages with different target VU counts.

### Why the other options are wrong:

- **1. It maintains a constant number of virtual users**  
    Wrong because that describes `constant-vus`.
- **3. It sets a fixed rate of iterations**  
    Wrong because fixed iteration rate is handled by `constant-arrival-rate`.
- **4. It randomly changes the number of virtual users**  
    Wrong because `ramping-vus` changes VUs **according to the stages you define**, not randomly.

---

## Question 11

**What is the main purpose of using `scenarios` in K6?**

1. To measure response time
2. To define different load patterns and conditions for testing
3. To increase the speed of execution
4. To reduce the number of virtual users

### Correct Answer:

**2. To define different load patterns and conditions for testing**

### Why this is correct:

Scenarios let you run one or more independent workloads in a single test, each with its own:

- executor
- VU settings
- iterations or rate
- start time
- tags/env

This is how you model different traffic patterns and user behaviors.

### Why the other options are wrong:

- **1. To measure response time**  
    Wrong because response time is a **metric**, not the purpose of scenarios.
- **3. To increase the speed of execution**  
    Wrong because scenarios are for organizing and modeling load patterns, not making tests faster.
- **4. To reduce the number of virtual users**  
    Wrong because scenarios are not specifically about reducing VUs; they define overall execution behavior.

---

## Question 12

**Which option allows ongoing iterations to complete before stopping virtual users in K6?**

1. Graceful stop
2. Ramp down
3. Constant arrival rate
4. Duration

### Correct Answer:

**1. Graceful stop**

### Why this is correct:

`gracefulStop` is the scenario option that gives currently running iterations time to finish before VUs are stopped after the scenario duration ends.

### Why the other options are wrong:

- **2. Ramp down**  
    Wrong because ramp-down refers to decreasing load or VUs, but the specific option that waits for completion at scenario end is `gracefulStop`.
- **3. Constant arrival rate**  
    Wrong because that is an executor type, not an option for allowing ongoing iterations to finish.
- **4. Duration**  
    Wrong because `duration` defines how long the scenario runs, not how it shuts down.

---

# Final Answer Key

1. **2**
2. **3**
3. **2**
4. **2**
5. **2**
6. **2**
7. **2**
8. **2**
9. **3**
10. **2**
11. **2**
12. **1**

