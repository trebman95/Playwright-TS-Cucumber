import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);

Before(async function () {
  // @ts-ignore
  await this.init();
});

After(async function () {
  // @ts-ignore
  await this.cleanup();
});
