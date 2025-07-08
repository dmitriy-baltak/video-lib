import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const videoDataPath = path.join(process.cwd(), './prisma/videos.json');

async function main() {
  console.log('Start seeding...');

  try {
    const videosData = JSON.parse(fs.readFileSync(videoDataPath, 'utf-8'));

    for (const video of videosData.videos) {
      await prisma.video.create({
        data: {
          title: video.title,
          thumbnail_url: video.thumbnail_url,
          created_at: new Date(video.created_at),
          duration: video.duration,
          views: video.views,
          tags: video.tags,
        },
      });
    }

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
