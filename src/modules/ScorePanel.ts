class ScorePanel {
    score: number
    level: number
    // 在constructor初始化
    scoreEle: HTMLElement
    levelEle: HTMLElement
    private LEVELMAX: number // 升级上限
    private UPSCORE: number  // 每几分升一级
    constructor(LEVELMAX = 10, UPSCORE = 5) {
        this.scoreEle = document.getElementById('score').getElementsByTagName('span')[0]!
        this.levelEle = document.getElementById('level').getElementsByTagName('span')[0]!
        this.LEVELMAX = LEVELMAX
        this.UPSCORE = UPSCORE
    }
    // 加分
    addScore(add: number) {
        this.score += add
        this.scoreEle.innerText = this.score + ''
        if (this.score % this.UPSCORE === 0) {
            this.levelUp()
        }
    }

    // 升级方法
    private levelUp() {
        // 设置等级上限
        if (this.level < this.LEVELMAX) {
            this.level++
            this.levelEle.innerText = this.level + ''
        }
    }
}

export default ScorePanel