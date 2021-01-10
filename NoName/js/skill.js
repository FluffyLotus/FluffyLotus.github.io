var SKILL_VITALITY = 0;
var SKILL_STRENGTH = 1;
var SKILL_DEFENCE = 2;

var SKILL_HEAL = 3;
var SKILL_FIRE = 4;

// Walking speed, use time essence

function skillInformation() {
    this.id = 0;
    this.name = "";
    this.cooldown = 0;

    this.trainingRequirements = [];
    this.useRequirements = [];

    this.baseAmount = 0;
    this.mulAmount = 0;
}

skillInformation.prototype.getAmount = function (level) {
    return this.baseAmount + level * this.mulAmount;
}

skillInformation.prototype.canTrain = function (level) {
    return hasResourceLink(this.trainingRequirements, level);
}

skillInformation.prototype.train = function (level) {
    removeResourceLink(this.trainingRequirements, level);
}

skillInformation.prototype.canExecute = function (level) {
    return hasResourceLink(this.useRequirements, level);
}

skillInformation.prototype.execute = function (level) {
    removeResourceLink(this.useRequirements, level);
}

function loadSkills() {
    skills[0] = new skillInformation();
    skills[0].id = 0;
    skills[0].name = "Vitality";
    skills[0].cooldown = 0;
    skills[0].baseAmount = 0;
    skills[0].mulAmount = 10;
    skills[0].trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, 0, 1, 0, 1.0));

    skills[1] = new skillInformation();
    skills[1].id = 1;
    skills[1].name = "Strength";
    skills[1].cooldown = 0;
    skills[1].baseAmount = 0;
    skills[1].mulAmount = 1;
    skills[1].trainingRequirements.push(createResourceLink(RESOURCE_WOOD, 0, 1, 0, 1.0));

    skills[2] = new skillInformation();
    skills[2].id = 2;
    skills[2].name = "Defence";
    skills[2].cooldown = 0;
    skills[2].baseAmount = 0;
    skills[2].mulAmount = 1;
    skills[2].trainingRequirements.push(createResourceLink(RESOURCE_STONE, 0, 1, 0, 1.0));

    skills[3] = new skillInformation();
    skills[3].id = 3;
    skills[3].name = "Heal";
    skills[3].cooldown = 10;
    skills[3].baseAmount = 0;
    skills[3].mulAmount = 10;
    skills[3].trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, 0, 1, 0, 1.0));
    skills[3].useRequirements.push(createResourceLink(RESOURCE_GREENMANA, 0, 1, 0, 1.0));

    skills[4] = new skillInformation();
    skills[4].id = 4;
    skills[4].name = "Fire";
    skills[4].cooldown = 1;
    skills[4].baseAmount = 0;
    skills[4].mulAmount = 1;
    skills[4].trainingRequirements.push(createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0));
    skills[4].useRequirements.push(createResourceLink(RESOURCE_REDMANA, 0, 1, 0, 1.0));
}