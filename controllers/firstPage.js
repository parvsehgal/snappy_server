const puppeteer = require('puppeteer')

async function getSportsPage(link) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(link);
  const headingData = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('.articles'))
    const list = allElements.map((each) => {
      return ({
        title: each.querySelector('div h2 a').innerText,
        imgUrl: each.querySelector('div a img').getAttribute('src'),
        articleLink: each.querySelector('div h2 a').getAttribute('href')
      })
    })
    return list
  })
  console.log(headingData)
  await browser.close()
  const toReturn = JSON.stringify(headingData)
  return (toReturn)
}

async function getPoliticsPage(link) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(link);
  const headingData = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('.articles'))
    const list = allElements.map((each) => {
      return ({
        title: each.querySelector('div h2 a').innerText,
        imgUrl: each.querySelector('div a img').getAttribute('src'),
        articleLink: each.querySelector('div h2 a').getAttribute('href')
      })
    })
    return list
  })
  console.log(headingData)
  await browser.close()
  const toReturn = JSON.stringify(headingData)
  return (toReturn)
}

async function getEntertainmentPage(link) {
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage();
  await page.goto(link);
  const endData = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('.articles'))
    const dataObj = allElements.map((each) => {
      return ({
        title: each.querySelector('.img-context .title a').getAttribute('title'),
        imageUrl: each.querySelector('.snaps a img').getAttribute('src'),
        articleLink: each.querySelector('.img-context .title a').getAttribute('href'),
      })
    })
    return dataObj
  })
  console.log(endData)
  return (JSON.stringify(endData))
}

exports.entertainment = async (req, res) => {
  try {
    const { url } = req.body
    const data = await getEntertainmentPage(url)
    res.json(data)
  } catch (err) {
    console.log(err.message)
  }
}

exports.sports = async (req, res) => {
  try {
    const { url } = req.body;
    console.log(url)
    const data = await getSportsPage(url)
    res.json(data)
  } catch (err) {
    console.log(err.message)
  }
}

exports.politics = async (req, res) => {
  try {
    const { url } = req.body
    console.log(url)
    const data = await getPoliticsPage(url)
    res.json(data)
  } catch (err) {
    console.log(err.message)
  }
}
