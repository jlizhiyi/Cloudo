# Security Services & Compliance

AWS provides a broad set of security services to protect your workloads.

### Threat Detection & Monitoring

| Service | Purpose |
|---------|---------|
| **Amazon GuardDuty** | Intelligent threat detection using ML. Analyzes CloudTrail, VPC Flow Logs, DNS logs. |
| **AWS Security Hub** | Centralized security dashboard. Aggregates findings from GuardDuty, Inspector, Macie, etc. |
| **Amazon Inspector** | Automated vulnerability scanning for EC2 and container images. |
| **Amazon Detective** | Analyze and investigate security findings (root cause analysis). |

### Network & Application Protection

| Service | Purpose |
|---------|---------|
| **AWS Shield** | DDoS protection. **Standard** is free and automatic. **Advanced** is paid with 24/7 support. |
| **AWS WAF** | Web Application Firewall. Block SQL injection, XSS, and custom rules. Works with CloudFront, ALB, API Gateway. |
| **AWS Firewall Manager** | Centrally manage firewall rules across accounts in AWS Organizations. |

### Data Protection & Encryption

| Service | Purpose |
|---------|---------|
| **AWS KMS** (Key Management Service) | Create and manage encryption keys. Integrates with most AWS services. |
| **AWS CloudHSM** | Hardware Security Module for regulatory compliance (you control the keys). |
| **Amazon Macie** | Uses ML to discover and protect sensitive data (PII) in S3. |
| **AWS Secrets Manager** | Rotate and manage secrets (database passwords, API keys). |
| **AWS Certificate Manager** | Provision and manage SSL/TLS certificates (free for AWS services). |

### Audit & Compliance

| Service | Purpose |
|---------|---------|
| **AWS CloudTrail** | Logs all API calls in your account (who did what, when). Enabled by default. |
| **AWS Config** | Tracks resource configurations over time. Evaluate compliance against rules. |
| **AWS Artifact** | Download AWS compliance reports (SOC, PCI, ISO) and agreements. |
| **AWS Audit Manager** | Automate evidence collection for audits. |

### Quick Reference

> **GuardDuty** = threat detection (finds bad actors)
> **Inspector** = vulnerability scanning (finds weaknesses)
> **Macie** = sensitive data discovery (finds PII in S3)
> **Shield** = DDoS protection
> **WAF** = web application firewall (blocks attacks)
> **KMS** = encryption key management
> **CloudTrail** = API audit log
> **Config** = configuration history and compliance
> **Artifact** = compliance reports

> **EXAM TIP:** Know what each service does at a high level. Common questions: "Which service detects threats?" (GuardDuty) "Which service provides DDoS protection?" (Shield)
