# Compute Services

AWS offers compute services ranging from full control (virtual machines) to fully managed (serverless).

### Amazon EC2 (Elastic Compute Cloud)
Virtual servers in the cloud. **This is IaaS.**

*   **You control:** Operating system, software, security patches, scaling.
*   **Instance Types:** Optimized for different workloads:
    *   **General Purpose (T3, M5):** Balanced CPU/memory for web servers, dev environments.
    *   **Compute Optimized (C5):** High-performance processors for batch processing, gaming.
    *   **Memory Optimized (R5):** Fast performance for large datasets in memory.
    *   **Storage Optimized (I3):** High sequential read/write for data warehousing.
*   **Key Concept:** You pay for running instances. Stop them to stop charges (storage persists).

### AWS Lambda
Run code without provisioning servers. **This is serverless.**

*   **Trigger-based:** Code runs in response to events (API calls, file uploads, schedules).
*   **Pricing:** Pay only for compute time consumed (per millisecond).
*   **Limits:** 15-minute max execution time, 10GB memory.
*   **Use cases:** APIs, data processing, automation, backends.

### Container Services

| Service | Description |
|---------|-------------|
| **ECS** (Elastic Container Service) | Run Docker containers on AWS-managed infrastructure |
| **EKS** (Elastic Kubernetes Service) | Managed Kubernetes for container orchestration |
| **Fargate** | Serverless compute for containers (no EC2 management) |

> **ECS/EKS = You choose the orchestrator.** Fargate = Serverless option for either.

### Other Compute Services

| Service | Description | Use Case |
|---------|-------------|----------|
| **Elastic Beanstalk** | PaaS - deploy code, AWS handles infrastructure | Developers who don't want to manage servers |
| **Lightsail** | Simple VPS with predictable pricing | Small websites, dev environments, beginners |
| **Batch** | Run batch computing jobs at scale | Large-scale data processing |
| **Outposts** | Run AWS infrastructure on-premises | Hybrid cloud, low-latency requirements |

> **EXAM TIP:** Know that Lambda = serverless, EC2 = full control, Elastic Beanstalk = PaaS, and Fargate = serverless containers.