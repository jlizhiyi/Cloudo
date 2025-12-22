# Relational Databases

Relational databases store data in **tables** with rows and columns, using **SQL** for queries. AWS offers managed relational database services.

### Amazon RDS (Relational Database Service)
A managed service for running relational databases in the cloud.

**Supported Engines:**
*   MySQL, PostgreSQL, MariaDB
*   Oracle, Microsoft SQL Server
*   Amazon Aurora

**What AWS Manages (vs. Self-Hosted on EC2):**
*   Hardware provisioning and patching
*   Database software installation and patching
*   Automated backups
*   High availability (Multi-AZ)

**Key Features:**
*   **Multi-AZ Deployment:** Synchronous replication to a standby in another Availability Zone for automatic failover.
*   **Read Replicas:** Asynchronous copies for read-heavy workloads (scale reads horizontally).
*   **Automated Backups:** Point-in-time recovery within your retention period.

### Amazon Aurora
A MySQL and PostgreSQL-compatible database built for the cloud.

*   **Performance:** Up to 5x faster than MySQL, 3x faster than PostgreSQL.
*   **Storage:** Auto-scales from 10GB to 128TB.
*   **Durability:** 6 copies of data across 3 Availability Zones.
*   **Aurora Serverless:** Automatically scales capacity based on demand—pay per second.

### When to Use What

| Scenario | Recommendation |
|----------|----------------|
| Traditional apps needing MySQL/PostgreSQL | Amazon RDS |
| High performance, high availability at scale | Amazon Aurora |
| Need full OS control (custom configs) | Self-managed on EC2 |
| Variable/unpredictable workloads | Aurora Serverless |

> **TIP**
> **RDS vs. EC2:** If you install a database on EC2, YOU manage backups, patching, and replication. RDS handles it for you.