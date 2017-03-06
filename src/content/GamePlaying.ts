module game {
	export class GamePlaying extends eui.Component {
		public constructor() {
			super();
			this.skinName = "resource/skins/GamePlaying.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}

		private onAdd(evt: egret.Event) {
			this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			var musicSwitch: boolean = SoundManager.getInstance().musicSwitch;
			this.musicBtn.selected = !musicSwitch;
			this.tipSkillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.clearSkillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.changeSkillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.initLevel();
		}

		private onRemove(evt: egret.Event) {
			// this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
			// this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.tipSkillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.clearSkillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.changeSkillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}

		private returnBtn: eui.Button;
		private musicBtn: eui.ToggleButton;
		private moneyText: eui.Label;
		private levelLabel: eui.Label;
		private tipSkillGroup: eui.Group;
		private clearSkillGroup: eui.Group;
		private changeSkillGroup: eui.Group;
		private questionImg: eui.Image;
		private answerGroup: eui.Group;
		private wordGroup: eui.Group;
		private winGroup: eui.Group;
		private nextBtn: eui.Button;
		private resultMoneyText: eui.Label;
		private meanText: eui.Label;
		private fromText: eui.Label;
		private alertGroup: eui.Group;
		private alertText: eui.Label;
		private confirmBtn: eui.Button;
		private cancelBtn: eui.Button;

		private levelDataItem: game.LevelDataItem;
		private currentSkill: string;
		private tempAnswer: game.Answer;
		private tempWord: game.Word;

		private btnClick(evt: egret.TouchEvent) {
			SoundManager.getInstance().playSound(GameConstantData.SOUND_CLICK);
			switch (evt.currentTarget) {
				case this.returnBtn:
					egret.log("返回游戏选关界面...");
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
				case this.tipSkillGroup:
					egret.log("使用提示技能...");
					this.alertGroup.visible = true;
					this.alertText.text = "使用自動提示1個子功能，將會消耗" + GameConstantData.SILVER_TIP_SKILL_COST + "元寶。";
					this.currentSkill = GameConstantData.SKILL_NAME_TIP;
					break;
				case this.clearSkillGroup:
					egret.log("使用消去技能...");
					this.alertGroup.visible = true;
					this.alertText.text = "使用自動消去1個子功能，將會消耗" + GameConstantData.SILVER_CLEAR_SKILL_COST + "元寶。";
					this.currentSkill = GameConstantData.SKILL_NAME_CLEAR;
					break;
				case this.changeSkillGroup:
					egret.log("使用换题技能...");
					this.alertGroup.visible = true;
					this.alertText.text = "使用自動替換題目功能，將會消耗" + GameConstantData.SILVER_CHANGE_SKILL_COST + "元寶。";
					this.currentSkill = GameConstantData.SKILL_NAME_CHANGE;
					break;
				case this.nextBtn:
					egret.log("进入下一关...");
					this.winGroup.visible = false;
					this.initLevel();
					break;
				case this.confirmBtn:
					egret.log("确定使用技能...");
					this.useSkill();
					break;
				case this.cancelBtn:
					egret.log("取消使用技能...");
					this.alertGroup.visible = false;
					this.currentSkill = null;
					break;
			}
		}

		private initLevel() {
			//隐藏提示和结束窗口
			this.winGroup.visible = false;
			this.alertGroup.visible = false;
			//初始化数据
			var selectedLevel: number = (<ViewManager>this.parent).selectLevel;
			this.levelDataItem = LevelDataManager.getInstance().getLevelItem(selectedLevel);
			this.moneyText.text = LevelDataManager.getInstance().money.toString();
			this.levelLabel.text = selectedLevel.toString();
			(<eui.Label>this.tipSkillGroup.getElementAt(1)).text = GameConstantData.SILVER_TIP_SKILL_COST.toString();
			(<eui.Label>this.clearSkillGroup.getElementAt(1)).text = GameConstantData.SILVER_CLEAR_SKILL_COST.toString();
			(<eui.Label>this.changeSkillGroup.getElementAt(1)).text = GameConstantData.SILVER_CHANGE_SKILL_COST.toString();
			this.questionImg.source = RES.getRes(this.levelDataItem.img);
			this.resultMoneyText.text = GameConstantData.SILVER_WIN_GET.toString();
			this.meanText.text = this.levelDataItem.tip;
			this.fromText.text = this.levelDataItem.content;
			//初始化答案区汉字为空
			for(var i = 0; i < this.answerGroup.numElements; i++) {
				(<game.Answer>this.answerGroup.getElementAt(i)).setAnswerValue("");
				(<game.Answer>this.answerGroup.getElementAt(i)).selWord = null;
			}
			//初始化选择区汉字
			var otherLevelDataItem: game.LevelDataItem = LevelDataManager.getInstance().getRandomLevelItem(selectedLevel);
			var wordArr: string[] = CommonUtil.shuffleArray(CommonUtil.getCharArrayFromString(this.levelDataItem.answer + this.levelDataItem.word + otherLevelDataItem.answer + otherLevelDataItem.word));
			for(var i = 0; i < this.wordGroup.numElements; i++) {
				(<game.Word>this.wordGroup.getElementAt(i)).setWordValue(wordArr[i]);
				(<game.Word>this.wordGroup.getElementAt(i)).visible = true;
			}
		}

		/**
		 * 点击word后答案区显示word
		 */
		public doSomethingByClickWord(word: game.Word) {
			this.resetTween();
			//隐藏选择区汉字
			word.visible = false;
			//答案区显示选择的汉字
			var curAnswer: string = "";
			for(var i = 0; i < this.answerGroup.numElements; i++) {
				var tmp: game.Answer = <game.Answer>this.answerGroup.getElementAt(i);
				if(tmp.selWord == null) {
					tmp.setAnswerValue(word.getWordValue());
					curAnswer += tmp.getAnswerValue();
					//保存对应的word，便于点击答案时恢复选择区显示
					tmp.selWord = word;
					//最后一个字，判断是否正确
					if(i == this.answerGroup.numElements - 1) {
						if(this.levelDataItem.answer == curAnswer) {//胜利
							//播放胜利音效
							SoundManager.getInstance().playSound(GameConstantData.SOUND_RIGHT);
							//显示胜利窗口
							this.winGroup.visible = true;
							//增加银两收益
							LevelDataManager.getInstance().money += GameConstantData.SILVER_WIN_GET;
							//记录当前关卡
							if(LevelDataManager.getInstance().milestone < GameConstantData.GAME_LEVEL_NUM) {
								(<ViewManager>this.parent).selectLevel += 1;
								LevelDataManager.getInstance().milestone += 1;
							}
						} else { //失败
							//播放失败音效
							SoundManager.getInstance().playSound(GameConstantData.SOUND_WRONG);
							//清空答案区选择
							this.resetAnswerAndWord();
						}
					} else {
						break;
					}
				} else {
					curAnswer += tmp.getAnswerValue();
				}
			}
		}

		private resetAnswerAndWord() {
			for(var i = 0; i < this.answerGroup.numElements; i++) {
				(<game.Answer>this.answerGroup.getElementAt(i)).setAnswerValue("");
				(<game.Answer>this.answerGroup.getElementAt(i)).selWord.visible = true;
				(<game.Answer>this.answerGroup.getElementAt(i)).selWord = null;
			}
		}

		public doSomethingByClickAnswer(answer: game.Answer) {
			if(answer.selWord) {
				this.resetTween();
				egret.log("清空答案，恢复选区汉字");
				answer.selWord.visible = true;
				answer.selWord = null;
				answer.setAnswerValue("");
			}
		}

		private useSkill() {
			var currentSilver: number = LevelDataManager.getInstance().money;
			switch(this.currentSkill) {
				case GameConstantData.SKILL_NAME_TIP:
					if(currentSilver < GameConstantData.SILVER_TIP_SKILL_COST) {
						this.alertText.text = "您的銀兩不足，請繼續修煉！\ntips：可通過重玩以前的關卡獲取銀兩。";
						this.alertGroup.visible = true;
					} else {
						this.alertGroup.visible = false;
						var answerArr: string[] = CommonUtil.getCharArrayFromString(this.levelDataItem.answer);
						for(var i = 0; i < this.answerGroup.numElements; i++) {
							this.tempAnswer = <game.Answer>this.answerGroup.getElementAt(i);
							if(answerArr[i] != this.tempAnswer.getAnswerValue()) {
								for(var j = 0; j < this.wordGroup.numElements; j++) {
									this.tempWord = <game.Word>this.wordGroup.getElementAt(j);
									if(this.tempWord.getWordValue() == answerArr[i]) {
										egret.Tween.get(this.tempAnswer, {loop: true}).to({scaleX: 1.2, scaleY: 1.2}, 500, egret.Ease.backIn).to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backIn);
										egret.Tween.get(this.tempWord, {loop: true}).to({scaleX: 1.2, scaleY: 1.2}, 500, egret.Ease.backIn).to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backIn);
										break;
									}
								}
								break;
							}
						}
						//扣除银两
						LevelDataManager.getInstance().money -= GameConstantData.SILVER_TIP_SKILL_COST;
						this.moneyText.text = LevelDataManager.getInstance().money.toString();
					}
					break;
				case GameConstantData.SKILL_NAME_CLEAR:
					if(currentSilver < GameConstantData.SILVER_CLEAR_SKILL_COST) {
						this.alertText.text = "您的銀兩不足，請繼續修煉！\ntips：可通過重玩以前的關卡獲取銀兩。";
						this.alertGroup.visible = true;
					} else {
						var allClear: number = 0;
						for(var k = 0; k < this.wordGroup.numElements; k++) {
							if(this.wordGroup.getElementAt(k).visible) {
								allClear += 1;
							}
						}
						if(allClear == this.answerGroup.numElements) {
							this.alertText.text = "您是土豪，干擾項已全部消除，無需使用該技能！";
						} else {
							this.alertGroup.visible = false;
							var answerArr: string[] = CommonUtil.getCharArrayFromString(this.levelDataItem.answer);
							while(true) {
								var index: number = CommonUtil.getRandomInteger(0, this.wordGroup.numElements, false);
								if(this.wordGroup.getElementAt(index).visible) {
									var isAnswer: boolean = false;
									for(var i = 0; i < answerArr.length; i++) {
										if((<game.Word>this.wordGroup.getElementAt(index)).getWordValue() == answerArr[i]) {
											isAnswer = true;
											break;
										}
									}
									if(!isAnswer) {
										this.wordGroup.getElementAt(index).visible = false;
										break;
									}
								}
							}
							//扣除银两
							LevelDataManager.getInstance().money -= GameConstantData.SILVER_CLEAR_SKILL_COST;
							this.moneyText.text = LevelDataManager.getInstance().money.toString();
						}
					}
					break;
				case GameConstantData.SKILL_NAME_CHANGE:
					if(currentSilver < GameConstantData.SILVER_CHANGE_SKILL_COST) {
						this.alertText.text = "您的銀兩不足，請繼續修煉！\ntips：可通過重玩以前的關卡獲取銀兩。";
						this.alertGroup.visible = true;
					} else {
						this.alertGroup.visible = false;
						//初始化数据
						var selectedLevel: number = (<ViewManager>this.parent).selectLevel;
						this.levelDataItem = LevelDataManager.getInstance().getRandomLevelItem(selectedLevel);
						this.questionImg.source = "resource/assets/" + this.levelDataItem.img;
						this.meanText.text = this.levelDataItem.tip;
						this.fromText.text = this.levelDataItem.content;
						//初始化答案区汉字为空
						for(var i = 0; i < this.answerGroup.numElements; i++) {
							(<game.Answer>this.answerGroup.getElementAt(i)).setAnswerValue("");
							(<game.Answer>this.answerGroup.getElementAt(i)).selWord = null;
						}
						//初始化选择区汉字
						var otherLevelDataItem: game.LevelDataItem = LevelDataManager.getInstance().getRandomLevelItem(selectedLevel);
						var wordArr: string[] = CommonUtil.shuffleArray(CommonUtil.getCharArrayFromString(this.levelDataItem.answer + this.levelDataItem.word + otherLevelDataItem.answer + otherLevelDataItem.word));
						for(var i = 0; i < this.wordGroup.numElements; i++) {
							(<game.Word>this.wordGroup.getElementAt(i)).setWordValue(wordArr[i]);
							(<game.Word>this.wordGroup.getElementAt(i)).visible = true;
						}
						//扣除银两
						LevelDataManager.getInstance().money -= GameConstantData.SILVER_CHANGE_SKILL_COST;
						this.moneyText.text = LevelDataManager.getInstance().money.toString();
					}
					break;
				default:
					this.alertGroup.visible = false;
					break;
			}
			this.currentSkill = null;
		}

		private resetTween() {
			if(this.tempAnswer && this.tempWord) {
				this.tempAnswer.scaleX = 1;
				this.tempAnswer.scaleY = 1;
				this.tempWord.scaleX = 1;
				this.tempWord.scaleY = 1;
				egret.Tween.removeAllTweens();
				this.tempAnswer = null;
				this.tempWord = null;
			}
		}
	}
}