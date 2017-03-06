module game {
	export class Word extends eui.Component {
		public constructor() {
			super();
			this.skinName = "resource/skins/Word.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd(evt: egret.Event) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}

		private onRemove(evt: egret.Event) {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private wordText: eui.Label;

		private onClickTap(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_WORD);
			//自身消失，答案区显示
			(<game.GamePlaying>this.parent.parent).doSomethingByClickWord(this);
		}

		public setWordValue(value: string) {
			this.wordText.text = value;
		}

		public getWordValue(): string {
			return this.wordText.text;
		}
	}
}