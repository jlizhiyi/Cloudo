# VPC Fundamentals

A **Virtual Private Cloud (VPC)** is your own isolated network within AWS. You have complete control over IP addressing, subnets, routing, and gateways.

### Key Concepts

**VPC Basics**
*   A VPC spans a single **Region** (but can span all AZs in that region).
*   You define the IP range using **CIDR notation** (e.g., 10.0.0.0/16).
*   Each AWS account has a **default VPC** in every region (ready to use).
*   You can create **custom VPCs** for production workloads.

### Subnets

Subnets divide your VPC into smaller network segments. Each subnet exists in **one Availability Zone**.

| Type | Description | Use Case |
|------|-------------|----------|
| **Public Subnet** | Has a route to the Internet Gateway | Web servers, load balancers |
| **Private Subnet** | No direct internet route | Databases, application servers |

> **What makes a subnet public?** A route table entry pointing 0.0.0.0/0 to an Internet Gateway.

### Route Tables

Route tables contain rules (routes) that determine where network traffic is directed.

*   Every subnet must be associated with a route table.
*   The **Main Route Table** is the default for the VPC.
*   **Custom Route Tables** allow different routing per subnet.

**Example Route Table (Public Subnet):**
| Destination | Target |
|-------------|--------|
| 10.0.0.0/16 | local |
| 0.0.0.0/0 | igw-xxxxx (Internet Gateway) |

### Internet Gateway (IGW)

Allows communication between your VPC and the public internet.

*   **Horizontally scaled** and highly available (AWS managed).
*   Attach one IGW per VPC.
*   Resources need a **public IP** to use the IGW.

### NAT Gateway

Allows instances in a **private subnet** to access the internet (for updates, patches) while preventing inbound connections.

*   **Managed by AWS** (highly available within an AZ).
*   Deploy in a **public subnet**.
*   Update private subnet route table to point 0.0.0.0/0 → NAT Gateway.
*   **Costs money** (hourly + data processing charges).

> **NAT Gateway vs Internet Gateway:**
> - IGW = two-way traffic (public resources)
> - NAT = outbound only (private resources reaching out)

### Elastic IP Addresses

Static, public IPv4 addresses that you can allocate and associate with resources.

*   **Persists** even if you stop/start an instance.
*   **Free** when associated with a running instance.
*   **Charged** when allocated but not in use.

### VPC Diagram

```
┌─────────────────── VPC (10.0.0.0/16) ───────────────────┐
│                                                          │
│  ┌─── Public Subnet (10.0.1.0/24) ───┐                  │
│  │  [Web Server]  ←→  Internet       │←→ Internet       │
│  │         ↓           Gateway       │                  │
│  │   [NAT Gateway]                   │                  │
│  └───────────────────────────────────┘                  │
│         ↓                                               │
│  ┌─── Private Subnet (10.0.2.0/24) ──┐                  │
│  │  [Database] → NAT (outbound only) │                  │
│  │  [App Server]                     │                  │
│  └───────────────────────────────────┘                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

> **EXAM TIP:** Know the difference between public and private subnets, and when to use IGW vs NAT Gateway.
