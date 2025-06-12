import { Module } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { CharactersController } from "./characters.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
  imports: [DatabaseModule],
})
export class CharactersModule {}
