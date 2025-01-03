interface CrazyGamesSDK {
  init(): Promise<void>;
  environment: string;
  isQaTool: boolean;
  ad: {
    requestAd(type: string): Promise<void>;
  };
  game: {
    gameplayStart(): Promise<void>;
    gameplayStop(): Promise<void>;
    happyTime(): Promise<void>;
  };
  user: {
    getUser(): Promise<any>;
    isUserAccountAvailable: boolean;
    systemInfo: any;
  };
  data: {
    save(data: any): Promise<void>;
    load(): Promise<any>;
  };
}

interface Window {
  CrazyGames: {
    SDK: CrazyGamesSDK;
  };
}