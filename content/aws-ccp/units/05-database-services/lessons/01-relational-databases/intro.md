===== 01-relational-databases/intro.md =====

# Relational Databases (RDS & Aurora)

Relational databases store data in **tables** with rows and columns, using **SQL** for queries. AWS offers fully managed relational database services.

### Amazon RDS (Relational Database Service)

A managed service for running relational databases without managing infrastructure.

**Supported Engines:**
*   MySQL, PostgreSQL, MariaDB
*   Oracle, Microsoft SQL Server
*   Amazon Aurora (AWS's cloud-native option)

**What AWS Manages:**
*   Hardware provisioning
*   Database software installation and patching
*   Automated backups
*   High availability setup

**What You Manage:**
*   Schema design and optimization
*   Query tuning
*   Data and access control

### Key RDS Features

**Multi-AZ Deployment (High Availability)**
*   Creates a **synchronous standby** replica in another Availability Zone.
*   **Automatic failover:** If primary fails, standby is promoted (typically 60-120 seconds).
*   **Use case:** Production databases requiring high availability.
*   **Note:** Standby is NOT used for read traffic—it's only for failover.

**Read Replicas (Scalability)**
*   Creates **asynchronous copies** of your database.
*   **Use case:** Offload read-heavy workloads (reports, analytics).
*   Can be in same AZ, different AZ, or different Region.
*   Can be promoted to standalone database (breaks replication).
*   **Up to 15 Read Replicas** for Aurora, 5 for other engines.

**Automated Backups**
*   Daily snapshots + transaction logs.
*   **Point-in-time recovery:** Restore to any second within retention period (up to 35 days).
*   Stored in S3 (managed by AWS).

### Amazon Aurora

AWS's **cloud-native** relational database, compatible with MySQL and PostgreSQL.

**Performance:**
*   Up to **5x faster than MySQL**, 3x faster than PostgreSQL.
*   Optimized for cloud with distributed storage.

**Storage:**
*   **Auto-scales** from 10 GB to 128 TB.
*   **6 copies** of data across 3 Availability Zones.
*   Self-healing: Automatically detects and repairs disk failures.

**Aurora Serverless**
*   **Auto-scales capacity** up and down based on demand.
*   Can **pause during inactivity** (pay nothing when paused).
*   **Use case:** Development, testing, variable/unpredictable workloads.

### RDS vs Aurora vs EC2

| Scenario | Recommendation |
|----------|----------------|
| Standard MySQL/PostgreSQL, managed | Amazon RDS |
| High performance, high availability | Amazon Aurora |
| Need OS-level access or custom configs | Self-managed on EC2 |
| Variable workloads, scale to zero | Aurora Serverless |

### RDS Proxy

A fully managed database proxy for RDS and Aurora.

*   **Connection pooling:** Reduces database connection overhead.
*   **Use case:** Lambda functions (which open many short-lived connections).
*   **Benefit:** Improves application scalability and database efficiency.

> **EXAM TIP:** Multi-AZ = high availability (failover). Read Replicas = scalability (read performance). Aurora = AWS's high-performance option with 6 copies across 3 AZs.
