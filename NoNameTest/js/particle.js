var PARTICLE_GREEN = 0;
var PARTICLE_BLUE = 1;
var PARTICLE_RED = 2;
var PARTICLE_STEAM = 3;
var PARTICLE_TIME = 4;

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
    particles[0] = new cellInformation();
    particles[0].id = 0
    particles[0].name = "Green Particle";
    particles[0].imageName = "particle_0";

    particles[1] = new cellInformation();
    particles[1].id = 1;
    particles[1].name = "Blue Particle";
    particles[1].imageName = "particle_1";

    particles[2] = new cellInformation();
    particles[2].id = 2;
    particles[2].name = "Red Particle";
    particles[2].imageName = "particle_2";

    particles[3] = new cellInformation();
    particles[3].id = 3;
    particles[3].name = "Steam Particle";
    particles[3].imageName = "particle_3";

    particles[4] = new cellInformation();
    particles[4].id = 4;
    particles[4].name = "Time Particle";
    particles[4].imageName = "particle_4";
}