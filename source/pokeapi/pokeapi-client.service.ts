import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GetPokemonListDto } from './dto/get-pokemon-list.dto';
import { GetPokemonDto } from './dto/get-pokemon.dto';
import { GetAbilityDto } from './dto/get-ability.dto';

@Injectable()
export class PokeApiClientService {
  readonly POKEAPI_URL = 'https://pokeapi.co/api/v2/';

  constructor(private readonly httpService: HttpService) {}

  async getPokemonList(limit: number, offset: number = 0): Promise<GetPokemonListDto> {
    return lastValueFrom(
      this.httpService.get(`${this.POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`)
    ).then((response) => response.data as GetPokemonListDto);
  }

  async getPokemonById(id: number): Promise<GetPokemonDto> {
    return lastValueFrom(
      this.httpService.get(`${this.POKEAPI_URL}/pokemon/${id}`)
    ).then((response) => response.data as GetPokemonDto);
  }

  async getPokemonByName(name: string): Promise<GetPokemonDto> {
    return lastValueFrom(
      this.httpService.get(`${this.POKEAPI_URL}/pokemon/${name}`)
    ).then((response) => response.data as GetPokemonDto);
  }

  async getAbilityById(id: number): Promise<GetAbilityDto> {
    return lastValueFrom(
      this.httpService.get(`${this.POKEAPI_URL}/ability/${id}`)
    ).then((response) => response.data as GetAbilityDto);
  }

  async getAbilityByName(name: string): Promise<GetAbilityDto> {
    return lastValueFrom(
      this.httpService.get(`${this.POKEAPI_URL}/ability/${name}`)
    ).then((response) => response.data as GetAbilityDto);
  }
}
