import { MongoClient } from "mongodb";

function myMongoDB() {
  const myDB = {};
  const uri = process.env.MOGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "MediaList";
  const COllCECTION_NAME = "users";

  async function getCollection(colName) {
    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db(DB_NAME);
    return [client, db.collection(colName)];
  }

  myDB.authenticate = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME);
      console.log("seraching for", user);
      // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
      const res = await col.findOne({ user: user.user });
      console.log("res", res);

      if (res !== null && res.password === user.password) return true;
      return false;
    } finally {
      await client.close();
    }
  };

  myDB.signup = async (newUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(COllCECTION_NAME);
      // usersCol.insertOne({ user: "Other", password: "JSONRules" });
      return await col.insertOne(newUser);
    } finally {
      await client.close();
    }
  };

  return myDB;
}

export default myMongoDB();
