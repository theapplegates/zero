---

pubDate: 2025-07-01
page: "API Usage Policy"

---


Welcome to our API. These guidelines help ensure fair usage, consistent performance, and a safe experience for all developers.

## Rate Limits

To maintain reliability, we enforce the following default limits:

- **Requests per minute**: 60
- **Requests per day**: 10,000
- **Burst limit**: Short bursts above the limit may be temporarily tolerated, but consistent abuse will be throttled.

If you need higher limits, [contact us](/support) to discuss an upgrade or custom access.

## Best Practices

We encourage all developers to follow these practices:

- **Cache responses** whenever possible.
- **Use proper authentication** (e.g. API keys or tokens).
- **Respect retry headers** and use exponential backoff for errors.
- **Avoid unnecessary polling** — use webhooks or intervals >30s if available.
- **Test in a sandbox environment** before going live (if provided).

## Prohibited Uses

To protect our infrastructure and users, the following are **not allowed**:

- Abusing or bypassing rate limits
- Sharing API keys publicly
- Scraping or harvesting sensitive data
- Using the API for spam, harassment, or illegal activity
- Reverse engineering or modifying API behavior

## Fair Use

We reserve the right to throttle, suspend, or revoke access if usage negatively impacts system stability or violates our Terms of Service.

## Questions?

For questions, higher rate needs, or support, reach out to us at [support@example.com](mailto:support@example.com).
