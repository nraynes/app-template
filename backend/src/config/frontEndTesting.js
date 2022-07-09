// Use this to turn off captcha processing for front end testing.

// Setting this variable to true will turn off captcha processing.
// Setting this variable to false will turn captcha back on.

// If the node environment is production, this variable will have
// no effect and captcha will always be turned on.

const frontEndIsBeingTested = true;

module.exports = frontEndIsBeingTested;
