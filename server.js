const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// const users = require("./routes/api/users");

const awsUsers = require('./routes/api/awsUsers');

// const util = require('./Utilities/util');
// const config = require("./Utilities/config").config;
// const congnitoConfig = require("./config/congnito-config").config;


const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
// const db = require("./config/keys").mongoURI;

// Connect to MongoDB
// mongoose
// .connect(
//    db,
//    { useNewUrlParser: true }
//  )
//  .then(() => console.log("MongoDB successfully connected"))
//  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
// app.use("/api/users", users);
app.use('/api/aws/users', awsUsers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))