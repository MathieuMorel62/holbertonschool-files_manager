import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // MongoDB connection parameters from environment variables or default values.
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || 27017;
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    const URI = `mongodb://${DB_HOST}:${DB_PORT}`;

    // Initialization of the MongoDB client with the URI.
    this.client = new MongoClient(URI, { useUnifiedTopology: true });

    // Connection to the MongoDB database and error management.
    this.client.connect((error) => {
      if (error) {
        console.error('MongoDB Connection Error:', error);
      } else {
        this.db = this.client.db(DB_DATABASE);
      }
    });
  }

  // Checks if the connection to the MongoDB database is active.
  isAlive() {
    return !!this.db;
  }

  // Counts and returns the number of users in the 'users' collection.
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  // Counts and returns the number of files in the 'files' collection.
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
