class Snake {
    // 蛇容器
    element: HTMLElement;
    // 蛇头
    head: HTMLElement;
    // 蛇身体
    bodies: HTMLCollection;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    // 获取蛇头的X轴坐标
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇头的Y轴坐标
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头的坐标
    set X(value: number) {

        // 当新值旧值相同就不再更改
        if(this.X === value) {
            return
        }

        // X的合法范围是0-290
        if(value < 0 || value > 290) {
            throw new Error('蛇撞墙了')
        }

        // 蛇向左移动时不能向右调头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if(value > this.X) {
                // 如果新的值大于现在的 代表向右移动 因此要使其向左移动
                value = this.X - 10
            }else {
                value = this.X + 10
            }
        }

        // 调用身体移动方法
        this.moveBody()

        this.head.style.left = value + 'px'

        this.checkHeadBody()
    }

    // 设置蛇头的坐标
    set Y(value: number) {

        // 当新值旧值相同就不再更改
        if(this.Y === value) {
            return
        }
        
        // Y的合法范围是0-290
        if(value < 0 || value > 290) {
            throw new Error('蛇撞墙了')
        }

        // 蛇向上移动时不能向下调头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if(value > this.Y) {
                // 如果新的值大于现在的 代表向下移动 因此要使其向上移动
                value = this.Y - 10
            }else {
                value = this.Y + 10
            }
        }

        // 调用身体移动方法
        this.moveBody()

        this.head.style.top = value + 'px'

        // 检查有无撞到自己
        this.checkHeadBody()
    }

    // 设置增加蛇身体的方法
    addBodies() {
        // 即向snake里面添加div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 设置蛇身体移动的方法
    /**
     * 要点：将后边身体设置为前边身体位置
     * 例如：第四节 = 第三节...
     */
    moveBody() {
        // 获取所有身体
        for(let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前一个身体位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将前一个身体位置赋值给后一个
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 设置蛇头和蛇身检测的方法
    checkHeadBody() {
        // 获取所有身体，看是否和蛇头重叠
        for(let i=1; i < this.bodies.length; i++) {
            if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                throw new Error('蛇撞到自己了~~')
            }
        }
    }
}

export default Snake