var ADV_ACTION_WALK = 1;
var ADV_ACTION_ATTACK = 2;

function mapAdventureInformation() {
    this.currentDistance = 0;
    this.maxDistance = 0;
    this.currentAction = ADV_ACTION_WALK;

    this.currentPlayer = null;
    this.currentEnemy = null;
}

function loadAdventure() {
    mapAdventure = new mapAdventureInformation();
    mapAdventure.currentPlayer = new playerInformation();
}

mapAdventureInformation.prototype.prepareTick = function () {
    if (this.currentPlayer != null) this.currentPlayer.prepareTick();
    if (this.currentEnemy != null) this.currentEnemy.prepareTick();
}

mapAdventureInformation.prototype.processTick = function () {
    if (document.getElementById("playerUseManaHeal").checked) { // TODO
        if (this.currentPlayer.vitality < this.currentPlayer.maxVatility) {
            if (resources[RESOURCE_GREENMANA].amount >= 10) {
                resources[RESOURCE_GREENMANA].addAmount(-10);

                this.currentPlayer.addVitality(10);
            }
        }
    }

    if (this.currentAction == ADV_ACTION_WALK) {
        this.currentDistance += 1;

        if (this.currentDistance > this.maxDistance)
            this.maxDistance = this.currentDistance;

        if ((this.currentDistance % 10) == 0) {
            this.currentAction = ADV_ACTION_ATTACK;

            if (this.currentDistance < 1500)
                this.currentEnemy = createEnemyInstance(ENEMY_BUNNY, parseInt(this.currentDistance / 1000) + 1);
            else if (this.currentDistance < 2500)
                this.currentEnemy = createEnemyInstance(ENEMY_RAT, parseInt(this.currentDistance / 1000) + 1);
            else
                this.currentEnemy = createEnemyInstance(ENEMY_DEVIL, parseInt(this.currentDistance / 1000) + 1);
        }
    }
    else if (this.currentAction == ADV_ACTION_ATTACK) {
        var mul = 1;

        if (document.getElementById("playerUseManaFire").checked) { // TODO
            if (resources[RESOURCE_REDMANA].amount >= 10) {
                resources[RESOURCE_REDMANA].addAmount(-10);

                mul = 2;
            }
        }

        this.currentPlayer.addVitality(-enemies[this.currentEnemy.enemyId].strength);
        this.currentEnemy.addVitality(-this.currentPlayer.strength * mul);

        if (this.currentPlayer.isDead()) {
            this.currentDistance = 0;
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy = null;
            this.currentPlayer.vitality = this.currentPlayer.maxVatility;
        }
        else if (this.currentEnemy.isDead()) {
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy = null;
        }
    }
}