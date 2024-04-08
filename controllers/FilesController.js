import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class FilesController {
  // Method to create a new file.
  static async postUpload(request, response) {
    const token = request.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);

    // Checks the existence and validity of the token.
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Extraction of the file information from the request body.
    const {
      name,
      type,
      parentId = 0,
      isPublic = false,
      data,
    } = request.body;

    // Check if the name is provided.
    if (!name) {
      return response.status(400).json({ error: 'Missing name' });
    }

    // Check if the type is valid.
    const allowedTypes = ['folder', 'file', 'image'];
    if (!type || !allowedTypes.includes(type)) {
      return response.status(400).json({ error: 'Missing type' });
    }

    // Check if the data is provided for a file.
    if (!data && type !== 'folder') {
      return response.status(400).json({ error: 'Missing data' });
    }

    // Check if the parent exists and is a folder.
    if (parentId !== 0) {
      const project = new ObjectId(parentId);
      const file = await dbClient.db.collection('files').findOne({ _id: project });
      if (!file) {
        return response.status(400).json({ error: 'Parent not found' });
      }

      if (file.type !== 'folder') {
        return response.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    // Creation of the new file in the database.
    let newFile;
    if (type === 'folder') {
      newFile = await dbClient.db.collection('files').insertOne({
        userId: new ObjectId(userId),
        name,
        type,
        isPublic,
        parentId,
      });
    } else {
      // Creation of the file on the server.
      const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // Write the file to the server.
      const localPath = `${folderPath}/${uuidv4()}`;
      const buff = Buffer.from(request.body.data, 'base64');
      await fs.promises.writeFile(localPath, buff);
      newFile = await dbClient.db.collection('files').insertOne({
        userId: new ObjectId(userId),
        name,
        type,
        isPublic,
        parentId,
        localPath,
      });
    }

    // Return the new file.
    return response.status(201).send({
      id: newFile.insertedId,
      userId,
      name,
      type,
      isPublic,
      parentId,
    });
  }

  // Method to retrieve the information of a file.
  static async getShow(request, response) {
    // Retrieves the authentication token from the request header.
    const token = request.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieves the file information from the database.
    const { id } = request.params;
    const file = await dbClient.db.collection('files').findOne({ _id: ObjectId(id), userId: ObjectId(userId) });
    if (!file) {
      return response.status(404).json({ error: 'Not found' });
    }

    return response.status(200).json({
      id: file._id,
      userId: file.userId,
      name: file.name,
      type: file.type,
      isPublic: file.isPublic,
      parentId: file.parentId,
    });
  }

  // Method to retrieve the list of files.
  static async getIndex(request, response) {
    // Retrieves the authentication token from the request header.
    const token = request.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieves the parent ID and the page number from the request query.
    let { parentId, page = 0 } = request.query;
    const query = { userId: ObjectId(userId) };
    if (parentId && parentId !== 0) {
      parentId = ObjectId(parentId);
    }

    // Retrieves the list of files from the database.
    const files = await dbClient.db.collection('files')
      .find(query)
      .skip(page * 20)
      .limit(20)
      .toArray();

    // Formats the list of files.
    const filesFormatted = files.map((file) => ({
      id: file._id,
      userId: file.userId,
      name: file.name,
      type: file.type,
      isPublic: file.isPublic,
      parentId: file.parentId,
    }));

    return response.status(200).json(filesFormatted);
  }
}

export default FilesController;
