# My Media List

###### Author: Chenjie Wu, Han Deng

###### Page Demo: [heroku](https://mymedialist-5610.herokuapp.com)

###### Github Link: [My Media List](https://github.com/suiboli314/myMediaList)

## Project Objective

To build a platform as a media/knowledge sharing service for the media of interest.

## Installation

1. Install Node.js (v14.19.0) and MongoDB
2. Clone the repository
3. Open it in your favourite terminal
4. Run `yarn install` or `npm install` to install dependencies
5. Go to index.html file and run the file with a live server to host the website

## Build Dependencies and Instructions

```bash
├── bcrypt@5.1.0
├── debug@4.3.4
├── eslint-config-prettier@8.5.0
├── eslint-plugin-react@7.31.9
├── eslint@8.25.0
├── express-session@1.17.3
├── express@4.18.2
├── mongodb@4.11.0
├── morgan@1.10.0
├── nodemon@2.0.20
└── prettier@2.7.1
```

- If you want to deploy on cloud, the server config `.env` file should contains variable `MONGO_URI=<your database uri>`.
- If you want to run locally, please run mongodb deamon at `mongodb://localhost:27017`.

## Features

1. Create username and save them into database with hashed password
2. Log in with account info created
3. View saved media reviews for user-self as well as the media title and author
4. Add reviews to selected media
5. Reset user password
6. Log out or Delete User

## Tech Requirements

1. HTML5
2. CSS3
3. JavaScript
4. Node.js
5. Express
6. MongoDB

## How this website looks like:

1. upload record without login
   [upload record without login](./docs/upload_wihtout_login.png)
2. sign up
   [sign up](./docs/signup.png)
3. login and before upload
   [login and before upload](./docs/login_and_before_upload.png)
4. upload success
   [upload success](./docs/upload_success.png)
5. reset password
   [reset password](./docs/reset.png)

### Other resources

- [Demo on YouTube Channel](https://vimeo.com/766216009)
- [Presentation Link](https://docs.google.com/presentation/d/17xgWzAmyYI3bFgKXpMe8YjLNuaSfFTLYkknFUIzc4xE/edit?usp=sharing)
- [Design Document](https://www.figma.com/file/EQ7JiBW9hK2yqKbIqOshlt/myMediaList?node-id=0%3A1)
- Class Link [CS5610 Web Development Course](https://johnguerra.co/classes/webDevelopment_fall_2022/)

## Thanks

Thanks to prof. [John Guerra](https://johnguerra.co)
