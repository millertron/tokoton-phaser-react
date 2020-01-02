import React from 'react'
import { PhaserGameContainer } from './PhaserGameContainer'
import { Config } from '../phaser/config'
import Phaser from 'phaser'

export const Main = () => {
    
    React.useEffect(() => {
        const game = new Phaser.Game(Config)
    })

    return (
        <div>
            <PhaserGameContainer />
        </div>
    )
}
