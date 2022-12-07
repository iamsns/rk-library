const Error404 = (req, res, next) => {
    res.status(404).json({message:"No page found!"})
}

module.exports = Error404