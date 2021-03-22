function questInformation() {
    this.id = 0;
    this.name = "";
    this.activatedDescription = "";
    this.compleDescription = "";
    this.activatedStory = "";
    this.compleStory = "";
    this.passiveRequirements = []; // Requirements that gets completed automatic
    this.activeRequirements = []; // Requirements that need user input (ex: remove a resource)
    this.startRewards = [];
    this.rewards = [];
    this.needToGoToLocation = false;

    this.foundMapId = -1;
    this.foundDistance = 0;

    this.isActivated = false;
    this.isResourceReserved = false;
    this.wentToLocation = false;
    this.isCompleted = false;

    this.foundMapRef = null; // TODO
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
    this.foundMapRef = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId);
    this.foundDistance = this.foundMapRef.currentDistance;

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
        this.wentToLocation = true;
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
    newItem.activatedDescription = "Village Elder: Our resource pipe got broken by the agitated animals. We need some wood and stone to rebuild them.";
    newItem.compleDescription = "Village Elder: With the pipes, we can link buildings with the storage unit.";
    newItem.activatedStory = "";
    newItem.compleStory = "";
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 500));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 500));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_STORAGEPIPE, 1));
    newItem.rewards.push(createDataLink("quest", "isActivated", 1, 1));
    newItem.rewards.push(createDataLink("quest", "isActivated", 11, 1));
    newItem.rewards.push(createDataLink("other", "startAdventure", 0, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 1;
    newItem.name = "Find Carpenter";
    newItem.activatedDescription = "Village Elder: I'm a bit worried. Our carpenter went to the town Barock, about 2km away, a few days ago but didn't return. I hope everything is ok.";
    newItem.compleDescription = "There's someone on the other side of the river. It might be the carpenter! He seems to be injured.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.passiveRequirements.push(createDataLink("adventure", "currentDistance", 0, 1200));
    newItem.rewards.push(createDataLink("quest", "isActivated", 2, 1));
    quests.push(newItem);
    
    newItem = new questInformation();
    newItem.id = 2;
    newItem.name = "Build Small Bridge";
    newItem.activatedDescription = "The carpenter needs help but he is on the other side of the river. A small bridge is needed to cross.";
    newItem.compleDescription = "Carpenter: Thanks a lot for saving me. Things are getting really dangerous.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.needToGoToLocation = true;
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 5000));
    newItem.rewards.push(createDataLink("quest", "isActivated", 8, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 3;
    newItem.name = "Begining";
    newItem.activatedDescription = "We need to prepare the town. Click on trees and mountain to get resources. Then build an axe and quary. Put a storage unit right beside them.";
    newItem.compleDescription = "";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem.\nVestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in.\nCurabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_AXE, 1));
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_PICK, 1));
    newItem.passiveRequirements.push(createDataLink("building", "buildAmount", BUILDING_STORAGE, 1));
    newItem.rewards.push(createDataLink("quest", "isActivated", 0, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 4;
    newItem.name = "Training";
    newItem.activatedDescription = "Village Trainer: These animals are more aggresive than expected. Can you help me build a training center in the village?";
    newItem.compleDescription = "Village Trainer: You can now use resources to build up your skills.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 1000));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 1000));
    newItem.rewards.push(createDataLink("playerSkills", "isActive", SKILL_STRENGTH, 1));
    newItem.rewards.push(createDataLink("playerSkills", "isActive", SKILL_DEFENCE, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 5;
    newItem.name = "Well";
    newItem.activatedDescription = "Woman: Getting water from the stream is getting harder with all the aggresive animals. I wish we could build a well in the village.";
    newItem.compleDescription = "Woman: This will help the village a lot.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 2500));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 2500));
    newItem.rewards.push(createDataLink("quest", "isActivated", 6, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 6;
    newItem.name = "Mana Building";
    newItem.activatedDescription = "Carpenter: We used to pull mana from the earth until it was banned. There's a story about a blueprint in the cemetary.";
    newItem.compleDescription = "Carpenter: I haven't seen this type of building before.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.startRewards.push(createDataLink("adventure", "isActive", 6, 1));
    newItem.startRewards.push(createDataLink("quest", "isActivated", 9, 1));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_Q_CEMETARYBLUEPRINT, 1));    
    newItem.rewards.push(createDataLink("building", "available", BUILDING_WOODEXTRACT, 1));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_STONEEXTRACT, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 7;
    newItem.name = "Help Village";
    newItem.activatedDescription = "Villager: Please help us, our village got destroyed and we need resource to fix it.";
    newItem.compleDescription = "Village: Thanks for helping rebuild to village. If you can help, we would need some storage units.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.needToGoToLocation = true;
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_STONE, 7500));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 7500));
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_PLANK, 2500));
    newItem.rewards.push(createDataLink("buildingMap", "isActive", MAP_BUILDING_SECOND, 1));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_STONEMASSON, 1));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_WAREHOUSE, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 8;
    newItem.name = "Build Saw Mill";
    newItem.activatedDescription = "Carpenter: With enought wood, I should be able to build a saw mill.";
    newItem.compleDescription = "Carpenter: Here's the blueprint to build sawmills.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.activeRequirements.push(createDataLink("resource", "amount", RESOURCE_WOOD, 7000));
    newItem.rewards.push(createDataLink("building", "available", BUILDING_SAWMILL, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 9;
    newItem.name = "Search For Blueprint";
    newItem.activatedDescription = "Search the cemetary for old blueprint.";
    newItem.compleDescription = "Carpenter: Here's the blueprint to build sawmills.";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.passiveRequirements.push(createDataLink("adventure", "currentDistance", 6, 900));
    newItem.rewards.push(createDataLink("resource", "amount", RESOURCE_Q_CEMETARYBLUEPRINT, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 10;
    newItem.name = "Cemetary Book";
    newItem.activatedDescription = "I keep seeing strange drawing on the walls. There might be something else in the cemetary.";
    newItem.compleDescription = "";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.passiveRequirements.push(createDataLink("adventure", "currentDistance", 6, 2900));
    newItem.rewards.push(createDataLink("playerSkills", "isActive", SKILL_HEAL, 1));
    quests.push(newItem);

    newItem = new questInformation();
    newItem.id = 11;
    newItem.name = "Go to the next village";
    newItem.activatedDescription = "Go to the town of Barock";
    newItem.compleDescription = "";
    newItem.activatedStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel mauris lorem. Vestibulum eu dignissim sapien, nec varius risus. Nullam a metus ut nisl porttitor porta at pretium leo. Praesent feugiat vel ex sed imperdiet. Mauris tristique viverra molestie. Nunc consequat pretium velit, eget egestas dolor accumsan non. Pellentesque id euismod sem, id dapibus nibh. Aenean eu lectus vitae dui posuere molestie. Curabitur aliquet quam ut pretium blandit. Donec ac tincidunt nibh. Nunc ultricies rhoncus euismod.";
    newItem.compleStory = "Mauris non ultricies justo. Etiam aliquet velit ex, eget viverra lorem commodo in. Curabitur laoreet nec eros id lacinia. Aenean in tristique ipsum. Aliquam elementum sed tellus vel dapibus. In ac eros ac felis pulvinar elementum. Vivamus molestie maximus dolor, eu ultricies lacus luctus eu. Donec tristique, arcu nec pretium porttitor, ipsum turpis vehicula nisi, id elementum leo diam sit amet metus. Maecenas iaculis mauris eu justo feugiat molestie.";
    newItem.passiveRequirements.push(createDataLink("adventure", "currentDistance", 0, 2200));
    quests.push(newItem);
}

function setRefQuests() {
    for (var t = 0; t < quests.length; t++) {
        setRefDataLink(quests[t].passiveRequirements);
        setRefDataLink(quests[t].activeRequirements);
        setRefDataLink(quests[t].startRewards);
        setRefDataLink(quests[t].rewards);
    }
}

function processQuestTick() {
    for (var i = 0; i < quests.length; i++) {
        quests[i].processTick();
    }
}