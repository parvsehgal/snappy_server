exports.firstPage = async (req, res) => {
  try {
    res.json('this is a controller')
  } catch (err) {
    console.log(err.message)
  }
}
