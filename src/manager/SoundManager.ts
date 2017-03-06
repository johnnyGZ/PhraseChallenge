/**
 * 音效控制器
 */
class SoundManager {
	private static instance: SoundManager;

	public constructor() {
		this._btnClick = RES.getRes("buttonclick_mp3");
		this._right = RES.getRes("right_mp3");
		this._wrong = RES.getRes("wrong_mp3");
		this._word = RES.getRes("type_word_mp3");
		this._bgMusic = RES.getRes("Music_mp3");
	}

	public static getInstance(): SoundManager {
		if (!SoundManager.instance) {
			SoundManager.instance = new SoundManager();
		}
		return SoundManager.instance;
	}

	//按键点击音效
	private _btnClick: egret.Sound;
	//答案正确页面
	private _right: egret.Sound;
	//答案错误页面
	private _wrong: egret.Sound;
	//点击字块音效
	private _word: egret.Sound;
	//背景音乐
	private _bgMusic: egret.Sound;

	private _bgMusicChannel: egret.SoundChannel;

	public playSound(type: number) {
		if (this.musicSwitch) {
			switch (type) {
				case GameConstantData.SOUND_CLICK:
					this._btnClick.play(0, 1);
					break;
				case GameConstantData.SOUND_RIGHT:
					this._right.play(0, 1);
					break;
				case GameConstantData.SOUND_WRONG:
					this._wrong.play(0, 1);
					break;
				case GameConstantData.SOUND_WORD:
					this._word.play(0, 1);
					break;
				case GameConstantData.SOUND_BG_MUSIC:
					if(!this._bgMusicChannel) {
						this._bgMusicChannel = this._bgMusic.play(0, 0);
					}
					break;
			}
		}
	}

	public stopSound(type: number) {
		switch (type) {
			case GameConstantData.SOUND_BG_MUSIC:
				if(this._bgMusicChannel) {
					this._bgMusicChannel.stop();
					this._bgMusicChannel = null;
				}
				break;
		}
	}

	public set musicSwitch(value: boolean) {
		if (value) {
			egret.localStorage.setItem("musicSwitch", "1"); //开启音乐
		} else {
			egret.localStorage.setItem("musicSwitch", "0"); //关闭音乐
		}
	}

	public get musicSwitch(): boolean {
		var b = egret.localStorage.getItem("musicSwitch");
		if (b == "0") {
			return false;
		}
		else {
			return true;
		}
	}

}