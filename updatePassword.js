const prisma = require("./src/models/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.update({
    where: {
      username: "admin"
    },
    data: {
      password: hashedPassword
    }
  });

  console.log("Password updated successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
  