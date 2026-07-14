const { PrismaClient } = require('@prisma/client');

// Use the pooler URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://postgres.yzqydkebyyvfktaztwga:%23David2006%23Kay@aws-us3.pooler.supabase.com:6543/postgres?pgbouncer=true"
    },
  },
});

async function main() {
  console.log("Testing connection pooler...");
  const user = await prisma.user.findFirst();
  console.log("Success! Found user:", user.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
