import { MongoClient } from "mongodb";

function myMongoDB() {
  const myDB = {};
  const uri = process.env.MOGO_URI || "mongodb://localhost:27017";
  const DB_NAME = "fakeUsers";
  const COllCECTION_NAME = "users";

  myDB.authenticate = async (user) => {
    const client = new MongoClient(uri);

    const db = client.db(DB_NAME);
    const usersCol = db.collection(COllCECTION_NAME);
    console.log("seraching for", user);

    // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
    const res = await usersCol.findOne({ user: user.user });
    console.log("res", res);
    // usersCol.insertOne({ user: "Other", password: "JSONRules" });

    if (res.password === user.password) return true;
    return false;
  };

  return myDB;
}

export default myMongoDB();
