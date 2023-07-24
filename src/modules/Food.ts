class Food {
    // 定义一个属性表示食物对应的元素
    element: HTMLElement
    foodScore: number = 1
    constructor() {
        // 获取页面中的food
        this.element = document.getElementById('food')! // !表示id为food的元素必定存在
    }
    // 获取食物位置
    get Pos() {
        return [this.element.offsetLeft, this.element.offsetTop]
    }

    change() {
        // 注意！ 食物的坐标必须是10的倍数 因为蛇的移动步长为10
        this.element.style.left = `${Math.round(Math.random() * 29) * 10}px`
        this.element.style.top = `${Math.round(Math.random() * 29) * 10}px`
        this.foodScore = Math.round(Math.random() * 3)
    }
}

export default Food