/**
 * 游戏界面跳转控制器,单例模式
 */
class ViewManager extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private onAdd(evt: egret.Event) {
		/**初始化动作 */
		GameConstantData.STAGE_WIDTH = this.stage.stageWidth;
		GameConstantData.STAGE_HEIGHT = this.stage.stageHeight;
		/**初始化关卡位置 */
		var milestone: number = LevelDataManager.getInstance().milestone;
		egret.log("当前所在最大关卡：" + milestone);
		if (milestone == 0) {
			LevelDataManager.getInstance().milestone = 1;
			this.selectLevel = 1;
		} else {
			this.selectLevel = milestone;
		}
		SoundManager.getInstance();
	}

	private onRemove(evt: egret.Event) {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private _uiFocused: eui.Component;

	private _gameStart: game.GameStart;

	private _gameLevel: game.GameLevel;

	private _gamePlaying: game.GamePlaying;

	public selectLevel: number = 1; //当前选择的关卡

	public pageReadyHandler(pageName: string) {
		this.removeChildren();
		switch (pageName) {
			case GamePageConstant.GAME_START:
				this._gameStart = new game.GameStart();
				this._uiFocused = this._gameStart;
				break;
			case GamePageConstant.GAME_LEVEL:
				this._gameLevel = new game.GameLevel();
				this._uiFocused = this._gameLevel;
				break;
			case GamePageConstant.GAME_PLAYING:
				//加载关卡数据
				LevelDataManager.getInstance().initLevelItems(this.selectLevel);
				this._gamePlaying = new game.GamePlaying();
				this._uiFocused = this._gamePlaying;
				break;
			default:

				break;
		}
		this.addChild(this._uiFocused);
	}

}