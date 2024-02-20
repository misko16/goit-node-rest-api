 const serverConfig = {
    dbPass: process.env.DB_PASS ?? "mongodb://localhost:27017",
    port: process.env.PORT ?? 4000,
 }
 module.exports = {
    serverConfig
 }
