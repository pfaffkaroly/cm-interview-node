import { PokemonAbility } from 'source/pokemon-ability/pokemon-ability.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Pokemon' })
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column()
  experience: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  sprite: string;

  @Column()
  cries: string;

  @OneToMany(() => PokemonAbility, (pokemonAbility) => pokemonAbility.pokemon, {
    cascade: ['insert', 'update', 'remove']
  })
  abilities: PokemonAbility[];

  @Column({ default: 0 })
  votes: number;

  constructor(partialPokemon?: Partial<Pokemon> | null) {
    super();
    if (partialPokemon !== undefined && partialPokemon !== undefined) {
      Object.assign(this, partialPokemon);
    }
  }
}
  