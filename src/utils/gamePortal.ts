class GamePortal {
  private initialized: boolean = false;
  private environment: string = 'disabled';
  private isQaTool: boolean = false;

  async init() {
    try {
      if (window.CrazyGames?.SDK) {
        await window.CrazyGames.SDK.init();
        this.initialized = true;
        this.environment = window.CrazyGames.SDK.environment;
        this.isQaTool = window.CrazyGames.SDK.isQaTool;
        
        // Prevent scrolling
        window.addEventListener("wheel", (event) => event.preventDefault(), {
          passive: false,
        });

        window.addEventListener("keydown", (event) => {
          if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
            event.preventDefault();
          }
        });

        // Initialize other SDK features
        this.initializeSDKFeatures();
      }
    } catch (error) {
      console.error('Failed to initialize game portal:', error);
    }
  }

  private initializeSDKFeatures() {
    if (!this.initialized || this.environment === 'disabled') return;

    // Listen for gameplay start
    this.reportGameplayStart();

    // Initialize user features
    this.initializeUser();
  }

  private async reportGameplayStart() {
    try {
      await window.CrazyGames.SDK.game.gameplayStart();
    } catch (error) {
      console.error('Failed to report gameplay start:', error);
    }
  }

  private async initializeUser() {
    try {
      const user = await window.CrazyGames.SDK.user.getUser();
      if (user) {
        console.log('User logged in:', user);
      }
    } catch (error) {
      console.error('Failed to get user:', error);
    }
  }

  async showAd() {
    if (!this.initialized || this.environment === 'disabled') return;

    try {
      await window.CrazyGames.SDK.ad.requestAd('midgame');
    } catch (error) {
      console.error('Failed to show ad:', error);
    }
  }

  async saveGameData(data: any) {
    if (!this.initialized || this.environment === 'disabled') return;

    try {
      await window.CrazyGames.SDK.data.save(data);
    } catch (error) {
      console.error('Failed to save game data:', error);
    }
  }

  async loadGameData() {
    if (!this.initialized || this.environment === 'disabled') return null;

    try {
      return await window.CrazyGames.SDK.data.load();
    } catch (error) {
      console.error('Failed to load game data:', error);
      return null;
    }
  }

  isInitialized() {
    return this.initialized;
  }

  getEnvironment() {
    return this.environment;
  }
}

export const gamePortal = new GamePortal();