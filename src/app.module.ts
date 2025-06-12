import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { CharactersModule } from "./characters/characters.module";

@Module({
  imports: [DatabaseModule, CharactersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
