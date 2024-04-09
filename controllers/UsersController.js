import sha1 from 'sha1';
import Bull from 'bull';
import { ObjectId } from 'mongodb';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const userQueue = new Bull('userQueue');

class UsersController {
  // Method to create a new user.
  static async postNew(request, response) {
    const { email, password } = request.body;

    // Check if the email is provided
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }

    // Check if the password is provided
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists
    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) {
      return response.status(400).json({ error: 'Already exist' });
    }

    // Hash the password and create the new user
    const hashedPassword = sha1(password);
    const newUser = await dbClient.db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    // Add the user to the queue
    if (newUser.insertedId) {
      userQueue.add({
        userId: newUser.insertedId,
        email,
      });
    }

    // Return the new user
    return response.status(201).json({
      id: newUser.insertedId,
      email,
    });
  }

  // Method to obtain the information of the connected user.
  static async getMe(request, response) {
    // Retrieves the authentication token from the request header.
    const token = request.headers['x-token'];

    // Checks the existence and validity of the token.
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieves the user corresponding to the token.
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Returns the information of the logged-in user.
    return response.status(200).json({ id: user._id, email: user.email });
  }
}

export default UsersController;
