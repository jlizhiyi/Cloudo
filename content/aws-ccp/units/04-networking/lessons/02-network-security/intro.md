# Network Security

AWS provides two layers of network firewall: **Security Groups** (instance level) and **Network ACLs** (subnet level).

### Security Groups

A **virtual firewall** that controls inbound and outbound traffic at the **instance level**.

| Characteristic | Detail |
|----------------|--------|
| **Scope** | Attached to ENI (network interface) / instance |
| **State** | **Stateful** - return traffic automatically allowed |
| **Rules** | Allow rules only (no deny rules) |
| **Default Inbound** | Deny all |
| **Default Outbound** | Allow all |
| **Rule Evaluation** | All rules evaluated (most permissive wins) |

**Key Behaviors:**
*   If you allow inbound HTTP (port 80), the response is automatically allowed out.
*   You can reference other security groups (e.g., "allow traffic from SG-webservers").
*   Changes take effect **immediately**.

**Example Security Group:**
| Type | Port | Source | Description |
|------|------|--------|-------------|
| SSH | 22 | 203.0.113.0/32 | My office IP |
| HTTP | 80 | 0.0.0.0/0 | Public web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Public secure traffic |

### Network ACLs (NACLs)

A **firewall** at the **subnet level** that filters traffic entering and leaving the subnet.

| Characteristic | Detail |
|----------------|--------|
| **Scope** | Applied to subnets |
| **State** | **Stateless** - must define inbound AND outbound rules |
| **Rules** | Allow AND Deny rules |
| **Default** | Allow all traffic (default NACL) |
| **Rule Evaluation** | Rules processed in order (lowest number first) |

**Key Behaviors:**
*   If you allow inbound HTTP, you MUST also allow outbound ephemeral ports (1024-65535) for responses.
*   Rules are numbered (100, 200, etc.). First match wins.
*   Rule `*` (asterisk) is the default deny at the end.

**Example NACL:**
| Rule # | Type | Port | Source | Allow/Deny |
|--------|------|------|--------|------------|
| 100 | HTTP | 80 | 0.0.0.0/0 | ALLOW |
| 110 | HTTPS | 443 | 0.0.0.0/0 | ALLOW |
| 120 | SSH | 22 | 10.0.0.0/16 | ALLOW |
| 200 | All | All | 192.168.1.100/32 | DENY |
| * | All | All | 0.0.0.0/0 | DENY |

### Security Groups vs NACLs

| Feature | Security Group | Network ACL |
|---------|----------------|-------------|
| **Level** | Instance | Subnet |
| **State** | Stateful | Stateless |
| **Rules** | Allow only | Allow and Deny |
| **Evaluation** | All rules | First match wins |
| **Default** | Deny inbound, allow outbound | Allow all |

### Defense in Depth

Use both Security Groups AND NACLs for layered security:

```
Internet → NACL (subnet firewall) → Security Group (instance firewall) → Instance
```

*   **NACLs:** Broad rules, block known bad IPs at the subnet edge.
*   **Security Groups:** Fine-grained rules per application/instance.

> **EXAM TIP:** The most common question: "What is the difference between Security Groups and NACLs?" Remember: SG = stateful/instance/allow-only. NACL = stateless/subnet/allow+deny.
