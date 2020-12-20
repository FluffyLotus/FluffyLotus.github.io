var PARTICLE_GREEN = 0;
var PARTICLE_BLUE = 1;
var PARTICLE_RED = 2;
var PARTICLE_STEAM = 3;

function particleInformation() {
    this.id = 0;
    this.name = "";
}

function loadParticles() {
    particles[0] = new cellInformation();
    particles[0].id = 0;
    particles[0].name = "Green Particle";

    particles[1] = new cellInformation();
    particles[1].id = 1;
    particles[1].name = "Blue Particle";

    particles[2] = new cellInformation();
    particles[2].id = 2;
    particles[2].name = "Red Particle";

    particles[3] = new cellInformation();
    particles[3].id = 3;
    particles[3].name = "Steam Particle";
}