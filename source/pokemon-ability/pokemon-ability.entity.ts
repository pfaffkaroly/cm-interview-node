import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import { Ability } from '../ability/ability.entity';

@Entity({ name: 'PokemonAbility' })
export class PokemonAbility extends BaseEntity {
  @PrimaryColumn({ select: false })
  pokemonId: number;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.abilities) 
  @JoinColumn({ name: 'pokemonId', referencedColumnName: 'id' })
  pokemon: Pokemon;

  @PrimaryColumn({ select: false })
  abilityId: number;

  @ManyToOne(() => Ability) 
  @JoinColumn({ name: 'abilityId', referencedColumnName: 'id' })
  ability: Ability;

  @Column({ default: false })
  hidden: boolean;

  @Column()
  slot: number;
}
  