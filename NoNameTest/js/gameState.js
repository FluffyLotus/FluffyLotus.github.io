var lastSave = new Date();

// TODO: Save UI settings

function GetSaveGame() {
    var saveData = new Object();

    saveData.version = "1";
    saveData.cr = currentMapAdventure.canRun;
    saveData.re = [];
    saveData.bu = [];
    saveData.ma = [];
    saveData.qu = [];
    saveData.mb = [];
    saveData.en = [];

    for (var t = 0; t < resources.length; t++) {
        saveData.re[t] = new Object();
        saveData.re[t].id = resources[t].id;
        saveData.re[t].am = resources[t].amount;
        saveData.re[t].ma = resources[t].maxAmount;
        saveData.re[t].ta = resources[t].totalAmount;
    }

    for (var t = 0; t < buildings.length; t++) {
        saveData.bu[t] = new Object();
        saveData.bu[t].id = buildings[t].id;
        saveData.bu[t].av = buildings[t].available;
        saveData.bu[t].up = [];

        for (var tt = 0; tt < buildings[t].upgrades.length; tt++) {
            var subItem = new Object();

            subItem.id = buildings[t].upgrades[tt].id;
            subItem.lv = buildings[t].upgrades[tt].level;

            saveData.bu[t].up.push(subItem);
        }
    }

    for (var t = 0; t < mapAdventures.length; t++) {
        saveData.ma[t] = new Object();
        saveData.ma[t].id = mapAdventures[t].id;
        saveData.ma[t].cd = mapAdventures[t].currentDistance;
        saveData.ma[t].md = mapAdventures[t].maxDistance;
        saveData.ma[t].ia = mapAdventures[t].isActive;
    }

    for (var t = 0; t < quests.length; t++) {
        saveData.qu[t] = new Object();
        saveData.qu[t].id = quests[t].id;
        saveData.qu[t].ia = quests[t].isActivated;
        saveData.qu[t].rr = quests[t].isResourceReserved;
        saveData.qu[t].wl = quests[t].wentToLocation;
        saveData.qu[t].ic = quests[t].isCompleted;

        saveData.qu[t].fm = quests[t].foundMapId;
        saveData.qu[t].fd = quests[t].foundDistance;
    }

    for (var t = 0; t < mapBuildings.length; t++) {
        saveData.mb[t] = new Object();
        saveData.mb[t].id = mapBuildings[t].id;
        saveData.mb[t].ia = mapBuildings[t].isActive;

        saveData.mb[t].g = [];

        for (var tt = 0; tt < mapBuildings[t].grid.length; tt++) {
            if (mapBuildings[t].grid[tt].buildingInst != null) {
                var subItem = new Object();

                subItem.i = tt;
                subItem.bi = mapBuildings[t].grid[tt].buildingInst.buildingId;
                subItem.bl = mapBuildings[t].grid[tt].buildingInst.buildingLevel;
                subItem.br = mapBuildings[t].grid[tt].buildingInst.buildingRotation;
                subItem.gl = mapBuildings[t].grid[tt].buildingInst.buildingGradeLevel;

                saveData.mb[t].g.push(subItem);
            }
        }
    }

    saveData.p = new Object();
    saveData.p.dc = currentMapAdventure.currentPlayer.deathCount;
    saveData.p.s = [];

    for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
        var subItem = new Object();

        subItem.si = currentMapAdventure.currentPlayer.skills[t].skillId;
        subItem.l = currentMapAdventure.currentPlayer.skills[t].level;
        subItem.tl = currentMapAdventure.currentPlayer.skills[t].trainingLevel;
        subItem.cd = currentMapAdventure.currentPlayer.skills[t].cooldown;
        subItem.du = currentMapAdventure.currentPlayer.skills[t].duration;
        subItem.ia = currentMapAdventure.currentPlayer.skills[t].isActive;
        subItem.it = currentMapAdventure.currentPlayer.skills[t].isTraining;
        subItem.ie = currentMapAdventure.currentPlayer.skills[t].isEquip;

        saveData.p.s.push(subItem);
    }

    for (var t = 0; t < enemies.length; t++) {
        var subItem = new Object();

        subItem.id = enemies[t].id;
        subItem.td = enemies[t].totalDeath;
        subItem.kc = enemies[t].killCount;
        subItem.ex = enemies[t].experience;

        subItem.di = [];

        for (var i = 0; i < enemies[t].deathInfo.length; i++) {
            var so = new Object();

            so.le = enemies[t].deathInfo[i].level;
            so.dc = enemies[t].deathInfo[i].deathCount;

            subItem.di.push(so);
        }
        
        saveData.en.push(subItem);
    }

    lastSave = new Date();

    return saveData;
}

