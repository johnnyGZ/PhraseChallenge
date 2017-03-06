class CommonUtil {
	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 获取指定范围的随机整数，可以选择是否排除自己
     */
    public static getRandomInteger(min: number, max: number, except: boolean, exceptNumber?: number): number {
        var temp: number = max - min;
        var result: number = 0;
        if(except) {
            while(true) {
                result = Math.floor(Math.random() * temp) + min;
                if(result != exceptNumber) {
                    break;
                }
            }
        } else {
            result = Math.floor(Math.random() * temp) + min;
        }
        return result;
    }

    /**
     * 将字符串拆分为字符数组
     */
    public static getCharArrayFromString(str: string): string[] {
        var charArr: string[] = new Array<string>();
        if(str && str.length > 0) {
            for(var i = 0; i < str.length; i++) {
                charArr.push(str.charAt(i));
            }
        }
        return charArr;
    }

    /**
     * 打乱一个数组的内容
     */
    public static shuffleArray(arr: Array<any>): Array<any> {
        if(arr && arr.length > 0) {
            for(var i = arr.length - 1; i >= 0; i--) {
                var index = CommonUtil.getRandomInteger(0, arr.length, false);
                var tmp: any = arr[index];
                arr[index] = arr[i];
                arr[i] = tmp;
            }
        }
        return arr;
    }
}