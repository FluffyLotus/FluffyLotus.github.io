var ADV_ACTION_WALK = 1;
var ADV_ACTION_ATTACK = 2;

function mapAdventureInstanceInformation() {
    this.currentMapAdventureId = 0;
    this.currentAction = ADV_ACTION_WALK;

    this.canRun = false;

    this.currentPlayer = null;
    this.currentEnemy = null;
}

mapAdventureInstanceInformation.prototype.changeMap = function (newMapId, distance) {
    this.currentMapAdventureId = newMapId;
    this.currentAction = ADV_ACTION_WALK;
    this.currentEnemy = null;

    getMapAdventureFromId(this.currentMapAdventureId).setDistance(distance);
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

        var newEnemy = getMapAdventureFromId(this.currentMapAdventureId).getPossibleEnemy();

        if (newEnemy != null) {
            this.currentAction = ADV_ACTION_ATTACK;
            this.currentEnemy = newEnemy;
        }
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

            getMapAdventureFromId(this.currentMapAdventureId).setDistance(getMapAdventureFromId(this.currentMapAdventureId).getCurrentCheckpoint());
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy = null;

            this.currentPlayer.revive();
        }
        else if (this.currentEnemy.isDead()) {
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy.processDeath();

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