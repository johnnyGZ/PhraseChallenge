module game {
	export class GameLevel extends eui.Component {
		public constructor() {
			super();
			this.skinName = "resource/skins/GameLevel.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd(evt: egret.Event) {
			this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			var musicSwitch: boolean = SoundManager.getInstance().musicSwitch;
			this.musicBtn.selected = !musicSwitch;
			this.initLevel();
		}

		private onRemove(evt: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}

		private returnBtn: eui.Button;

		private musicBtn: eui.ToggleButton;

		private gameLevelGroup: eui.Group;

		private levelArrow: eui.Image;

		private btnClick(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_CLICK);
			switch (evt.currentTarget) {
				case this.returnBtn:
					egret.log("返回游戏开始界面...");
					this.parent.dispatchEventWith(GameEvents.GAME_CONTENT_LOAD, false, GamePageConstant.GAME_START);
					break;
				case this.musicBtn:
					if (this.musicBtn.selected) {
						egret.log("音乐关闭...");
						SoundManager.getInstance().musicSwitch = false;
						SoundManager.getInstance().stopSound(GameConstantData.SOUND_BG_MUSIC);
					} else {
						egret.log("音乐开启...");
						SoundManager.getInstance().musicSwitch = true;
						SoundManager.getInstance().playSound(GameConstantData.SOUND_BG_MUSIC);
					}
					break;
			}
		}

		private initLevel() {
			var mapNum: number = Math.ceil(GameConstantData.GAME_LEVEL_NUM / GameConstantData.GAME_MAP_LEVEL_NUM);
			//初始化关卡背景
			var levelContentGroup: eui.Group = new eui.Group();
			levelContentGroup.touchEnabled = false;
			levelContentGroup.width = GameConstantData.STAGE_WIDTH;
			levelContentGroup.height = mapNum * GameConstantData.STAGE_HEIGHT;
			for(var i = 0; i < mapNum; i++) {
				var mapBgImg: eui.Image = new eui.Image();
				mapBgImg.source = RES.getRes("GameBG2_jpg");
				mapBgImg.y = GameConstantData.STAGE_HEIGHT * i;
				this.gameLevelGroup.addChild(mapBgImg);
			}

			//初始化关卡
			this.levelArrow = new eui.Image();
			this.levelArrow.width = 31;
			this.levelArrow.height = 59;
			this.levelArrow.source = RES.getRes("arrow_png");
			this.levelArrow.touchEnabled = false;
			var milestone: number = LevelDataManager.getInstance().milestone;
			for(var i = 0; i < GameConstantData.GAME_LEVEL_NUM; i++) {
				var levelInfo: game.LevelInfo = new game.LevelInfo(this.levelArrow, <ViewManager>this.parent);
				levelInfo.level = i + 1;
				levelInfo.y = levelContentGroup.height - (GameConstantData.STAGE_HEIGHT / GameConstantData.GAME_MAP_LEVEL_NUM * i) - GameConstantData.STAGE_HEIGHT / GameConstantData.GAME_MAP_LEVEL_NUM / 2 - levelInfo.height / 2;
				if(levelInfo.y + levelInfo.height > levelContentGroup.height) {
					levelInfo.y = levelContentGroup.height - levelInfo.height;
				} else if (levelInfo.y < 0) {
					levelInfo.y = 0;
				}
				levelInfo.x = 250 * Math.sin(0.7 * Math.PI / 180 * levelInfo.y) + GameConstantData.STAGE_WIDTH / 2.5;
				levelInfo.setLevelBtnStatus(i < milestone);
				levelContentGroup.addChild(levelInfo);
			}
			//初始化箭头
			var selectLevel = levelContentGroup.getElementAt((<ViewManager>this.parent).selectLevel - 1);
			this.levelArrow.x = (selectLevel.width - this.levelArrow.width) / 2 + selectLevel.x;
			this.levelArrow.y = selectLevel.y - this.levelArrow.height;
			levelContentGroup.addChild(this.levelArrow);

			//将scroll焦点放到当前选中关卡所在页面，关卡往上走
			var pageNum: number = Math.ceil((<ViewManager>this.parent).selectLevel / GameConstantData.GAME_MAP_LEVEL_NUM);
			this.gameLevelGroup.scrollV = levelContentGroup.height - pageNum * GameConstantData.STAGE_HEIGHT;
			this.gameLevelGroup.addChild(levelContentGroup);
		}
	}
}