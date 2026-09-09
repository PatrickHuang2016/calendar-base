import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const apiKey = 'sk-fam-app-' + crypto.randomBytes(16).toString('hex');
  
  const app = await prisma.app.upsert({
    where: { name: 'FamilyScheduleApp' },
    update: {},
    create: {
      name: 'FamilyScheduleApp',
      apiKey: apiKey
    }
  });
  
  console.log('----------------------------------------------------');
  console.log('App Name:', app.name);
  console.log('API Key :', app.apiKey);
  console.log('----------------------------------------------------');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
