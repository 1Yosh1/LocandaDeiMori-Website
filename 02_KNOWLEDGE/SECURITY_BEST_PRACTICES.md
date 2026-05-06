# Security Protocol: Luxury Data Protection

## 1. Web Security Essentials
- **CSRF Protection**: Always use `anti-csrf` tokens for mutating requests.
- **Content Security Policy (CSP)**:
  ```
  default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  img-src 'self' data: https://images.unsplash.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  ```
- **Rate Limiting**: Implementation of Redis-based rate limiting on sensitive endpoints (API/Login).

## 2. API Security
- **Input Validation**: Use `Zod` or `Joi` for schema validation.
- **Rate Limiting**: Prevent brute-force on booking attempts.
- **Expert Logging**: Log all 4xx and 5xx errors with IP and request metadata for forensics.

## 3. Data Privacy (GDPR)
- **Encryption**: Sensitive customer data must be encrypted at rest (AES-256).
- **Consent**: Cookie consent manager must be strictly implemented.
