import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, chromium } from 'playwright';
import { Login } from '../pages/login.page';
import { Product } from '../pages/product.page';
import { Purchase } from '../pages/purchase.page';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  
  // Page Objects
  loginPage!: Login;
  productPage!: Product;
  purchasePage!: Purchase;
  
  // Shared test data
  testData: {
    username?: string;
    products?: string[];
    orderTotal?: number;
  } = {};
  
  // Config
  config = {
    baseUrl: 'https://www.saucedemo.com/',
    timeout: 30000,
    headless: false,
  };

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Initialize browser for scenario
  async init() {
    this.browser = await chromium.launch({ 
      headless: this.config.headless,
      // Additional args to handle network issues
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    
    this.context = await this.browser.newContext({
      // Retry on network errors
      ignoreHTTPSErrors: true,
    });
    
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(this.config.timeout);
    this.page.setDefaultNavigationTimeout(60000); // 60 seconds for navigation
    
    // Initialize page objects
    this.loginPage = new Login(this.page);
    this.productPage = new Product(this.page);
    this.purchasePage = new Purchase(this.page);
  }

  // Cleanup after scenario
  async destroy() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
