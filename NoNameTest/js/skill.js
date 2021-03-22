var SKILL_VITALITY = 0;
var SKILL_STRENGTH = 1;
var SKILL_DEFENCE = 2;

var SKILL_HEAL = 3;
var SKILL_FIRE = 4;

var SKILL_ENEMY_FIRE = 5;

var ELEMENT_NORMAL = 0;
var ELEMENT_RED = 1;
var ELEMENT_GREEN = 2;
var ELEMENT_BLUE = 3;
var ELEMENT_DARK = 4;

var SKILL_TYPE_NONE = 0;
var SKILL_TYPE_ATTRIBUTE = 1;
var SKILL_TYPE_HEAL = 2;
var SKILL_TYPE_ATTACK = 3;
var SKILL_TYPE_SHIELD = 4;

var SKILL_SUBTYPE_NONE = 0;
var SKILL_SUBTYPE_VITALITY = 1;
var SKILL_SUBTYPE_STRENGTH = 2;
var SKILL_SUBTYPE_DEFENCE = 3;
var SKILL_SUBTYPE_SPEED = 4;

/*

var SKILL_ATTRIBUTE [value increase attribute]
    Vitality
    Strength
    Defence
    Speed
var SKILL_TYPE_HEAL [value increase health]
var SKILL_TYPE_ATTACK [value increase elemental attack]
    Element
var SKILL_TYPE_SHIELD [value increase elemental shield]
    Element

duration [tick]
cooldown [tick]

*/

// Walking speed, use time essence

function elementValueInformation() {
    this.element = 0;
    this.value = 0;
}

function createElementValueInformation(el, va) {
    var ret = new elementValueInformation();

    ret.element = el;
    ret.value = va;

    return ret;
}

function appendElementValue(list, el, va) {
    var found = false;

    for (var t = 0; t < list.length; t++) {
        if (list[t].element == el) {
            list[t].value += va;
            found = true;
        }
    }

    if (!found)
        list.push(createElementValueInformation(el, va));
}

function skillInformation() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.cooldown = 0;
    this.duration = 1;

    this.element = 0;
    this.skillType = 0;
    this.skillSubType = 0;

    this.isForEnemy = false; // Not used in the system

    this.trainingRequirements = [];
    this.useRequirements = [];

    this.baseAmount = 0;
    this.mulAmount = 0;
}

skillInformation.prototype.isPassive = function () {
    return this.useRequirements.length == 0;
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
    newItem.description = "+{0} life";
    newItem.cooldown = 0;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 10;
    newItem.skillType = SKILL_TYPE_ATTRIBUTE;
    newItem.skillSubType = SKILL_SUBTYPE_VITALITY;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(3, 4), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 1;
    newItem.name = "Strength";
    newItem.description = "+{0} regular damage";
    newItem.cooldown = 0;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.skillType = SKILL_TYPE_ATTRIBUTE;
    newItem.skillSubType = SKILL_SUBTYPE_STRENGTH;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(3, 4), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 2;
    newItem.name = "Defence";
    newItem.description = "+{0} regular defence";
    newItem.cooldown = 0;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.skillType = SKILL_TYPE_ATTRIBUTE;
    newItem.skillSubType = SKILL_SUBTYPE_DEFENCE;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(3, 4), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 3;
    newItem.name = "Heal";
    newItem.description = "Heal {0} life";
    newItem.cooldown = 10;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 10;
    newItem.skillType = SKILL_TYPE_HEAL;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 1), 1.0));
    newItem.useRequirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 1), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 4;
    newItem.name = "Fire";
    newItem.description = "Hit {0} fire damage";
    newItem.cooldown = 2;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.skillType = SKILL_TYPE_ATTACK;
    newItem.element = ELEMENT_RED;
    newItem.trainingRequirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0));
    newItem.useRequirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0));
    skills.push(newItem);

    newItem = new skillInformation();
    newItem.id = 5;
    newItem.isForEnemy = true;
    newItem.name = "Fire";
    newItem.description = "";
    newItem.cooldown = 5;
    newItem.duration = 1;
    newItem.baseAmount = 0;
    newItem.mulAmount = 1;
    newItem.skillType = SKILL_TYPE_ATTACK;
    newItem.element = ELEMENT_RED;
    skills.push(newItem);
}

function setRefSkills() {
    for (var t = 0; t < skills.length; t++) {
        setRefResourceLinks(skills[t].trainingRequirements);
        setRefResourceLinks(skills[t].useRequirements);
    }
}