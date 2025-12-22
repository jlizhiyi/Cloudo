# Content Delivery & DNS

### Amazon CloudFront (CDN)
A **Content Delivery Network (CDN)** caches your content at **Edge Locations** around the world, reducing latency for users.

*   **How it works:** A user in Tokyo requests your website. Instead of fetching it from your server in Virginia, CloudFront serves a cached copy from an Edge Location in Tokyo.
*   **Use cases:** Static websites, video streaming, API acceleration.
*   **Security:** Integrates with AWS Shield (DDoS protection) and AWS WAF (web application firewall).

### Amazon Route 53 (DNS)
A highly available **Domain Name System (DNS)** service. It translates human-readable names (like `www.example.com`) into IP addresses.

**Key Features:**
*   **Domain Registration:** Buy and manage domain names directly.
*   **DNS Routing:** Route traffic to AWS resources or external endpoints.
*   **Health Checks:** Monitor endpoint health and route away from failures.

**Routing Policies:**
| Policy | Description |
|--------|-------------|
| Simple | One resource (e.g., one web server) |
| Weighted | Split traffic by percentage (e.g., 70/30 for A/B testing) |
| Latency | Route to the region with lowest latency |
| Failover | Primary/Secondary for disaster recovery |
| Geolocation | Route based on user's geographic location |

### Amazon API Gateway
A fully managed service to create, publish, and secure APIs at any scale.
*   **Use case:** Create a REST API that triggers Lambda functions (serverless backend).
*   **Features:** Throttling, caching, authentication, and monitoring.

> ### HELPFUL NOTE:
> CloudFront + S3 is a classic pattern for hosting static websites globally with low latency and low cost.