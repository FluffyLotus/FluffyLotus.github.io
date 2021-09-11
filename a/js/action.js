var actions = [];

function ActionInfo() {
    this.id = 0;
    this.name = "";
    this.reward = [];
}

ActionInfo.prototype.process = function () {
    addDataLinks(this.reward);
}

function getActionFromId(id) {
    for (var i = 0; i < actions.length; i++) {
        if (actions[i].id == id)
            return actions[i];
    }

    return null;
}

function initActions() {
    for (var t = 0; t < actionData.length; t++) {
        var item = new ActionInfo();

        item.id = actionData[t].id;
        item.name = actionData[t].n;

        for (var tt = 0; tt < actionData[t].rw.length; tt++) {
            item.reward.push(createDataLink(actionData[t].rw[tt].t, actionData[t].rw[tt].st, actionData[t].rw[tt].o, actionData[t].rw[tt].a));
        }

        actions.push(item);
    }
}

function finishInitActions() {
    for (var t = 0; t < actions.length; t++) {
        finishDataLinksInit(actions[t].reward);
    }
}