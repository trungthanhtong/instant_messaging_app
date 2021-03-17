const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./JWT_Secret');

const jwtVerify = (token) => {
    const {id} = jwt.verify(token, JWT_SECRET)
    if (id) {
        return id;
    }
    else {
        return false;
    }
}

module.exports = jwtVerify;