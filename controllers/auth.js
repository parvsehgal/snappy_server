const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod')

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
});

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userObj = { name: name, email: email, password: password }
    userSchema.parse(userObj)
    const doesUser = await prisma.user.findUnique({ where: { email: userObj.email } })
    if (doesUser) {
      res.status(400).json({ "msg": "user already exist" })
      return
    }
    const newUser = await prisma.user.create({
      data: userObj
    })
    newUser.password = ''
    res.status(200).json(newUser)
  } catch (err) {
    console.log(err.message)
    res.json("error occured")
  }
}

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userObj = { name: name, email: email, password: password }
    userSchema.parse(userObj)
    const doesUser = await prisma.user.findUnique({ where: { email: userObj.email } })
    if (doesUser) {
      if (doesUser.password == userObj.password) {
        doesUser.password = ''
        res.status(200).json({ msg: "login sucessfull", user: doesUser })
      } else {
        res.json({ msg: "password incorrect" })
      }
      return
    }
    res.json({ msg: "user does not exist" })
  } catch (err) {
    console.log(err.message)
    res.status(500).json("error occured")
  }
}

