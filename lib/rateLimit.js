// lib/rateLimit.js
const rateLimitMap = new Map();

export function rateLimit({ interval = 60000, uniqueTokenPerInterval = 500, limit = 10 }) {
  return {
    check: (key) => {
      const now = Date.now();
      const windowStart = now - interval;
      
      // Clean old entries periodically
      if (rateLimitMap.size > uniqueTokenPerInterval) {
        for (const [k, v] of rateLimitMap) {
          if (v.timestamp < windowStart) {
            rateLimitMap.delete(k);
          }
        }
      }

      const record = rateLimitMap.get(key) || { count: 0, timestamp: now };
      
      if (record.timestamp < windowStart) {
        record.count = 0;
        record.timestamp = now;
      }

      record.count++;
      rateLimitMap.set(key, record);

      return {
        success: record.count <= limit,
        remaining: Math.max(0, limit - record.count),
        reset: record.timestamp + interval,
      };
    }
  };
}

// Pre-configured limiters
export const loginLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  limit: 15,
});

export const contactLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  limit: 5,
});

export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 60,
});