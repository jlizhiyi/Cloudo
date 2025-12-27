# Storage Services

AWS offers storage for every use case: objects, blocks, files, and data transfer.

### Amazon S3 (Simple Storage Service)
Object storage with virtually unlimited capacity. **The most important storage service for CCP.**

*   **Structure:** Objects stored in Buckets (flat namespace, not folders).
*   **Durability:** 99.999999999% (11 nines) - designed to never lose data.
*   **Access:** Via HTTP/HTTPS (URLs, APIs).
*   **Use cases:** Backups, static websites, data lakes, media hosting.

**S3 Storage Classes (know these for the exam!):**

| Class | Use Case | Retrieval |
|-------|----------|-----------|
| **S3 Standard** | Frequently accessed data | Instant |
| **S3 Standard-IA** | Infrequent access, but needs fast retrieval | Instant (retrieval fee) |
| **S3 One Zone-IA** | Infrequent, non-critical (single AZ) | Instant (retrieval fee) |
| **S3 Glacier Instant** | Archive with instant retrieval | Instant |
| **S3 Glacier Flexible** | Archive, retrieval in minutes to hours | Minutes-hours |
| **S3 Glacier Deep Archive** | Long-term archive (7+ years) | 12-48 hours |
| **S3 Intelligent-Tiering** | Unknown/changing access patterns | Auto-moves data |

### Amazon EBS (Elastic Block Store)
Block storage volumes for EC2 instances. Think of it as a **virtual hard drive**.

*   **Persistent:** Data survives instance stop/restart.
*   **Single attachment:** One EBS volume attaches to one EC2 instance (usually).
*   **Types:** SSD (gp3, io2) for databases; HDD (st1, sc1) for throughput.
*   **Snapshots:** Point-in-time backups stored in S3.

### Amazon EFS (Elastic File System)
Managed file storage that **multiple EC2 instances can access simultaneously**.

*   **Protocol:** NFS (Network File System).
*   **Scalable:** Grows and shrinks automatically.
*   **Use cases:** Content management, web serving, shared home directories.

### AWS Storage Gateway
Connects on-premises environments to AWS cloud storage.

*   **Use case:** Hybrid cloud, backup to S3, extending on-prem storage.
*   **Types:** File Gateway, Volume Gateway, Tape Gateway.

### AWS Snow Family
Physical devices for **large-scale data transfer** when network transfer is too slow.

| Device | Capacity | Use Case |
|--------|----------|----------|
| **Snowcone** | 8-14 TB | Edge computing, small transfers |
| **Snowball Edge** | 80 TB | Large migrations, edge computing |
| **Snowmobile** | 100 PB | Massive data center migrations |

> **EXAM TIP:** S3 = objects (images, backups), EBS = block storage for EC2, EFS = shared file system. Know your S3 storage classes!