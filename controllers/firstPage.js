let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

async function getSportsPage(link) {
  let options = {};
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(link);
  const headingData = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('.articles'))
    const list = allElements.map((each) => {
      return ({
        title: each.querySelector('div h2 a').innerText,
      })
    })
    return list
  })
  console.log(headingData)
  await browser.close()
  const toReturn = JSON.stringify(headingData)
  return (toReturn)
}

exports.sports = async (req, res) => {
  try {
    const { url } = req.body;
    console.log(url)
    const data = await getSportsPage(url)
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err.message)
  }
}
