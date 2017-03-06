module game {
	/**
	 * 游戏开始界面
	 */
	export class GameStart extends eui.Component {
		public constructor() {
			super();
			this.skinName = "resource/skins/GameStart.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private startBtn: eui.Button;

		private musicBtn: eui.ToggleButton;

		private onAdd(evt: egret.Event) {
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			var musicSwitch: boolean = SoundManager.getInstance().musicSwitch;
			this.musicBtn.selected = !musicSwitch;
			if(musicSwitch){
				SoundManager.getInstance().playSound(GameConstantData.SOUND_BG_MUSIC);
			}
		}

		private onRemove(evt: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}

		private btnClick(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_CLICK);
			switch (evt.currentTarget) {
				case this.startBtn:
					egret.log("游戏开始...");
					this.parent.dispatchEventWith(GameEvents.GAME_CONTENT_LOAD, false, GamePageConstant.GAME_LEVEL);
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
	}
}