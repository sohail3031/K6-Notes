# Performance Testing with k6 — Complete Notes, Examples, Demos & Grafana Integration

> A complete learning repository for **Performance Testing with k6**, covering **k6 fundamentals, scenarios, executors, metrics, thresholds, cloud execution, advanced scripting, QuickPizza project demos, and Grafana/Grafana Cloud integration**.

---

## Table of Contents

- [Overview](#overview)
- [What This Repository Contains](#what-this-repository-contains)
- [Learning Goals](#learning-goals)
- [Topics Covered](#topics-covered)
  - [1) Foundations of Performance Testing and k6](#1-foundations-of-performance-testing-and-k6)
  - [2) Virtual Users, Iterations, Checks, and Metrics](#2-virtual-users-iterations-checks-and-metrics)
  - [3) HTTP, Cookies, Modules, and Execution Context](#3-http-cookies-modules-and-execution-context)
  - [4) Scenarios and Executors](#4-scenarios-and-executors)
  - [5) Result Output and Reporting](#5-result-output-and-reporting)
  - [6) Prometheus, Grafana, and k6 Cloud](#6-prometheus-grafana-and-k6-cloud)
  - [7) Advanced k6 Demos](#7-advanced-k6-demos)
  - [8) QuickPizza End-to-End Project](#8-quickpizza-end-to-end-project)
  - [9) QuickPizza Browser and Hybrid Testing](#9-quickpizza-browser-and-hybrid-testing)
  - [10) Grafana Basics](#10-grafana-basics)
  - [11) Quizzes](#11-quizzes)

- [Key Concepts Covered](#key-concepts-covered)
- [Tools and Technologies](#tools-and-technologies)
- [Who This Repository Is For](#who-this-repository-is-for)
- [How to Use This Repository](#how-to-use-this-repository)
- [Recommended Learning Path](#recommended-learning-path)
- [Suggested Repository Structure](#suggested-repository-structure)
- [Why This Repository Is Useful](#why-this-repository-is-useful)
- [Important Notes](#important-notes)
- [Acknowledgment](#acknowledgment)
- [License / Usage Note](#license--usage-note)

---

# Overview

This repository contains my **complete notes, code snippets, practical demos, quiz notes, and project-based learning material** from a full **Performance Testing with k6** course.

It is intended to serve as a **single reference point** for learning and revising:

- **Performance testing fundamentals**
- **k6 scripting**
- **Virtual users, scenarios, and executors**
- **Checks, thresholds, custom metrics, tags, and groups**
- **HTTP testing, cookies, authentication, HTML parsing, form submission, multipart uploads, WebSockets, and CRUD operations**
- **k6 result output, summary customization, and reporting**
- **Prometheus + Grafana integration**
- **Grafana Cloud and k6 Cloud workflows**
- **QuickPizza real-world project examples**
- **Grafana dashboards and test data sources**

This repo is designed as both:

- a **study notebook / revision guide**, and
- a **hands-on code reference** for performance testing with k6.

---

# What This Repository Contains

This repository may include some or all of the following:

- **Detailed lecture notes**
- **k6 scripts and demo code**
- **QuickPizza project examples**
- **Advanced k6 feature demos**
- **Grafana / Grafana Cloud notes**
- **Cloud execution notes and screenshots**
- **Quiz notes and answers**
- **Authentication / cookies / HTML / forms / WebSocket examples**
- **Scenario and executor examples**
- **Summary and reporting examples**
- **Dashboard-related learning notes**

---

# Learning Goals

By working through this repository, you can learn how to:

- Understand **performance testing basics** and where k6 fits in
- Write **k6 scripts from scratch**
- Configure **Virtual Users (VUs)**, **iterations**, **stages**, and **durations**
- Use **checks**, **thresholds**, **tags**, and **groups**
- Work with **built-in metrics** and **custom metrics**
- Use **scenarios** and **executors** effectively
- Understand **open vs closed workload models**
- Test APIs with **HTTP requests**
- Manage **cookies**, **authentication**, and **form submissions**
- Parse **HTML** and validate content
- Perform **multipart uploads**, **CRUD operations**, and **WebSocket testing**
- Customize **test summaries** and export **results in multiple formats**
- Integrate k6 with **Prometheus**, **Grafana**, and **Grafana Cloud**
- Execute tests in **k6 Cloud**
- Build more structured performance suites using **QuickPizza demos**
- Understand the basics of **Grafana dashboards** and **data sources**

---

# Topics Covered

## 1) Foundations of Performance Testing and k6

- Introduction
- Introduction to Performance Testing
- GitHub Code for Demo
- The Evaluation of Load Testing Tools
- Why Choose k6 for Performance Testing
- Setting Up Your k6 Testing Environment
- k6 Scripting Basics – Getting Started
- Exploring Sample Links for Testing

---

## 2) Virtual Users, Iterations, Checks, and Metrics

- Understanding Virtual Users (VUs) Options
- Fixed Duration and Virtual Users – Practical Demo
- Fixed Iterations and Virtual Users – Hands-On Guide
- Implementing Virtual Users in Stages
- Exploring Various Options for Virtual Users
- Generating and Analyzing Output Summary
- Different Check Conditions Explained
- Built-in Metrics Overview
- Creating Custom Metrics in k6
- Deep Dive into All Four k6 Custom Metrics
- Setting Basic Threshold Conditions in k6
- Advanced Custom Metrics and Threshold Conditions
- Using Tags and Groups for Advanced Thresholds
- k6 Script Options and Their Precedence
- Understanding the k6 Test Lifecycle Phases

---

## 3) HTTP, Cookies, Modules, and Execution Context

- Basics of the HTTP Module
- Introduction to Various Built-in Modules in k6
- Working with Tags and Groups in k6
- Setting and Accessing Cookies in k6
- Understanding Execution Context Variables

---

## 4) Scenarios and Executors

- Introduction to Scenarios
- Exploring Multiple Scenarios
- Implementing Different Load Patterns
- How to Gracefully Stop a Scenario
- Implementing Graceful Rampdown in Scenarios
- Combining Graceful Stop and Rampdown
- Introduction to Executors
- Shared Iterations Executor
- Per-VU Iterations Executor
- Constant VUs Executor
- Ramping VUs Executor
- Constant Arrival Rate Executor
- Ramping Arrival Rate Executor

---

## 5) Result Output and Reporting

- Introduction to Result Output
- Understanding the `handleSummary()` Function
- Handle Summary Syntax and Multiple Destinations
- Extracting Values with Handle Summary
- Customizing Output Summary
- Outputting Summary in JUnit XML Format
- Sending Summary to Remote Hosts
- Streaming Output to CSV and JSON

---

## 6) Prometheus, Grafana, and k6 Cloud

- Introduction to Prometheus and Grafana
- Getting Started with Grafana Cloud
- k6 Prometheus Integration Demo
- k6 Grafana Integration Demo
- Executing Tests in k6 Cloud
- Using the k6 Cloud Script Builder
- Editing Scripts in k6 Cloud Script Editor
- Understanding k6 Cloud Limits and Quotas
- Scheduling Tests in k6 Cloud
- Setting Up k6 Cloud Notifications
- Using Environment Variables in k6 Cloud
- Setting a Baseline for Your Tests
- Recording with k6 Browser Recorder

---

## 7) Advanced k6 Demos

- Demo 1 – Implementing Basic Authentication
- Demo 2 – Implementing Digest Authentication
- Demo 3 – Parsing HTML with k6
- Demo 4 – Submitting HTML Forms
- Demo 5 – Managing Cookie Life Cycle in k6
- Demo 6 – Handling Multi-Part Uploads
- Demo 7 – Working with WebSockets
- Demo 8 – Performing CRUD Operations
- Open vs Closed Models Explained
- Handling Dropped Iterations
- Creating Custom Metrics
- Streaming Output to the Cloud

---

## 8) QuickPizza End-to-End Project

- QuickPizza Application Setup
- QuickPizza Foundation – Getting Started
- QuickPizza Foundation – Implementing Stages
- QuickPizza Foundation – Managing Lifecycle
- QuickPizza Foundation – Tracking Metrics
- QuickPizza Foundation – Setting Thresholds
- QuickPizza Foundation – Thresholds with Checks
- QuickPizza Foundation – Using Scenarios
- QuickPizza Foundation – Managing Arrival Rates
- QuickPizza Foundation – Working with Data and Shared Arrays
- QuickPizza Foundation – Using Handle Summary
- QuickPizza Foundation – Ensuring Composability
- QuickPizza Foundation – Modularization Techniques
- QuickPizza Foundation – Using WebSockets

---

## 9) QuickPizza Browser and Hybrid Testing

- QuickPizza Browser – Getting Started
- QuickPizza Browser – Managing Cookies
- QuickPizza Browser – Setting Thresholds
- QuickPizza Browser – Implementing Scenarios
- QuickPizza Browser – Creating Custom Metrics
- QuickPizza Browser – Using Page Objects
- QuickPizza Browser – Implementing Hybrid Approaches

---

## 10) Grafana Basics

- Grafana Cloud Introduction
- Grafana Dashboard Introduction
- Grafana First Dashboard
- Conclusion

---

## 11) Quizzes

- Quiz 1 – k6 Basics Quiz
- Quiz 2 – k6 Fundamentals Quiz
- Quiz 3 – Scenarios and Executors Quiz
- Quiz 4 – Result and Stream Output Quiz
- Quiz 5 – Advanced Concepts Quiz

---

# Key Concepts Covered

This repository touches a broad set of performance testing and observability concepts, including:

## Performance Testing Fundamentals

- Performance testing basics
- Load testing concepts
- Workload modeling
- Open vs closed models
- Throughput, latency, response times, and stability considerations

## k6 Core Concepts

- k6 script structure
- `options`
- `default` function
- VUs, iterations, duration, and stages
- test lifecycle
- checks and thresholds
- built-in metrics and custom metrics

## Scenarios and Executors

- shared iterations
- per-VU iterations
- constant VUs
- ramping VUs
- constant arrival rate
- ramping arrival rate
- graceful stop and graceful rampdown

## HTTP and Web Testing

- GET / POST / API testing
- authentication
- cookies
- HTML parsing
- form submission
- multipart uploads
- CRUD operations
- WebSockets

## Reporting and Output

- output summaries
- custom summaries
- JUnit XML output
- CSV / JSON output
- remote result streaming

## Observability and Visualization

- Prometheus integration
- Grafana integration
- Grafana Cloud basics
- dashboards and panels
- sample data sources

---

# Tools and Technologies

This repository is centered around the following tools and technologies:

- **k6**
- **JavaScript / ES6 syntax for k6 scripting**
- **Grafana**
- **Grafana Cloud**
- **Prometheus**
- **QuickPizza demo application**
- **HTTP APIs**
- **WebSockets**
- **HTML / form submission workflows**
- **Performance testing concepts and workload design**

---

# Who This Repository Is For

This repository is useful for:

- **Beginners** learning performance testing with k6
- **QA Engineers / SDETs** moving into performance testing
- **Automation testers** who want hands-on k6 examples
- **Developers** who want to understand API and performance test scripting
- Anyone looking for a **structured set of notes + examples + demos** for k6 and Grafana

---

# How to Use This Repository

You can use this repository in multiple ways depending on your goal.

## If you are learning k6 from scratch

Start from the early foundational topics and go in order:

1. Performance testing basics
2. k6 basics
3. VUs, checks, thresholds, metrics
4. Scenarios and executors
5. Advanced demos
6. QuickPizza project
7. Grafana and cloud integrations

## If you are revising specific concepts

Use the notes as a reference for:

- checks and thresholds
- scenarios and executors
- cookies and authentication
- HTML parsing and forms
- summary and reporting
- Grafana / Prometheus integration

## If you want hands-on examples

Focus on:

- the **advanced demo sections**
- the **QuickPizza examples**
- the **Grafana integration notes**
- the **Cloud execution workflow**

---

# Recommended Learning Path

If you are using this repo as a self-study guide, this is a good order to follow:

## Phase 1 — Fundamentals

- Performance testing basics
- Why k6
- Environment setup
- k6 script basics
- HTTP basics

## Phase 2 — Core k6 Usage

- VUs, iterations, and stages
- checks and thresholds
- metrics and custom metrics
- tags, groups, and execution context

## Phase 3 — Scenarios and Executors

- scenarios
- graceful stop / rampdown
- executors
- arrival-rate vs VU-based execution models

## Phase 4 — Advanced HTTP / Web Features

- authentication
- cookies
- HTML parsing
- forms
- uploads
- WebSockets
- CRUD operations

## Phase 5 — Reporting and Integrations

- summary handling
- result output
- JUnit / CSV / JSON
- Prometheus + Grafana
- Grafana Cloud and k6 Cloud

## Phase 6 — Project-Based Learning

- QuickPizza Foundation
- QuickPizza Browser
- Hybrid approaches
- modularization and reusable design


---

# Why This Repository Is Useful

This repository is useful because it combines:

- **course notes**
- **concept explanations**
- **practical code examples**
- **project-based learning**
- **Grafana / cloud integration notes**
- **quiz-based revision material**

Instead of learning k6 only at a theoretical level, this repository captures **both the concepts and the implementation side**.

---

# Important Notes

- This repository is primarily intended for **learning, revision, and hands-on practice**
- Some examples may be based on **course demos**, **QuickPizza**, **Grafana Cloud templates**, or **sample endpoints**
- The notes are written to help with **quick revision** as well as **deeper concept understanding**
- Depending on how the repo evolves, filenames, screenshots, and script locations may differ from the exact lecture order

---

# Acknowledgment

This repository was created as part of my learning journey through a **complete Performance Testing with k6 course**. The goal is to keep a well-structured reference of concepts, scripts, demos, and integrations that can be revisited later for practice, revision, and real project use.

---

## Final Note

If you are learning **k6**, **performance testing**, or **Grafana-based test observability**, I hope this repository helps you build both conceptual clarity and practical hands-on confidence.


