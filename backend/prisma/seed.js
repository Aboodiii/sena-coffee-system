const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@senacoffee.com' },
        update: {},
        create: {
            email: 'admin@senacoffee.com',
            password: hashedPassword,
            name: 'Admin Sena'
        }
    });
    console.log('Admin user created:', admin.email);

    // Create Initial Suppliers
    const s1 = await prisma.supplier.create({
        data: { name: 'Mountain Brew Farms', contact: '+251 911 123456', email: 'ethiopia@coffee.com' }
    });
    const s2 = await prisma.supplier.create({
        data: { name: 'Highland Estates', contact: '+251 922 654321', email: 'highland@coffee.com' }
    });
    console.log('Suppliers seeded');

    // Create Initial Stores
    const hub1 = await prisma.store.create({
        data: { name: 'Addis Customs Hub', location: 'Addis Ababa', capacity: 1200 }
    });
    const hub2 = await prisma.store.create({
        data: { name: 'Dire Dawa Transit', location: 'Dire Dawa', capacity: 800 }
    });
    console.log('Stores seeded');

    console.log('Database Seeding Complete!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
