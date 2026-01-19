// scripts/seed-admin.cjs
require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ;
  const password = process.env.SEED_ADMIN_PASSWORD ;

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    console.log('Admin already exists:', username);
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: {
      username,
      passwordHash: hash,
    },
  });

  console.log('Created admin:', admin.username);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
