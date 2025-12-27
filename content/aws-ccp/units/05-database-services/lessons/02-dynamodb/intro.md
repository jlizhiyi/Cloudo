# Amazon DynamoDB

DynamoDB is a fully managed **NoSQL key-value and document database** designed for single-digit millisecond performance at any scale.

### Key Characteristics

*   **Serverless:** No servers to provision, patch, or manage.
*   **Scalable:** Handles trillions of requests per day.
*   **Performance:** Single-digit millisecond latency.
*   **Highly available:** Data replicated across 3 AZs automatically.
*   **Flexible schema:** No fixed structure required (unlike relational DBs).

### Core Concepts

**Tables, Items, and Attributes**
*   **Table:** A collection of items (like a table in SQL).
*   **Item:** A single record (like a row).
*   **Attribute:** A data element (like a column, but flexible per item).

**Primary Keys**
*   **Partition Key:** A single attribute that uniquely identifies an item. DynamoDB uses it to distribute data.
*   **Partition Key + Sort Key:** Composite key. Partition key groups items; sort key orders them within the group.

**Example:**
| Partition Key (UserID) | Sort Key (OrderDate) | OrderTotal |
|------------------------|---------------------|------------|
| user123 | 2024-01-15 | $99.99 |
| user123 | 2024-02-20 | $149.99 |
| user456 | 2024-01-10 | $29.99 |

### Capacity Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **On-Demand** | Pay per request, auto-scales instantly | Unpredictable traffic, new apps |
| **Provisioned** | Set read/write capacity units (RCUs/WCUs) | Predictable, steady workloads |

*   **On-Demand:** No capacity planning. Pay more per request but scales automatically.
*   **Provisioned:** Lower cost if traffic is predictable. Can enable **Auto Scaling** to adjust capacity.

### DynamoDB Features

**Global Tables**
*   Multi-region, **multi-active** replication.
*   Users read/write from nearest region.
*   **Use case:** Global applications with low-latency access worldwide.

**DynamoDB Streams**
*   Captures item-level changes (insert, update, delete).
*   Triggers Lambda functions for real-time processing.
*   **Use case:** Real-time analytics, cross-region replication, audit logs.

**Time to Live (TTL)**
*   Automatically delete items after a specified time.
*   **Use case:** Session data, temporary records, logs.

**DynamoDB Accelerator (DAX)**
*   Fully managed **in-memory cache** for DynamoDB.
*   Reduces latency from milliseconds to **microseconds**.
*   **Use case:** Read-heavy workloads requiring extreme performance.

### DynamoDB vs Relational Databases

| Feature | DynamoDB | Relational (RDS) |
|---------|----------|-----------------|
| **Schema** | Flexible | Fixed |
| **Scaling** | Automatic, horizontal | Manual, vertical |
| **Queries** | Key-based access | Complex SQL joins |
| **Transactions** | Supported (limited) | Full ACID |
| **Use case** | High-scale, simple access patterns | Complex queries, relationships |

### Common Use Cases

*   **Gaming:** Leaderboards, player sessions, game state.
*   **E-commerce:** Shopping carts, product catalogs.
*   **IoT:** Device data, sensor readings.
*   **Mobile/Web:** User profiles, session management.
*   **Ad Tech:** Real-time bidding, clickstream data.

> **EXAM TIP:** DynamoDB = serverless NoSQL, single-digit ms latency, scales automatically. Know the difference between On-Demand and Provisioned capacity modes. Global Tables = multi-region active-active.