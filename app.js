if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//CLOUDINARY_CLOUD_NAME,CLOUDINARY_KEY, CLOUDINARY_SECRET are included in a file whic is not in GIT

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //for layouts
const ExpressError = require("./utils/ExpressError");//for ErrorsHandler 
const session = require("express-session");//for saving info and the server and send key cookie back to server
const flash = require("connect-flash");//for flashing messages
const campgrounds = require("./routes/campgrounds"); //for campgrounds routes
const reviews = require("./routes/reviews"); //for reviews routes
const passport = require("passport")//for using different kinds of log in strategies(tweeter,facebook...)
const LocalStrategy = require("passport-local");
const User = require("./models/user");//for User model
const userRoutes = require("./routes/users");//for users routes

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); //parsing req.body
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "MyVeryTopSecert",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));//define session options
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

app.use("/campgrounds", campgrounds);//update campgrounds routes
app.use("/campgrounds/:id/reviews", reviews);//update reviews routes
app.use("/", userRoutes);//update users routes

app.get("/", (req, res) => {
    res.render("home");
})

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render("error", { err });
})


app.listen(3000, () => {
    console.log("serving on port 3000");
})
