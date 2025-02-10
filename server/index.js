const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

// Use middleWare
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://roomifysky.netlify.app",
      "https://roomify-984fd.web.app",
      "https://roomify-984fd.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decode;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.koweo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const roomsCollection = client.db("Roomify").collection("rooms");
    const bookingCollection = client.db("Roomify").collection("bookings");
    const paymentCollection = client.db("Roomify").collection("payments");

    // auth related apis
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "20hr",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: "logout", success: true });
    });

    // Get all rooms with optional price range filtering
    app.get("/allRooms", async (req, res) => {
      const { minPrice, maxPrice } = req.query;
      const offer = req.query.offer;

      const filter = {};
      if (minPrice)
        filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
      if (maxPrice)
        filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };

      if (offer) {
        filter.offer = offer;
      }

      const result = await roomsCollection.find(filter).toArray();
      res.send(result);
    });

    // get offered rooms
    app.get("/offers", async (req, res) => {
      const filter = { offer: { $exists: true } };
      const result = await roomsCollection.find(filter).toArray();
      res.send(result);
    });

    // add review
    app.put("/addReview/:roomId", async (req, res) => {
      const review = req.body;
      const id = req.params.roomId;
      const query = { _id: new ObjectId(id) };

      const updatedDoc = {
        $push: {
          reviews: review,
        },
      };

      const result = await roomsCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    // get specific room by id
    app.get("/room/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.findOne(query);
      res.send(result);
    });

    // add booking
    app.post("/addBooking", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);

      const id = booking.Room_id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          availability: false,
        },
      };
      const updated = await roomsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // get booking details by email
    app.get("/booking/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };

      if (req.user.email !== email) {
        res.status(404).send({ message: "forbidden access" });
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    // get booking by id for payment
    app.get("/single-booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.findOne(query);
      res.send(result);
    });

    // create payment by ssl
    app.post("/create-payment", async (req, res) => {
      const payment = req.body;

      const trnxId = new ObjectId().toString();
      payment.transectionId = trnxId;

      const initiate = {
        store_id: "roomi679509d284d3a",
        store_passwd: "roomi679509d284d3a@ssl",
        total_amount: payment.price,
        currency: "BDT",
        tran_id: trnxId,
        success_url: "http://localhost:5000/success",
        fail_url: "http://localhost:5000/fail",
        cancel_url: "http://localhost:5000/cancel",
        ipn_url: "http://localhost:5000/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const iniResponse = await axios({
        url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        method: "POST",
        data: initiate,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await paymentCollection.insertOne(payment);
      const gatewayPageURL = iniResponse?.data?.GatewayPageURL;
      res.send({ gatewayPageURL });
    });

    // for successful payment
    app.post("/success", async (req, res) => {
      const paymentSuccess = req.body;
      console.log(paymentSuccess);

      const { data } = await axios.get(
        `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=roomi679509d284d3a&store_passwd=roomi679509d284d3a@ssl&format=json`
      );

      if (data.status !== "VALID") {
        return res.status(400).send({ message: "Invaild Payment" });
      }
      const query = { transectionId: data.tran_id };
      const updateDoc = {
        $set: {
          status: "paid",
        },
      };
      const result = await paymentCollection.updateOne(query, updateDoc);

      if (result.modifiedCount > 0) {
        res.redirect("http://localhost:5173/myBookings");
      }
    });

    // update my booking date
    app.patch("/updateBookingDate/:id", async (req, res) => {
      const id = req.params.id;
      const { newStartDate, newEndDate } = req.body;
      const query = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          startDate: newStartDate,
          endDate: newEndDate,
        },
      };
      const result = await bookingCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Get the latest 9 reviews sorted by timestamp in descending order
    app.get("/reviews", async (req, res) => {
      const rooms = await roomsCollection
        .find({ reviews: { $exists: true } })
        .toArray();

      const allReviews = rooms.flatMap((room) => room.reviews || []);

      const result = allReviews
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 9);

      res.send(result);
    });
    // get top rated rooms

    app.get("/top-rated-rooms", async (req, res) => {
      try {
        const rooms = await roomsCollection
          .aggregate([
            {
              $addFields: {
                averageRating: {
                  $avg: "$reviews.rating",
                },
              },
            },
            { $sort: { averageRating: -1 } },
            { $limit: 8 },
          ])
          .toArray();

        res.send(rooms);
      } catch (error) {
        console.error("Error fetching top-rated rooms:", error);
        res.status(500).send("Internal server error");
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Roomify server is running...");
});

app.listen(port, () => {
  console.log(`Rommify app listening on PORT: ${port}`);
});
