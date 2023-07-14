const express = require("express");
const app = express();
const mongoose = require("mongoose");
const City = require("./models/city");

// connect to mongodb(atlas)
mongoose
  .connect(
    "mongodb+srv://ssppdd18:VQyPzrB3GHA_Fn7@cluster0.9hmc09o.mongodb.net/WeatherApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));

// api to get all cities information(name, lat, lng)
app.get("/cities", async (req, res) => {
  const cities = await City.find({});
  console.log(cities);
  res.send(cities);
});

// api to add city information(name, lat, lng)
app.post("/cities", async (req, res) => {
  const newCity = new City(req.body);
  await newCity.save();
  res.send("OK");
});

//api to get a single city information(name, lat, lng)
app.get("/cities/:id", async (req, res) => {
  const { id } = req.params;
  const city = await City.findById(id);
  console.log(city);
  res.send(city);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
