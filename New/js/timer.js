var mainTimer;
var timerSpeed = 200;

var TRACKER_TYPE_MODULO = 0; // Happen on module
var TRACLER_TYPE_DELAY = 1; // Happen after current + x-+

function TimerInfo() {
    this.totalTick = 0;
    this.lastProcess = null;

    this.timers = new Map();
    //this.timer200 = 0;
    //this.timer500 = 0;
    //this.timer1000 = 0;
    //this.timer3000 = 0;
    //this.timer30000 = 0;
    //this.timer60000 = 0;

    //this.can200 = false;
    //this.can500 = false;
    //this.can1000 = false;
    //this.can3000 = false;
    //this.can30000 = false;
    //this.can60000 = false;
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
    //if (delta == 200)
    //    return this.can200;
    //if (delta == 500)
    //    return this.can500;
    //if (delta == 1000)
    //    return this.can1000;
    //if (delta == 3000)
    //    return this.can3000;
    //if (delta == 30000)
    //    return this.can30000;
    //if (delta == 60000)
    //    return this.can60000;
    //return false;
}

TimerInfo.prototype.process = function () {
    var hadTick = false;
    //this.can200 = false;
    //this.can500 = false;
    //this.can1000 = false;
    //this.can3000 = false;
    //this.can30000 = false;
    //this.can60000 = false;

    if (this.lastProcess == null) {
        this.lastProcess = (new Date()).getTime();
    }
    else {
        //while ((new Date()).getTime() - this.lastProcess >= 100) {
        if ((new Date()).getTime() - this.lastProcess >= 100) {
            //this.timer200++;
            //this.timer500++;
            //this.timer1000++;
            //this.timer3000++;
            //this.timer30000++;
            //this.timer60000++;

            //if (this.timer200 == 200 / timerSpeed) {
            //    this.timer200 = 0;
            //    this.can200 = true;
            //}

            //if (this.timer500 == 500 / timerSpeed) {
            //    this.timer500 = 0;
            //    this.can500 = true;
            //}

            //if (this.timer1000 == 1000 / timerSpeed) {
            //    this.timer1000 = 0;
            //    this.can1000 = true;
            //}

            //if (this.timer3000 == 3000 / timerSpeed) {
            //    this.timer3000 = 0;
            //    this.can3000 = true;
            //}

            //if (this.timer30000 == 30000 / timerSpeed) {
            //    this.timer30000 = 0;
            //    this.can30000 = true;
            //}

            //if (this.timer60000 == 60000 / timerSpeed) {
            //    this.timer60000 = 0;
            //    this.can60000 = true;
            //}

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