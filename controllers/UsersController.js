import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
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

    // Return the new user
    return response.status(201).json({
      id: newUser.insertedId,
      email,
    });
  }
}

export default UsersController;
