class Snake {
    head: HTMLElement // 蛇头
    bodies: HTMLCollection // HTMLCollection
    /* HTML DOM 中的 HTMLCollection 是即时更新的（live）；当其所包含的文档结构发生改变时，它会自动更新 */
    element: HTMLElement // 蛇容器

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement;
        // this.bodies = document.querySelectorAll('#snake>div') 获取完了就固定了
        this.bodies = this.element.getElementsByTagName('div')!
    }

    get Pos() {
        return [this.head.offsetLeft, this.head.offsetTop]
    }

    set Pos([x, y]) {
        let [posX, posY] = this.Pos
        if (posX === x) { // 竖直方向移动
            if (y < 0 || y > 290) {
                console.log('撞墙了！');
                throw new Error('crash!')
            } else {
                if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetTop === y) { // 发生了掉头
                    this.creepBody() // 身体跟进爬行
                    this.head.style.top = 2 * this.head.offsetTop - y + 'px' // 按照修改值方向反方向移动
                } else {
                    this.creepBody() // 身体跟进爬行
                    this.head.style.top = y + 'px'
                }
            }
        }
        if (posY === y) { // 水平方向移动
            if (x < 0 || x > 290) {
                console.log('撞墙了！');
                throw new Error('crash!')
            } else {
                if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetLeft === x) { // 发生了掉头
                    this.creepBody() // 身体跟进爬行
                    this.head.style.left = 2 * this.head.offsetLeft - x + 'px' // 按照修改值方向反方向移动
                } else {
                    this.creepBody() // 身体跟进爬行
                    this.head.style.left = x + 'px'
                }
            }
        }
        this.crashBody()
    }
    // 蛇长度++
    grow() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }
    // 蛇身移动  ❗ 改动一定是先改动蛇尾，从蛇尾往前改
    creepBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前一个身体的位置
            let bodyX = (<HTMLElement>this.bodies[i - 1]).offsetLeft;
            let bodyY = (<HTMLElement>this.bodies[i - 1]).offsetTop;
            // 设置到当前身体
            (<HTMLElement>this.bodies[i]).style.left = bodyX + 'px';
            (<HTMLElement>this.bodies[i]).style.top = bodyY + 'px';
        }
    }
    // 蛇头和蛇身撞击检测
    crashBody() {
        let [headX, headY] = this.Pos
        for (let i = 3; i < this.bodies.length; i++) {
            let bd = <HTMLElement>this.bodies[i]
            if (headX === bd.offsetLeft && headY === bd.offsetTop) { // 撞击产生
                throw new Error('Crash on body')
            }
        }
    }
}

export default Snake