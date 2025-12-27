# The Shared Responsibility Model

Security in AWS is a **shared responsibility** between AWS and the customer. Understanding this division is critical for the CCP exam.

### AWS Responsibility: Security OF the Cloud
AWS manages the security of the infrastructure that runs all AWS services.

**AWS protects:**
*   **Physical security:** Data centers (locks, cameras, guards, biometrics).
*   **Hardware:** Servers, storage devices, networking equipment.
*   **Software:** Hypervisor, host operating system, virtualization layer.
*   **Global infrastructure:** Regions, Availability Zones, Edge Locations.
*   **Managed service infrastructure:** The underlying platform for services like RDS, Lambda, S3.

### Customer Responsibility: Security IN the Cloud
You are responsible for everything you put into and configure in the cloud.

**Customer protects:**
*   **Data:** Encryption at rest and in transit.
*   **Identity:** IAM users, roles, MFA, password policies.
*   **Network:** Security groups, NACLs, VPC configuration.
*   **Operating system:** Patches and updates (for EC2).
*   **Applications:** Your code, dependencies, and configurations.
*   **Firewall configuration:** What ports are open, who can connect.

### Responsibility Varies by Service Type

| Service Type | Customer Responsibility | AWS Responsibility |
|--------------|------------------------|-------------------|
| **IaaS (EC2)** | Guest OS, patching, firewall, data | Hardware, hypervisor, network |
| **PaaS (RDS, Elastic Beanstalk)** | Data, user access | OS patching, database engine |
| **SaaS (managed services like S3)** | Data, access policies | Everything else |

### Examples

| Task | Who is Responsible? |
|------|---------------------|
| Physical security of data center | AWS |
| Patching the hypervisor | AWS |
| Patching Windows on an EC2 instance | Customer |
| Patching the database engine in RDS | AWS |
| Encrypting data in S3 | Customer |
| Configuring security groups | Customer |
| Replacing failed hardware | AWS |
| Setting IAM permissions | Customer |
| Disposing of old hard drives | AWS |

### The Golden Rule
> **If you can configure it in the AWS console, you're probably responsible for it.**

### Common Exam Scenarios

*   **S3 bucket left public → data exposed:** Customer's fault (misconfigured permissions).
*   **EC2 instance compromised via unpatched OS:** Customer's fault (should have patched).
*   **Hardware failure causes data loss:** AWS's responsibility (but customer should have backups).
*   **DDoS attack on infrastructure:** AWS protects (Shield Standard is automatic).

> **EXAM TIP:** Remember: AWS = "of" the cloud (infrastructure). Customer = "in" the cloud (data, configuration, access).