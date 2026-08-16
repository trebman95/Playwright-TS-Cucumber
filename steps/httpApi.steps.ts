import { When, Then } from '@cucumber/cucumber';
import { expect, APIResponse } from '@playwright/test';
import { getRequestContext } from '../api/httpClient';

const BASE_URL = 'https://www.saucedemo.com';

let lastResponse: APIResponse | null = null;
let lastResponseTimeMs = 0;

function getResponse(): APIResponse {
  if (!lastResponse) {
    throw new Error('No response captured yet. Send a request first.');
  }
  return lastResponse;
}

When('I send a GET request to {string}', async (path: string) => {
  const ctx = await getRequestContext();
  const start = performance.now();
  lastResponse = await ctx.get(`${BASE_URL}${path}`);
  lastResponseTimeMs = performance.now() - start;
});

Then('the response status should be {int}', async (status: number) => {
  expect(getResponse().status()).toBe(status);
});

Then(
  'the response header {string} should contain {string}',
  async (header: string, value: string) => {
    expect(getResponse().headers()[header.toLowerCase()]).toContain(value);
  }
);

Then('the response header {string} should be absent', async (header: string) => {
  expect(getResponse().headers()[header.toLowerCase()]).toBeUndefined();
});

Then('the response time should be under {int} ms', async (maxMs: number) => {
  expect(lastResponseTimeMs).toBeLessThan(maxMs);
});
