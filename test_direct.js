const { PrismaClient } = require('@prisma/client');

// Use the direct URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:%23David2006%23Kay@db.yzqydkebyyvfktaztwga.supabase.co:5432/postgres"
    },
  },
});

async function main() {
  console.log("Testing direct connection...");
  const user = await prisma.user.findFirst();
  console.log("Success! Found user:", user.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
