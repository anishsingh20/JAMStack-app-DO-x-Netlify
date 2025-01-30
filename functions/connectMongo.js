const { MongoClient } = require('mongodb');
exports.handler = async function () {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db("mydatabase");
    const collection = db.collection("items");
    const data = await collection.find({}).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.close();
  }
};