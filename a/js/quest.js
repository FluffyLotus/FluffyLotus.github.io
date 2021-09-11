var quests = [];

function QuestInformation() {
    this.id = 0;
    this.title = "";

    this.startStory = "";
    this.endStory = "";

    this.startSummary = "";
    this.endSummary = "";

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

        item.startStory = questData[t].ss;
        item.startSummary = questData[t].su;

        item.endStory = questData[t].es;
        item.endSummary = questData[t].eu;

        for (var tt = 0; tt < questData[t].rq.length; tt++) {
            item.requirements.push(createDataLink(questData[t].rq[tt].t, questData[t].rq[tt].st, questData[t].rq[tt].o, questData[t].rq[tt].a));
        }

        for (var tt = 0; tt < questData[t].rw.length; tt++) {
            item.rewards.push(createDataLink(questData[t].rw[tt].t, questData[t].rw[tt].st, questData[t].rw[tt].o, questData[t].rw[tt].a));
        }

        quests.push(item);
    }
}

function finishInitQuest() {
    for (var t = 0; t < quests.length; t++) {
        finishDataLinksInit(quests[t].requirements);
        finishDataLinksInit(quests[t].rewards);
    }
}