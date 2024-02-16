import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { publishLink } from "../imports/api/methods";

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    publishLink({
      title: "Do the Tutorial",
      url: "https://react-tutorial.meteor.com/simple-todos/01-creating-app.html",
    });

    publishLink({
      title: "", // Do not have a title
      url: "https://react-tutorial.meteor.com/simple-todos/01-creating-app.html",
    });

    publishLink({
      title: "Read the Docs",
      url: "react-tutorial.meteor.com/simple-todos", // Invalid url
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
