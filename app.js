new Vue({
    el:'#app',
    
    data:{
        running: false,
        playerLife: 100,
        monsterLife: 100,
        contEspecial: 0,
        waitEspecial: 3,
        logs: []
    },

    computed:{
        hasResult(){
            return this.playerLife == 0 | this.monsterLife == 0
        }
    },

    methods:{
        startGame(){
            this.running = true,
            this.playerLife = 100,
            this.monsterLife = 100,
            this.logs = []
        },
        attack(especial){

            if(especial){
                this.hurt("monsterLife", 1, 2,true, 'Monstro', 'Jogador', 'monster')
                this.monsterLife > 0 ? this.hurt("playerLife", 20, 30,true, 'Jogador', 'Monstro', 'player') : null
            } 

            this.hurt("monsterLife", 2, 4, false, 'Monstro', 'Jogador', 'monster')
            this.monsterLife > 0 ? this.hurt("playerLife", 20, 30, false, 'Jogador', 'Monstro', 'player') : null
        },
        hurt(who, min, max, especial, source, target, cls){

            let plus = especial ? 5 : 0

            if(especial && this.contEspecial == 0 && who == 'playerLife') {
                plus = 5
                this.contEspecial = this.waitEspecial
            }
            else if(!especial && this.contEspecial > 0 && who == 'playerLife'){
                plus = 0
                this.contEspecial -= 1
            }

            const hurt = this.getRandom(min + plus, max + plus)
            this[who] = Math.max(this.playerLife - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
        },

        healAndHurt(){
            this.heal(10, 15),
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },

        heal(min, max){
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou vida de ${heal}`, 'player')
        },

        getRandom(min, max){
            const value = Math.random() * (max-min) + min
            return Math.round(value)
        },

        registerLog(text, cls){
            this.logs.unshift({text, cls})
            if(this.logs.length > 10){
                this.logs.pop()
            }
        }
    },

    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})