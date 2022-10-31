export interface Game {
  id: number;
  total_kills: number;
  players: Record<
    string,
    {
      kills: number;
      deaths: number;
    }
  >;
  kills_by_means: Record<string, number>;
  items: Record<string, number>;
  elapsed_time: string;
}

export type Report = {
  games: Game[];
};
