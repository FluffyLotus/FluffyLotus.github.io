﻿var enemies = [];

var ENEMY_FIRST = 0;
var ENEMY_FIRST2 = 1;
var ENEMY_HARD = 2;

function EnemyInfo() {
    this.id = 0;
    this.name = "";
    this.imageId = -1;
    this.baseLife = 5;
    this.movementSpeed = 1000;
    this.totalKill = 0;
}

function getEnemyFromId(id) {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].id == id)
            return enemies[i];
    }

    return null;
}

function initEnemy() {
    var item;

    item = new EnemyInfo();
    item.id = 0;
    item.name = "Enemy 1";
    item.imageId = IMAGE_ENEMY;
    item.baseLife = 5;
    item.movementSpeed = 500;
    enemies.push(item);

    item = new EnemyInfo();
    item.id = 1;
    item.name = "Enemy 2";
    item.imageId = IMAGE_ENEMY2;
    item.baseLife = 15;
    item.movementSpeed = 1000;
    enemies.push(item);

    item = new EnemyInfo();
    item.id = 2;
    item.name = "Enemy 3";
    item.imageId = IMAGE_ENEMY3;
    item.baseLife = 150;
    item.movementSpeed = 1000;
    enemies.push(item);
}