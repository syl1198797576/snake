// 这是入口文件
import './style/index.less'
import Food from './modules/food'
import GameControl from './modules/gameControl'

// 随机放置食物
let food = new Food()
food.change()

// 运行
new GameControl()