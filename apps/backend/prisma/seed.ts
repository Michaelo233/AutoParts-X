import { prisma } from "../src/lib/prisma";
import { carPartList } from "../src/api/v1/data/carPartList";

const categories = [
  { categoryId: "CT001", categoryName: "Engine & Components" },
  { categoryId: "CT002", categoryName: "Transmission & Drivetrain" },
  { categoryId: "CT003", categoryName: "Brakes" },
  { categoryId: "CT004", categoryName: "Suspension & Steering" },
  { categoryId: "CT005", categoryName: "Electrical & Lighting" },
  { categoryId: "CT006", categoryName: "Body & Exterior" },
  { categoryId: "CT007", categoryName: "Cooling & Heating" },
  { categoryId: "CT008", categoryName: "Exhaust & Emissions" },
  { categoryId: "CT009", categoryName: "Tires & Wheels" },
  { categoryId: "CT010", categoryName: "Interior & Accessories" },
];

async function seed() {
  await prisma.$transaction(async (transaction) => {
    await transaction.favourite.deleteMany();
    await transaction.listing.deleteMany();
    await transaction.part.deleteMany();
    await transaction.category.deleteMany();
    await transaction.user.deleteMany();

    await transaction.category.createMany({ data: categories });

    const uniquePartsMap = new Map<
      number,
      { partId: number; partName: string; categoryId: string }
    >();

    for (const user of carPartList) {
      for (const item of user.partsOwned) {
        if (!uniquePartsMap.has(item.partId)) {
          uniquePartsMap.set(item.partId, {
            partId: item.partId,
            partName: item.partName,
            categoryId: item.categoryId,
          });
        }
      }
    }

    await transaction.part.createMany({
      data: Array.from(uniquePartsMap.values()),
    });

    await transaction.user.createMany({
      data: carPartList.map(({ userId, userName }) => ({
        userId,
        userName,
      })),
    });

    const allListings = carPartList.flatMap((user) =>
      user.partsOwned.map(
        ({ id, userId, partId, description, price, partImage, isForSale }) => ({
          id,
          userId,
          partId,
          description,
          price,
          partImage,
          isForSale,
        })
      )
    );

    await transaction.listing.createMany({ data: allListings });

    const allFavourites = carPartList.flatMap((user) =>
      user.partsOwned
        .filter((item) => item.isFavorite)
        .map((item) => ({
          userId: item.userId,
          listingId: item.id,
        }))
    );
    await transaction.favourite.createMany({ data: allFavourites });

    await transaction.$queryRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Part"', 'partId'), COALESCE((SELECT MAX("partId") FROM "Part"), 1), true);`
    );
    await transaction.$queryRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Listing"', 'id'), COALESCE((SELECT MAX("id") FROM "Listing"), 1), true);`
    );
  });

  console.log("AutoParts-X database seeded!");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });