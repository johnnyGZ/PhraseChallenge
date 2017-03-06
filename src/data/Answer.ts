module game {
	export class Answer extends eui.Component {
		public constructor() {
			super();
			this.skinName = "resource/skins/Answer.exml";
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

		private answerText: eui.Label;

		public selWord: game.Word;

		private onClickTap(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_WORD);
			//自身消失，选择区显示
			(<game.GamePlaying>this.parent.parent).doSomethingByClickAnswer(this);
		}

		public setAnswerValue(value: string) {
			this.answerText.text = value;
		}

		public getAnswerValue(): string {
			return this.answerText.text;
		}
	}
}