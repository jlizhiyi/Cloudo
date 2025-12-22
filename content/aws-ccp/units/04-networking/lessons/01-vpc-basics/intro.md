# VPC Fundamentals

A **Virtual Private Cloud (VPC)** is your own isolated section of the AWS cloud where you launch resources in a virtual network you define.

### Key Components

**1. Subnets**
Subnets divide your VPC into segments.
*   **Public Subnet:** Has a route to the internet (via an Internet Gateway). Use for web servers.
*   **Private Subnet:** No direct internet access. Use for databases and backend services.

**2. Internet Gateway (IGW)**
Allows communication between your VPC and the internet. Attach one to your VPC to enable public access.

**3. NAT Gateway**
Allows instances in a **private subnet** to access the internet (e.g., for software updates) while preventing inbound connections from the internet.

**4. Security Groups**
Virtual firewalls at the **instance level**.
*   **Stateful:** If you allow inbound traffic, the response is automatically allowed out.
*   **Default:** Denies all inbound, allows all outbound.

**5. Network ACLs (NACLs)**
Firewalls at the **subnet level**.
*   **Stateless:** You must explicitly allow both inbound AND outbound traffic.
*   **Default:** Allows all traffic in and out.

### VPC Peering
Connects two VPCs privately using AWS's network (not over the public internet). Traffic stays within AWS.

> [!TIP]
> **Security Groups vs NACLs:** Think of Security Groups as the lock on your apartment door (instance), and NACLs as the security guard at the building entrance (subnet).