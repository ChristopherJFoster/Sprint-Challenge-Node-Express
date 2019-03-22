# Sprint Challenge: Express and Node.js - Projects & Actions

This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project. This Sprint explored Building RESTful Web APIs with Express and Node.js, Server-side Routing, Express Middleware & Deployment and Good Practices. In your challenge for this Sprint, you will demonstrate proficiency by creating an Web API using Node.js and Express.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your PM and Instructor in your cohort help channel on Slack. Your work reflects your proficiency Building RESTful APIs with Node.js and Express; and your command of the concepts and techniques taught during the Express and Node.js, Server-side Routing, Express Middleware & Deployment and Good Practices modules.

You have three hours to complete this challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons and your project manager).

## Description

In this challenge, create a web API around the following resources: `Projects` and `Actions`.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] Describe two parts of Express that you learned about this week.

  **Server-side routing**: Express enables easy server-side routing, so developers can organize their servers according to different resources, such as users and the posts made by users. A route like api/users will accept all the server commands that deal with users, while a route like api/posts will deal with posts.

  **Abstraction**: Express abstracts away the verbose JavaScript server commands such as GET, POST, DELETE, and PUT. The result is code that is more readable and thus easier to debug.

- [ ] Describe Middleware.

  Express enables easy use of middleware, with capabilities such as authentication, security, data massaging (like capitalization), and many others. Developers may plug in highly-polished and well-vetted code written by others, or they can write their own. Middleware allows for a modular pipeline of data processing.

- [ ] Describe a Resource.

  A server may manage a large dataset that includes data of varying types. That dataset can be divided into manageable parts, and each of these divisions can be called a resource. While there may be many ways a particular dataset could be divided, some methods present themselves as “natural” and are perhaps easier to understand and manage for human (who, after all, are (for now) the ones writing the server code). One method is to describe a person using the app in question, and then take all the **nouns** from the description and consider those to be app’s resources:

  Book Review App: A **user** creates an **account**. A user can then write a **bio** about themselves, write **book** **reviews**, and write blog **posts** about their favorite **authors**. A user can also make **connections** with other users.

  While each of the bolded nouns may not end up requiring its own database, this exercise has given us a pretty good idea of the kinds of data resources the backend of our app will need to store, and how that data might best be organized.

- [ ] What can the API return to help clients know if a request was successful?

  **1**. Status codes: Sending the proper status code, such as 201 for ‘created’, or 400 for ‘bad request’, gives the client a pretty good clue about whether the request was successful, and if not, why not.
  **2**. Messages: More specific success or error messages can be sent along with a status code. Along with status code 201, we might send a “New user created.” success message. Along with status code 400, we might send a “Please provide an item description.” error message.
  **3**. Data: We might also send data with a status code—particularly a success code. For example, we might send a copy of a record that was successfully deleted.

- [ ] How can we partition our application into sub-applications?

  **Resources**: The databases for each resource (users, posts, photos) can each be stored in their own database.

  **Routing**: Routing allows us to direct all server calls to a specific resource to the same URL. This division naturally suggests putting all such calls into a dedicated file. Other such dedicated files can be created for the server calls to other resources.

  **Middleware**: Middleware can be imported (required) or stored in a separate folder, and then, using Express, can be plugged into the data pipeline as needed.

  **Helpers**: Helper functions (in this context) are functions that stand between server calls (see Routing) and resources (see Resources). They can perhaps be thought of as “custom abstraction” code: helper functions feature logic and conversion code for dealing with resources. That code is thus kept out of the server calls, keeping the code for the calls themselves a bit cleaner.

## Project Setup

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Project Manager_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master on your fork. **Please don't merge your own pull request.**
- [ ] Add your _Project Manager_ as a Reviewer on the Pull-request
- [ ] Your _Project Manager_ will count the challenge as done by merging the branch into _master_.

## Database Persistence Helpers

Please read the following before implementing the Minimum Viable Product:

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Please you .then().catch() or async/await**

- `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_.
- [ ] Retrieve the list of actions for a project.

### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it's time to work on the API.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling! Perhaps with [`styled-components`](https://www.styled-components.com/).
