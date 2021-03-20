var ADV_ACTION_WALK = 1;
var ADV_ACTION_ATTACK = 2;

var ADVENTURE_MAP_GRID_WIDTH = 3;
var ADVENTURE_MAP_GRID_LENGTH = 20;
var ADVENTURE_MAP_BACK_LENGTH = 7;

function mapAdventureEnemyInstanceInformation() {
    this.distance = 0;
    this.enemy = null;
}

function mapAdventureInstanceInformation() {
    this.currentMapAdventureId = 0;
    this.currentAction = ADV_ACTION_WALK;

    this.canRun = false;

    this.currentPlayer = null;
    this.currentEnemy = null;

    this.mapGridStart = 0;
    this.mapGrid = [];
    this.mapEnemies = [];
}

mapAdventureInstanceInformation.prototype.changeMap = function (newMapId, distance) {
    this.currentMapAdventureId = newMapId;
    this.currentAction = ADV_ACTION_WALK;
    this.currentEnemy = null;

    getMapAdventureFromId(this.currentMapAdventureId).setDistance(distance);

    this.loadMapGrid();
}

mapAdventureInstanceInformation.prototype.loadMapGrid = function () {
    var map = getMapAdventureFromId(this.currentMapAdventureId);

    this.mapGridStart = map.currentDistance - ADVENTURE_MAP_BACK_LENGTH;

    if (this.mapGridStart < 0)
        this.mapGridStart = 0;

    this.mapGrid = [];
    this.mapEnemies = [];

    for (var y = 0; y < ADVENTURE_MAP_GRID_LENGTH; y++) {
        for (var x = 0; x < ADVENTURE_MAP_GRID_WIDTH; x++) {
            if (x == 0)
                this.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)] = map.nearTiles[getRandInteger(0, map.nearTiles.length)];
            else
                this.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)] = map.farTiles[getRandInteger(0, map.farTiles.length)];
        }
    }

    for (var y = 0; y < ADVENTURE_MAP_GRID_LENGTH; y++) {
        var newEnemy = getMapAdventureFromId(this.currentMapAdventureId).getPossibleEnemy2(this.mapGridStart + y);

        if (newEnemy != null) {
            var item = new mapAdventureEnemyInstanceInformation();

            item.distance = this.mapGridStart + y;
            item.enemy = newEnemy;

            this.mapEnemies.push(item);
        }
    }
}

mapAdventureInstanceInformation.prototype.updateMapGrid = function () {
    var map = getMapAdventureFromId(this.currentMapAdventureId);

    if (this.mapGridStart + ADVENTURE_MAP_GRID_LENGTH > map.currentDistance) {
        while (this.mapGridStart + ADVENTURE_MAP_BACK_LENGTH < map.currentDistance) {
            for (var y = 0; y < ADVENTURE_MAP_GRID_LENGTH - 1; y++) {
                for (var x = 0; x < ADVENTURE_MAP_GRID_WIDTH; x++) {
                    this.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)] = this.mapGrid[x + ((y + 1) * ADVENTURE_MAP_GRID_WIDTH)];
                }
            }

            var y = ADVENTURE_MAP_GRID_LENGTH - 1;

            for (var x = 0; x < ADVENTURE_MAP_GRID_WIDTH; x++) {
                if (x == 0)
                    this.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)] = map.nearTiles[getRandInteger(0, map.nearTiles.length)];
                else
                    this.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)] = map.farTiles[getRandInteger(0, map.farTiles.length)];
            }

            this.mapGridStart += 1;

            var newEnemy = getMapAdventureFromId(this.currentMapAdventureId).getPossibleEnemy2(this.mapGridStart + ADVENTURE_MAP_GRID_LENGTH);

            if (newEnemy != null) {
                var item = new mapAdventureEnemyInstanceInformation();

                item.distance = this.mapGridStart + ADVENTURE_MAP_GRID_LENGTH;
                item.enemy = newEnemy;

                this.mapEnemies.push(item);
            }
        }
    }
    else {
        this.loadMapGrid();
    }
}

