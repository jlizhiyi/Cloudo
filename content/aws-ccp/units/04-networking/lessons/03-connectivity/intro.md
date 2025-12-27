# Connectivity Options

AWS provides multiple ways to connect VPCs to each other, to on-premises networks, and to AWS services.

### VPC Peering

A private network connection between **two VPCs** using AWS's internal network.

*   **Private traffic:** Stays on AWS backbone, never touches the public internet.
*   **Cross-region:** Works across regions and even across AWS accounts.
*   **Limitation:** Not transitive. If VPC-A peers with VPC-B, and VPC-B peers with VPC-C, A cannot reach C through B.
*   **Requirement:** CIDR blocks cannot overlap.

```
VPC-A ←→ VPC-B ←→ VPC-C
  ↑                   ↑
  └───── Cannot reach directly ─────┘
```

### AWS Transit Gateway

A **central hub** that connects multiple VPCs and on-premises networks.

*   **Simplifies topology:** Instead of many peering connections, connect everything to Transit Gateway.
*   **Transitive routing:** VPC-A can reach VPC-C through the Transit Gateway.
*   **Scales:** Supports thousands of VPCs.
*   **Use case:** Large enterprises with many VPCs and hybrid connectivity.

```
          ┌── VPC-A
          │
Transit ──┼── VPC-B
Gateway   │
          ├── VPC-C
          │
          └── On-premises
```

### AWS Direct Connect

A **dedicated, private network connection** from your data center to AWS.

*   **Bypasses the internet:** Consistent latency, higher bandwidth.
*   **Speeds:** 1 Gbps, 10 Gbps, or 100 Gbps.
*   **Use cases:** Large data transfers, hybrid workloads, regulatory requirements.
*   **Lead time:** Takes weeks to establish (physical connection).

> **Direct Connect vs VPN:** Direct Connect is a physical, dedicated line. VPN is encrypted over the public internet.

### AWS Site-to-Site VPN

An **encrypted connection** over the public internet between your on-premises network and your VPC.

*   **Quick to set up:** Hours, not weeks.
*   **Lower cost** than Direct Connect.
*   **Limitation:** Subject to internet variability (latency, bandwidth fluctuations).
*   **Components:** Virtual Private Gateway (VPC side) + Customer Gateway (your side).

| Feature | Direct Connect | Site-to-Site VPN |
|---------|---------------|------------------|
| **Connection** | Dedicated physical line | Encrypted over internet |
| **Setup time** | Weeks | Hours |
| **Latency** | Consistent, low | Variable |
| **Cost** | Higher | Lower |
| **Use case** | Large data, compliance | Quick hybrid access |

### AWS PrivateLink (VPC Endpoints)

Access AWS services **privately** without traversing the internet.

**Types:**
| Type | Description |
|------|-------------|
| **Gateway Endpoint** | For S3 and DynamoDB only. Free. Route table entry. |
| **Interface Endpoint** | For most other AWS services. Uses ENI with private IP. Costs money. |

*   **Benefit:** Traffic stays on AWS network. Improves security and can reduce NAT Gateway costs.
*   **Use case:** Private subnet accessing S3 without NAT Gateway.

### AWS Client VPN

Managed VPN for **remote users** to securely connect to AWS or on-premises networks.

*   **Use case:** Employees working from home accessing private resources.
*   **Authentication:** Active Directory, certificates, or federated authentication.

### Connectivity Decision Guide

| Scenario | Solution |
|----------|----------|
| Two VPCs need to communicate privately | VPC Peering |
| Many VPCs + on-premises, complex routing | Transit Gateway |
| Dedicated, consistent connection to on-prem | Direct Connect |
| Quick, encrypted connection to on-prem | Site-to-Site VPN |
| Access S3 from private subnet without NAT | Gateway Endpoint |
| Access AWS services privately (not S3/DynamoDB) | Interface Endpoint |
| Remote employees accessing private VPC | Client VPN |

> **EXAM TIP:** Know Direct Connect = dedicated physical line (weeks to set up). VPN = encrypted over internet (hours to set up). VPC Peering = not transitive.
