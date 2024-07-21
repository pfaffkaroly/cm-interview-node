import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeApiModule } from './pokeapi/pokeapi.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonAbilityModule } from './pokemon-ability/pokemon-ability.module';
import { AbilityModule } from './ability/ability.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/pokemon.db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    PokeApiModule,
    PokemonModule,
    PokemonAbilityModule,
    AbilityModule
  ],
})
export class AppModule {}
