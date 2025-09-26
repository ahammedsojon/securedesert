export interface IChallenge {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  points: number;
  thumbnail?: string;
}

export interface ICategory {
  title: string;
  icon?: string;
  data: IChallenge[];
}
