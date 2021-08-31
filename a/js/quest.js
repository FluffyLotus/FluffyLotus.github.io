var quests = [];

var QUEST_PORT = 0;
var QUEST_FISHERMAN = 1;
var QUEST_STANDING = 2;
var QUEST_FIRST = 3;
var QUEST_BRIDGE = 4;
var QUEST_PORTCITY = 5;
var QUEST_ROAD = 6;

function QuestInformation() {
    this.id = 0;
    this.title = "";
    this.description = "";
    this.completeDescription = "";
    this.requirements = [];
    this.rewards = [];
    this.completed = false;
}

QuestInformation.prototype.canComplete = function () {
    if (this.completed)
        return false;
    if (hasDataLinks(this.requirements))
        return true;
    return false;
}

QuestInformation.prototype.complete = function () {
    if (!this.canComplete())
        return false;

    removeDataLinks(this.requirements);
    addDataLinks(this.rewards);
    this.completed = true;

    return true;
}

function getQuestFromId(id) {
    for (var i = 0; i < quests.length; i++) {
        if (quests[i].id == id)
            return quests[i];
    }

    return null;
}

function initQuest() {
    var item;

    item = new QuestInformation();
    item.id = 0;
    item.title = "Port";
    item.description = "We need material to fix the ship.";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_PLANK, 1000));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 2, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 1;
    item.title = "Fisherman";
    item.description = "I need fish.";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_FISH, 1000));
    quests.push(item);

    item = new QuestInformation();
    item.id = 2;
    item.title = "Standing Man";
    item.description = "It's dangerous, show me you can handle it.";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink(DLTYPE_ENEMY, DLSUBTYPE_KILL, ENEMY_FIRST, 30));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 3, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 3;
    item.title = "Start your adventure";
    item.description = "Build an axe and pickaxe with storage to move forward.";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 1000));
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_STONE, 1000));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 1, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 4;
    item.title = "Fix bridge";
    item.description = "Need to fix the bridge.";
    item.completeDescription = "I did an investigation.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 10000));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_TOWER1, 1));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_PLANK, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 5;
    item.title = "Port city";
    item.description = "Our carpenter went to the west to investigage. Can you help us first?";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_FLOWER, 10));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 4, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 6;
    item.title = "Road";
    item.description = "I can show you have to build road.";
    item.completeDescription = "Ended";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_STONE, 100));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_ROAD, 1));
    quests.push(item);
}