function LoadSaveGame(saveData) {
    if (saveData.version == "1") {
        currentMapAdventure.canRun = saveData.cr;

        for (var t = 0; t < saveData.re.length; t++) {
            var item = getResourceFromId(saveData.re[t].id);

            item.amount = saveData.re[t].am;
            item.maxAmount = saveData.re[t].ma;
            item.totalAmount = saveData.re[t].ta;
        }

        for (var t = 0; t < saveData.bu.length; t++) {
            var item = getBuildingFromId(saveData.bu[t].id);

            item.available = saveData.bu[t].av;

            for (var tt = 0; tt < saveData.bu[t].up.length; tt++) {
                for (var i = 0; i < item.upgrades.length; i++) {
                    if (item.upgrades[i].id == saveData.bu[t].up[tt].id) {
                        item.upgrades[i].level == saveData.bu[t].up[tt].lv;
                    }
                }
            }
        }

        for (var t = 0; t < saveData.ma.length; t++) {
            var item = getMapAdventureFromId(saveData.ma[t].id);

            item.currentDistance = saveData.ma[t].cd;
            item.maxDistance = saveData.ma[t].md;
            item.isActive = saveData.ma[t].ia;
        }

        for (var t = 0; t < saveData.qu.length; t++) {
            var item = getQuestFromId(saveData.qu[t].id);

            item.isActivated = saveData.qu[t].ia;
            item.isResourceReserved = saveData.qu[t].rr;
            item.wentToLocation = saveData.qu[t].wl;
            item.isCompleted = saveData.qu[t].ic;

            item.foundMapId = saveData.qu[t].fm;
            item.foundDistance = saveData.qu[t].fd;
        }

        for (var t = 0; t < saveData.mb.length; t++) {
            var item = getMapBuildingFromId(saveData.mb[t].id);

            item.isActive = saveData.mb[t].ia;

            for (var tt = 0; tt < item.grid.length; tt++) {
                item.grid[tt].buildingInst = null;
            }

            for (var tt = 0; tt < saveData.mb[t].g.length; tt++) {
                var subItem = saveData.mb[t].g[tt];

                item.grid[subItem.i].buildingInst = new buildingInstance();
                item.grid[subItem.i].buildingInst.buildingId = subItem.bi;
                item.grid[subItem.i].buildingInst.buildingLevel = subItem.bl;
                item.grid[subItem.i].buildingInst.buildingRotation = subItem.br;
                item.grid[subItem.i].buildingInst.buildingGradeLevel = subItem.gl;

                getBuildingFromId(item.grid[subItem.i].buildingInst.buildingId).addBuildingInstance(item.grid[subItem.i].buildingInst);
            }

            item.calculateGridConnection();
        }

        currentMapAdventure.currentPlayer.deathCount = saveData.p.dc;

        for (var t = 0; t < saveData.p.s.length; t++) {
            var s = currentMapAdventure.currentPlayer.getSkillInstance(saveData.p.s[t].si);

            s.level = saveData.p.s[t].l;
            s.trainingLevel = saveData.p.s[t].tl;
            s.cooldown = saveData.p.s[t].cd;
            s.duration = saveData.p.s[t].du;
            s.isActive = saveData.p.s[t].ia;
            s.isTraining = saveData.p.s[t].it;
            s.isEquip = saveData.p.s[t].ie;
        }

        for (var t = 0; t < saveData.en.length; t++) {
            var item = getEnemyFromId(saveData.en[t].id);

            item.totalDeath = saveData.en[t].td;
            item.deathInfo = saveData.en[t].di;
            item.killCount = saveData.en[t].kc;
            item.experience = saveData.en[t].ex;
            item.deathInfo = [];

            for (var i = 0; i < saveData.en[t].di.length; i++) {
                var di = new enemyDeathInformation();

                di.level = saveData.en[t].di[i].le;
                di.deathCount = saveData.en[t].di[i].dc;

                item.deathInfo.push(di);
            }

            item.calculateNextLevel();
        }
    }

    lastSave = new Date();
}

function GetSaveGameJson64() {
    var saveData = GetSaveGame();
    var json = JSON.stringify(saveData);
    var json64 = btoa(json);

    return json64;
}

function LoadSaveGameJson64(json64) {
    var json = atob(json64);
    var saveData = JSON.parse(json);

    LoadSaveGame(saveData);
}

var ssTest = 0;
function storeSaveState() {
    var data = GetSaveGameJson64();

    ssTest++;
    uiWriteDebug(ssTest);

    clearSaveState();
    setCookie("state", data, 1000);
}

function retreiveSaveState() {
    var data = getCookie("state");

    if (data != null && data != "") {
        try {
            LoadSaveGameJson64(data);
        }
        catch (err) {
            // Ignore errors
        }
    }
}

function clearSaveState() {
    setCookie("state", "", 1000);
}

function setCookie(name, value, days) {
    //var expires = "";
    //if (days) {
    //    var date = new Date();
    //    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //    expires = "; expires=" + date.toUTCString();
    //}
    //document.cookie = name + "=" + (value || "") + expires + "; path=/";
    localStorage.setItem(name, value);
}
function getCookie(name) {
    return localStorage.getItem(name);

    //var nameEQ = name + "=";
    //var ca = document.cookie.split(';');
    //for (var i = 0; i < ca.length; i++) {
    //    var c = ca[i];
    //    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    //    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    //}
    //return null;
}