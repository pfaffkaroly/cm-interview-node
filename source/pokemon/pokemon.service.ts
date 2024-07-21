import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PokeApiClientService } from '../pokeapi/pokeapi-client.service';
import { Pokemon } from './pokemon.entity';
import { GetPokemonDto, AbilityDto } from 'source/pokeapi/dto/get-pokemon.dto';
import { Ability } from 'source/ability/ability.entity';
import { PokemonAbility } from 'source/pokemon-ability/pokemon-ability.entity';
import { ensure } from 'source/utlity/ensure';

@Injectable()
export class PokemonService {
  readonly DEFAULT_RELATIONS = ['abilities', 'abilities.ability'];

  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,

    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>,
    
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,

    private readonly pokeapiClientService: PokeApiClientService,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find({
      relations: this.DEFAULT_RELATIONS 
    });
  }

  async findOne(id: number): Promise<Pokemon> {
    return await this.pokemonRepository.findOneOrFail({
      relations: this.DEFAULT_RELATIONS,
      where: { id: id }
    });
  }

  async getRandom(count: number): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.createQueryBuilder()
      .select('id')
      .orderBy('random()')
      .limit(count)
      .getRawMany();
    
    return await this.pokemonRepository.find({
      relations: this.DEFAULT_RELATIONS,
      where: { id: In(pokemons.map(pokemon => pokemon.id)) },
    });
  }

  async upvote(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({id});
    if (!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found.`);

    pokemon.votes++; 
    return await pokemon.save();
  }

  async getOrderedByVote(limit: number): Promise<Pokemon[]> {
    return await this.pokemonRepository.find({
      order: { votes: 'DESC' },
      take: limit
    });
  } 

  async resetVotes(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.find();
    for (const pokemon of pokemons) {
      pokemon.votes = 0;
    }
    return await this.pokemonRepository.save(pokemons);
  }

  async createFromPokeApi(limit: number): Promise<Pokemon[]> {
    const getPokemonEntry = (pokemon: GetPokemonDto, existing: Pokemon | null): Pokemon => {
      const entry = new Pokemon(existing);

      entry.name = pokemon.name.toLowerCase();
      entry.experience = pokemon.base_experience;
      entry.height = pokemon.height;
      entry.weight = pokemon.weight;
      entry.sprite = pokemon.sprites.front_default || '';
      entry.cries = pokemon.cries.latest || pokemon.cries.legacy;
      entry.abilities = [];
      
      return entry;
    }

    async function *getAbilitiesGen(pokemonAbilities: AbilityDto[]): AsyncGenerator<Ability> {
      for (const pokemonAbility of pokemonAbilities) {
        const name = pokemonAbility.ability.name.toLowerCase();
        const existing = await this.abilityRepository.findOne({ 
          where: { name: name } 
        });
        yield existing ?? this.abilityRepository.create({ name });
      }
    }
    const getAbilities = getAbilitiesGen.bind(this);

    const extendAbility = async (ability: Ability): Promise<Ability> => {
      const extended = await this.pokeapiClientService.getAbilityByName(ability.name);
      
      ability.effect = extended.effect_entries.find(e => e.language.name === 'en')?.effect;
      ability.main = extended.is_main_series;

      return ability;
    }

    const pokemons: Pokemon[] = [];
    const abilities: Ability[] = [];
    await this.pokemonAbilityRepository.clear();

    const response = await this.pokeapiClientService.getPokemonList(limit);
    for (const result of response.results) {
      const pokemon = await this.pokeapiClientService.getPokemonByName(result.name);
      
      for await (const ability of getAbilities(pokemon.abilities)) {
        if (abilities.findIndex(a => a.name === ability.name) === -1) {
          abilities.push(await extendAbility(ability));
        }
      }
      
      let existing = await this.pokemonRepository.findOne({ 
        where: { name: result.name.toLowerCase() } 
      });
      const entry = this.pokemonRepository.create(getPokemonEntry(pokemon, existing));
      pokemons.push(entry);
      
      for (const pokemonAbility of pokemon.abilities) {
        entry.abilities.push(this.pokemonAbilityRepository.create({
          ability: ensure(abilities.find(a => a.name === pokemonAbility.ability.name.toLowerCase())),
          hidden: pokemonAbility.is_hidden,
          slot: pokemonAbility.slot
        }));
      }
    } 

    await this.abilityRepository.save(abilities);
    return await this.pokemonRepository.save(pokemons);
  }
}
