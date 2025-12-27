# Pricing, Billing & Support

Understanding AWS pricing and cost management is essential for the CCP exam.

### Compute Pricing Models

| Model | Description | Best For |
|-------|-------------|----------|
| **On-Demand** | Pay by the hour/second, no commitment | Short-term, unpredictable workloads |
| **Reserved Instances** | 1 or 3-year commitment, up to 72% discount | Steady-state workloads (databases, production) |
| **Savings Plans** | Flexible commitment to $/hour usage | Predictable usage across instance families |
| **Spot Instances** | Bid on unused capacity, up to 90% discount | Fault-tolerant, flexible workloads |
| **Dedicated Hosts** | Physical server dedicated to you | Licensing requirements (BYOL), compliance |

> **Spot vs Reserved:** Spot can be interrupted (2-min warning). Reserved is guaranteed capacity.

### Free Tier
AWS offers a Free Tier for new accounts (12 months) plus always-free services.

*   **12-month free:** EC2 (750 hrs/month t2.micro), S3 (5GB), RDS (750 hrs).
*   **Always free:** Lambda (1M requests/month), DynamoDB (25GB), CloudWatch (basic).

### AWS Organizations
Manage **multiple AWS accounts** centrally.

*   **Consolidated Billing:** One bill for all accounts; usage is aggregated for volume discounts.
*   **Service Control Policies (SCPs):** Restrict what services/actions accounts can use.
*   **Organizational Units (OUs):** Group accounts (e.g., Production, Development, Security).

### Cost Management Tools

| Tool | Purpose |
|------|---------|
| **AWS Cost Explorer** | Visualize and analyze spending over time. Forecast future costs. |
| **AWS Budgets** | Set spending alerts. Get notified when costs exceed thresholds. |
| **AWS Cost and Usage Report** | Most detailed cost data. Export to S3 for analysis. |
| **AWS Pricing Calculator** | Estimate costs for new workloads before deploying. |
| **AWS Compute Optimizer** | Recommendations to right-size EC2, EBS, Lambda. |
| **AWS Trusted Advisor** | Checks for cost optimization, security, performance (more with Business/Enterprise support). |

### AWS Support Plans

| Plan | Cost | Features |
|------|------|----------|
| **Basic** | Free | Account/billing support, Service Health Dashboard, 6 Trusted Advisor checks |
| **Developer** | $29+/month | Business hours email support, 1 primary contact |
| **Business** | $100+/month | 24/7 phone/chat, full Trusted Advisor, < 1 hr response (production down) |
| **Enterprise On-Ramp** | $5,500+/month | TAM pool, 30-min response (business-critical down) |
| **Enterprise** | $15,000+/month | Dedicated TAM, 15-min response, Well-Architected reviews |

> **TAM = Technical Account Manager:** A designated AWS expert who proactively helps you.

### Key Pricing Principles

1. **Pay-as-you-go:** No upfront costs for most services.
2. **Pay less when you reserve:** Commit for discounts.
3. **Pay less per unit as usage increases:** Volume discounts (S3 tiered pricing).
4. **No charge for inbound data transfer:** Data INTO AWS is free.
5. **Outbound data transfer is charged:** Data leaving AWS costs money.

> **EXAM TIP:** Know the Support Plans (especially Business vs Enterprise), Cost Explorer vs Budgets, and Reserved vs Spot instances.

