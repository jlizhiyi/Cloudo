# Application Integration

Integration services help applications communicate with each other in a **decoupled** (loosely connected) way.

### Why Decoupling Matters
Tightly coupled systems fail together. If Service A calls Service B directly and B goes down, A fails too. Decoupling adds a buffer between services.

### Amazon SQS (Simple Queue Service)
A fully managed **message queue** for decoupling applications.

*   **How it works:** Producer sends a message → SQS holds it → Consumer retrieves and processes it.
*   **Benefit:** If the consumer is slow or down, messages wait in the queue instead of being lost.
*   **Queue Types:**
    *   **Standard:** Unlimited throughput, at-least-once delivery, best-effort ordering.
    *   **FIFO:** Exactly-once processing, strict ordering (lower throughput).
*   **Use case:** Order processing, background jobs, buffering requests.

### Amazon SNS (Simple Notification Service)
A fully managed **pub/sub messaging service** for sending notifications.

*   **How it works:** Publisher sends to a Topic → SNS delivers to all Subscribers.
*   **Subscribers can be:** Email, SMS, HTTP endpoints, Lambda, SQS queues.
*   **Use case:** Alerts, fan-out to multiple systems, mobile push notifications.

> **SQS vs SNS:** SQS = queue (one consumer processes each message). SNS = broadcast (many subscribers receive the same message).

### Amazon EventBridge
A **serverless event bus** for building event-driven applications.

*   **Sources:** AWS services, SaaS apps, custom applications.
*   **Rules:** Filter events and route them to targets (Lambda, SQS, etc.).
*   **Use case:** React to changes (e.g., when an EC2 instance changes state, trigger a Lambda).

### AWS Step Functions
Coordinate multiple AWS services into **serverless workflows**.

*   **Visual workflows:** Design state machines with branching, retries, and parallel execution.
*   **Use case:** Order fulfillment, data processing pipelines, ETL jobs.

### Quick Comparison

| Service | Pattern | Use Case |
|---------|---------|----------|
| **SQS** | Queue (1-to-1) | Decouple sender and receiver |
| **SNS** | Pub/Sub (1-to-many) | Fan-out notifications |
| **EventBridge** | Event Bus | React to events from AWS/SaaS |
| **Step Functions** | Workflow orchestration | Coordinate multi-step processes |

> **EXAM TIP:** SQS = decouple + buffer, SNS = fan-out notifications, Step Functions = orchestrate workflows.