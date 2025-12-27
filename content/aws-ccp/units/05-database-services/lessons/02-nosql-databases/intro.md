# NoSQL & Specialty Databases

Not all data fits neatly into tables. AWS offers purpose-built databases for different data models and access patterns.

### Amazon DynamoDB
A fully managed **NoSQL key-value and document database**.

*   **Performance:** Single-digit millisecond latency at any scale.
*   **Serverless:** No servers to manage; auto-scales.
*   **Capacity Modes:** On-demand (pay per request) or Provisioned (set read/write units).
*   **Global Tables:** Multi-region, multi-active replication.
*   **Use cases:** Gaming leaderboards, shopping carts, session management, IoT.

### Amazon ElastiCache
A managed **in-memory caching** service.

*   **Engines:** Redis or Memcached.
*   **Speed:** Microsecond latency (faster than databases).
*   **Use cases:** Session stores, real-time analytics, caching database queries.

### Amazon Redshift
A fully managed **data warehouse** for analytics.

*   **Petabyte-scale:** Analyze huge datasets using SQL.
*   **Columnar storage:** Optimized for aggregation queries.
*   **Use cases:** Business intelligence, reporting, data lakes analytics.

### Other Specialty Databases

| Service | Type | Use Case |
|---------|------|----------|
| DocumentDB | Document (MongoDB-compatible) | Content management, catalogs |
| Neptune | Graph | Social networks, fraud detection |
| Keyspaces | Wide-column (Cassandra-compatible) | High-scale time-series data |
| QLDB | Ledgere | Immutable, cryptographically verifiable records |
| Timestream | Time-series | IoT sensor data, DevOps metrics |

> [!TIP]
> **Choosing a database:** Use DynamoDB for key-value access patterns, RDS/Aurora for complex queries with joins, Redshift for analytics, and ElastiCache to speed up anything.