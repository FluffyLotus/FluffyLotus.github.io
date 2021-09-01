var actions = [];

var ACTION_GIVE_WOOD = 0;
var ACTION_GIVE_STONE = 1;
var ACTION_GIVE_FLOWER = 2;
var ACTION_GIVE_FISH = 3;

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
}

function finishInitActions() {
    for (var t = 0; t < actions.length; t++) {
        finishDataLinksInit(actions[t].reward);
    }
}