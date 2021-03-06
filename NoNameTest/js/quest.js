function questInformation() {
    this.id = 0;
    this.name = "";
    this.activatedDescription = "";
    this.compleDescription = "";
    this.passiveRequirements = []; // Requirements that gets completed automatic
    this.activeRequirements = []; // Requirements that need user input (ex: remove a resource)
    this.startRewards = [];
    this.rewards = [];
    this.needToGoToLocation = false;

    this.foundMapId = 0;
    this.foundDistance = 0;

    this.isActivated = false;
    this.isResourceReserved = false;
    this.wentToLocation = false;
    this.isCompleted = false;
}

questInformation.prototype.needToReserve = function () {
    if (this.activeRequirements.length > 0)
        return true;
    return false;
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
    if (this.isActivated) {
        if (!this.isResourceReserved && !this.needToReserve()) {
            if (this.canReserveResource()) {
                this.reserveResource();
            }
        }
        if (!this.isCompleted) {
            if (this.canComplete()) {
                this.setAsCompleted();
            }
        }
    }
}

questInformation.prototype.setAsActive = function () {
    if (this.isActivated)
        return false;

    this.isActivated = true;

    // Is this the best place to do it?
    this.foundMapId = currentMapAdventure.currentMapAdventureId;
    this.foundDistance = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId).currentDistance;

    addDataLink(this.startRewards);

    if (this.activatedDescription != "")
        messages.push(this.name + " - " + this.activatedDescription);
}

questInformation.prototype.canReserveResource = function () {
    if (!hasDataLink(this.passiveRequirements))
        return false;
    if (!hasDataLink(this.activeRequirements))
        return false;
    return true;
}

questInformation.prototype.reserveResource = function () {
    if (!this.canReserveResource())
        return false;

    removeDataLink(this.activeRequirements);

    this.isResourceReserved = true;

    return true;
}

questInformation.prototype.canInteract = function () {
    if (!this.isActivated)
        return true;
    if (!this.wentToLocation && this.needToGoToLocation)
        return true;
    return false;
}

questInformation.prototype.interact = function () {
    if (!this.canInteract())
        return false;

    if (!this.isActivated) {
        this.setAsActive();
    }
    else if (!this.wentToLocation && this.needToGoToLocation){
        this.wentToLocation;
    }

    return true;
}

questInformation.prototype.canComplete = function () {
    if (this.isCompleted)
        return false;
    if (!this.isActivated)
        return false;
    if (!this.isResourceReserved)
        return false;
    if (!this.wentToLocation && this.needToGoToLocation)
        return false;

    return true;
}

questInformation.prototype.setAsCompleted = function () {
    if (!this.canComplete())
        return false;

    this.isCompleted = true;

    if (this.compleDescription != "")
        messages.push(this.name + " - " + this.compleDescription);

    addDataLink(this.rewards);

    return true;
}

function getQuestFromId(id) {
    for (var t = 0; t < quests.length; t++) {
        if (quests[t].id == id)
            return quests[t];
    }

    return null;
}

function loadQuests() {
    var newItem;

    newItem = new questInformation();
    newItem.id = 0;
    newItem.name = "Resource Pipe";
    newItem.activatedDescription = "Our resource pipe got broken by the agitated animals. We need some wood and stone to rebuild them.";
    newItem.compleDescription = "With the pipes, we can link buildings with the storage unit.";
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 500));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 500));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_STORAGEPIPE, 1));
    newItem.rewards.push(createDataLink("quest", "isActivated", 1, 1));
    newItem.rewards.push(createDataLink("other", "startAdventure", 0, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 1;
    newItem.name = "Find Carpenter";
    newItem.activatedDescription = "I'm a bit worried. Our carpenter went to the town Barock, about 1km away, a few days ago but didn't return. I hope everything is ok.";
    newItem.compleDescription = "I think I found the carpenter! He seems to injured.";
    newItem.passiveRequirements.push(createDataLink("adventure", "currentDistance", 0, 600));
    newItem.rewards.push(createDataLink("quest", "isActivated", 2, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 2;
    newItem.name = "Build Small Bridge";
    newItem.activatedDescription = "The carpenter needs help but he is on the other side of the river. I would need to build a small bridge to get to him.";
    newItem.compleDescription = "Thanks a lot for saving me. I'm really weak.";
    newItem.needToGoToLocation = true;
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 5000));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_SAWMILL, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 3;
    newItem.name = "Begining";
    newItem.activatedDescription = "We need to prepare the town. Click on trees and mountain to get resources. Then build an axe and quary. Put a storage unit right beside them.";
    newItem.compleDescription = "";
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_AXE, 1));
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_PICK, 1));
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_STORAGE, 1));
    newItem.rewards.push(createDataLink("quest", "isActivated", 0, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 4;
    newItem.name = "Training";
    newItem.activatedDescription = "These animals are more aggresive than expected. You should use some of the resource to increase your skills.";
    newItem.compleDescription = "";
    newItem.startRewards.push(createDataLink("playerSkills", "isActive", SKILL_STRENGTH, 1));
    newItem.startRewards.push(createDataLink("playerSkills", "isActive", SKILL_DEFENCE, 1));
    newItem.passiveRequirements.push(createDataLink("playerSkills", "level", SKILL_STRENGTH, 2));
    newItem.passiveRequirements.push(createDataLink("playerSkills", "level", SKILL_DEFENCE, 2));
    quests.push(newItem);
}

function processQuestTick() {
    for (var i = 0; i < quests.length; i++) {
        quests[i].processTick();
    }
}