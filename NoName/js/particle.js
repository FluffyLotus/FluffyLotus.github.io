var PARTICLE_GREEN = 0;
var PARTICLE_BLUE = 1;
var PARTICLE_RED = 2;
var PARTICLE_STEAM = 3;
var PARTICLE_TIME = 4;
var PARTICLE_WIND = 5;
var PARTICLE_BLACK = 6;

function particleInformation() {
    this.id = 0;
    this.name = "";
    this.imageName = "";
}

function getParticleFromId(id) {
    for (var t = 0; t < particles.length; t++) {
        if (particles[t].id == id)
            return particles[t];
    }

    return null;
}

function loadParticles() {
    var newItem;

    newItem = new cellInformation();
    newItem.id = 0
    newItem.name = "Green Particle";
    newItem.imageName = "particle_0";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 1;
    newItem.name = "Blue Particle";
    newItem.imageName = "particle_1";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 2;
    newItem.name = "Red Particle";
    newItem.imageName = "particle_2";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 3;
    newItem.name = "Steam Particle";
    newItem.imageName = "particle_3";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 4;
    newItem.name = "Time Particle";
    newItem.imageName = "particle_4";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 5;
    newItem.name = "Wind";
    newItem.imageName = "particle_5";
    particles.push(newItem);

    newItem = new cellInformation();
    newItem.id = 6;
    newItem.name = "Black Particle";
    newItem.imageName = "particle_6";
    particles.push(newItem);
}