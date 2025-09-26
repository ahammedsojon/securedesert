import prisma from "@/prisma/client";

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Web development" },
        { name: "Hacking" },
        { name: "Python" },
        { name: "SQL" },
        { name: "Database" },
        { name: "Game development" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
