import Phaser from "phaser";
import SpaceScene from "./scenes/SpaceScene";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: true,
    },
  },
  scene: [SpaceScene],
};

const game = new Phaser.Game(config);
