class ScorePanel {
    // 初始化等级和分数
    score = 0;
    level = 1;

    // 定义最大等级
    maxLevel: number;
    // 定义最大分数
    maxScore: number;

    // 定义两个变量接收html中的元素
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel:number = 10, maxScore:number = 10) {
        // 将html元素赋给变量
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        // 将传入的参数赋值给最大等级 不传就为默认值10
        this.maxLevel = maxLevel
        this.maxScore = maxScore
    }

    // 定义一个加分的方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        // 当分数达到10分时升级
        if(this.score % this.maxScore === 0) {
            this.upLevel()
        }
    }

    // 定义一个提升等级的方法
    upLevel() {
        // 等级限制 不超过最大等级
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel;