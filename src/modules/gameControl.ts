// 将组成部分引入控制器类
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake'

class GameControl {
    // 食物
    food: Food
    // 记分牌
    scorePanel: ScorePanel
    // 蛇
    snake: Snake
    // 创建一个存储方向的容器
    direction: string = ''
    // 判断蛇是否存活
    isLive = true

    constructor() {
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.snake = new Snake()

        // 执行初始化
        this.init()
        this.run()
    }

    // 初始化
    init() {
        // 绑定键盘按下的事件
        // 使用bind改变this指向 call、apply会立即执行函数
        document.addEventListener('keydown', this.keydownHandler.bind(this))
    }

    // 创建一个键盘按下的方法
    /**
     * 
     * @param event 打印出ArrowDown等
     */
    keydownHandler(event: KeyboardEvent) {
        // 在按下按键时候让按键赋值给容器 此处this指向document
        // 让按键仅为上下左右才触发
        this.direction = event.key
    }

    // 创建一个蛇移动的方法
    run() {
        let X = this.snake.X
        let Y = this.snake.Y

        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                // 上
                Y -= 10;
                break;

            case 'ArrowDown':
            case 'Down':
                // 下
                Y += 10;
                break;

            case 'ArrowLeft':
            case 'Left':
                // 左
                X -= 10;
                break;

            case 'ArrowRight':
            case 'Right':
                // 右
                X += 10;
                break;
        }
        
        // 调用吃食物的方法
        this.checkFood(X,Y);

        // 在判断完以后，处理蛇的X和Y
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error: any) {
            // 弹出提示并使蛇停止
            alert(error.message + 'GAME OVER!')
            // 停止
            this.isLive = false
        }

        // 递归调用run方法 让蛇能一直移动
        this.isLive && setTimeout( this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 吃食物的方法
    checkFood(X: number, Y: number) {
        if(X === this.food.X && Y === this.food.Y) {
            // 在吃到食物后改变食物位置
            this.food.change()
            // 加分
            this.scorePanel.addScore()
            // 增加一节蛇身体
            this.snake.addBodies()
        }
    }
}

export default GameControl