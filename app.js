const express = require("express");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const todoRoute = require("./routes/todo.router");
const userRoute = require("./routes/user.router");
const authRoute = require("./routes/auth.router");
const app = express();
// HANLDE CORS
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return res.status(200).json({});
  }

  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.xml());
app.disable("x-powered-by");
// ROUTES
app.use("/user", userRoute);
app.use("/todo", todoRoute);
app.use("/auth",authRoute );
app.get('/',(req,res)=>{
  res.json({
    status:200,
    success:true,
    message :'Backend api running success 🚀🚀 pdf !!'
  })
})
// HANDLE 404
app.use((req, res, next) => {
  const error = new Error(NOT_FOUND);
  error.status = 404;
  next(error); 
});
// HANDLE GLOBAL ERROR
app.use((error, req, res, next) => {
  return res.status(error.status || 500).send({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
