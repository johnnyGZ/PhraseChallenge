module game {
	export class LevelInfo extends eui.Component {
		public constructor(levelArrow: eui.Image, viewManager: ViewManager) {
			super();
			this.skinName = "resource/skins/LevelInfo.exml";
			this.levelArrow = levelArrow;
			this.viewManager = viewManager;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd(evt: egret.Event) {
			this.levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClick, this);
			
		}

		private onRemove(evt: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.levelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevelClick, this);
		}

		private levelBtn: eui.Button;

		private levelArrow: eui.Image;

		private viewManager: ViewManager;

		public get level(): number {
			return parseInt(this.levelBtn.label);
		}

		public set level(value: number) {
			this.levelBtn.label = value.toString();
		}

		public setLevelBtnStatus(status: boolean) {
			this.levelBtn.enabled = status;
		}

		private onLevelClick(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_CLICK);
			//点击判断是否与箭头指向关卡一致，一致则开启游戏，不一致则移动箭头
			if(this.viewManager.selectLevel == this.level) {
				egret.log("游戏开始，关卡：" + this.level);
				this.viewManager.dispatchEventWith(GameEvents.GAME_CONTENT_LOAD, false, GamePageConstant.GAME_PLAYING);
			} else {
				egret.log("选中关卡：" + this.level);
				this.levelArrow.x = (this.width - this.levelArrow.width) / 2 + this.x;
				this.levelArrow.y = this.y - this.levelArrow.height;
				this.viewManager.selectLevel = this.level;
			}
		}

	}
}