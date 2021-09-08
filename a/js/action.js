var actions = [];
/*
var ACTION_GIVE_WOOD = 0;
var ACTION_GIVE_STONE = 1;
var ACTION_GIVE_FLOWER = 2;
var ACTION_GIVE_FISH = 3;
var ACTION_GIVE_FRUIT = 4;
*/
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

    /*
    var item;

    item = new ActionInfo();
    item.id = 0;
    item.name = "Give Wood";
    item.reward.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 1));
    actions.push(item);

    item = new ActionInfo();
    item.id = 1;
    item.name = "Give Stone";
    item.reward.push(createDataLink_ResourceAmount(RESOURCE_STONE, 1));
    actions.push(item);

    item = new ActionInfo();
    item.id = 2;
    item.name = "Give Flower";
    item.reward.push(createDataLink_ResourceAmount(RESOURCE_FLOWER, 1));
    actions.push(item);

    item = new ActionInfo();
    item.id = 3;
    item.name = "Give Fish";
    item.reward.push(createDataLink_ResourceAmount(RESOURCE_FISH, 1));
    actions.push(item);

    item = new ActionInfo();
    item.id = 4;
    item.name = "Give Fruit";
    item.reward.push(createDataLink_ResourceAmount(RESOURCE_FRUIT, 1));
    actions.push(item);
    */
}

function finishInitActions() {
    for (var t = 0; t < actions.length; t++) {
        finishDataLinksInit(actions[t].reward);
    }
}