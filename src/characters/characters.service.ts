import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class CharactersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCharacterDto: Prisma.CharactersCreateInput) {
    return this.databaseService.characters.create({
      data: createCharacterDto,
    });
  }

  async findAll(
    firstName?: string,
    lastName?: string,
    page = 1,
    pageSize = 10,
  ) {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const characters = await this.databaseService.characters.findMany({
        where: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        },
        skip,
        take,
      });

      const totalCount = await this.databaseService.characters.count({
        where: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        },
      });

      return {
        data: characters,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      };
    } catch (error) {
      console.error("❌ Error fetching characters:", error);
      throw new Error("Failed to retrieve character list.");
    }
  }

  async findOne(id: number) {
    return this.databaseService.characters.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCharacterDto: Prisma.CharactersUpdateInput) {
    return this.databaseService.characters.update({
      where: {
        id,
      },
      data: updateCharacterDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.characters.delete({
      where: {
        id,
      },
    });
  }
}
