import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const characters = [
      {
        firstName: "Eri",
        lastName: "Kisaki",
        role: "Ran's mother, a very successful attorney. Married to, but currently living separately from Kogoro Mouri. She is a friend of Yukiko Kudo.",
      },
    ];

    await prisma.characters.createMany({ data: characters });

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedDatabase();
