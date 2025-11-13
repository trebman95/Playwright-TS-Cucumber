import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Given('I open the {string} page', async function(this: CustomWorld, url: string) {
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded', // Less strict than 'load'
                timeout: 30000
            });
            return; // Success, exit function
        } catch (error) {
            lastError = error as Error;
            console.log(`[RETRY ${attempt}/${maxRetries}] Navigation failed: ${lastError.message}`);
            
            if (attempt < maxRetries) {
                // Wait before retrying 
                const waitTime = attempt * 1000;
                console.log(`Waiting ${waitTime}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }
    
    // All retries failed
    throw new Error(`Failed to navigate to ${url} after ${maxRetries} attempts. Last error: ${lastError?.message}`);
});