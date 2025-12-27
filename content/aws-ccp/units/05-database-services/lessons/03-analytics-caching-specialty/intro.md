# Analytics, Caching & Purpose-Built Databases

AWS offers specialized databases for caching, analytics, and specific data models.

### Amazon ElastiCache

A fully managed **in-memory caching** service for sub-millisecond latency.

**Engines:**
| Engine | Characteristics |
|--------|-----------------|
| **Redis** | Rich features: persistence, replication, Pub/Sub, Lua scripting |
| **Memcached** | Simple, multi-threaded, pure caching |

**Use Cases:**
*   **Database caching:** Cache frequent queries to reduce database load.
*   **Session storage:** Store user sessions for web applications.
*   **Real-time analytics:** Leaderboards, counting, rate limiting.

**Benefit:** Reduces database load and improves application response times from milliseconds to microseconds.

> **DAX vs ElastiCache:** DAX is specifically for DynamoDB. ElastiCache works with any application/database.

### Amazon Redshift

A fully managed **data warehouse** for analytics on petabytes of data.

**Key Features:**
*   **Columnar storage:** Optimized for analytical queries (aggregations, GROUP BY).
*   **Massively Parallel Processing (MPP):** Distributes queries across nodes.
*   **SQL interface:** Use standard SQL and BI tools.
*   **Redshift Spectrum:** Query data directly in S3 without loading it.
*   **Redshift Serverless:** Auto-scales, pay for what you use.

**Use Cases:**
*   Business intelligence and reporting.
*   Data lake analytics.
*   Historical data analysis.

> **Redshift vs RDS:** RDS = transactional workloads (OLTP). Redshift = analytical workloads (OLAP).

### Amazon MemoryDB for Redis

A Redis-compatible, **durable in-memory database** service.

*   Unlike ElastiCache, data is **persisted** (survives restarts).
*   Use case: Applications needing Redis API with database durability.

### AWS Database Migration Service (DMS)

Migrate databases to AWS with **minimal downtime**.

**Supports:**
*   **Homogeneous migrations:** Oracle → Oracle, MySQL → MySQL.
*   **Heterogeneous migrations:** Oracle → Aurora, SQL Server → PostgreSQL.
*   **Continuous replication:** Keep source and target in sync.

**Use Cases:**
*   Migrate on-premises databases to AWS.
*   Migrate from one database engine to another.
*   Replicate data for disaster recovery.

> **Schema Conversion Tool (SCT):** Converts schemas when migrating between different database engines.

### Purpose-Built Databases (Know What They're For)

AWS offers specialized databases for specific data models:

| Service | Type | Use Case |
|---------|------|----------|
| **DocumentDB** | Document (MongoDB-compatible) | Content management, catalogs, user profiles |
| **Neptune** | Graph | Social networks, fraud detection, recommendations |
| **Keyspaces** | Wide-column (Cassandra-compatible) | High-scale time-series, IoT data |
| **QLDB** | Ledger | Immutable audit logs, financial transactions |
| **Timestream** | Time-series | IoT sensor data, DevOps metrics, clickstream |

### Choosing the Right Database

| Need | Service |
|------|---------|
| Relational with SQL, managed | RDS, Aurora |
| Key-value, serverless, high scale | DynamoDB |
| In-memory caching | ElastiCache |
| Data warehouse, analytics | Redshift |
| Document store (MongoDB) | DocumentDB |
| Graph relationships | Neptune |
| Immutable audit trail | QLDB |
| Time-series data | Timestream |
| Migrate databases to AWS | DMS |

> **EXAM TIP:** Know the high-level purpose of each database. Common question: "Which database for [use case]?" ElastiCache = caching, Redshift = analytics/warehouse, DMS = migration.