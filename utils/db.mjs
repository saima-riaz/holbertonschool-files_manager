import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/`;

class DBClient {
  constructor() {
    this.db = null;

    // Attempt to connect to MongoDB
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        console.error('MongoDB Connection Error:', error);
        return;
      }
      console.log('Connected to MongoDB successfully');
      this.db = client.db(database);

      // Initialize collections if they don't exist
      (async () => {
        try {
          const collections = await this.db.listCollections().toArray();
          const collectionNames = collections.map((col) => col.name);

          if (!collectionNames.includes('users')) {
            await this.db.createCollection('users');
            console.log('Created "users" collection');
          }

          if (!collectionNames.includes('files')) {
            await this.db.createCollection('files');
            console.log('Created "files" collection');
          }
        } catch (err) {
          console.error('Error initializing collections:', err);
        }
      })();
    });
  }

  /**
   * Checks if the MongoDB client is connected.
   * @returns {boolean} True if the database connection is alive, false otherwise.
   */
  isAlive() {
    return !!this.db;
  }

  /**
   * Gets the number of documents in the "users" collection.
   * @returns {Promise<number>} Number of users in the "users" collection.
   */
  async nbUsers() {
    if (!this.isAlive()) {
      console.warn('Database not connected: nbUsers will return 0');
      return 0;
    }
    try {
      return await this.db.collection('users').countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  /**
   * Gets the number of documents in the "files" collection.
   * @returns {Promise<number>} Number of files in the "files" collection.
   */
  async nbFiles() {
    if (!this.isAlive()) {
      console.warn('Database not connected: nbFiles will return 0');
      return 0;
    }
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

export default new DBClient();
