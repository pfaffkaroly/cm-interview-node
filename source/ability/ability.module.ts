import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from './ability.entity';
import { AbilityController } from './ability.controller';
import { AbilityService } from './ability.service';
import { PokemonAbility } from 'source/pokemon-ability/pokemon-ability.entity';
import { Pokemon } from 'source/pokemon/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ability, PokemonAbility, Pokemon])],
  controllers: [AbilityController],
  providers: [AbilityService],
})
export class AbilityModule {}
