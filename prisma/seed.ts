import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.characters.createMany({
    data: [
      {
        firstName: "Hiroshi",
        lastName: "Agasa",
        role: "	Professor who creates gadgets for Conan to use. Is the best friend and the next-door neighbour of the Kudos. He was the first to know about Conan's true identity.",
      },
      {
        firstName: "Sonoko",
        lastName: "Suzuki",
        role: "Ran's best friend. The youngest daughter of the wealthy Suzuki family.",
      },
    ],
  });
}

main()
  .then(() => console.log("Seeding completed"))
  .catch((error) => console.error(error))
  .finally(() => {
    prisma.$disconnect();
  });
