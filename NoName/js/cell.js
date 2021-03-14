var CELL_TYPE_NONE = 0;
var CELL_TYPE_GRASS = 1;
var CELL_TYPE_TREE = 2;
var CELL_TYPE_MOUNTAIN = 3;
var CELL_TYPE_WATER = 4;
var CELL_TYPE_LAVA = 5;
var CELL_TYPE_GROUND = 6;
var CELL_TYPE_OBSTACLE = 7;
var CELL_TYPE_DARKPOUND = 8;
var CELL_TYPE_SAND = 9;
var CELL_TYPE_TRASH = 10;
var CELL_TYPE_SMALLOBSTACLE = 11;

var CELL_TYPE_S_CEMETARY = 105;
var CELL_TYPE_S_BOULDER = 104;
var CELL_TYPE_S_WEB = 100;
var CELL_TYPE_S_DEADTREE = 102;
var CELL_TYPE_S_POUND = 101;
var CELL_TYPE_S_STATUE = 103;

function cellInformation() {
    this.id = 0;
    this.name = "";
    this.imageName = "";
    this.type = CELL_TYPE_NONE;
    this.clickReward = [];
    this.innerParticleId = -1;

    this.importParticleId = -1;
    this.importParticleCount = 0;
}

cellInformation.prototype.getClickRewardString = function () {
    return getResourceLinkString(this.clickReward, 0);
}

function getCellFromId(id) {
    for (var t = 0; t < cells.length; t++) {
        if (cells[t].id == id)
            return cells[t];
    }

    return null;
}

function loadCells() {
    var newItem;

    newItem = new cellInformation();
    newItem.id = 0;
    newItem.name = "Grass";
    newItem.imageName = "f_grass";
    newItem.type = CELL_TYPE_GRASS;
    newItem.innerParticleId = PARTICLE_GREEN;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 1
    newItem.name = "Tree";
    newItem.imageName = "f_tree";
    newItem.type = CELL_TYPE_TREE;
    newItem.clickReward.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(1, 0), 1.0));
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 2;
    newItem.name = "Mountain";
    newItem.imageName = "f_mountain";
    newItem.type = CELL_TYPE_MOUNTAIN;
    newItem.clickReward.push(createResourceLink(RESOURCE_STONE, new formulaLinear(1, 0), 1.0));
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 3;
    newItem.name = "Water";
    newItem.imageName = "water";
    newItem.type = CELL_TYPE_WATER;
    newItem.innerParticleId = PARTICLE_BLUE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 4;
    newItem.name = "Lava";
    newItem.imageName = "lava";
    newItem.type = CELL_TYPE_LAVA;
    newItem.innerParticleId = PARTICLE_RED;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 5;
    newItem.name = "Home";
    newItem.imageName = "f_town";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 6;
    newItem.name = "Dirt Road";
    newItem.imageName = "f_path";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 7;
    newItem.name = "Deep Water";
    newItem.imageName = "deepWater";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 8;
    newItem.name = "Bridge";
    newItem.imageName = "waterBridge";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 9;
    newItem.name = "Poison";
    newItem.imageName = "poison";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 10;
    newItem.name = "Swamp";
    newItem.imageName = "s_ground";
    newItem.type = CELL_TYPE_GROUND;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 11;
    newItem.name = "Swamp Tree";
    newItem.imageName = "s_tree";
    newItem.type = CELL_TYPE_TREE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 12;
    newItem.name = "Swamp Town";
    newItem.imageName = "s_town";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 13;
    newItem.name = "Sand";
    newItem.imageName = "d_ground";
    newItem.type = CELL_TYPE_GROUND;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 14;
    newItem.name = "Cactus";
    newItem.imageName = "d_cactus";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 15;
    newItem.name = "Town";
    newItem.imageName = "d_town";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 16;
    newItem.name = "Obsidian";
    newItem.imageName = "v_ground";
    newItem.type = CELL_TYPE_GROUND;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 17;
    newItem.name = "City";
    newItem.imageName = "v_town";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 18;
    newItem.name = "Bridge";
    newItem.imageName = "v_bridge";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 19;
    newItem.name = "Hard Sand";
    newItem.imageName = "c_ground";
    newItem.type = CELL_TYPE_GROUND;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 20;
    newItem.name = "Hard Sand Rock";
    newItem.imageName = "c_rock";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 21;
    newItem.name = "Road";
    newItem.imageName = "f_road";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 22;
    newItem.name = "City";
    newItem.imageName = "f_city";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 23;
    newItem.name = "Mountain Cave";
    newItem.imageName = "f_cave";
    newItem.type = CELL_TYPE_NONE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 24;
    newItem.name = "Boulder";
    newItem.imageName = "f_boulder";
    newItem.type = CELL_TYPE_S_BOULDER;
    newItem.importParticleId = PARTICLE_BLUE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 25;
    newItem.name = "Lava path";
    newItem.imageName = "v_path";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 26;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_1100";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 27;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_1010";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 28;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_0011";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 29;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_0101";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 30;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_1001";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 31;
    newItem.name = "Lava stream";
    newItem.imageName = "v_stream_0110";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 32;
    newItem.name = "Lava mountain";
    newItem.imageName = "v_mountain";
    newItem.type = CELL_TYPE_MOUNTAIN;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 33;
    newItem.name = "Lava tree";
    newItem.imageName = "v_tree";
    newItem.type = CELL_TYPE_TREE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 34;
    newItem.name = "Dry lake";
    newItem.imageName = "v_dryLake";
    newItem.type = CELL_TYPE_S_POUND;
    newItem.importParticleId = PARTICLE_STEAM;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 35;
    newItem.name = "Swamp Mountain";
    newItem.imageName = "s_mountain";
    newItem.type = CELL_TYPE_MOUNTAIN;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 36;
    newItem.name = "Swamp Cave";
    newItem.imageName = "v_cave";
    newItem.type = CELL_TYPE_NONE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 37;
    newItem.name = "Swamp Spider Web";
    newItem.imageName = "s_web";
    newItem.type = CELL_TYPE_S_WEB;
    newItem.importParticleId = PARTICLE_RED;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 38;
    newItem.name = "Dark Pound";
    newItem.imageName = "darkPound";
    newItem.type = CELL_TYPE_DARKPOUND;
    newItem.innerParticleId = PARTICLE_BLACK;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 39;
    newItem.name = "Swamp Path";
    newItem.imageName = "s_path";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 40;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1001";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 41;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_0110";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 42;
    newItem.name = "Swamp River Bridge";
    newItem.imageName = "s_bridge";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 43;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1100";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 44;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1010";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 45;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_0011";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 46;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_0101";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 47;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1110";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 48;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1011";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 49;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_0111";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 50;
    newItem.name = "Swamp River";
    newItem.imageName = "s_stream_1101";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 51;
    newItem.name = "Swamp Cave";
    newItem.imageName = "s_cave";
    newItem.type = CELL_TYPE_NONE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 52;
    newItem.name = "Pipe";
    newItem.imageName = "f_pipe";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 53;
    newItem.name = "Pipe 2";
    newItem.imageName = "f_pipe2";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 54;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_1001";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 55;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_0110";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 56;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_0101";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 57;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_1100";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 58;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_1010";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 59;
    newItem.name = "Train Track";
    newItem.imageName = "f_rail_0011";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 60;
    newItem.name = "Trash";
    newItem.imageName = "trash";
    newItem.type = CELL_TYPE_TRASH;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 61;
    newItem.name = "Desert Tree";
    newItem.imageName = "d_tree";
    newItem.type = CELL_TYPE_TREE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 62;
    newItem.name = "Light Sand";
    newItem.imageName = "d_sand";
    newItem.type = CELL_TYPE_SAND;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 63;
    newItem.name = "Desert Path";
    newItem.imageName = "d_path";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 64;
    newItem.name = "Canyon Path";
    newItem.imageName = "c_path";
    newItem.type = CELL_TYPE_SMALLOBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 65;
    newItem.name = "Canyon House";
    newItem.imageName = "c_town";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 66;
    newItem.name = "Canyon Mountain";
    newItem.imageName = "c_mountain";
    newItem.type = CELL_TYPE_MOUNTAIN;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 67;
    newItem.name = "Canyon Obelisk";
    newItem.imageName = "c_statue";
    newItem.type = CELL_TYPE_S_STATUE;
    newItem.importParticleId = PARTICLE_TIME;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 68;
    newItem.name = "Canyon Side";
    newItem.imageName = "c_side";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 69;
    newItem.name = "Cemetary";
    newItem.imageName = "f_cemetary";
    newItem.type = CELL_TYPE_S_CEMETARY;
    newItem.importParticleId = PARTICLE_BLACK;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 70;
    newItem.name = "Desert Dead Tree";
    newItem.imageName = "d_deadTree";
    newItem.type = CELL_TYPE_S_DEADTREE;
    newItem.importParticleId = PARTICLE_GREEN;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 71;
    newItem.name = "Canyon Side";
    newItem.imageName = "c_side_l";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);

    newItem = new cellInformation();
    newItem.id = 72;
    newItem.name = "Canyon Side";
    newItem.imageName = "c_side_r";
    newItem.type = CELL_TYPE_OBSTACLE;
    cells.push(newItem);
}