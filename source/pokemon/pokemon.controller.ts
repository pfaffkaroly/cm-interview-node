import { Controller, Get, HttpCode, Next, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get('random')
  getRandom(@Query('count', new ParseIntPipe({ optional: true })) count?: number): Promise<Pokemon[]> {
    return this.pokemonService.getRandom(+(count || 2));
  }

  @Get('top')
  getOrderedByVote(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number): Promise<Pokemon[]> {
    return this.pokemonService.getOrderedByVote(+(limit || 10));
  } 

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  @Post(':id/upvote')
  @HttpCode(202)
  upvote(@Param('id', ParseIntPipe) id: number): Promise<Pokemon> {
    return this.pokemonService.upvote(+id);
  }

  @Post('reset-votes')
  @HttpCode(202)
  resetVotes(): Promise<Pokemon[]> {
    return this.pokemonService.resetVotes();
  }

  @Patch('create-from-pokeapi')
  @HttpCode(202)
  createFromPokeApi(@Query('limit', new ParseIntPipe({ optional: true }), ) limit?: number): Promise<Pokemon[]> {
    return this.pokemonService.createFromPokeApi(+(limit || 100));
  }

}
