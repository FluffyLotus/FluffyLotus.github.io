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
    mapAdventure.currentPlayer = createPlayer();
    mapAdventure.currentPlayer.revive();
}

mapAdventureInformation.prototype.prepareTick = function () {
    if (this.currentPlayer != null) this.currentPlayer.prepareTick();
    if (this.currentEnemy != null) this.currentEnemy.prepareTick();
}

mapAdventureInformation.prototype.getEnemyInstanceFromDistance = function () {
    if (this.currentDistance < 1000)
        return createEnemyInstance(ENEMY_BUNNY, parseInt(this.currentDistance / 1000) + 1);
    else if (this.currentDistance < 2000)
        return createEnemyInstance(ENEMY_RAT, parseInt(this.currentDistance / 1000) + 1);
    return createEnemyInstance(ENEMY_DEVIL, parseInt(this.currentDistance / 1000) + 1);
}

mapAdventureInformation.prototype.processTick = function () {
    mapAdventure.currentPlayer.processTick();

    //if (this.currentPlayer.canUseHealMagic) {
    if (this.currentPlayer.getSkillInstance(SKILL_HEAL).canExecute()) {
        if (this.currentPlayer.vitality < this.currentPlayer.getVitality()) {
            this.currentPlayer.getSkillInstance(SKILL_HEAL).execute();
            this.currentPlayer.addVitality(this.currentPlayer.getSkillInstance(SKILL_HEAL).getAmount());

            //if (resources[RESOURCE_GREENMANA].amount >= 10) {
            //    resources[RESOURCE_GREENMANA].addAmount(-10);

            //    this.currentPlayer.addVitality(10);
            //}
        }
    }

    if (this.currentAction == ADV_ACTION_WALK) {
        this.currentDistance += 1;

        if (this.currentDistance > this.maxDistance)
            this.maxDistance = this.currentDistance;

        if ((this.currentDistance % 10) == 0) {
            this.currentAction = ADV_ACTION_ATTACK;

            this.currentEnemy = this.getEnemyInstanceFromDistance();
        }
    }
    else if (this.currentAction == ADV_ACTION_ATTACK) {
        var mul = 1;
        var add = 0;

        //if (this.currentPlayer.canUseFireMagic) {
        if (this.currentPlayer.getSkillInstance(SKILL_FIRE).canExecute()) {
            this.currentPlayer.getSkillInstance(SKILL_FIRE).execute();

            mul = 1;
            add = this.currentPlayer.getSkillInstance(SKILL_FIRE).getAmount();

            //if (resources[RESOURCE_REDMANA].amount >= 10) {
            //    resources[RESOURCE_REDMANA].addAmount(-10);

            //    mul = 2;
            //}
        }

        this.currentPlayer.addVitality(-this.currentEnemy.strength);
        this.currentEnemy.addVitality(-(this.currentPlayer.getStrength() * mul + add));

        if (this.currentPlayer.isDead()) {
            enemies[this.currentEnemy.enemyId].killCount += 1;
            this.currentPlayer.deathCount += 1;

            this.currentDistance = 0;
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy = null;

            mapAdventure.currentPlayer.revive();
        }
        else if (this.currentEnemy.isDead()) {
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy.processDeath();
            this.currentPlayer.experience += this.currentEnemy.experienceGiven();

            this.currentEnemy = null;
        }
    }
}