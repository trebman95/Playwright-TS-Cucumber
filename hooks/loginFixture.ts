import { Before } from '@cucumber/cucumber';
import { BrowserContext } from '@playwright/test';
import { initializeBrowser, initializePage, getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { seedCart } from '../mocks/sauceDemoMocks';

const BASE_URL = 'https://www.saucedemo.com/';

type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

// Real UI login only ever runs once per username for the whole suite run.
// Every later scenario needing that same user reuses the captured session.
const sessionCache = new Map<string, StorageState>();

async function startAsUser(username: string) {
  await initializeBrowser();
  await initializePage();
  const page = getPage();
  const context = page.context();

  await page.goto(BASE_URL);
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });

  const cached = sessionCache.get(username);
  if (cached) {
    await context.addCookies(cached.cookies);
    await page.goto(`${BASE_URL}inventory.html`);
  } else {
    await new Login(page).loginAsUser(username);
    await page.waitForURL('**/inventory.html');
    sessionCache.set(username, await context.storageState());
  }

  // Every scenario starts with an empty cart regardless of what an earlier
  // scenario left behind - the suite shares one browser context for its
  // whole run, so this is the only thing guaranteeing cart isolation.
  await seedCart(page, []);
}

Before({ tags: '@loggedIn' }, () => startAsUser('standard_user'));
Before({ tags: '@problemUser' }, () => startAsUser('problem_user'));

// performance_glitch_user is saucedemo's deliberately-slow test account -
// its first (uncached) real login can exceed the default 5s step timeout.
Before({ tags: '@performanceGlitchUser', timeout: 20000 }, () =>
  startAsUser('performance_glitch_user')
);
