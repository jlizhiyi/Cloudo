# Content Delivery & DNS

AWS provides services to deliver content globally with low latency and to manage DNS routing.

### Amazon CloudFront

A **Content Delivery Network (CDN)** that caches content at **Edge Locations** worldwide.

**How It Works:**
1. User requests content (image, video, webpage).
2. CloudFront checks the nearest Edge Location.
3. If cached → returns immediately (cache hit).
4. If not cached → fetches from origin, caches it, returns to user.

**Key Concepts:**
*   **Edge Locations:** 400+ data centers worldwide for caching (separate from Regions/AZs).
*   **Origin:** Where CloudFront gets the original content (S3, EC2, ALB, or any HTTP server).
*   **Distribution:** Configuration that defines origin, caching behavior, and settings.
*   **TTL (Time to Live):** How long content stays cached before refreshing.

**Benefits:**
*   **Low latency:** Content served from edge nearest to user.
*   **Reduced origin load:** Fewer requests hit your servers.
*   **Security:** Integrates with AWS Shield (DDoS) and WAF.
*   **HTTPS:** Free SSL/TLS certificates via ACM.

> **Classic pattern:** S3 (static files) + CloudFront = fast, cheap, global website.

### AWS Global Accelerator

Improves **application availability and performance** using AWS's global network.

**How It Works:**
*   Users connect to the nearest Edge Location.
*   Traffic travels over AWS's private backbone (not the public internet).
*   Routes to optimal regional endpoint based on health and geography.

| Feature | CloudFront | Global Accelerator |
|---------|------------|-------------------|
| **Use case** | Cache static content | Accelerate dynamic apps (gaming, VoIP) |
| **Content** | Cacheable (images, videos) | Non-cacheable (real-time, interactive) |
| **IPs** | Domain names | Static Anycast IPs |

### Amazon Route 53

A highly available **DNS service** with domain registration and health checking.

**Key Features:**
*   **Domain Registration:** Buy and manage domain names.
*   **DNS Hosting:** Translate domain names to IP addresses.
*   **Health Checks:** Monitor endpoint health and route away from failures.
*   **Name origin:** Port 53 is the standard DNS port.

### Route 53 Routing Policies

| Policy | Description | Use Case |
|--------|-------------|----------|
| **Simple** | Single resource, no health checks | One web server |
| **Weighted** | Distribute traffic by percentage | A/B testing (90/10 split) |
| **Latency** | Route to lowest-latency region | Global apps (users get fastest region) |
| **Failover** | Primary/secondary with health checks | Disaster recovery |
| **Geolocation** | Route based on user's location | Localized content (different sites per country) |
| **Geoproximity** | Route based on resource location + bias | Shift traffic between regions |
| **Multi-value** | Return multiple healthy IPs | Simple load balancing |

### Amazon API Gateway

A fully managed service to create, publish, and manage **APIs** at any scale.

*   **REST APIs and WebSocket APIs.**
*   **Integrates with Lambda** for serverless backends.
*   **Features:** Throttling, caching, authentication, API versioning.
*   **Use case:** Mobile/web app backend, microservices API layer.

### Quick Reference

> **CloudFront** = CDN, caches content at 400+ edge locations
> **Global Accelerator** = Anycast IPs, AWS backbone for dynamic traffic
> **Route 53** = DNS + health checks + domain registration
> **API Gateway** = Create and manage REST/WebSocket APIs

> **EXAM TIP:** Know Route 53 routing policies—especially Failover (DR), Latency (global performance), and Weighted (A/B testing).