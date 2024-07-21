import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeApiClientService } from './pokeapi-client.service';

@Module({
  imports: [HttpModule],
  providers: [PokeApiClientService],
  exports: [PokeApiClientService],
})
export class PokeApiModule {}
