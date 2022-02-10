# Train of Thought



Video of app in action:

![x](14-mvc-homework-demo-01.gif)

Get all user and all thoughts

chrome-extension://gbdacbnhlfdlllckelpdkgeklfjfgcmp/popup.html#[%22undefined%22,%22https%3A%2F%2Fcourses.bootcampspot.com%2Fcourses%2F1062%2Ffiles%2F1219849%2Fpreview%22]


GET single user and single thought

chrome-extension://gbdacbnhlfdlllckelpdkgeklfjfgcmp/popup.html#[%22undefined%22,%22https%3A%2F%2Fcourses.bootcampspot.com%2Fcourses%2F1062%2Ffiles%2F1219865%2Fpreview%22]

POST PUT DELETE USERS

chrome-extension://gbdacbnhlfdlllckelpdkgeklfjfgcmp/popup.html#[%22undefined%22,%22https%3A%2F%2Fcourses.bootcampspot.com%2Fcourses%2F1062%2Ffiles%2F1219887%2Fpreview%22]

POST PUT DELETE THOUGHTS

chrome-extension://gbdacbnhlfdlllckelpdkgeklfjfgcmp/popup.html#[%22undefined%22,%22https%3A%2F%2Fcourses.bootcampspot.com%2Fcourses%2F1062%2Ffiles%2F1219903%2Fpreview%22]

## User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

- [x] GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database

- [x] WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON

- [] WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database 

- [] WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list



## Getting Started:


-  Models

  x  ###User
        
       [x] username
            -string
            -unique
            -required
            -trimmed

        [x] email
            -string
            -required
            -unique
            -valid email address (look into mongoose's matching validation)
        
        [x] thoughts
            -an array of "_id" values referencing the  "Thought"  model

        [x] friends
            -an array of "_id"  values references the "User"  model (self-reference)
        
        [x] Schema Settings: 
            -Create a virtual called "friendCount" that retrieves the length of the user's "friends" array field on query.

    ###Thought
        
        [x] thoughtText
            -string
            -required
            -1-280 characters

 **     [x] createdAt
            -Date
            -Set default value to the current timestamp
            -Use a getter method to format the timestamp on query

        [x] username (one who created the thought)
            -String
            -Required

        [x] reactions (these are like replies)
            -Array of nested documents created with the "reactionSchema"

        [x] Schema Settings
            -Create a virtual called "reactionCount" that retrieves the length of the thought's "reactions" array field on query

    ###Reaction (SCHEMA ONLY)

      
        [x] reactionId
            -Use Mongoose's ObjectId datatype
            -Default value is set to a new objectId

        [x] reactionBody
            -string
            -required
            -280 character max
        
        [x] username
            -string
            -required

  **    [x] createdAt
            -Date
            -Set default value to the current timestamp
            -User getter method to format time stamp on query

        [x] Schema Settings
            -This will not be a model, but rather will be used as the "reaction" field's subdocument schema in the "Thought" model.


    ### API Routes
        
        /api/users
           - [] -GET all users
           - [] -GET a single user
           - [] -POST a new user
                // example data
                {
                    "username": "lernatino",
                    "email": "test@test.com"
                }
           - [] -PUT to update user by _id
           - [] -DELETE to remove user by its _id
    **      [] BONUS: Remove associated thoughts when deleted
        
        /api/users/:userId/friends/:friendId
              -[] -POST to a a new friend to a users friend list
    **       - [] -DELETE to remove a friend from the friends list

        /api/thoughts
            -[] -GET all thoughts
            -[] -GET to get a single thought by _id
            -[] -POST to create a new thought (don't forget to push the created  
                 thought's  _id to the associated user's "thoughts" array field)
            // example data
            {
                "thoughtText": "Here is a cool thought",
                "username": "lernatino", 
                "userId" : "5fetzfedsjjsz088"
            }

    **       - [] -PUT to update a thought by its "_id"
    **        -[] -DELETE to remove a thought by its "_id"

        /api/thoughts/:thoughtId/reactions
    **       - [] -POST to create a reaction stored in a single thought'  
                 "reactions"  array field
    **       - [] -DELETE to pull and remove a reaction by the reaction's   
                    "reactionId" value





- [x] Use MongoDB database

- [x] Use Mongoose



## Grading Requirements


## Deliverables: 10%
- [x] Your GitHub repository containing your application code.


## Walkthrough Video: 37%

    -Link included in README.md

    - [] Shows all technical acceptance criteria being met.

    - [] How to start the server

    - [] GET routes for all Users and Thoughts being tested in insomnia

    - [] GET routes for single user and single thoughts in insomnia

     -[] POST, PUT, DELETE routes for users and thoughts in insomnia

    - [] POST and DELETE routes for user's friend list in insomnia

    - [] POST and DELETE routes for reactions to thoughts being tested in insomnia
    
    


## Technical Acceptance: 40%

- [x] Mongoose

- [x] MongoDB

- [x] User and Thought Models

- [x] Schema settings for User and Thought models

- [x] Reactions as the "reaction" field's subdocument schema in thought model

- [x] Uses functionality to format queried timestamps



## Repository Quality: 13%
- [x] Repository has a unique name.

- [x] Repository follows best practices for file structure and naming conventions.

- [x] Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

- [x] Repository contains multiple descriptive commit messages.

- [] Repository contains quality README file with description, screenshot, and link to walkthrough video.

## Bonus: 10 points
 
 - [] Application deletes a user's associated thoughts when the user is deleted.




## How to Submit the Challenge
- [] You are required to submit BOTH of the following for review:

- [] A walkthrough video demonstrating the app

- [] The URL of the GitHub repository.