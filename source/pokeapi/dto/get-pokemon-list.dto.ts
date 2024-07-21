type Result = {
  readonly name: string;
  readonly url: string;
};

export class GetPokemonListDto {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: Result[];
}
