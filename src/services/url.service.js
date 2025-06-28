import { connectToMongoDB } from "../lib/mongodb.connection.js";
import { generateUniqueShortCode } from "../lib/nanoid.js";
import { Url } from "../lib/urls.model.js";

export async function createShortUrl(originalUrl) {
  await connectToMongoDB();

  let shortCode;
  let exists;

  do {
    shortCode = generateUniqueShortCode();
    exists = await Url.findOne({ shortCode });
  } while (exists);

  const newShortUrl = await Url.create({ originalUrl, shortCode });
  return newShortUrl;
}

export async function getOriginalUrlAndIncrementClicks(shortCode) {
  await connectToMongoDB();

  const urlEntry = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  return urlEntry;
}
