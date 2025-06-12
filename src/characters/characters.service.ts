import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class CharactersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCharacterDto: Prisma.CharactersCreateInput) {
    return this.databaseService.characters.create({
      data: createCharacterDto,
    });
  }

  async findAll(firstName?: string, lastName?: string) {
    return this.databaseService.characters.findMany({
      where: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
      },
    });
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
