
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/config/GameConstantData.js",
	"bin-debug/config/GamePageConstant.js",
	"bin-debug/content/GameLevel.js",
	"bin-debug/content/GameLoading.js",
	"bin-debug/content/GamePlaying.js",
	"bin-debug/content/GameStart.js",
	"bin-debug/data/Answer.js",
	"bin-debug/data/LevelDataItem.js",
	"bin-debug/data/LevelInfo.js",
	"bin-debug/data/Word.js",
	"bin-debug/events/GameEvents.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/manager/LevelDataManager.js",
	"bin-debug/manager/SoundManager.js",
	"bin-debug/manager/ViewManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/CommonUtil.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 50,
		scaleMode: "showAll",
		contentWidth: 720,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};