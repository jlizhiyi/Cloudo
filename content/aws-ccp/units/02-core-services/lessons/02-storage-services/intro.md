# Storage Services

Cloud storage comes in four main flavors. Choosing the right one saves money and improves performance.

### 1. Object Storage
Stores data as "objects" in a flat pool (no folders hierarchy, just keys).
*   **Best For:** Unstructured data like images, videos, backups, and static websites.
*   **Durability:** Extremely high (11 nines).
*   **Access:** via HTTP/API.

### 2. Block Storage
Acts like a raw hard drive attached to a computer.
*   **Best For:** Databases, Operating Systems (Boot drives), and apps needing low-latency.
*   **Trait:** You can edit a single byte of a file without re-saving the whole thing.

### 3. File Storage
A shared file system (like NFS).
*   **Best For:** When multiple servers need to read/write shared files at the same time (e.g., a shared office drive or content management system).

### 4. Archive / Cold Storage
Extremely cheap storage for data you rarely use.
*   **Best For:** Compliance data (tax records, backups) kept for years.
*   **Tradeoff:** Data retrieval isn't instant; it can take minutes or hours.