const checks = [
  {
    url: 'https://apexportfolio.me/',
    status: 308,
    location: 'https://www.apexportfolio.me/',
  },
  {
    url: 'https://apexportfolio.me/projects?x=1',
    status: 308,
    location: 'https://www.apexportfolio.me/projects?x=1',
  },
  {
    url: 'https://www.apexportfolio.me/',
    status: 200,
  },
];

let failed = false;

for (const check of checks) {
  const response = await fetch(check.url, {
    method: 'HEAD',
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  const statusMatches = response.status === check.status;
  const locationMatches = check.location === undefined || location === check.location;
  const ok = statusMatches && locationMatches;

  const actual = location ? `${response.status} -> ${location}` : `${response.status}`;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${check.url} ${actual}`);

  if (!ok) {
    failed = true;

    if (!statusMatches) {
      console.error(`  expected status ${check.status}, got ${response.status}`);
    }

    if (!locationMatches) {
      console.error(`  expected location ${check.location}, got ${location}`);
    }
  }
}

if (failed) {
  process.exitCode = 1;
}
