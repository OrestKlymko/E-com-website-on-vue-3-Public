const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const cors = require("cors");

let port = process.env.PORT || 2000;

const ItemSchema = new mongoose.Schema({
  name: String,
  country: String,
  totalAmount: Number,
  fastDelivery: String,
  item: [{ name_item: String, quantity: Number, price: Number }],
});
const ItemModel = mongoose.model("Item", ItemSchema);

const app = new Koa();
const router = new Router();

app.use(
  cors({
    origin: "https://e-commerce-deploy-vue.vercel.app",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(async (ctx, next) => {
  ctx.response.setHeader("Access-Control-Allow-Origin", "*");
  await next();
});
app.use(bodyParser());
router.get("/api/products", async (ctx) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/e-com-shop"
  );
  const db = client.db("e-com-shop");
  const collection = db.collection("all-product");
  const readyViem = await collection.find().toArray();
  await client.close();
  ctx.body = readyViem;
});

router.post("/api/products", async (ctx) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/e-com-shop"
  );
  const db = client.db("e-com-shop");
  const item = new ItemModel(ctx.request.body);
  await db.collection("users").insertOne(item);
  await client.close();
});

router.delete("/api/products/:id", async (ctx) => {
  const id = ctx.params.id;
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/e-com-shop"
  );
  const item = ctx.request.body;
  console.log(item);
  const db = client.db("e-com-shop");
  const collection = db.collection("all-product");
  console.log("Deleting item with id:", id);
  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  console.log("Result:", result);
  ctx.body = { success: true, result };
  await client.close();
});

router.patch("/api/products/:id", async (ctx) => {
  const client = await MongoClient.connect(
    "mongodb+srv://orestklymko2020:orik1997@userdata.7crkxxp.mongodb.net/e-com-shop"
  );
  const db = client.db("e-com-shop");
  const collection = db.collection("all-product");
  const id = ctx.params.id;
  const item = ctx.request.body;

  const filter = { _id: ObjectId.createFromHexString(id) };
  const options = { upsert: true };
  const update = { $set: { ...item } };

  await collection.findOneAndUpdate(filter, update, options);

  ctx.status = 204;

  await client.close();
});

app.use(router.routes());
app.listen(port, () => {
  console.log("Server running on port " + port);
});
