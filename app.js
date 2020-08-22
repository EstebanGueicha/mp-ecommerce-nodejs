var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

const PaymentController = require("./controllers/PaymentController");
const PaymentService = require("./services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/detalle", (req, res) => {
  res.render("detalle", req.query);
});

app.get("/exitoso", (req, res) => {
  res.render("exitoso", req.query);
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.get("/pendiente", (req, res) => {
  res.render("pendiente");
});

app.post("/pagar", (req, res) =>
  PaymentInstance.getMercadoPagoLink(req, res)
);

app.post("/webhookMercadoPago", (req, res) => PaymentInstance.webhook(req, res));

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(process.env.PORT || 3000);
