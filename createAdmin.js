const prisma = require("./src/models/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const role = await prisma.role.findFirst({
    where: {
      name: "ADMIN"
    }
  });

  if (!role) {
    console.log("ADMIN role not found");
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      roleId: role.id
    }
  });

  console.log("User created:", user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });