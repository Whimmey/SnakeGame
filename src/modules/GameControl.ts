import Snake from "./Snake"
import ScorePanel from "./ScorePanel"
import Food from "./Food"

class GameControl {
    // 三个属性的type就是引入的类
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    // 存储蛇的移动方向
    direction: string = ''
    // 移动步长
    STEP: number = 10
    // 记录游戏是否结束
    islive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()

        this.init()
    }
    // 游戏初始化，调用后游戏开始
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this)) // 为了把函数内的this指向对象实例
        this.scorePanel.level = 1
        this.scorePanel.score = 0
        // this.snake.Pos = [0, 0]
        this.creep()
    }
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key // 这里的this会指向监听触发对象
        // this.creep()
    }
    // 蛇的爬行
    /* 
    *   ArrowUp    ↑ top--
    *   ArrowDown  ↓ top++
    *   ArrowLeft  ← left--
    *   ArrowRight → left++
    */
    creep() {
        let [x, y] = this.snake.Pos
        switch (this.direction) {
            case "ArrowLeft":
                x -= this.STEP
                break;
            case "ArrowRight":
                x += this.STEP
                break;
            case "ArrowUp":
                y -= this.STEP;
                break;
            case "ArrowDown":
                y += this.STEP
                break;
            // case "p":
            //     this.islive = !this.islive
            //     console.log(this.islive);
            //     break;
            default: break
        }
        // 修改snake的position
        try {
            this.snake.Pos = [x, y]
        } catch (e) {
            this.islive = false
            console.log('GAME OVER');
        }
        // 吃到食物
        this.checkEat(x, y)
        // 配合定时器和islive确定蛇是否移动
        this.islive && setTimeout(this.creep.bind(this), 200 - (this.scorePanel.level - 1) * 10)
    }

    // 蛇吃食物 蛇的坐标和Food坐标判断
    checkEat(x: number, y: number): void {
        // let [foodX, foodY] = this.food.Pos
        if (x === this.food.Pos[0] && y === this.food.Pos[1]) {
            this.scorePanel.addScore(this.food.foodScore)
            this.snake.grow()
            this.food.change()
        }
    }

}

export default GameControl