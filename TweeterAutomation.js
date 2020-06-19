let puppeteer = require('puppeteer');
let fs = require('fs');
const login = 'https://twitter.com/login';
const email = 'yourEmail';
const password = 'yourPassword';
const tweet = 'hello,Good morning';
const search = 'rohit sharma';
(async () => {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  // creates an empty page
  // await browser.newPage();
  // returns array of curently open tabn
  let numberofPages = await browser.pages();
  let tab = numberofPages[0];
  // goto page
  // 1.
  await tab.setDefaultNavigationTimeout(0);

  await tab.goto(login, {
    waitUntil: 'load',
    timeout: 0
  });
  await tab.waitForSelector('.r-30o5oe');
  await tab.type('.r-30o5oe', email, { delay: 100 });
  await tab.waitForSelector("input[type='password']");
  await tab.type("input[type='password']", password, { delay: 100 });
  await tab.waitForSelector("div[data-testid='LoginForm_Login_Button']");
  await navigationHelper(tab, "div[data-testid='LoginForm_Login_Button']");
  delay(1000);
  await tab.waitForSelector("a[data-testid='SideNav_NewTweet_Button']");
  await navigationHelper(tab, "a[data-testid='SideNav_NewTweet_Button']");
  delay(1000);
  await tab.waitForSelector(
    '.r-42olwf.r-1f0042m.r-1phboty.r-d045u9.r-6koalj.r-eqz5dr'
  );
  delay(2000);
  await tab.type(
    '.r-42olwf.r-1f0042m.r-1phboty.r-d045u9.r-6koalj.r-eqz5dr',
    tweet,
    { delay: 100 }
  );
  delay(1000);
  await tab.waitForSelector("div[data-testid='tweetButton']");
  await navigationHelper(tab, "div[data-testid='tweetButton']");
  delay(2000);
  await tab.waitForSelector("a[aria-label='Profile']", { delay: 100 });
  await navigationHelper(tab, "a[aria-label='Profile']");
  await delay(4000);
  await tab.waitForSelector("a[data-testid='AppTabBar_Explore_Link']", {
    delay: 100
  });
  await navigationHelper(tab, "a[data-testid='AppTabBar_Explore_Link']");
  delay(500);
  await tab.waitForSelector("input[data-testid='SearchBox_Search_Input']");
  delay(500);
  await tab.type("input[data-testid='SearchBox_Search_Input']", search, {
    delay: 100
  });
  await tab.keyboard.press('Enter');
  delay(1000);
  await tab.waitForSelector("a[href='/ImRo45']", { delay: 100 });
  await navigationHelper(tab, "a[href='/ImRo45']");
  delay(2000);
  await tab.waitForSelector("div[data-testid='121046433-follow']", {
    delay: 100
  });
  await navigationHelper(tab, "div[data-testid='121046433-follow']");
  delay(100);
  //   await tab.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
  await tab.waitForSelector("a[href='/Anonymo64829502']", { delay: 100 });
  await navigationHelper(tab, "a[href='/Anonymo64829502']");
  await delay(4000);
  await tab.waitForSelector("a[href='/Anonymo64829502/following']", {
    delay: 100
  });
  await navigationHelper(tab, "a[href='/Anonymo64829502/following']");
  await delay(4000);
  await tab.waitForSelector("a[href='/Anonymo64829502']", { delay: 100 });
  await navigationHelper(tab, "a[href='/Anonymo64829502']");
})();
async function navigationHelper(tab, selector) {
  await Promise.all([
    tab.waitForNavigation({
      waitUntil: 'networkidle2'
    }),
    tab.click(selector)
  ]);
}
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
