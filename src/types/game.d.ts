interface GameItem {
  demoGameAvailable: boolean;
  favorite: boolean;
  gameIconUrl: string;
  gameName: string;
  gameType: string;
  gameTypeDescription: string;
  id: number;
  uuid: string;
  popularCount: number | null;
  type?: number | undefined;
  providerId: number | null;
  prizeAmount?: number | string;
  rtp?: string | number;
}
