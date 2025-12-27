# IAM Fundamentals

**AWS Identity and Access Management (IAM)** controls who can access what in your AWS account. This is one of the most important topics on the CCP exam.

### The Root User
The email address used to create the AWS account. It has **complete, unrestricted access**.

**Best Practices:**
*   Never use the root user for daily tasks.
*   Enable MFA (Multi-Factor Authentication) immediately.
*   Create an IAM admin user instead.
*   Lock away root credentials.

> **Root-only tasks:** Change account settings, close the account, change support plans, restore IAM permissions.

### IAM Users
An identity representing a person or application that interacts with AWS.

*   **Credentials:** Username/password (console) or access keys (CLI/API).
*   **Best Practice:** One physical person = one IAM user. Never share credentials.

### IAM Groups
A collection of IAM users. Attach policies to groups, not individual users.

*   **Example:** Create a "Developers" group with EC2 and S3 access. Add all developers to it.
*   **Note:** Groups contain users only—you cannot nest groups.

### IAM Roles
An identity with permissions that can be **assumed** temporarily.

*   **No long-term credentials:** Roles use temporary security tokens.
*   **Use cases:**
    *   EC2 instance needs to access S3 → attach a role to EC2.
    *   Cross-account access → assume a role in another account.
    *   Federated users (SSO) → assume roles via identity provider.

> **EXAM TIP:** If a service needs to access another service, use a **role**, not access keys.

### IAM Policies
JSON documents that define permissions. Policies are attached to users, groups, or roles.

**Policy Structure:**
*   **Effect:** Allow or Deny
*   **Action:** What operations (e.g., `s3:GetObject`)
*   **Resource:** Which resources (e.g., a specific S3 bucket)

**Policy Types:**
| Type | Description |
|------|-------------|
| **AWS Managed** | Pre-built by AWS (e.g., `AmazonS3ReadOnlyAccess`) |
| **Customer Managed** | Created and managed by you |
| **Inline** | Embedded directly in a user, group, or role |

### Multi-Factor Authentication (MFA)
Adds a second layer of security beyond passwords.

*   **Something you know:** Password
*   **Something you have:** MFA device (virtual or hardware)
*   **Best Practice:** Enable MFA for ALL users, especially root and admins.

### Principle of Least Privilege
Grant only the permissions required to perform a task—nothing more.

> **EXAM TIP:** IAM is global (not region-specific). Users, groups, roles, and policies apply across all regions.