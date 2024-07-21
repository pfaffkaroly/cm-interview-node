import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokeApiModule } from 'source/pokeapi/pokeapi.module';
import { PokemonAbility } from 'source/pokemon-ability/pokemon-ability.entity';
import { Ability } from 'source/ability/ability.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, PokemonAbility, Ability]), PokeApiModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
