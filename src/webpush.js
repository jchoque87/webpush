const webpush  = require("web-push");
webpush.setVapidDetails("mailto:admin@tuguia.academia.bo",process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
module.exports = webpush;