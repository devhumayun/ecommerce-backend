const setAccessTokenCookie = (res, accessToken) => {
    res.cookie("access_token", accessToken, {
        maxAge: 30 * 60 * 1000, //30 minute
        httpOnly: true,
        // secure: true,
        sameSite: "none"
    })
}

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refresh_token", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        httpOnly: true,
        // secure: true,
        sameSite: "none"
    })
}

module.exports = { setAccessTokenCookie, setRefreshTokenCookie }