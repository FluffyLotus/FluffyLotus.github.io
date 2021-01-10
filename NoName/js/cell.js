var CELL_GRASS = 0;
var CELL_TREE = 1;
var CELL_MOUNTAIN = 2;
var CELL_WATER = 3;
var CELL_LAVA = 4;
var CELL_HOME = 5;
var CELL_DIRTROAD = 6;

var CELL_TYPE_NONE = 0;
var CELL_TYPE_GRASS = 1;
var CELL_TYPE_TREE = 2;
var CELL_TYPE_MOUNTAIN = 3;
var CELL_TYPE_WATER = 4;
var CELL_TYPE_LAVA = 5;

function cellInformation() {
    this.id = 0;
    this.name = "";
    this.type = CELL_TYPE_NONE;
    this.clickReward = [];
    this.innerParticleId = -1;
}

cellInformation.prototype.getClickRewardString = function () {
    return getResourceLinkString(this.clickReward, 0);
}

function loadCells() {
    cells[0] = new cellInformation();
    cells[0].id = 0;
    cells[0].name = "Grass";
    cells[0].type = CELL_TYPE_GRASS;
    cells[0].innerParticleId = PARTICLE_GREEN;

    cells[1] = new cellInformation();
    cells[1].id = 1
    cells[1].name = "Tree";
    cells[1].type = CELL_TYPE_TREE;
    cells[1].clickReward.push(createResourceLink(RESOURCE_WOOD, 1, 0, 0, 1.0));

    cells[2] = new cellInformation();
    cells[2].id = 2;
    cells[2].name = "Mountain";
    cells[2].type = CELL_TYPE_MOUNTAIN;
    cells[2].clickReward.push(createResourceLink(RESOURCE_STONE, 1, 0, 0, 1.0));

    cells[3] = new cellInformation();
    cells[3].id = 3;
    cells[3].name = "Water";
    cells[3].type = CELL_TYPE_WATER;
    cells[3].innerParticleId = PARTICLE_BLUE;

    cells[4] = new cellInformation();
    cells[4].id = 4;
    cells[4].name = "Lava";
    cells[4].type = CELL_TYPE_LAVA;
    cells[4].innerParticleId = PARTICLE_RED;

    cells[5] = new cellInformation();
    cells[5].id = 5;
    cells[5].name = "Home";
    cells[5].type = CELL_TYPE_NONE;

    cells[6] = new cellInformation();
    cells[6].id = 6;
    cells[6].name = "Dirt Road";
    cells[6].type = CELL_TYPE_NONE;
}