const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || '/public/images/user/default.png'
const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET || humayun_kabir_9508
const smtpUsername = process.env.SMTP_USERNAME || ""
const smtpPassword = process.env.SMTP_PASSWORD || ""
const clientURL = process.env.CLIENT_URL || ""
module.exports = { defaultImagePath, jwtSecretKey, smtpUsername, smtpPassword, clientURL }