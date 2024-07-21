import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from 'source/ability/ability.entity';
import { PokemonAbility } from 'source/pokemon-ability/pokemon-ability.entity';
import { Pokemon } from 'source/pokemon/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ability, PokemonAbility, Pokemon])]
})
export class PokemonAbilityModule {}
