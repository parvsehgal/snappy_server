const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.saveArticle = async (req, res) => {
  try {
    const { email, article } = req.body
    const loggedInUser = await prisma.user.findUnique({ where: { email: email } })
    article.userId = loggedInUser.id;
    const savedArticle = await prisma.article.create({ data: article })
    res.status(200).json({ msg: "article saves", savedArticle: savedArticle })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ msg: "eoor occured" })
  }
}

exports.getSavedArticles = async (req, res) => {
  try {
    const { email } = req.query;
    const userWithArticles = prisma.user.findUnique({ where: { email: email }, include: { articles: true } })
    if (userWithArticles) {
      res.satus(200).json({ articles: userWithArticles.articles })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json("error occured")
  }
}



