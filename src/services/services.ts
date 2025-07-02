import { connectToMongoDB } from "../lib/mongodb.connection";
import { generateUniqueShortCode } from "../lib/nanoid";
import { Url } from "../lib/model";
import type { UrlDocument } from "../lib/model";

export async function createShortUrl(
  originalUrl: string
): Promise<UrlDocument> {
  await connectToMongoDB();

  let shortCode: string;
  let exists: UrlDocument | null;

  do {
    shortCode = generateUniqueShortCode();
    exists = (await Url.findOne({ shortCode })) as UrlDocument | null;
  } while (exists);

  const newShortUrl = (await Url.create({
    originalUrl,
    shortCode,
  })) as UrlDocument;
  return newShortUrl;
}

export async function getOriginalUrlAndIncrementClicks(
  shortCode: string
): Promise<UrlDocument | null> {
  await connectToMongoDB();

  const urlEntry = (await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  )) as UrlDocument | null;
  return urlEntry;
}
