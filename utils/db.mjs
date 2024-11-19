import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/`;

class DBClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
      this.db = client.db(database);

      const collections = await this.db.listCollections().toArray();
      const collectionNames = collections.map((col) => col.name);

      if (!collectionNames.includes('users')) {
        await this.db.createCollection('users');
      }

      if (!collectionNames.includes('files')) {
        await this.db.createCollection('files');
      }
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  }

  // Update isAlive to check for the connection properly
  async isAlive() {
    return this.db !== null;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

export default new DBClient();
