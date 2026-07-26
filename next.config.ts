import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Next's recommended strict CSP generates a per-request nonce in proxy.ts,
// which requires dynamic rendering on every page — that would deopt the
// statically prerendered home page and sitemap, a poor trade for this app.
// Without nonces, Next's inline hydration bootstrap and our inline JSON-LD
// both need 'unsafe-inline' in script-src, so this policy is deliberately not
// the XSS backstop (the escaping in lib/jsonLd.ts is). What it does buy is
// containment: connect-src and img-src pin where data can be sent, form-action
// stops an injected form posting credentials elsewhere, base-uri blocks <base>
// hijacking, and frame-ancestors blocks clickjacking on the auth pages.
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' is React's dev-only error reconstruction; it is not used in
  // production builds.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // data: covers a generated dish photo before it's saved, the Blob host
  // covers it afterwards.
  "img-src 'self' data: https://*.public.blob.vercel-storage.com",
  "font-src 'self'",
  // ws: is Turbopack's dev HMR socket.
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // No need to advertise the framework and version.
  poweredByHeader: false,
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Redundant with frame-ancestors for modern browsers, kept for old ones.
          { key: "X-Frame-Options", value: "DENY" },
          // The photo scan is a plain file input, so no browser APIs are needed.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
