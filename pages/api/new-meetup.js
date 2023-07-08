import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const {title, image, address, description} = data;

    const client = await MongoClient.connect(
      'mongodb+srv://roshankumar123:Roshan123456@cluster0.wtbtumh.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    

    const meetupsCollection = db.collection('meetups');

    // inserting one new document into this collection. And now the great thing about MongoDB is that a document is just a object in the end, a JavaScript object.
    // const result = await meetupsCollection.insertOne({title, image, address, description});

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;