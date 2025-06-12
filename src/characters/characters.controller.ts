import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CharactersService } from "./characters.service";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { Prisma } from "generated/prisma";

@ApiTags("Characters")
@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOperation({ summary: "Add a new character" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "Conan" },
        lastName: { type: "string", example: "Edogawa" },
        role: {
          type: "string",
          example:
            "Child version of Shinichi Kudo. He's after the Black Organization to regain his original body. The show follows his journey and the different cases he encounters along the way.",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Successful response" })
  create(@Body() createCharacterDto: Prisma.CharactersCreateInput) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all characters" })
  @ApiResponse({ status: 200, description: "Successful response" })
  @ApiQuery({
    name: "firstName",
    required: false,
    type: String,
    example: "Conan",
  })
  @ApiQuery({
    name: "lastName",
    required: false,
    type: String,
    example: "Edogawa",
  })
  findAll(
    @Query("firstName") firstName?: string,
    @Query("lastName") lastName?: string,
  ) {
    return this.charactersService.findAll(firstName, lastName);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCharacterDto: Prisma.CharactersUpdateInput,
  ) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.charactersService.remove(+id);
  }
}
