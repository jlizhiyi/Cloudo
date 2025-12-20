# Compute Services

Compute services provide the processing power (CPU/RAM) to run your applications.

### 1. Virtual Machines (Instances)
This is **Infrastructure as a Service (IaaS)**. You get a virtual server.
*   **You manage:** The Operating System, software patches, and scalability.
*   **Benefit:** Maximum control and flexibility. Use this for hosting legacy apps or when you need OS-level access.

### 2. Containers
Containers package your application code with its libraries into a single unit.
*   **Benefit:** Consistent environment from your laptop to the cloud. Lightweight and fast to start.
*   **Orchestration:** Tools like Kubernetes help run thousands of containers at once.

### 3. Serverless (Function-as-a-Service)
You upload code, and it runs in response to events (like a user clicking a button).
*   **You manage:** Just the code.
*   **Benefit:** Zero administration. You never pay for "idle" servers—only for the milliseconds your code runs.