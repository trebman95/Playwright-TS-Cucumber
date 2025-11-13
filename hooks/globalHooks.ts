import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

setDefaultTimeout(15000);

Before(async function(this: CustomWorld) {
    await this.init();
});

After(async function(this: CustomWorld) {
    await this.destroy();
});