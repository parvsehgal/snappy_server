const puppeteer = require('puppeteer')

async function articleData(link) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link); // Replace with your target URL
  const divContent = await page.evaluate(() => {
    const div = document.querySelector('#pcl-full-content'); // Replace 'div' with your desired selector
    const subPTags = div.querySelectorAll('p');
    let textContent = '';
    subPTags.forEach(pTag => {
      textContent += pTag.textContent.trim() + '\n';
    });
    return textContent.trim();
  });
  console.log(divContent);
  await browser.close();
}
exports.getArticle = async (req, res) => {
  try {
    const { url } = req.body
    const article = await articleData(url)
    res.json('done')
  }
  catch (err) {
    console.log(err.message)
    res.json('err')
  }
}

