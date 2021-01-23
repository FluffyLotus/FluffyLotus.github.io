var ADV_ACTION_WALK = 1;
var ADV_ACTION_ATTACK = 2;

function mapAdventureInstanceInformation() {
    this.currentMapAdventureId = 0;
    this.currentAction = ADV_ACTION_WALK;

    this.canRun = false;

    this.currentPlayer = null;
    this.currentEnemy = null;
}

mapAdventureInstanceInformation.prototype.changeMap = function (newMapId) {
    this.currentMapAdventureId = newMapId;
    this.currentAction = ADV_ACTION_WALK;
    this.currentEnemy = null;

    mapAdventures[this.currentMapAdventureId].setDistance(0);
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
        mapAdventures[this.currentMapAdventureId].increaseDistance();

        var newEnemy = mapAdventures[this.currentMapAdventureId].getPossibleEnemy();

        if (newEnemy != null) {
            this.currentAction = ADV_ACTION_ATTACK;
            this.currentEnemy = newEnemy;
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

        var hit;

        hit = this.currentEnemy.strength - this.currentPlayer.getDefence();
        if (hit < 0) hit = 0;

        this.currentPlayer.addVitality(-hit);

        hit = this.currentPlayer.getStrength() * mul + add - this.currentEnemy.defence;
        if (hit < 0) hit = 0;

        this.currentEnemy.addVitality(-hit);

        if (this.currentPlayer.isDead()) {
            enemies[this.currentEnemy.enemyId].killCount += 1;
            this.currentPlayer.deathCount += 1;

            mapAdventures[this.currentMapAdventureId].setDistance(0);
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy = null;

            this.currentPlayer.revive();
        }
        else if (this.currentEnemy.isDead()) {
            this.currentAction = ADV_ACTION_WALK;
            this.currentEnemy.processDeath();
            //this.currentPlayer.experience += this.currentEnemy.experienceGiven();

            if (Math.random() < 0.1) {
                cards[enemies[this.currentEnemy.enemyId].cardGiven].amount++;
            }

            this.currentEnemy = null;
        }
    }

    // This should be a quest?
    if (this.currentMapAdventureId == 0 && mapAdventures[this.currentMapAdventureId].maxDistance == 65) {
        canViewskills = true;
        messages.push("These animals are more aggresive than expected. You should use some of the resource to increase your skills.");
    }
}

function loadMapAdventureInstance() {
    currentMapAdventure = new mapAdventureInstanceInformation();
    currentMapAdventure.currentPlayer = createPlayer();
    currentMapAdventure.currentPlayer.revive();
}