# Production Routing

The canonical production origin is:

```text
https://www.apexportfolio.me
```

Vercel owns the apex-to-www redirect at the project-domain layer, not in
`vercel.json` or Next.js app routing. The project domain `apexportfolio.me` is
configured in Vercel to redirect to `www.apexportfolio.me` with status `308`.

Keep these app-level canonical references aligned with the `www` origin:

- `app/layout.tsx` metadata base, author URL, and Open Graph URL
- `app/sitemap.ts` base URL
- `app/robots.ts` sitemap URL

To verify the live production routing contract:

```bash
npm run verify:canonical
```

Expected behavior:

```text
https://apexportfolio.me/* -> 308 https://www.apexportfolio.me/*
https://www.apexportfolio.me/ -> 200
```

HTTP requests may first receive Vercel's platform HTTPS redirect before the
apex-to-www redirect. The canonical HTTPS apex redirect must still be a `308`.
