var images = [];

var spriteSheetImage;

var IMAGE_WIDTH = 32;
var IMAGE_HEIGHT = 32;

var IMAGE_CURSOR = "_cursor";
var IMAGE_UPGRADE = "_upgrade";
var IMAGE_DOWNGRADE = "_downgrade";
var IMAGE_TRASHCAN = "_trashcan";
var IMAGE_SELECT = "_select";
var IMAGE_CLOUD = "large_cloud";
var IMAGE_NOCONNECTION = "_no_connection";
var IMAGE_CLOUD2 = "_cloud2";
var IMAGE_EXCLAMATION = "_exclamation";
var IMAGE_SMALLUPGRADE = "_small_upgrade";
var IMAGE_REDMIST = "large_redmist";

//var IMAGE_AXE = 0;
//var IMAGE_ENEMY = 1;
//var IMAGE_GRASS = 2;
//var IMAGE_MOUNTAIN = 3;
//var IMAGE_PATH = 4;
//var IMAGE_PICKAXE = 5;
//var IMAGE_TREE = 6;
//var IMAGE_CRYSTAL = 7;
//var IMAGE_HOUSE = 8;
//var IMAGE_TOWER = 9;
//var IMAGE_STORAGE = 10;
//var IMAGE_ROAD = 11;
//var IMAGE_SELECT = 12;
//var IMAGE_CRYSTAL2 = 13;
//var IMAGE_TOWER2 = 14;
//var IMAGE_WATER = 15;
//var IMAGE_PORT = 16;
//var IMAGE_PORTHOUSE = 17;
//var IMAGE_FISHERMAN = 18;
//var IMAGE_FLOWER = 19;
//var IMAGE_FISH = 20;
//var IMAGE_STANDING = 21;
//var IMAGE_EXPLOSION1 = 22;
//var IMAGE_EXPLOSION2 = 23;
//var IMAGE_FLOWEROFF = 24;
//var IMAGE_PILLAR = 25
//var IMAGE_ENEMY2 = 26;
//var IMAGE_PLANK = 27;
//var IMAGE_COAL = 28;
//var IMAGE_BLOCK = 29;
//var IMAGE_ENEMY3 = 30;
//var IMAGE_BRIDGE_BROKEN = 31;
//var IMAGE_BRIDGE_FIX = 32;
//var IMAGE_PERSON = 33;
//var IMAGE_LAVA = 34;
//var IMAGE_VOLCANO = 35;
//var IMAGE_TRASHCAN = 36;
//var IMAGE_UPGRADE = 37;
//var IMAGE_DOWNGRADE = 38;
//var IMAGE_CURSOR = 39;
//var IMAGE_CLOUD = 40;

//
//         0001:1
//
// 0010:2          0100:4
//
//         1000:8
//

/*
function ImageInfo() {
    this.id = 0;
    this.name = "";
    this.img = null;
    this.cornerImg = [];
}

ImageInfo.prototype.hasCorners = function () {
    return this.cornerImg.length > 0;
}

function getImageFromId(id) {
    for (var i = 0; i < images.length; i++)
        if (images[i].id == id)
            return images[i];
    return null;
}

function getImageFromName(name) {
    for (var i = 0; i < images.length; i++)
        if (images[i].name == name)
            return images[i];

    return null;
}

function createSingleImage(name) {
    var item;

    item = new ImageInfo();
    item.id = images.length;
    item.name = name;
    item.img = document.getElementById("img_" + name);
    images.push(item);

    return item;
}

function createCornerImage(name) {
    var item;

    item = new ImageInfo();
    item.id = images.length;
    item.name = name;
    item.img = document.getElementById("img_" + name + "-15");

    item.cornerImg[0] = document.getElementById("img_" + name + "-15");

    for (var t = 1; t <= 15; t++) {
        item.cornerImg[t] = document.getElementById("img_" + name + "-" + t);
    }

    images.push(item);

    return item;
}
*/

function ImageGroupInfo() {
    this.name = "";
    this.info = [];
}

ImageGroupInfo.prototype.hasCorners = function () {
    return this.info.length > 1;
}

function ImageInfo() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
}

function getImageFromName(name) {
    for (var i = 0; i < images.length; i++)
        if (images[i].name == name)
            return images[i];

    for (var i = 0; i < images.length; i++)
        if (images[i].name == "_" + name)
            return images[i];
    //console.log(name);
    return null;
}

