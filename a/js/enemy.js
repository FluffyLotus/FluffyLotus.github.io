var enemies = [];

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
}

function finishInitEnemy() {
    for (var t = 0; t < enemies.length; t++) {
        enemies[t].imageRef = getImageFromName(enemies[t].imageId);
    }
}