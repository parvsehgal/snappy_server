const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod')

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

exports.signUp = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userObj = { name: name, email: email }
    userSchema.parse(userObj)
    const newUser = await prisma.user.create({
      data: userObj
    })
    res.json(newUser)
  } catch (err) {
    console.log(err.message)
    res.json(err.message)
  }
}


