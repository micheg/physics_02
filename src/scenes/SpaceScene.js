export default class SpaceScene extends Phaser.Scene {
  constructor() {
    super("SpaceScene");
  }

  preload() {
    // Carica le risorse
    this.load.image("space", "assets/images/space.png");
    this.load.image("ship", "assets/images/ship.png");
    this.load.image("asteroid", "assets/images/asteroid.png");
  }

  create() {
    // Sfondo
    this.add.tileSprite(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      "space"
    );

    // Imposta gravità zero
    this.physics.world.gravity.y = 0;

    // Crea la nave
    this.ship = this.physics.add.sprite(400, 300, "ship");
    this.ship.setDamping(true);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(200);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crea il gruppo degli asteroidi
    this.asteroids = this.physics.add.group();

    // Contatore degli asteroidi creati
    this.asteroidCount = 0;

    // Numero massimo di asteroidi da creare
    this.maxAsteroids = 11;

    // Timer per creare gli asteroidi ogni secondo
    this.time.addEvent({
      delay: 1000, // Ritardo di 1 secondo
      callback: this.spawnAsteroid,
      callbackScope: this,
      repeat: this.maxAsteroids - 1, // Ripeti fino a raggiungere il numero desiderato
    });

    // Collisioni
    this.physics.add.collider(
      this.ship,
      this.asteroids,
      this.hitAsteroid,
      null,
      this
    );
    this.physics.add.collider(this.asteroids, this.asteroids);
  }

  update() {
    // Controlli della nave
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation - Math.PI / 2,
        200,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }

    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(300);
    } else {
      this.ship.setAngularVelocity(0);
    }
  }

  spawnAsteroid() {
    // Posizione casuale per l'asteroide, lontano dalla nave
    let x, y;
    do {
      x = Phaser.Math.Between(0, this.scale.width);
      y = Phaser.Math.Between(0, this.scale.height);
    } while (
      Phaser.Math.Distance.Between(x, y, this.ship.x, this.ship.y) < 100
    );

    // Crea un nuovo asteroide utilizzando il metodo create del gruppo
    const asteroid = this.asteroids.create(x, y, "asteroid");

    // Imposta la velocità casuale dell'asteroide
    asteroid.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    );

    // Imposta le altre proprietà dell'asteroide
    asteroid.setBounce(1);
    asteroid.setCollideWorldBounds(true);
  }
  hitAsteroid(ship, asteroid) {
    // Gestisci la collisione
    this.physics.pause();
    ship.setTint(0xff0000);
    // Logica per il riavvio o fine del gioco
  }
}
