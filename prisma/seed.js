const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.employee.createMany({
    data: [
      { first_name: 'JAMES', middle_name: 'SHABANI', last_name: 'JUMA', check_number: '090911', employee_type: 'SC' },
      { first_name: 'MACHABA', middle_name: 'EZEKIEL', last_name: 'MACHABA', check_number: '090911', employee_type: 'SP' },
      { first_name: 'JUMA', middle_name: 'KIOTA', last_name: 'JUJU', check_number: '090911', employee_type: 'SM' },
      { first_name: 'MARIAM', middle_name: 'Kiasi', last_name: 'Chacha', check_number: '90911', employee_type: 'SS' }
    ]
  });
}

main()
  .then(() => console.log('Seeded successfully'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });