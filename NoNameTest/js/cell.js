/*
var CELL_GRASS = 0;
var CELL_TREE = 1;
var CELL_MOUNTAIN = 2;
var CELL_WATER = 3;
var CELL_LAVA = 4;
var CELL_HOME = 5;
var CELL_DIRTROAD = 6;
var CELL_DEEPWATER = 7;
var CELL_BRIDGE = 8;
*/

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


/*
 * EmptyPound
 * DeadTree
 * Statue
 * Trash
*/

function cellInformation() {
    this.id = 0;
    this.name = "";
    this.imageName = "";
    this.type = CELL_TYPE_NONE;
    this.clickReward = [];
    this.innerParticleId = -1;
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
    cells[0] = new cellInformation();
    cells[0].id = 0;
    cells[0].name = "Grass";
    cells[0].imageName = "f_grass";
    cells[0].type = CELL_TYPE_GRASS;
    cells[0].innerParticleId = PARTICLE_GREEN;

    cells[1] = new cellInformation();
    cells[1].id = 1
    cells[1].name = "Tree";
    cells[1].imageName = "f_tree";
    cells[1].type = CELL_TYPE_TREE;
    cells[1].clickReward.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(1, 0), 1.0));

    cells[2] = new cellInformation();
    cells[2].id = 2;
    cells[2].name = "Mountain";
    cells[2].imageName = "f_mountain";
    cells[2].type = CELL_TYPE_MOUNTAIN;
    cells[2].clickReward.push(createResourceLink(RESOURCE_STONE, new formulaLinear(1, 0), 1.0));

    cells[3] = new cellInformation();
    cells[3].id = 3;
    cells[3].name = "Water";
    cells[3].imageName = "water";
    cells[3].type = CELL_TYPE_WATER;
    cells[3].innerParticleId = PARTICLE_BLUE;

    cells[4] = new cellInformation();
    cells[4].id = 4;
    cells[4].name = "Lava";
    cells[4].imageName = "lava";
    cells[4].type = CELL_TYPE_LAVA;
    cells[4].innerParticleId = PARTICLE_RED;

    cells[5] = new cellInformation();
    cells[5].id = 5;
    cells[5].name = "Home";
    cells[5].imageName = "f_town";
    cells[5].type = CELL_TYPE_OBSTACLE;

    cells[6] = new cellInformation();
    cells[6].id = 6;
    cells[6].name = "Dirt Road";
    cells[6].imageName = "f_path";
    cells[6].type = CELL_TYPE_SMALLOBSTACLE;

    cells[7] = new cellInformation();
    cells[7].id = 7;
    cells[7].name = "Deep Water";
    cells[7].imageName = "deepWater";
    cells[7].type = CELL_TYPE_OBSTACLE;

    cells[8] = new cellInformation();
    cells[8].id = 8;
    cells[8].name = "Bridge";
    cells[8].imageName = "waterBridge";
    cells[8].type = CELL_TYPE_OBSTACLE;

    cells[9] = new cellInformation();
    cells[9].id = 9;
    cells[9].name = "Poison";
    cells[9].imageName = "poison";
    cells[9].type = CELL_TYPE_OBSTACLE;

    cells[10] = new cellInformation();
    cells[10].id = 10;
    cells[10].name = "Swamp";
    cells[10].imageName = "s_ground";
    cells[10].type = CELL_TYPE_GROUND;

    cells[11] = new cellInformation();
    cells[11].id = 11;
    cells[11].name = "Swamp Tree";
    cells[11].imageName = "s_tree";
    cells[11].type = CELL_TYPE_TREE;

    cells[12] = new cellInformation();
    cells[12].id = 12;
    cells[12].name = "Swamp Town";
    cells[12].imageName = "s_town";
    cells[12].type = CELL_TYPE_OBSTACLE;

    cells[13] = new cellInformation();
    cells[13].id = 13;
    cells[13].name = "Sand";
    cells[13].imageName = "d_ground";
    cells[13].type = CELL_TYPE_GROUND;

    cells[14] = new cellInformation();
    cells[14].id = 14;
    cells[14].name = "Cactus";
    cells[14].imageName = "d_cactus";
    cells[14].type = CELL_TYPE_OBSTACLE;

    cells[15] = new cellInformation();
    cells[15].id = 15;
    cells[15].name = "Town";
    cells[15].imageName = "d_town";
    cells[15].type = CELL_TYPE_OBSTACLE;

    cells[16] = new cellInformation();
    cells[16].id = 16;
    cells[16].name = "Obsidian";
    cells[16].imageName = "v_ground";
    cells[16].type = CELL_TYPE_GROUND;

    cells[17] = new cellInformation();
    cells[17].id = 17;
    cells[17].name = "City";
    cells[17].imageName = "v_town";
    cells[17].type = CELL_TYPE_OBSTACLE;

    cells[18] = new cellInformation();
    cells[18].id = 18;
    cells[18].name = "Bridge";
    cells[18].imageName = "v_bridge";
    cells[18].type = CELL_TYPE_OBSTACLE;

    cells[19] = new cellInformation();
    cells[19].id = 19;
    cells[19].name = "Hard Sand";
    cells[19].imageName = "c_ground";
    cells[19].type = CELL_TYPE_GROUND;

    cells[20] = new cellInformation();
    cells[20].id = 20;
    cells[20].name = "Hard Sand Rock";
    cells[20].imageName = "c_rock";
    cells[20].type = CELL_TYPE_OBSTACLE;

    cells[21] = new cellInformation();
    cells[21].id = 21;
    cells[21].name = "Road";
    cells[21].imageName = "f_road";
    cells[21].type = CELL_TYPE_OBSTACLE;

    cells[22] = new cellInformation();
    cells[22].id = 22;
    cells[22].name = "City";
    cells[22].imageName = "f_city";
    cells[22].type = CELL_TYPE_OBSTACLE;

    cells[23] = new cellInformation();
    cells[23].id = 23;
    cells[23].name = "Mountain Cave";
    cells[23].imageName = "f_cave";
    cells[23].type = CELL_TYPE_NONE;

    cells[24] = new cellInformation();
    cells[24].id = 24;
    cells[24].name = "Boulder";
    cells[24].imageName = "f_boulder";
    cells[24].type = CELL_TYPE_S_BOULDER;

    cells[25] = new cellInformation();
    cells[25].id = 25;
    cells[25].name = "Lava path";
    cells[25].imageName = "v_path";
    cells[25].type = CELL_TYPE_SMALLOBSTACLE;

    cells[26] = new cellInformation();
    cells[26].id = 26;
    cells[26].name = "Lava stream";
    cells[26].imageName = "v_stream_1100";
    cells[26].type = CELL_TYPE_OBSTACLE;

    cells[27] = new cellInformation();
    cells[27].id = 27;
    cells[27].name = "Lava stream";
    cells[27].imageName = "v_stream_1010";
    cells[27].type = CELL_TYPE_OBSTACLE;

    cells[28] = new cellInformation();
    cells[28].id = 28;
    cells[28].name = "Lava stream";
    cells[28].imageName = "v_stream_0011";
    cells[28].type = CELL_TYPE_OBSTACLE;

    cells[29] = new cellInformation();
    cells[29].id = 29;
    cells[29].name = "Lava stream";
    cells[29].imageName = "v_stream_0101";
    cells[29].type = CELL_TYPE_OBSTACLE;

    cells[30] = new cellInformation();
    cells[30].id = 30;
    cells[30].name = "Lava stream";
    cells[30].imageName = "v_stream_1001";
    cells[30].type = CELL_TYPE_OBSTACLE;

    cells[31] = new cellInformation();
    cells[31].id = 31;
    cells[31].name = "Lava stream";
    cells[31].imageName = "v_stream_0110";
    cells[31].type = CELL_TYPE_OBSTACLE;

    cells[32] = new cellInformation();
    cells[32].id = 32;
    cells[32].name = "Lava mountain";
    cells[32].imageName = "v_mountain";
    cells[32].type = CELL_TYPE_MOUNTAIN;

    cells[33] = new cellInformation();
    cells[33].id = 33;
    cells[33].name = "Lava tree";
    cells[33].imageName = "v_tree";
    cells[33].type = CELL_TYPE_TREE;

    cells[34] = new cellInformation();
    cells[34].id = 34;
    cells[34].name = "Dry lake";
    cells[34].imageName = "v_dryLake";
    cells[34].type = CELL_TYPE_S_POUND;

    cells[35] = new cellInformation();
    cells[35].id = 35;
    cells[35].name = "Swamp Mountain";
    cells[35].imageName = "s_mountain";
    cells[35].type = CELL_TYPE_MOUNTAIN;

    cells[36] = new cellInformation();
    cells[36].id = 36;
    cells[36].name = "Swamp Cave";
    cells[36].imageName = "v_cave";
    cells[36].type = CELL_TYPE_NONE;

    cells[37] = new cellInformation();
    cells[37].id = 37;
    cells[37].name = "Swamp Spider Web";
    cells[37].imageName = "s_web";
    cells[37].type = CELL_TYPE_S_WEB;

    cells[38] = new cellInformation();
    cells[38].id = 38;
    cells[38].name = "Dark Pound";
    cells[38].imageName = "darkPound";
    cells[38].type = CELL_TYPE_DARKPOUND;

    cells[39] = new cellInformation();
    cells[39].id = 39;
    cells[39].name = "Swamp Path";
    cells[39].imageName = "s_path";
    cells[39].type = CELL_TYPE_SMALLOBSTACLE;

    cells[40] = new cellInformation();
    cells[40].id = 40;
    cells[40].name = "Swamp River";
    cells[40].imageName = "s_stream_1001";
    cells[40].type = CELL_TYPE_OBSTACLE;

    cells[41] = new cellInformation();
    cells[41].id = 41;
    cells[41].name = "Swamp River";
    cells[41].imageName = "s_stream_0110";
    cells[41].type = CELL_TYPE_OBSTACLE;

    cells[42] = new cellInformation();
    cells[42].id = 42;
    cells[42].name = "Swamp River Bridge";
    cells[42].imageName = "s_bridge";
    cells[42].type = CELL_TYPE_OBSTACLE;

    cells[43] = new cellInformation();
    cells[43].id = 43;
    cells[43].name = "Swamp River";
    cells[43].imageName = "s_stream_1100";
    cells[43].type = CELL_TYPE_OBSTACLE;

    cells[44] = new cellInformation();
    cells[44].id = 44;
    cells[44].name = "Swamp River";
    cells[44].imageName = "s_stream_1010";
    cells[44].type = CELL_TYPE_OBSTACLE;

    cells[45] = new cellInformation();
    cells[45].id = 45;
    cells[45].name = "Swamp River";
    cells[45].imageName = "s_stream_0011";
    cells[45].type = CELL_TYPE_OBSTACLE;

    cells[46] = new cellInformation();
    cells[46].id = 46;
    cells[46].name = "Swamp River";
    cells[46].imageName = "s_stream_0101";
    cells[46].type = CELL_TYPE_OBSTACLE;

    cells[47] = new cellInformation();
    cells[47].id = 47;
    cells[47].name = "Swamp River";
    cells[47].imageName = "s_stream_1110";
    cells[47].type = CELL_TYPE_OBSTACLE;

    cells[48] = new cellInformation();
    cells[48].id = 48;
    cells[48].name = "Swamp River";
    cells[48].imageName = "s_stream_1011";
    cells[48].type = CELL_TYPE_OBSTACLE;

    cells[49] = new cellInformation();
    cells[49].id = 49;
    cells[49].name = "Swamp River";
    cells[49].imageName = "s_stream_0111";
    cells[49].type = CELL_TYPE_OBSTACLE;

    cells[50] = new cellInformation();
    cells[50].id = 50;
    cells[50].name = "Swamp River";
    cells[50].imageName = "s_stream_1101";
    cells[50].type = CELL_TYPE_OBSTACLE;

    cells[51] = new cellInformation();
    cells[51].id = 51;
    cells[51].name = "Swamp Cave";
    cells[51].imageName = "s_cave";
    cells[51].type = CELL_TYPE_NONE;

    cells[52] = new cellInformation();
    cells[52].id = 52;
    cells[52].name = "Pipe";
    cells[52].imageName = "f_pipe";
    cells[52].type = CELL_TYPE_OBSTACLE;

    cells[53] = new cellInformation();
    cells[53].id = 53;
    cells[53].name = "Pipe 2";
    cells[53].imageName = "f_pipe2";
    cells[53].type = CELL_TYPE_OBSTACLE;

    cells[54] = new cellInformation();
    cells[54].id = 54;
    cells[54].name = "Train Track";
    cells[54].imageName = "f_rail_1001";
    cells[54].type = CELL_TYPE_SMALLOBSTACLE;

    cells[55] = new cellInformation();
    cells[55].id = 55;
    cells[55].name = "Train Track";
    cells[55].imageName = "f_rail_0110";
    cells[55].type = CELL_TYPE_SMALLOBSTACLE;

    cells[56] = new cellInformation();
    cells[56].id = 56;
    cells[56].name = "Train Track";
    cells[56].imageName = "f_rail_0101";
    cells[56].type = CELL_TYPE_SMALLOBSTACLE;

    cells[57] = new cellInformation();
    cells[57].id = 57;
    cells[57].name = "Train Track";
    cells[57].imageName = "f_rail_1100";
    cells[57].type = CELL_TYPE_SMALLOBSTACLE;

    cells[58] = new cellInformation();
    cells[58].id = 58;
    cells[58].name = "Train Track";
    cells[58].imageName = "f_rail_1010";
    cells[58].type = CELL_TYPE_SMALLOBSTACLE;

    cells[59] = new cellInformation();
    cells[59].id = 59;
    cells[59].name = "Train Track";
    cells[59].imageName = "f_rail_0011";
    cells[59].type = CELL_TYPE_SMALLOBSTACLE;

    cells[60] = new cellInformation();
    cells[60].id = 60;
    cells[60].name = "Trash";
    cells[60].imageName = "trash";
    cells[60].type = CELL_TYPE_TRASH;

    cells[61] = new cellInformation();
    cells[61].id = 61;
    cells[61].name = "Desert Tree";
    cells[61].imageName = "d_tree";
    cells[61].type = CELL_TYPE_TREE;

    cells[62] = new cellInformation();
    cells[62].id = 62;
    cells[62].name = "Light Sand";
    cells[62].imageName = "d_sand";
    cells[62].type = CELL_TYPE_SAND;

    cells[63] = new cellInformation();
    cells[63].id = 63;
    cells[63].name = "Desert Path";
    cells[63].imageName = "d_path";
    cells[63].type = CELL_TYPE_SMALLOBSTACLE;

    cells[64] = new cellInformation();
    cells[64].id = 64;
    cells[64].name = "Canyon Path";
    cells[64].imageName = "c_path";
    cells[64].type = CELL_TYPE_SMALLOBSTACLE;

    cells[65] = new cellInformation();
    cells[65].id = 65;
    cells[65].name = "Canyon House";
    cells[65].imageName = "c_town";
    cells[65].type = CELL_TYPE_OBSTACLE;

    cells[66] = new cellInformation();
    cells[66].id = 66;
    cells[66].name = "Canyon Mountain";
    cells[66].imageName = "c_mountain";
    cells[66].type = CELL_TYPE_MOUNTAIN;

    cells[67] = new cellInformation();
    cells[67].id = 67;
    cells[67].name = "Canyon Statue";
    cells[67].imageName = "c_statue";
    cells[67].type = CELL_TYPE_S_STATUE;

    cells[68] = new cellInformation();
    cells[68].id = 68;
    cells[68].name = "Canyon Side";
    cells[68].imageName = "c_side";
    cells[68].type = CELL_TYPE_OBSTACLE;

    cells[69] = new cellInformation();
    cells[69].id = 69;
    cells[69].name = "Cemetary";
    cells[69].imageName = "f_cemetary";
    cells[69].type = CELL_TYPE_S_CEMETARY;
}