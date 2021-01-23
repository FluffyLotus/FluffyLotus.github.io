function GetSaveGame() {
    var saveData = new Object();

    saveData.version = "1";
    saveData.cvs = canViewskills;
    saveData.cr = currentMapAdventure.canRun;
    saveData.re = [];
    saveData.bu = [];
    saveData.ma = [];
    saveData.qu = [];
    saveData.mb = [];
    
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
        saveData.bu[t].ba = buildings[t].buildAmount;
    }

    for (var t = 0; t < mapAdventures.length; t++) {
        saveData.ma[t] = new Object();
        saveData.ma[t].id = mapAdventures[t].id;
        saveData.ma[t].cd = mapAdventures[t].currentDistance;
        saveData.ma[t].md = mapAdventures[t].maxDistance;
    }

    for (var t = 0; t < quests.length; t++) {
        saveData.qu[t] = new Object();
        saveData.qu[t].id = quests[t].id;
        saveData.qu[t].ia = quests[t].isActivated;
        saveData.qu[t].ic = quests[t].isCompleted;
    }

    for (var t = 0; t < mapBuildings.length; t++) {
        saveData.mb[t] = new Object();
        saveData.mb[t].id = mapBuildings[t].id;
        saveData.mb[t].ia = mapBuildings[t].isActive;

        saveData.mb[t].g = [];

        for (var tt = 0; tt < mapBuildings[t].grid.length; tt++) {
            if (mapBuildings[t].grid[tt].buildingId != -1) {
                var subItem = new Object();

                subItem.i = tt;
                subItem.bi = mapBuildings[t].grid[tt].buildingId;
                subItem.bl = mapBuildings[t].grid[tt].buildingLevel;
                subItem.br = mapBuildings[t].grid[tt].buildingRotation;

                saveData.mb[t].g.push(subItem);
            }
        }
    }

    saveData.p = new Object();
    saveData.p.dc = currentMapAdventure.currentPlayer.deathCount
    saveData.p.s = [];

    for (var t = 0; t < currentMapAdventure.currentPlayer.passiveSkills.length; t++) {
        var subItem = new Object();

        subItem.si = currentMapAdventure.currentPlayer.passiveSkills[t].skillId;
        subItem.l = currentMapAdventure.currentPlayer.passiveSkills[t].level;
        subItem.tl = currentMapAdventure.currentPlayer.passiveSkills[t].trainingLevel;
        subItem.cd = currentMapAdventure.currentPlayer.passiveSkills[t].colldown;
        subItem.ia = currentMapAdventure.currentPlayer.passiveSkills[t].isActive;
        subItem.it = currentMapAdventure.currentPlayer.passiveSkills[t].isTraining;
        subItem.ie = currentMapAdventure.currentPlayer.passiveSkills[t].isEquip;

        saveData.p.s.push(subItem);
    }

    for (var t = 0; t < currentMapAdventure.currentPlayer.activeSkills.length; t++) {
        var subItem = new Object();

        subItem.si = currentMapAdventure.currentPlayer.activeSkills[t].skillId;
        subItem.l = currentMapAdventure.currentPlayer.activeSkills[t].level;
        subItem.tl = currentMapAdventure.currentPlayer.activeSkills[t].trainingLevel;
        subItem.cd = currentMapAdventure.currentPlayer.activeSkills[t].colldown;
        subItem.ia = currentMapAdventure.currentPlayer.activeSkills[t].isActive;
        subItem.it = currentMapAdventure.currentPlayer.activeSkills[t].isTraining;
        subItem.ie = currentMapAdventure.currentPlayer.activeSkills[t].isEquip;

        saveData.p.s.push(subItem);
    }

    // TODO: Enemies

    return saveData;
}

function LoadSaveGame(saveData) {
    if (saveData.version == "1") {
        canViewskills = saveData.cvs;
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
            item.buildAmount = saveData.bu[t].ba;
        }

        for (var t = 0; t < saveData.ma.length; t++) {
            var item = getMapAdventureFromId(saveData.ma[t].id);

            item.currentDistance = saveData.ma[t].cd;
            item.maxDistance = saveData.ma[t].md;
        }

        for (var t = 0; t < saveData.qu.length; t++) {
            var item = getQuestFromId(saveData.qu[t].id);

            item.isActivated = saveData.qu[t].ia;
            item.isCompleted = saveData.qu[t].ic;
        }

        for (var t = 0; t < saveData.mb.length; t++) {
            var item = getMapBuildingFromId(saveData.mb[t].id);

            item.isActive = saveData.mb[t].ia;

            for (var tt = 0; tt < item.grid.length; tt++) {
                item.grid[tt].buildingId = -1;
                item.grid[tt].buildingLevel = -1;
                item.grid[tt].buildingRotation = 0;
            }

            for (var tt = 0; tt < saveData.mb[t].g.length; tt++) {
                var subItem = saveData.mb[t].g[tt];

                item.grid[subItem.i].buildingId = subItem.bi;
                item.grid[subItem.i].buildingLevel = subItem.bl;
                item.grid[subItem.i].buildingRotation = subItem.br;
            }

            item.calculateGridConnection();
        }

        currentMapAdventure.currentPlayer.deathCount = saveData.p.dc;

        for (var t = 0; t < saveData.p.s.length; t++) {
            var s = currentMapAdventure.currentPlayer.getSkillInstance(saveData.p.s[t].si);

            s.level = saveData.p.s[t].l;
            s.trainingLevel = saveData.p.s[t].tl;
            s.colldown = saveData.p.s[t].cd;
            s.isActive = saveData.p.s[t].ia;
            s.isTraining = saveData.p.s[t].it;
            s.isEquip = saveData.p.s[t].ie;
        }

        // TODO: Enemies
    }
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