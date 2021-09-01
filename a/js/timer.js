var mainTimer;
var timerSpeed = 200;

var TRACKER_TYPE_MODULO = 0; // Happen on module
var TRACLER_TYPE_DELAY = 1; // Happen after current + x-+

function TimerInfo() {
    this.totalTick = 0;
    this.lastProcess = null;

    this.timers = new Map();
}

TimerInfo.prototype.getNextTick = function (delta) {
    return this.totalTick + parseInt(delta / timerSpeed);
}

TimerInfo.prototype.hasPassTick = function (tick) {
    if(this.totalTick >= tick)
        return true;
    return false;
}

TimerInfo.prototype.canExecute = function (delta) {
    if (this.totalTick == 0)
        return false;

    if (!this.timers.has(delta))
        this.timers.set(delta, this.totalTick % parseInt(delta / timerSpeed));

    return this.timers.get(delta) == 0;
}

TimerInfo.prototype.process = function () {
    var hadTick = false;

    if (this.lastProcess == null) {
        this.lastProcess = (new Date()).getTime();
    }
    else {
        if ((new Date()).getTime() - this.lastProcess >= 100) {

            this.totalTick++;
            this.lastProcess += timerSpeed;

            this.timers = new Map();

            hadTick = true;
        }
    }

    return hadTick;
}

function TimeTrackerInfo() {
    this.typeId = -1;
    this.deltaTime = -1;
    this.nextTick = -1;
}

TimeTrackerInfo.prototype.canExecute = function() {
    if(this.typeId == -1)
        return false;

    if(this.typeId == TRACKER_TYPE_MODULO && this.deltaTime > -1){
        return mainTimer.canExecute(this.deltaTime);
    }
    else if(this.typeId == TRACLER_TYPE_DELAY && this.nextTick > -1){
        return mainTimer.hasPassTick(this.nextTick);
    }

    return false;
}

TimeTrackerInfo.prototype.changeDeltaAndReset = function (newDelta) {
    this.deltaTime = newDelta;
    this.reset();
}

TimeTrackerInfo.prototype.reset = function() {
    if(this.typeId == TRACKER_TYPE_MODULO){
        
    }
    else if(this.typeId == TRACLER_TYPE_DELAY){
        this.nextTick = mainTimer.getNextTick(this.deltaTime);
    }
}

function createModuleTracker(delta) {
    var item = new TimeTrackerInfo();

    item.typeId = TRACKER_TYPE_MODULO;
    item.deltaTime = delta;
    item.reset();

    return item;
}

function createDelayTracker(delta) {
    var item = new TimeTrackerInfo();

    item.typeId = TRACLER_TYPE_DELAY;
    item.deltaTime = delta;
    item.reset();

    return item;
}

function createTimerTracker(typeId, delta) {
    var item = new TimeTrackerInfo();

    item.typeId = typeId;
    item.deltaTime = delta;
    item.reset();

    return item;
}

function initTimer() {
    mainTimer = new TimerInfo();
}

function processTimer() {
    return mainTimer.process();
}