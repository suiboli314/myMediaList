import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

function myMongoDB() {
  const myDB = {};
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "MediaList";
  const COllCECTION_NAME_USER = "users";
  const COllCECTION_NAME_MEDIA = "media";

// it was impressed that you were using this way to build the list, good job.
  
  async function getCollection(colName) {
    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db(DB_NAME);
    return [client, db.collection(colName)];
  }

  myDB.authenticate = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_USER);
      console.log("seraching for", user);
      // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
      const res = await col.findOne({ user: user.user });
      console.log("res", res);
      console.log(
        "result: ",
        res !== null && bcrypt.compareSync(user.password, res.password)
      );

      return res !== null && bcrypt.compareSync(user.password, res.password);
    } finally {
      await client.close();
    }
  };

  myDB.signup = async (newUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_USER);
      newUser.password = bcrypt.hashSync(
        newUser.password,
        bcrypt.genSaltSync()
      );
      // usersCol.insertOne({ user: "Other", password: "JSONRules" });
      return await col.insertOne(newUser);
    } finally {
      await client.close();
    }
  };

  myDB.resetPass = async (newUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_USER);
      console.log("seraching for", newUser);
      // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
      const res = await col.updateOne(
        { user: newUser.user },
        {
          $set: {
            password: bcrypt.hashSync(newUser.password, bcrypt.genSaltSync()),
          },
        }
      );
      console.log("res", res);
    } finally {
      await client.close();
    }
  };

  myDB.deleteUser = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_USER);

      console.log("delete", user);
      await col.deleteOne({ user: user.user });
    } finally {
      await client.close();
    }
  };

  myDB.getMediaTitle = async () => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_MEDIA);

      const query = { title: { $exists: true } };
      const options = {
        sort: { title: 1 }, // sort returned documents in ascending order by title (A->Z)
        projection: {
          _id: 0,
          author: 1,
          imagePath: 1,
          title: 1,
        }, // Include only the `title` ields in each returned document
      };
      const res = await col.find(query, options).toArray();
      // console.log(res);
      return res;
    } finally {
      await client.close();
    }
  };

  myDB.postMediaReview = async (mediaWReview) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_MEDIA);

      const query = {
        $and: [{ title: mediaWReview.title }, { author: mediaWReview.author }],
      };
      const res = await col.updateOne(query, {
        $push: {
          reviews: { user: mediaWReview.user, review: mediaWReview.review },
        },
      });
      // console.log(res);
    } finally {
      await client.close();
    }
  };

  myDB.fetchMediaReviews = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME_MEDIA);
      const query = { reviews: { $elemMatch: { user: user.user } } };
      const res = await col.find(query).toArray();
      console.log("media reviews: ", res);
      return res;
    } finally {
      await client.close();
    }
  };

  return myDB;
}

export default myMongoDB();
