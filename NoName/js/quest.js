function questInformation() {
    this.id = 0;
    this.name = "";
    this.activatedDescription = "";
    this.compleDescription = "";
    this.passiveRequirements = []; // Requirements that gets completed automatic
    this.activeRequirements = []; // Requirements that need user input (ex: remove a resource)
    this.rewards = [];

    this.isActivated = false;
    this.isCompleted = false;
}

questInformation.prototype.getAllRequirements = function () {
    var r = [];

    r = r.concat(this.passiveRequirements);
    r = r.concat(this.activeRequirements);

    return r;
}

questInformation.prototype.isVisible = function () {
    return this.isActivated;
}

questInformation.prototype.processTick = function () {
    if (this.isActivated && !this.isCompleted) {
        if (this.canComplete()) {
            this.setAsCompleted();
        }
    }
}

questInformation.prototype.setAsActive = function () {
    this.isActivated = true;

    if (this.activatedDescription != "")
        messages.push(this.activatedDescription);
}

questInformation.prototype.canComplete = function () {
    if (!hasDataLink(this.passiveRequirements))
        return false;
    if (!hasDataLink(this.activeRequirements))
        return false;

    return true;
}

questInformation.prototype.setAsCompleted = function () {
    if (!this.canComplete())
        return false;

    removeDataLink(this.activeRequirements);

    this.isCompleted = true;

    if (this.compleDescription != "")
        messages.push(this.compleDescription);

    addDataLink(this.rewards);

    return true;
}

function loadQuests() {
    quests[0] = new questInformation();
    quests[0].id = 0;
    quests[0].name = "Resource Pipe";
    quests[0].activatedDescription = "Our resource pipe got broken by the agitated animals. We need some wood and stone to rebuild them.";
    quests[0].compleDescription = "With the pipes, we can link buildings with the storage unit.";
    quests[0].activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 100));
    quests[0].activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 100));
    quests[0].rewards.push(createDataLink("building", "available", BUILDING_STORAGEPIPE, 1));
    quests[0].rewards.push(createDataLink("quest", "isActivated", 1, 1));
    quests[0].rewards.push(createDataLink("other", "startAdventure", 0, 1));

    quests[1] = new questInformation();
    quests[1].id = 1;
    quests[1].name = "Find Carpenter";
    quests[1].activatedDescription = "I'm a bit worried. Our carpenter went to the town Barock, about 1km away, a few days ago but didn't return. I hope everything is ok.";
    quests[1].compleDescription = "I think I found the carpenter! He seems to injured.";
    quests[1].passiveRequirements.push(createDataLink("adventure", "maxDistance", 0, 600));
    quests[1].rewards.push(createDataLink("quest", "isActivated", 2, 1));

    quests[2] = new questInformation();
    quests[2].id = 2;
    quests[2].name = "Build Small Bridge";
    quests[2].activatedDescription = "The carpenter needs help but he is on the other side of the river. I would need to build a small bridge to get to him.";
    quests[2].compleDescription = "Thanks a lot for saving me. I'm really weak.";
    quests[2].activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 10000));
    quests[2].rewards.push(createDataLink("building", "available", BUILDING_SAWMILL, 1));

    quests[3] = new questInformation();
    quests[3].id = 3;
    quests[3].name = "Begining";
    quests[3].activatedDescription = "We need to prepare the town. Click on trees and mountain to get resources. Then build an axe and quary. Put a storage unit right beside them.";
    quests[3].compleDescription = "";
    quests[3].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_AXE, 1));
    quests[3].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_PICK, 1));
    quests[3].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_STORAGE, 1));
    quests[3].rewards.push(createDataLink("quest", "isActivated", 0, 1));

    //quests[4] = new questInformation();
    //quests[4].id = 4;
    //quests[4].name = "Training";
    //quests[4].activatedDescription = "These animals are more aggresive than expected. You should use some of the resource to increase your skills.";
    //quests[4].compleDescription = "";
    //quests[4].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_AXE, 1));
    //quests[4].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_PICK, 1));
    //quests[4].passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_STORAGE, 1));
}

function processQuestTick() {
    for (var i = 0; i < quests.length; i++) {
        quests[i].processTick();
    }
}