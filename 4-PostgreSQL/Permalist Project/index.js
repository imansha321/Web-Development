import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "20020609",
  port: 5432,
});

db.connect();

var items = [];

async function getData() {
  let items_from_db = await db.query("SELECT * FROM items");
  return items_from_db.rows;
}



app.get("/", async(req, res) => {

  const items = await getData();
  res.render("index.ejs", {
    listTitle: new Date().toISOString().split("T")[0],
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = req.body.updatedItemId;
  console.log(id);
  const title = req.body.updatedItemTitle;
  console.log(title);
  db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id]);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  db.query("DELETE FROM items WHERE id = $1", [id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
