var quests = [];
/*
var QUEST_PORT = 0;
var QUEST_FISHERMAN = 1;
var QUEST_STANDING = 2;
var QUEST_FIRST = 3;
var QUEST_BRIDGE = 4;
var QUEST_PORTCITY = 5;
var QUEST_ROAD = 6;
var QUEST_PICKAXEMAN = 7;
*/
function QuestInformation() {
    this.id = 0;
    this.title = "";

    this.description = ""; // startStory
    this.completeDescription = ""; // endStory

    this.descriptionSummary = ""; // startSummary
    this.completeDescriptionSummary = ""; // endSummary

    this.requirements = [];
    this.rewards = [];
    this.completed = false;

    this.clickCount = 0;
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

QuestInformation.prototype.isNewQuest = function () {
    return this.clickCount == 0;
}

function getQuestFromId(id) {
    for (var i = 0; i < quests.length; i++) {
        if (quests[i].id == id)
            return quests[i];
    }

    return null;
}

function initQuest() {
    for (var t = 0; t < questData.length; t++) {
        var item = new QuestInformation();

        item.id = questData[t].id;
        item.title = questData[t].n;

        item.description = questData[t].ss;
        item.descriptionSummary = questData[t].su;

        item.completeDescription = questData[t].es;
        item.completeDescriptionSummary = questData[t].eu;

        for (var tt = 0; tt < questData[t].rq.length; tt++) {
            item.requirements.push(createDataLink(questData[t].rq[tt].t, questData[t].rq[tt].st, questData[t].rq[tt].o, questData[t].rq[tt].a));
        }

        for (var tt = 0; tt < questData[t].rw.length; tt++) {
            item.rewards.push(createDataLink(questData[t].rw[tt].t, questData[t].rw[tt].st, questData[t].rw[tt].o, questData[t].rw[tt].a));
        }

        quests.push(item);
    }


    /*
    var item;

    item = new QuestInformation();
    item.id = 0;
    item.title = "Build Boat";
    item.description += "- Our boat was damage in the latest storm.\n";
    item.description += "- Help us gather planks to fix the boat.";
    item.descriptionSummary = "Gather planks to fix the boat.";
    item.completeDescription += "- With the boat fix.\n";
    item.completeDescription += "- We can give you safe passage to the west.\n";
    item.completeDescriptionSummary = "The passage to the west is now open.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_PLANK, 1000));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 2, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 1;
    item.title = "Fisherman";
    item.description += "- I'm having trouble gathering fish.\n";
    item.description += "- Can you help me gather some fishes?.\n";
    item.description += "- I won't give you anything since the developper did not finish my quest.";
    item.descriptionSummary = "Gather fish for nothing.";
    item.completeDescription += "- How...\n";
    item.completeDescription += "- How can you gather so many fish?!";
    item.completeDescriptionSummary = "... wow! ... that's all I can say.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_FISH, 1000));
    quests.push(item);

    item = new QuestInformation();
    item.id = 2;
    item.title = "Standing Man";
    item.description += "- It's very dangerous up north.\n";
    item.description += "- I can't let anybody go there.\n";
    item.description += "- Show me your strength and I will let you go.";
    item.descriptionSummary = "It's dangerous, show me you can handle it.";
    item.completeDescription += "- You are very strong.\n";
    item.completeDescription += "- Good luck!";
    item.completeDescriptionSummary = "The passage to the north is now open.";
    item.requirements.push(createDataLink(DLTYPE_ENEMY, DLSUBTYPE_KILL, ENEMY_FIRST, 100));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 3, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 3;
    item.title = "Start your adventure";
    item.description += "- You want to go up north?\n";
    item.description += "- We really need you here...\n";
    item.description += "- Can you help us gather some wood and stone before going on your journey?";
    item.descriptionSummary = "Get wood and stone to continue the path north.";
    item.completeDescription += "- With these resources, we will be able to keep the village running for a while.\n";
    item.completeDescription += "- Good luck on your journey up north.";
    item.completeDescriptionSummary = "After giving the resources, the path north was open.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 1000));
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_STONE, 1000));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 1, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 4;
    item.title = "Broken Bridge";
    item.description += "- Help!\n";
    item.description += "- I was investigating the crystal and the bridge collapse.\n";
    item.description += "- Can you gather wood and help fix the bridge?";
    item.descriptionSummary = "Gather wood to fix the bridge.";
    item.completeDescription += "- I did some investigation.\n";
    item.completeDescription += "- The crystal are getting active.\n";
    item.completeDescription += "- I think we need to start protecting the city.\n";
    item.completeDescription += "- Here are some blueprint.";
    item.completeDescriptionSummary = "The carpender gave tower and plank blueprint.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 10000));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_TOWER1, 1));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_PLANK, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 5;
    item.title = "Port city";
    item.description += "- Our carpenter went to the west to investigage.\n";
    item.description += "- Can you help us gather fruits?\n";
    item.description += "- We will open the path to the west.";
    item.descriptionSummary = "Gather fruits to open the path to the west.";
    item.completeDescription += "- The path to the west is now open.\n";
    item.completeDescription += "- Please, see if the carpenter is ok.";
    item.completeDescriptionSummary = "The path to the west is open.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_FRUIT, 20));
    item.rewards.push(createDataLink(DLTYPE_MAP, DLSUBTYPE_ACTIVE, 4, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 6;
    item.title = "Builder";
    item.description += "- It will get difficult if you don't build roads.\n";
    item.description += "- Bring me some stone and I'll teach you how.";
    item.descriptionSummary = "Get stone to get the blueprint for roads.";
    item.completeDescription += "- This is enought stone.\n";
    item.completeDescription += "- Here's the blueprint on how to build roads.";
    item.completeDescriptionSummary = "The builder gave the blueprint for roads.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_STONE, 100));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_ROAD, 1));
    quests.push(item);

    item = new QuestInformation();
    item.id = 7;
    item.title = "Miner";
    item.description += "- ???.\n";
    item.description += "- ???.";
    item.descriptionSummary = "Get stone to get the blueprint for block.";
    item.completeDescription += "- ???\n";
    item.completeDescription += "- ???.";
    item.completeDescriptionSummary = "The miner gave the blueprint for block.";
    item.requirements.push(createDataLink_ResourceAmount(RESOURCE_STONE, 300000));
    item.rewards.push(createDataLink(DLTYPE_BUILDING, DLSUBTYPE_VISIBLE, BUILDING_BLOCK, 1));
    quests.push(item);
    */
}

function finishInitQuest() {
    for (var t = 0; t < quests.length; t++) {
        finishDataLinksInit(quests[t].requirements);
        finishDataLinksInit(quests[t].rewards);
    }
}