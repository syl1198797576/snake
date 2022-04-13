// 定义一个食物类Food
class Food {

    // 定义一个属性为食物所对应的元素
    element: HTMLElement

    constructor() {
        // 获取页面中的食物元素并赋值给element
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 定义一个改变食物位置的方法
    change() {

        // 设置X和Y取值为 0-290 的整10部分
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;

        // 生成随机位置，最小是0，最大是290
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

export default Food