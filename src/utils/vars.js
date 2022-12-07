module.exports = {
    port : process.env.PORT,
    mongoUrl : process.env.DATABASE_URL,
    saltRounds : process.env.SALT_ROUNDS,
    tokenSecret : process.env.TOKEN_SECRET
}