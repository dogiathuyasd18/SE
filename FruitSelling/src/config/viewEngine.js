import express from "express";

let configViewEngine = (app) => {
    app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;