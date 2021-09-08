var enemies = [];

/*
var ENEMY_FIRST = 0;
var ENEMY_FIRST2 = 1;
var ENEMY_HARD = 2;
*/

function EnemyInfo() {
    this.id = 0;
    this.name = "";
    this.imageId = -1;
    this.baseLife = 5;
    this.movementSpeed = 1000;
    this.totalKill = 0;

    this.imageRef = null;
}

function getEnemyFromId(id) {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].id == id)
            return enemies[i];
    }

    return null;
}

function initEnemy() {
    for (var t = 0; t < enemyData.length; t++) {
        var item = new EnemyInfo();

        item.id = enemyData[t].id;
        item.name = enemyData[t].n;
        item.imageId = enemyData[t].im;
        item.baseLife = enemyData[t].bl;
        item.movementSpeed = enemyData[t].ms;
        enemies.push(item);
    }

    /*
    var item;

    item = new EnemyInfo();
    item.id = 0;
    item.name = "Enemy 1";
    item.imageId = "enemy";
    item.baseLife = 5;
    item.movementSpeed = 500;
    enemies.push(item);

    item = new EnemyInfo();
    item.id = 1;
    item.name = "Enemy 2";
    item.imageId = "enemy2";
    item.baseLife = 15;
    item.movementSpeed = 1000;
    enemies.push(item);

    item = new EnemyInfo();
    item.id = 2;
    item.name = "Enemy 3";
    item.imageId = "enemy3";
    item.baseLife = 150;
    item.movementSpeed = 1000;
    enemies.push(item);
    */
}

function finishInitEnemy() {
    for (var t = 0; t < enemies.length; t++) {
        enemies[t].imageRef = getImageFromName(enemies[t].imageId);
    }
}