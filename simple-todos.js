Tasks = new Mongo.Collection("tasks");
 
if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var taskToAdd = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: taskToAdd,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
}