function initImages() {
    spriteSheetImage = document.getElementById("spritesheet");

    for (var t = 0; t < spritesheetData.length; t++) {
        var group = getImageFromName(spritesheetData[t].n);

        if (group == null) {
            group = new ImageGroupInfo();
            group.name = spritesheetData[t].n;

            images.push(group);
        }

        var info = new ImageInfo();

        info.x = spritesheetData[t].x;
        info.y = spritesheetData[t].y;
        info.w = spritesheetData[t].w;
        info.h = spritesheetData[t].h;

        group.info[spritesheetData[t].i] = info;
    }

    //createSingleImage("axe");
    //createSingleImage("enemy");
    //createSingleImage("grass");
    //createSingleImage("mountain");
    //createSingleImage("path");
    //createSingleImage("pickaxe");
    //createSingleImage("tree");
    //createSingleImage("crystal");
    //createSingleImage("crystal2");
    //createSingleImage("house");
    //createSingleImage("tower");
    //createSingleImage("tower2");
    //createSingleImage("storage");
    //createSingleImage("select");
    //createSingleImage("water");
    //createSingleImage("port");
    //createSingleImage("porthouse");
    //createSingleImage("fisherman");
    //createSingleImage("flower");
    //createSingleImage("fish");
    //createSingleImage("standing");
    //createSingleImage("explosion1");
    //createSingleImage("explosion2");
    //createSingleImage("floweroff");
    //createSingleImage("pillar");
    //createSingleImage("enemy2");
    //createSingleImage("plank");
    //createCornerImage("road");
    //createSingleImage("coal");
    //createSingleImage("block");
    //createSingleImage("enemy3");
    //createSingleImage("bridgebroken");
    //createSingleImage("bridgefix");
    //createSingleImage("person");
    //createSingleImage("lava");
    //createSingleImage("volcano");
    //createSingleImage("trashcan");
    //createSingleImage("upgrade");
    //createSingleImage("downgrade");
    //createSingleImage("cursor");
    //createSingleImage("cloud");
    //createSingleImage("deepwater");
    //createSingleImage("noconnection");
    //createSingleImage("stream");
    //createSingleImage("cloud2");
    //createSingleImage("exclamation");
    //createSingleImage("smallupgrade");
    //createSingleImage("pickaxeman");
    //createSingleImage("mountainhole");
    //createSingleImage("bushoff");
    //createSingleImage("bushon");
    //createSingleImage("redmist");

    //var item;

    //item = new ImageInfo();
    //item.id = 0;
    //item.img = document.getElementById("imgAxe");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 1;
    //item.img = document.getElementById("imgEnemy");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 2;
    //item.img = document.getElementById("imgGrass");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 3;
    //item.img = document.getElementById("imgMountain");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 4;
    //item.img = document.getElementById("imgPath");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 5;
    //item.img = document.getElementById("imgPickAxe");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 6;
    //item.img = document.getElementById("imgTree");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 7;
    //item.img = document.getElementById("imgCrystal");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 8;
    //item.img = document.getElementById("imgHouse");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 9;
    //item.img = document.getElementById("imgTower");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 10;
    //item.img = document.getElementById("imgStorage");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 11;
    //item.img = document.getElementById("imgRoad");
    //item.cornerImg[0] = document.getElementById("imgRoad-15");
    //item.cornerImg[1] = document.getElementById("imgRoad-1");
    //item.cornerImg[2] = document.getElementById("imgRoad-2");
    //item.cornerImg[3] = document.getElementById("imgRoad-3");
    //item.cornerImg[4] = document.getElementById("imgRoad-4");
    //item.cornerImg[5] = document.getElementById("imgRoad-5");
    //item.cornerImg[6] = document.getElementById("imgRoad-6");
    //item.cornerImg[7] = document.getElementById("imgRoad-7");
    //item.cornerImg[8] = document.getElementById("imgRoad-8");
    //item.cornerImg[9] = document.getElementById("imgRoad-9");
    //item.cornerImg[10] = document.getElementById("imgRoad-10");
    //item.cornerImg[11] = document.getElementById("imgRoad-11");
    //item.cornerImg[12] = document.getElementById("imgRoad-12");
    //item.cornerImg[13] = document.getElementById("imgRoad-13");
    //item.cornerImg[14] = document.getElementById("imgRoad-14");
    //item.cornerImg[15] = document.getElementById("imgRoad-15");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 12;
    //item.img = document.getElementById("imgSelect");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 13;
    //item.img = document.getElementById("imgCrystal2");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 14;
    //item.img = document.getElementById("imgAttack2");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 15;
    //item.img = document.getElementById("imgWater");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 16;
    //item.img = document.getElementById("imgPort");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 17;
    //item.img = document.getElementById("imgPortHouse");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 18;
    //item.img = document.getElementById("imgFisherman");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 19;
    //item.img = document.getElementById("imgFlower");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 20;
    //item.img = document.getElementById("imgFish");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 21;
    //item.img = document.getElementById("imgStanding");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 22;
    //item.img = document.getElementById("imgExplosion1");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 23;
    //item.img = document.getElementById("imgExplosion2");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 24;
    //item.img = document.getElementById("imgFlowerOff");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 25;
    //item.img = document.getElementById("imgPillar");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 26;
    //item.img = document.getElementById("imgEnemy2");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 27;
    //item.img = document.getElementById("imgPlank");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 28;
    //item.img = document.getElementById("imgCoal");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 29;
    //item.img = document.getElementById("imgBlock");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 30;
    //item.img = document.getElementById("imgEnemy3");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 31;
    //item.img = document.getElementById("imgBridgeBroken");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 32;
    //item.img = document.getElementById("imgBridgeFix");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 33;
    //item.img = document.getElementById("imgPerson");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 34;
    //item.img = document.getElementById("imgLava");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 35;
    //item.img = document.getElementById("imgVolcano");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 36;
    //item.img = document.getElementById("imgTrashcan");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 37;
    //item.img = document.getElementById("imgUpgrade");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 38;
    //item.img = document.getElementById("imgDowngrade");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 39;
    //item.img = document.getElementById("imgCursor");
    //images.push(item);

    //item = new ImageInfo();
    //item.id = 40;
    //item.img = document.getElementById("imgCloud");
    //images.push(item);
}

function finishInitImages() {
}