mapAdventureInstanceInformation.prototype.prepareTick = function () {
    if (!this.canRun)
        return;

    if (this.currentPlayer != null) this.currentPlayer.prepareTick();
    if (this.currentEnemy != null) this.currentEnemy.prepareTick();
}

mapAdventureInstanceInformation.prototype.processTick = function () {
    if (!this.canRun)
        return;

    this.currentPlayer.processTick();
    this.currentPlayer.processPassiveSkills();
    this.currentPlayer.processHealthSkills();

    if (this.currentAction == ADV_ACTION_WALK) {
        getMapAdventureFromId(this.currentMapAdventureId).increaseDistance();
        getMapAdventureFromId(this.currentMapAdventureId).processEndOfMap();

        this.updateMapGrid();

        for (var t = 0; t < this.mapEnemies.length; t++) {
            if (getMapAdventureFromId(this.currentMapAdventureId).currentDistance + 1 == this.mapEnemies[t].distance) {
                this.currentAction = ADV_ACTION_ATTACK;
                this.currentEnemy = this.mapEnemies[t].enemy;
            }
        }
        //var newEnemy = getMapAdventureFromId(this.currentMapAdventureId).getPossibleEnemy();

        //if (newEnemy != null) {
        //    this.currentAction = ADV_ACTION_ATTACK;
        //    this.currentEnemy = newEnemy;
        //}
    }
    else if (this.currentAction == ADV_ACTION_ATTACK) {
        this.currentEnemy.processTick();

        this.currentPlayer.processAttackSkills();
        this.currentPlayer.processDefenceSkills();

        this.currentEnemy.processAttackSkills();
        this.currentEnemy.processDefenceSkills();

        var playerAttack = this.currentPlayer.getAllAttack();
        var enemyAttack = this.currentEnemy.getAllAttack();

        var playerDefence = this.currentPlayer.getAllDefence();
        var enemyDefence = this.currentEnemy.getAllDefence();

        var playerHit = processAttack(playerAttack, enemyDefence);
        var enemyHit = processAttack(enemyAttack, playerDefence);

        this.currentPlayer.addVitality(-enemyHit);
        this.currentEnemy.addVitality(-playerHit);

        if (this.currentPlayer.isDead()) {
            getEnemyFromId(this.currentEnemy.enemyId).killCount += 1;
            this.currentPlayer.deathCount += 1;

            this.currentPlayer.revive();

            //getMapAdventureFromId(this.currentMapAdventureId).setDistance(getMapAdventureFromId(this.currentMapAdventureId).getCurrentCheckpoint());
            this.changeMap(this.currentMapAdventureId, getMapAdventureFromId(this.currentMapAdventureId).getCurrentCheckpoint());
            //this.currentAction = ADV_ACTION_WALK;
            //this.currentEnemy = null;

        }
        else if (this.currentEnemy.isDead()) {
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy.processDeath();

            for (var t = 0; t < this.mapEnemies.length; t++) {
                if (getMapAdventureFromId(this.currentMapAdventureId).currentDistance + 1 == this.mapEnemies[t].distance) {
                    this.mapEnemies.splice(t, 1);
                    break;
                }
            }

            this.currentEnemy = null;
        }
    }
}

function loadMapAdventureInstance() {
    currentMapAdventure = new mapAdventureInstanceInformation();
    currentMapAdventure.currentPlayer = createPlayer();
    currentMapAdventure.currentPlayer.revive();
}

function processAttack(listOfAttack, listOfDefence) {
    var totalHit = 0;

    for (var a = 0; a < listOfAttack.length; a++) {
        var at = listOfAttack[a].value;
        var de = 0;

        for (d = 0; d < listOfDefence.length; d++) {
            if (listOfDefence[d].element == listOfAttack[a].element)
                de += listOfDefence[d].value;
        }

        at -= de;
        if (at < 0) at = 0;

        totalHit += at;
    }

    return totalHit;
}