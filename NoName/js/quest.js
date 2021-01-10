function questInformation() {
    this.id = 0;
    this.name = "";
    this.smallDescription = "";
    this.longDescription = "";
    this.compleDescription = "";
    this.passiveRequirements = []; // Requirements that gets completed automatic
    this.activeRequirements = []; // Requirements that need user input (ex: remove a resource)
    this.rewards = [];

    this.isActivated = false;
    this.isCompleted = false;
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

    if (this.smallDescription != "")
        messages.push(this.smallDescription);
}

questInformation.prototype.canComplete = function () {
    if (hasDataLink(this.passiveRequirements))
        return true;

    return false;
}

questInformation.prototype.setAsCompleted = function () {
    if (!this.canComplete())
        return false;
    
    this.isCompleted = true;

    if (this.compleDescription != "")
        messages.push(this.compleDescription);

    return true;
}

function loadQuests() {
    quests[0] = new questInformation();
    quests[0].id = 0;
    quests[0].name = "Find Carpenter";
    quests[0].smallDescription = "Our carpenter went to the next village a few days ago. I hope everything is ok, can you search for him?";
    quests[0].longDescription = "";
    quests[0].compleDescription = "Found the carpenter! But the quest ends here... The developper need to do something.";
    quests[0].passiveRequirements.push(createDataLink("adventure", "maxDistance", 0, 600));
}

function processQuestTick() {
    for (var i = 0; i < quests.length; i++) {
        quests[i].processTick();
    }
}