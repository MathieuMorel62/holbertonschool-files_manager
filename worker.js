import Bull from 'bull';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import imageThumbnail from 'image-thumbnail';
import dbClient from './utils/db';

const fileQueue = new Bull('fileQueue');

// Process the fileQueue
fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  // Check if the fileId and userId are provided
  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }

  // Retrieve the file from the database
  const file = await dbClient.db.collection('files').findOne({ _id: ObjectId(fileId), userId: ObjectId(userId) });
  if (!file) {
    throw new Error('File not found');
  }

  // Check if the file is an image
  const sizes = [100, 250, 500];
  // Generate thumbnails for each size
  sizes.forEach(async (size) => {
    const thumbnail = await imageThumbnail(file.localPath, { width: size });
    fs.writeFileSync(`${file.localPath}_${size}`, thumbnail);
  });
});
