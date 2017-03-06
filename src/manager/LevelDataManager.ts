class LevelDataManager {
	public constructor() {
	}

	private static instance: LevelDataManager;

	public static getInstance(): LevelDataManager {
		if(!LevelDataManager.instance) {
			LevelDataManager.instance = new LevelDataManager();
		}
		return LevelDataManager.instance;
	}

	private levelItems: game.LevelDataItem[][] = new Array();

	public initLevelItems(level: number) {
		if(!this.getLevelItem(level)) {
			var itemName = "question" + Math.ceil(level / GameConstantData.GAME_MAP_LEVEL_NUM) * GameConstantData.GAME_MAP_LEVEL_NUM + "_json";
			egret.log("加载题库：" + itemName);
			this.levelItems.push(RES.getRes(itemName));
		}
	}

	public getLevelItem(level: number): game.LevelDataItem {
		var row = Math.floor(level / GameConstantData.GAME_MAP_LEVEL_NUM);
		//用于判断是否已经加载过
		if(this.levelItems.length <= row) {
			return null;
		}
		var col = (level - 1) % GameConstantData.GAME_MAP_LEVEL_NUM;
		return this.levelItems[row][col];
	}

	public getRandomLevelItem(level: number): game.LevelDataItem {
		var row = Math.floor(level / GameConstantData.GAME_MAP_LEVEL_NUM);
		var col = (level - 1) % GameConstantData.GAME_MAP_LEVEL_NUM;
		var index = CommonUtil.getRandomInteger(0, GameConstantData.GAME_MAP_LEVEL_NUM, true, col);
		return this.levelItems[row][index];
	}

	public get milestone(): number {
		var m = egret.localStorage.getItem("milestone");
		if(!m) {
			return 0;
		} 
		return parseInt(m);
	}

	public set milestone(value: number) {
		egret.localStorage.setItem("milestone", value.toString());
	}

	public get money(): number {
		var m = egret.localStorage.getItem("money");
		if(!m) {
			return 0;
		} 
		return parseInt(m);
	}

	public set money(value: number) {
		egret.localStorage.setItem("money", value.toString());
	}
}