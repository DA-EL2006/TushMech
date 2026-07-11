import { PrismaClient, Role, JobStatus, DiagnosticStatus, ItemType, InvoiceStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding test data...')

  // Clean existing data for idempotency (Optional, but safe for MVP seed)
  await prisma.transaction.deleteMany()
  await prisma.estimateItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.diagnosticReport.deleteMany()
  await prisma.job.deleteMany()
  await prisma.vehicle.deleteMany()
  // We'll keep users or delete specific test users if needed

  const passwordHash = await bcrypt.hash('password123', 10)

  // 1. Create a Customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      first_name: 'John',
      last_name: 'Doe',
      password_hash: passwordHash,
      role: Role.CUSTOMER,
      is_verified: true,
    },
  })

  // 2. Create a Mechanic
  const mechanic = await prisma.user.upsert({
    where: { email: 'mechanic@test.com' },
    update: {},
    create: {
      email: 'mechanic@test.com',
      first_name: 'Mike',
      last_name: 'Wrench',
      password_hash: passwordHash,
      role: Role.MECHANIC,
      is_verified: true,
    },
  })

  // 3. Create a Vehicle for Customer
  const vehicle = await prisma.vehicle.create({
    data: {
      user_id: customer.id,
      make: 'Toyota',
      model: 'Camry',
      year: 2018,
      license_plate: 'LAG-123-AB',
      vin: '1TXYZ2088390192',
      current_mileage: 45000,
    }
  })

  // 4. Create a Job
  const job = await prisma.job.create({
    data: {
      customer_id: customer.id,
      mechanic_id: mechanic.id,
      vehicle_id: vehicle.id,
      status: JobStatus.QUOTING,
      reported_issue: 'Engine making knocking sound and loss of power',
      latitude: 6.5244,
      longitude: 3.3792,
      address: 'Lekki Phase 1, Lagos',
    }
  })

  // 5. Create a Diagnostic Report
  const diagnostic = await prisma.diagnosticReport.create({
    data: {
      job_id: job.id,
      mechanic_notes: 'Engine block is severely damaged. Metal shavings found in oil pan. Requires complete engine replacement.',
      obd2_codes: ['P0300', 'P0301'],
      photo_urls: ['/images/gearbox_1.jpg', '/images/gearbox_2.jpg'],
      status: DiagnosticStatus.QA_APPROVED,
    }
  })

  // 6. Create Estimate Items
  await prisma.estimateItem.createMany({
    data: [
      {
        diagnostic_id: diagnostic.id,
        type: ItemType.PART,
        description: 'Authentic OEM Block Assembly (Toyota Camry)',
        quantity: 1,
        unit_price: 380000,
        total_price: 380000,
      },
      {
        diagnostic_id: diagnostic.id,
        type: ItemType.LABOR,
        description: 'Labor (Expert Technician - Engine Swap)',
        quantity: 1,
        unit_price: 120000,
        total_price: 120000,
      }
    ]
  })

  // 7. Create Invoice
  const invoice = await prisma.invoice.create({
    data: {
      id: 'TM-4921', // Hardcoding ID so it matches the UI prototype easily if we want, or just let it UUID
      job_id: job.id,
      subtotal: 500000,
      tax: 37500, // 7.5% VAT
      total_amount: 537500,
      status: InvoiceStatus.UNPAID,
    }
  })

  console.log('Seeding complete!')
  console.log(`Test Invoice ID: ${invoice.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
