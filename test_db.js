const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  console.log("User:", user.id);
  
  const vehicle = await prisma.vehicle.create({
    data: {
      user_id: user.id,
      make: "Toyota",
      model: "Camry",
      year: 2016,
      license_plate: "PENDING",
      vin: undefined,
      current_mileage: 45000,
    }
  });
  console.log("Vehicle created:", vehicle);
}

main().catch(console.error).finally(() => prisma.$disconnect());
