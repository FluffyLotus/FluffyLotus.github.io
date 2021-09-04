var GRID_WIDTH = 32;
var GRID_HEIGHT = 32;

var c, ctx;

var cachedImg_noConnection = null;
var cachedImg_select = null;
var cachedImg_cloud2 = null
var cachedImg_cloud = null;
var cachedImg_exclamation = null;
var cachedImg_smallUpgrade = null;
var cachedImg_redMist = null;

function uiInitCanvas() {
    c = document.getElementById("mainCanvas");
    ctx = c.getContext("2d");

    cachedImg_noConnection = getImageFromName(IMAGE_NOCONNECTION);
    cachedImg_select = getImageFromName(IMAGE_SELECT);
    cachedImg_cloud2 = getImageFromName(IMAGE_CLOUD2);
    cachedImg_cloud = getImageFromName(IMAGE_CLOUD);
    cachedImg_exclamation = getImageFromName(IMAGE_EXCLAMATION);
    cachedImg_smallUpgrade = getImageFromName(IMAGE_SMALLUPGRADE);
    cachedImg_redMist = getImageFromName(IMAGE_REDMIST);
}

function uiDrawMap() {
    var curMap = selectedMapRef; //getMapFromId(selectedMapId);

    ctx.clearRect(0, 0, c.width, c.height);

    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            var img;
            var curCell = curMap.cells[x + (y * MAP_WIDTH)];
            var curState = cellStates[curCell.getStateId()];

            if (curState != null) {
                if (curState.floorImageRef != null) {
                    img = curState.floorImageRef; //getImageFromId(curState.floorImageId);
                    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                }
                if (curState.objectImageRef != null) {
                    img = curState.objectImageRef; //getImageFromId(curState.objectImageId);
                    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                }
            }

            if (curCell.buildingInstance != null) {
                var building = curCell.buildingInstance.buildingRef; //getBuildingFromId(curCell.buildingInstance.buildingId);

                img = building.imageRef;

                if (img.hasCorners()) {
                    var conNum = curMap.getConnectionNumber(x, y);
                    drawImage(ctx, img.cornerImg[conNum], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
                else {
                    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                }

                //if (building.imageId == "road") {
                //    var conNum = curMap.getConnectionNumber(x, y);

                //    img = building.imageRef; //getImageFromId(building.imageId);
                //    drawImage(ctx, img.cornerImg[conNum], x * GRID_WIDTH, y * GRID_HEIGHT);
                //}
                //else {
                //    img = building.imageRef; //getImageFromId(building.imageId);
                //    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                //}

                if (building.canUpgrade) {
                    drawText(ctx, curCell.buildingInstance.level, x, y);

                    if (selectedAction == ACTION_UPGRADE) {
                        var cost = building.getUpgradeCost(curCell.buildingInstance.level);

                        if (hasDataLinks(cost)) {
                            var m = parseInt(exclamation) % 16;
                            if (m > 8) m = 8 - (m - 8);
                            //m -= 4;

                            img = cachedImg_smallUpgrade;
                            drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT + m);
                        }
                    }
                }

                if (!curCell.isConnection && building.needConnection) {
                    img = cachedImg_noConnection;
                    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                }
            }

            if (curState.questRef != null && curState.questRef.isNewQuest()) {
                var m = parseInt(exclamation) % 16;
                if (m > 8) m = 8 - (m - 8);
                //m -= 4;

                img = cachedImg_exclamation;
                drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT + m);
            }
            
            if (x == selectedCellX && y == selectedCellY) {
                img = cachedImg_select;
                drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
            }


        }
    }

    // Mouve cloud
    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            var img;
            var curCell = curMap.cells[x + (y * MAP_WIDTH)];
            var curState = cellStates[curCell.getStateId()];

            if (curState.effectCloud) {
                var m = cloud2X + ((x + y) * 4);

                m = parseInt(m) % 64;
                if (m > 32) m = 32 - (m - 32);
                m -= 16;

                img = cachedImg_cloud2;
                ctx.drawImage(img.img, 0, 0, 64, 64, x * GRID_WIDTH - 16 + m, y * GRID_HEIGHT - 16, 64, 64);
            }
        }
    }

    for (var i = 0; i < curMap.enemies.length; i++) {
        var ei = curMap.enemies[i];
        var curEnemy = ei.enemyRef; //getEnemyFromId(ei.enemyId);

        img = curEnemy.imageRef; //getImageFromId(curEnemy.imageId);
        drawImage(ctx, img.img, ei.x * GRID_WIDTH, ei.y * GRID_HEIGHT);

        drawText(ctx, ei.life, ei.x, ei.y);
    }

    // Try some clouds
    if (curMap.canSpawn)
        img = cachedImg_redMist
    else
        img = cachedImg_cloud;

    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX, cloudY, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX + 800, cloudY, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX, cloudY + 463, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX + 800, cloudY + 463, 800, 463);

    cloudX -= 10 * (deltaTime / 1000); //0.08;
    cloudY -= 10 * (deltaTime / 1000); //0.08;

    if (cloudX <= -800) cloudX += 800;
    if (cloudY <= -463) cloudY += 463;

    cloud2X += 10 * (deltaTime / 1000); //0.08;

    if (cloud2X > 64) cloud2X -= 64;

    exclamation += 10 * (deltaTime / 1000); //0.08;

    if (exclamation > 16) exclamation -= 16;
}

var exclamation = 0;
var cloud2X = 0;
var cloudX = 0;
var cloudY = 0;

function drawImage(ctx, img, x, y) {
    ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, x, y, GRID_WIDTH, GRID_HEIGHT);
}

function drawText(ctx, txt, x, y) {
    ctx.strokeStyle = "black"; //set the color of the stroke line
    ctx.lineWidth = 1;  //define the width of the stroke line
    ctx.font = "bold 16pt Tahoma"; //set the font name and font size
    ctx.fillStyle = 'white';

    ctx.fillText(txt, x * GRID_WIDTH, y * GRID_HEIGHT + 16); //draw the text
    ctx.strokeText(txt, x * GRID_WIDTH, y * GRID_HEIGHT + 16); //draw the text
}

function uiCanvasClick(e, evt) {
    var pos = getMousePos(e, evt);

    var cellX = parseInt(pos.x / GRID_WIDTH);
    var cellY = parseInt(pos.y / GRID_HEIGHT);
    
    if (selectedAction == ACTION_CLICK) {
        glProcessClick(cellX, cellY);
    }
    else if (selectedAction == ACTION_UPGRADE) {
        glLevelUpBuilding(cellX, cellY);
    }
    else if (selectedAction == ACTION_DOWNGRADE) {
        glLevelDownBuilding(cellX, cellY);
    }
    else if (selectedAction == ACTION_DESTROY) {
        glProcessDestroy(cellX, cellY);
    }
    else if (selectedAction >= 0) {
        glProcessBuyBuilding(cellX, cellY, selectedAction);
    }

    uiSetCellTooltip(cellX, cellY);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}