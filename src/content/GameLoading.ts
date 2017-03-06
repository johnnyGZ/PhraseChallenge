module game {
	/**
	 * 游戏loading界面
	 */
	export class GameLoading extends eui.Component {

		public constructor() {
			super();
			this.skinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="GameLoading" width="720" height="1136" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
	<e:Rect fillColor="0x704646" fillAlpha="0.5" width="720" height="1136" x="0" y="0"/>
	<e:Image id="loadingPng" source="loading_png" anchorOffsetX="47.5" anchorOffsetY="45" x="360.5" y="485"/>
	<e:Label text="正在加载..." y="549" anchorOffsetX="0" width="179" anchorOffsetY="0" height="39" x="233" fontFamily="SimSun" textColor="0x9a8ae2" bold="true"/>
	<e:Label id="progressTxt" text="100%" x="400.5" y="549" anchorOffsetX="0" width="87" textColor="0x9a8ae2" bold="true"/>
</e:Skin>`;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this.setProgress(0, 1);
				this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}, this);
		}

		private loadingPng: eui.Image;

		private progressTxt: eui.Label;

		private onEnterFrame(evt: egret.Event) {
			this.loadingPng.rotation += 3;
		}

		public setProgress(current: number, total: number): void {
			var currentPercent = Math.round(current / total * 100);
			this.progressTxt.text = `${currentPercent}%`;
		}
	}
}