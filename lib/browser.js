const puppeteer = require("puppeteer");

const KEY = Symbol("PUPPETEER");

const globalSymbol = Object.getOwnPropertySymbols(global);
const hasCreated = globalSymbol.indexOf(KEY) > -1;

async function getBrowser() {
  if (!hasCreated) {
    global[KEY] = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--user-data-dir=.config/google-chrome'
      ],
    });
  }
  return global[KEY];
}

module.exports = getBrowser;