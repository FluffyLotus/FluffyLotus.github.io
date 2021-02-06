var CELL_GRASS = 0;
var CELL_TREE = 1;
var CELL_MOUNTAIN = 2;
var CELL_WATER = 3;
var CELL_LAVA = 4;
var CELL_HOME = 5;
var CELL_DIRTROAD = 6;
var CELL_DEEPWATER = 7;
var CELL_BRIDGE = 8;

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
    cells[1].clickReward.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(1, 0), 1.0));

    cells[2] = new cellInformation();
    cells[2].id = 2;
    cells[2].name = "Mountain";
    cells[2].type = CELL_TYPE_MOUNTAIN;
    cells[2].clickReward.push(createResourceLink(RESOURCE_STONE, new formulaLinear(1, 0), 1.0));

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
    cells[6].type = CELL_TYPE_GRASS;

    cells[7] = new cellInformation();
    cells[7].id = 7;
    cells[7].name = "Deep Water";
    cells[7].type = CELL_TYPE_NONE;

    cells[8] = new cellInformation();
    cells[8].id = 8;
    cells[8].name = "Bridge";
    cells[8].type = CELL_TYPE_NONE;

    cells[9] = new cellInformation();
    cells[9].id = 9;
    cells[9].name = "Poison";
    cells[9].type = CELL_TYPE_NONE;

    cells[10] = new cellInformation();
    cells[10].id = 10;
    cells[10].name = "Swamp";
    cells[10].type = CELL_TYPE_NONE;

    cells[11] = new cellInformation();
    cells[11].id = 11;
    cells[11].name = "Swamp Tree";
    cells[11].type = CELL_TYPE_NONE;

    cells[12] = new cellInformation();
    cells[12].id = 12;
    cells[12].name = "Swamp Town";
    cells[12].type = CELL_TYPE_NONE;

    cells[13] = new cellInformation();
    cells[13].id = 13;
    cells[13].name = "Sand";
    cells[13].type = CELL_TYPE_NONE;

    cells[14] = new cellInformation();
    cells[14].id = 14;
    cells[14].name = "Cactus";
    cells[14].type = CELL_TYPE_NONE;

    cells[15] = new cellInformation();
    cells[15].id = 15;
    cells[15].name = "Town";
    cells[15].type = CELL_TYPE_NONE;

    cells[16] = new cellInformation();
    cells[16].id = 16;
    cells[16].name = "Obsidian";
    cells[16].type = CELL_TYPE_NONE;

    cells[17] = new cellInformation();
    cells[17].id = 17;
    cells[17].name = "City";
    cells[17].type = CELL_TYPE_NONE;

    cells[18] = new cellInformation();
    cells[18].id = 18;
    cells[18].name = "Bridge";
    cells[18].type = CELL_TYPE_NONE;

    cells[19] = new cellInformation();
    cells[19].id = 19;
    cells[19].name = "Hard Sand";
    cells[19].type = CELL_TYPE_NONE;

    cells[20] = new cellInformation();
    cells[20].id = 20;
    cells[20].name = "Hard Sand Rock";
    cells[20].type = CELL_TYPE_NONE;

    cells[21] = new cellInformation();
    cells[21].id = 21;
    cells[21].name = "Road";
    cells[21].type = CELL_TYPE_NONE;

    cells[22] = new cellInformation();
    cells[22].id = 22;
    cells[22].name = "City";
    cells[22].type = CELL_TYPE_NONE;

    cells[23] = new cellInformation();
    cells[23].id = 23;
    cells[23].name = "Mountain Cave";
    cells[23].type = CELL_TYPE_NONE;

    cells[24] = new cellInformation();
    cells[24].id = 24;
    cells[24].name = "Boulder";
    cells[24].type = CELL_TYPE_NONE;

    cells[25] = new cellInformation();
    cells[25].id = 25;
    cells[25].name = "Lava path";
    cells[25].type = CELL_TYPE_NONE;

    cells[26] = new cellInformation();
    cells[26].id = 26;
    cells[26].name = "Lava stream";
    cells[26].type = CELL_TYPE_NONE;

    cells[27] = new cellInformation();
    cells[27].id = 27;
    cells[27].name = "Lava stream";
    cells[27].type = CELL_TYPE_NONE;

    cells[28] = new cellInformation();
    cells[28].id = 28;
    cells[28].name = "Lava stream";
    cells[28].type = CELL_TYPE_NONE;

    cells[29] = new cellInformation();
    cells[29].id = 29;
    cells[29].name = "Lava stream";
    cells[29].type = CELL_TYPE_NONE;

    cells[30] = new cellInformation();
    cells[30].id = 30;
    cells[30].name = "Lava stream";
    cells[30].type = CELL_TYPE_NONE;

    cells[31] = new cellInformation();
    cells[31].id = 31;
    cells[31].name = "Lava stream";
    cells[31].type = CELL_TYPE_NONE;

    cells[32] = new cellInformation();
    cells[32].id = 32;
    cells[32].name = "Lava mountain";
    cells[32].type = CELL_TYPE_NONE;

    cells[33] = new cellInformation();
    cells[33].id = 33;
    cells[33].name = "Lava tree";
    cells[33].type = CELL_TYPE_NONE;

    cells[34] = new cellInformation();
    cells[34].id = 34;
    cells[34].name = "Dry lake";
    cells[34].type = CELL_TYPE_NONE;

    cells[35] = new cellInformation();
    cells[35].id = 35;
    cells[35].name = "Swamp Mountain";
    cells[35].type = CELL_TYPE_NONE;

    cells[36] = new cellInformation();
    cells[36].id = 36;
    cells[36].name = "Swamp Cave";
    cells[36].type = CELL_TYPE_NONE;

    cells[37] = new cellInformation();
    cells[37].id = 37;
    cells[37].name = "Swamp Spider Web";
    cells[37].type = CELL_TYPE_NONE;

    cells[38] = new cellInformation();
    cells[38].id = 38;
    cells[38].name = "Dark";
    cells[38].type = CELL_TYPE_NONE;

    cells[39] = new cellInformation();
    cells[39].id = 39;
    cells[39].name = "Swamp Path";
    cells[39].type = CELL_TYPE_NONE;

    cells[40] = new cellInformation();
    cells[40].id = 40;
    cells[40].name = "Swamp River";
    cells[40].type = CELL_TYPE_NONE;

    cells[41] = new cellInformation();
    cells[41].id = 41;
    cells[41].name = "Swamp River";
    cells[41].type = CELL_TYPE_NONE;

    cells[42] = new cellInformation();
    cells[42].id = 42;
    cells[42].name = "Swamp River Bridge";
    cells[42].type = CELL_TYPE_NONE;

    cells[43] = new cellInformation();
    cells[43].id = 43;
    cells[43].name = "Swamp River";
    cells[43].type = CELL_TYPE_NONE;

    cells[44] = new cellInformation();
    cells[44].id = 44;
    cells[44].name = "Swamp River";
    cells[44].type = CELL_TYPE_NONE;

    cells[45] = new cellInformation();
    cells[45].id = 45;
    cells[45].name = "Swamp River";
    cells[45].type = CELL_TYPE_NONE;

    cells[46] = new cellInformation();
    cells[46].id = 46;
    cells[46].name = "Swamp River";
    cells[46].type = CELL_TYPE_NONE;

    cells[47] = new cellInformation();
    cells[47].id = 47;
    cells[47].name = "Swamp River";
    cells[47].type = CELL_TYPE_NONE;

    cells[48] = new cellInformation();
    cells[48].id = 48;
    cells[48].name = "Swamp River";
    cells[48].type = CELL_TYPE_NONE;

    cells[49] = new cellInformation();
    cells[49].id = 49;
    cells[49].name = "Swamp River";
    cells[49].type = CELL_TYPE_NONE;

    cells[50] = new cellInformation();
    cells[50].id = 50;
    cells[50].name = "Swamp River";
    cells[50].type = CELL_TYPE_NONE;

    cells[51] = new cellInformation();
    cells[51].id = 51;
    cells[51].name = "Swamp Cave";
    cells[51].type = CELL_TYPE_NONE;

    cells[52] = new cellInformation();
    cells[52].id = 52;
    cells[52].name = "Pipe";
    cells[52].type = CELL_TYPE_NONE;

    cells[53] = new cellInformation();
    cells[53].id = 53;
    cells[53].name = "Pipe 2";
    cells[53].type = CELL_TYPE_NONE;

    cells[54] = new cellInformation();
    cells[54].id = 54;
    cells[54].name = "Train Track";
    cells[54].type = CELL_TYPE_NONE;

    cells[55] = new cellInformation();
    cells[55].id = 55;
    cells[55].name = "Train Track";
    cells[55].type = CELL_TYPE_NONE;

    cells[56] = new cellInformation();
    cells[56].id = 56;
    cells[56].name = "Train Track";
    cells[56].type = CELL_TYPE_NONE;

    cells[57] = new cellInformation();
    cells[57].id = 57;
    cells[57].name = "Train Track";
    cells[57].type = CELL_TYPE_NONE;

    cells[58] = new cellInformation();
    cells[58].id = 58;
    cells[58].name = "Train Track";
    cells[58].type = CELL_TYPE_NONE;

    cells[59] = new cellInformation();
    cells[59].id = 59;
    cells[59].name = "Train Track";
    cells[59].type = CELL_TYPE_NONE;

    cells[60] = new cellInformation();
    cells[60].id = 60;
    cells[60].name = "Trash";
    cells[60].type = CELL_TYPE_NONE;

    cells[61] = new cellInformation();
    cells[61].id = 61;
    cells[61].name = "Desert Tree";
    cells[61].type = CELL_TYPE_NONE;

    cells[62] = new cellInformation();
    cells[62].id = 62;
    cells[62].name = "Light Sand";
    cells[62].type = CELL_TYPE_NONE;

    cells[63] = new cellInformation();
    cells[63].id = 63;
    cells[63].name = "Desert Path";
    cells[63].type = CELL_TYPE_NONE;

    cells[64] = new cellInformation();
    cells[64].id = 64;
    cells[64].name = "Canyon Path";
    cells[64].type = CELL_TYPE_NONE;

    cells[65] = new cellInformation();
    cells[65].id = 65;
    cells[65].name = "Canyon House";
    cells[65].type = CELL_TYPE_NONE;

    cells[66] = new cellInformation();
    cells[66].id = 66;
    cells[66].name = "Canyon Mountain";
    cells[66].type = CELL_TYPE_NONE;

    cells[67] = new cellInformation();
    cells[67].id = 67;
    cells[67].name = "Canyon Status";
    cells[67].type = CELL_TYPE_NONE;

    cells[68] = new cellInformation();
    cells[68].id = 68;
    cells[68].name = "Canyon Side";
    cells[68].type = CELL_TYPE_NONE;
}