## Question 1: What is Prometheus primarily used for?

1. System monitoring and alerting 
2. storage 
3. Web development 
4. Cloud computing

✔ **Correct Answer: System monitoring and alerting**

**Why:**  
Prometheus is built for:

- collecting metrics    
- storing time-series data
- triggering alerts

👉 Think: _“metrics + monitoring + alerts”_

---

## Question 2: Which platform integrates Prometheus, Loki, and Tempo?

1. AWS 
2. Azure 
3. Grafana Cloud 
4. Google Cloud

✔ **Correct Answer: Grafana Cloud**

**Why:**  
Grafana Cloud bundles:

- Prometheus → metrics
- Loki → logs
- Tempo → tracing

👉 This is a full observability stack.

---

## Question 3: What is the primary benefit of using Grafana Cloud's Prometheus service?

1. Free data storage 
2. High scalability and reliability 
3. Web development tools 
4. Real-time collaboration

✔ **Correct Answer: High scalability and reliability**

**Why:**  
Grafana Cloud provides:

- managed Prometheus
- auto-scaling
- high availability
- no self-hosting overhead

---

## Question 4: What is a primary output format of k6 results?

1. XML 
2. JSON 
3. Standard output to the console 
4. PDF

✔ **Correct Answer: Standard output to the console**

**Why:**  
By default K6 shows:

- aggregated metrics
- latency stats
- requests/sec

👉 This is the default execution summary.

---

## Question 5: Which of the following is NOT a type of k6 result output?

1. Standard output 
2. Custom summary output 
3. Streaming metrics 
4. Interactive dashboard 

✔ **Correct Answer: Interactive dashboard**

**Why:**  
K6 outputs include:

- standard output
- JSON / file summaries
- streaming metrics

But:  
❌ Interactive dashboard is NOT a K6 output type  
👉 That belongs to Grafana, not K6.

---

# 🧠 Quick Memory Trick

Think of K6 outputs as:

```text
K6 Outputs =
1. Console (default)
2. File (JSON, CSV)
3. Custom summary (handleSummary)
4. Streaming (Prometheus, Grafana, etc.)
```

🚫 Dashboards = Grafana’s job, not K6’s

