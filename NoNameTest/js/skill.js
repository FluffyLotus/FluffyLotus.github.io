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

function getSkillFromId(id) {
    for (var t = 0; t < skills.length; t++) {
        if (skills[t].id == id)
            return skills[t];
    }

    return null;
}

function loadSkills() {
    var newItem;

    newItem = new skillInformation();
    newItem.id = 0;
    newItem.name = "Vitality";
    newItem.cooldown = 0;
    newItem.baseAmount = 0;
    newItem.mulAmount = 10;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 1), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 1;
    newItem.name = "Strength";
    newItem.cooldown = 0;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(3, 2), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 2;
    newItem.name = "Defence";
    newItem.cooldown = 0;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(3, 2), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 3;
    newItem.name = "Heal";
    newItem.cooldown = 10;
    newItem.baseAmount = 0;
    newItem.mulAmount = 10;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 1), 1.0));
    newItem.useRequirements.push(createResourceLink(RESOURCE_GREENMANA, new formulaLinear(0, 1), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 4;
    newItem.name = "Fire";
    newItem.cooldown = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0));
    newItem.useRequirements.push(createResourceLink(RESOURCE_REDMANA, new formulaLinear(0, 1), 1.0));
    skills.push(newItem);
}