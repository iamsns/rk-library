exports.getIndex = (req, res, next) => {
    console.log("from homepage!")
    res.status(200).json({mainTitle:'Welcome to home!'})
}