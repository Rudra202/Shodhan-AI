import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'CEO', description: 'Chief Executive Officer - full access' },
    { name: 'ADMIN', description: 'System administrator' },
    { name: 'SALES_MANAGER', description: 'Sales team manager' },
    { name: 'SALES_EXECUTIVE', description: 'Sales team member' },
    { name: 'MARKETING', description: 'Marketing team member' },
    { name: 'RND', description: 'Research and Development' },
    { name: 'EMPLOYEE', description: 'General employee' },
    { name: 'VIEWER', description: 'Read-only access' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const employeeRole = await prisma.role.findUnique({ where: { name: 'EMPLOYEE' } });

  if (!adminRole || !employeeRole) {
    throw new Error('Roles not found');
  }

  const adminPassword = await bcrypt.hash('admin123456', 12);
  const userPassword = await bcrypt.hash('user123456', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@shodhanai.com' },
    update: {},
    create: {
      email: 'admin@shodhanai.com',
      password: adminPassword,
      name: 'Admin User',
      username: 'admin',
      isVerified: true,
      roles: {
        create: [
          { roleId: adminRole.id },
          { roleId: employeeRole.id },
        ],
      },
      settings: { create: {} },
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@shodhanai.com' },
    update: {},
    create: {
      email: 'user@shodhanai.com',
      password: userPassword,
      name: 'Test User',
      username: 'testuser',
      isVerified: true,
      roles: {
        create: { roleId: employeeRole.id },
      },
      settings: { create: {} },
    },
  });

  console.log('Seed completed:');
  console.log(`  Admin: admin@shodhanai.com / admin123456`);
  console.log(`  User:  user@shodhanai.com / user123456`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
