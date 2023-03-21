import './CastleMoonlight.css'
import groundImage from '../art/grassMid.png'
import platformImage from  '../art/castleMid.png'
import backgroundImage from '../art/background.png'
import sprite from '../art/sprite.png'
import backwardSprite from '../art/backwardSprite.png'
import nunSprite from '../art/nunSprite.png'
import gemImage from '../art/gem.png'
import castleImage from '../art/castle.png'

import { useEffect } from 'react'

function CastleMoonlight () {
    useEffect(() => {
        game()
    }, [])
    
    const game = () => {
        // game window
        const canvas = document.querySelector('.background')
        canvas.width = 1024
        canvas.height = 800
        const c = canvas.getContext('2d')

        const gravity = 2.5

        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }

        // player creation
        class Player {
            constructor() {
                this.position = {
                    x: 100,
                    y: 100
                }
                this.velocity = {
                    x: 0,
                    y: 0
                } 
                this.width = 60
                this.height = 150

                const forward = image(sprite)
                const backward = image(backwardSprite)

                this.image = backward


                this.sprites = {
                    stand: {
                        right: forward,
                        left: backward
                    },
                    run: {
                        right: forward,
                        left: backward
                    }
                }

                this.currentSprite = this.sprites.stand.right
                this.frame = 0
                this.motion = 0
            }
    
    
            draw() {
                c.drawImage(
                    this.currentSprite, 
                    46 * this.frame,
                    50 * this.motion,
                    46,
                    50,
                    this.position.x, this.position.y, this.width, this.height
                    )

            }

            update() {

                if(currentKey === 'right') {
                    this.frame++
                    if(this.frame > 7) this.frame = 0
                } else if(currentKey === 'left') {
                    this.frame--
                    if(this.frame < 0) this.frame = 7
                }

                this.draw();
                this.position.x += this.velocity.x;      
                this.position.y += this.velocity.y;      
                
                if (this.position.y + this.height + this.velocity.y <= canvas.height) {
                    this.velocity.y += gravity
                }
            }
        }

        let enemyDirection = 'left'
        let enemyStartPosition = []

        class Enemy {
            constructor({x, id}) {
                enemyStartPosition[id] = x

                this.position = {
                    x: x,
                    y: 650
                }
            
                this.width = 50
                this.height = 80

                this.image = image(nunSprite)

                this.sprites = {
                    walk: {
                        right: image(nunSprite),
                        left: image(nunSprite)
                    }
                }

                this.currentSprite = this.sprites.walk.right
                this.frame = 0
                this.motion = 2
            }
    
    
            draw() {
                c.drawImage(
                    this.currentSprite, 
                    48 * this.frame,
                    64 * this.motion,
                    48,
                    64,
                    this.position.x, this.position.y, this.width, this.height
                    )
            }

            update() {
                this.draw();

                if(enemyDirection === 'right') {
                    this.position.x += 2 
                    this.currentSprite = this.sprites.walk.right
                    this.motion = 2

                    setInterval(
                        this.frame++,
                        1000
                    )

                    if(this.frame > 2) this.frame = 0
                } else if (enemyDirection === 'left') {
                    this.position.x -= 2     
                    this.currentSprite = this.sprites.walk.left
                    this.motion = 1

                    setInterval(

                        this.frame++,
                        1000
                    )

                    if(this.frame > 2) this.frame = 0
                } 
                
            }

        }

        class Gem {
            constructor({x, y}) {
                this.position = {
                    x,
                    y
                }

                this.velocity = {
                    x: 0,
                    y: 0
                }

                this.image = image(gemImage)

                this.width = 50
                this.height  = 50
            }  

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        class CollectedGem {
            constructor({x}) {
                this.position = {
                    x: x,
                    y: 0
                }

                this.image = image(gemImage)

                this.width = 50
                this.height  = 50
            }  

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        class Platform {
            constructor({x, y, image}) {
                this.position = {
                    x,
                    y
                }

                this.image = image

                this.width = image.width
                this.height  = image.height
            }  

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        class Castle {
            constructor({x, y}) {
                this.position = {
                    x,
                    y
                }

                this.image = image(castleImage)

                this.width = 600
                this.height  = 800
            }  

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y)
            }
        }

        class BackGround {
            constructor({x, y, image}) {
                this.position = {
                    x,
                    y
                }

                this.image = image

                this.width = image.width
                this.height  = image.height
            }  

            draw() {
                c.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height)
            }
        }



        const image = (imageSrc) => {
            const image = new Image ()
            image.src = imageSrc
            return image
        }

        let player
        let castleFinish
        let enemies
        let platforms = []
        let backGrounds = []
        let gems
        let currentKey
        let collectedGems = [false, false, false, false, false]
        let totalGems = 0
        let gemScoreboard = []

        // game state at start
        const start = () => {
            player = new Player()

            castleFinish = new Castle({x: 6250, y: 160})
            
            enemies = []

            enemies = [
                new Enemy({x: 2000, id: 0}),
                new Enemy({x: 4250, id: 1}),
                new Enemy({x: 5400, id: 2}),
                new Enemy({x: 5700, id: 3})
            ]

            gems = []

            gems = [
                new Gem({x: 920, y: 180}),
                new Gem({x: 2100, y: 180}),
                new Gem({x: 3370, y: 80}),
                new Gem({x: 4520, y: 30}),
                new Gem({x: 5570, y: 180}),
            ]

            gemScoreboard = []

            for (let i = 0; i < 5; i++) {
                gemScoreboard.push(new CollectedGem({x: [i] * (image(gemImage).width - 40)}))
            }

            platforms = []

             // castle float platforms
                // 2 long
            for (let i = 0; i < 2; i++) {
                platforms.push(
                    new Platform({x: 700 + ([i] * image(platformImage).width), y: 500, image: image(platformImage)}),
                    new Platform({x: 900 + ([i] * image(platformImage).width), y: 300, image: image(platformImage)}),
                    new Platform({x: 1600 + ([i] * image(platformImage).width), y: 400, image: image(platformImage)}),
                    new Platform({x: 2600 + ([i] * image(platformImage).width), y: 600, image: image(platformImage)}),
                    new Platform({x: 3350 + ([i] * image(platformImage).width), y: 200, image: image(platformImage)}),
                    new Platform({x: 4500 + ([i] * image(platformImage).width), y: 150, image: image(platformImage)}),
                    new Platform({x: 5000 + ([i] * image(platformImage).width), y: 300, image: image(platformImage)}),
                    new Platform({x: 5550 + ([i] * image(platformImage).width), y: 300, image: image(platformImage)}),

                )
            }
                // 1 long
            platforms.push(
                new Platform({x: 1900, y: 200, image: image(platformImage)}),
                new Platform({x: 2900, y: 400, image: image(platformImage)}),
                new Platform({x: 3100, y: 300, image: image(platformImage)}),
                new Platform({x: 4300, y: 300, image: image(platformImage)}),
                new Platform({x: 4400, y: 500, image: image(platformImage)}),
                new Platform({x: 4800, y: 500, image: image(platformImage)}),
                new Platform({x: 5300, y: 300, image: image(platformImage)}),
            )

            // grass ground platforms
            for (let i = 0; i < 100; i++) {
                if (i !== 10 && i !== 11 
                    && i !== 26 && i !== 27 
                    && i !== 36 && i !== 37 && i !== 38 && i !== 39 
                    && i !== 52 && i !== 53 
                    && i !== 58 && i !== 59
                    && i !== 68 && i !== 69 && i !== 70 && i !== 71 && i !== 72 && i !== 73 && i !== 74 && i !== 75
                    ) {
                    platforms.push(new Platform({x: [i] * image(groundImage).width, y: 730, image: image(groundImage)}))
                }
            }

            backGrounds = []

            // background images
            backGrounds = [ 
                new BackGround({x : 0 , y: 0, image: image(backgroundImage)}),
                new BackGround({x : canvas.width , y: 0, image: image(backgroundImage)}),
                new BackGround({x : canvas.width * 2 , y: 0, image: image(backgroundImage)})
            ]

        }

        // animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            c.fillStyle = 'white'
            c.fillRect(0, 0, canvas.width, canvas.height)

            backGrounds.forEach(backGround => {
                backGround.draw()
            })

            castleFinish.draw()
            
            platforms.forEach(platform => {
                platform.draw()
            })

            enemies.forEach(enemy => {
                enemy.update()
            })


            gems.forEach((gem, i) => {
                if(collectedGems[i] === false) {
                    gems[i].draw()
                } 
            })

            gemScoreboard.forEach((gem, i) => {
                if(collectedGems[i] === true) {
                    gemScoreboard[i].draw()
                } 
            })

            player.update()

            totalGems = collectedGems.filter(gem => gem === true).length

            // right left movement
            if (keys.right.pressed && player.position.x < 500) {
                player.velocity.x = 5
            } else if (keys.left.pressed && player.position.x > 100) {
                player.velocity.x = -5
            } else {
                player.velocity.x = 0
            
                // platform scroll if player velo is 0
                if (keys.right.pressed) {
                    platforms.forEach(platform => {
                        platform.position.x -= 5
                    })
                    backGrounds.forEach(backGround => {
                        backGround.position.x -= 1
                    })
                    enemies.forEach((enemy, i) => {
                        enemyStartPosition[i] -= 5
                        enemy.position.x -= 5
                    })
                    gems.forEach((gem, i) => {
                        gem.position.x -= 5
                    })
                    castleFinish.position.x -= 5
                } 
            }

            enemies.forEach((enemy, i) => {
                if (enemy.position.x > enemyStartPosition[i] + 400) {
                    enemyDirection = 'left'
                } else if (enemy.position.x < enemyStartPosition[i]){
                    enemyDirection = 'right'
                }
            })

            // platform / player collision
            platforms.forEach(platform => {
                if(player.position.y + player.height <= platform.position.y 
                    && player.position.y + player.height + player.velocity.y >= platform.position.y 
                    && player.position.x + player.width - 20 >= platform.position.x
                    && player.position.x <= platform.position.x + platform.width){
                        player.velocity.y = 0
                }
            })


            if (player.position.x === castleFinish.position.x + (castleFinish.width/2)) {
                console.log('winner! gems:', totalGems)
            }

            gems.forEach((gem, i) => {
                if((player.position.x + player.width - 40 >= gem.position.x && player.position.x <= gem.position.x + gem.width)
                && (player.position.y <= gem.position.y + gem.width && player.position.y >= gem.position.y - gem.height)) {
                    collectedGems[i] = true
                }
            })

            enemies.forEach(enemy => {
                if ( player.position.y > canvas.height 
                    || (player.position.x + player.width >= enemy.position.x && player.position.y >= enemy.position.y - enemy.height)
                    && (player.position.x <= enemy.position.x + enemy.width && player.position.y >= enemy.position.y - enemy.height)
                    
                    ) {
                    console.log('you lose!')
                    start()
                }
            })
        }
 

        start()
        animate()

        // event listeners for keys
        document.addEventListener('keydown', ({ key }) => {
            switch (key) {
                case 'ArrowUp':
                    if (player.velocity.y === 0) {
                        player.velocity.y = -40
                    }
                    break;
                case 'ArrowLeft':
                    keys.left.pressed = true
                    currentKey = 'left'
                    player.currentSprite = player.sprites.run.left
                    player.frame = 7
                    player.motion = 3
                    break;
                case 'ArrowRight':
                    keys.right.pressed = true
                    currentKey = 'right'
                    player.currentSprite = player.sprites.run.right
                    player.frame = 0
                    player.motion = 3
                    break;
            }
        })

        document.addEventListener('keyup', ({ key }) => {
            switch (key) {
                case 'ArrowUp':
                    player.velocity.y -= 0
                    break;
                case 'ArrowLeft':
                    keys.left.pressed = false
                    currentKey = ''
                    player.currentSprite = player.sprites.stand.left
                    player.frame = 7
                    player.motion = 0
                    break;
                case 'ArrowRight':
                    keys.right.pressed = false
                    currentKey = ''
                    player.currentSprite = player.sprites.stand.right
                    player.frame = 0
                    player.motion = 0
                    break;
            }
        })
    }

    return(
        <>
            <h2>Galactic Goblin</h2>
            <canvas className='background'>
                
            </canvas>
        </>
    )
}

export default CastleMoonlight