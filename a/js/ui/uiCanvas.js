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
var cachedImg_cursor = null;
var cachedImg_blacker = null;

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
    cachedImg_cursor = getImageFromName(IMAGE_CURSOR);
    cachedImg_blacker = getImageFromName(IMAGE_BLACKER);
}

function uiDrawMap() {
    var curMap = selectedMapRef;

    var actionBuilding = null;
    if (selectedAction >= 0) {
        actionBuilding = getBuildingFromId(selectedAction);
    }

    //ctx.clearRect(0, 0, c.width, c.height);

    for (var y = 0; y < MAP_HEIGHT; y++) {
        for (var x = 0; x < MAP_WIDTH; x++) {
            var img;
            var curCell = curMap.cells[x + (y * MAP_WIDTH)];
            var curState = cellStates[curCell.getStateId()];

            if (curState != null) {
                if (curState.floorImageRef != null) {
                    img = curState.floorImageRef;
                    drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
                if (curState.objectImageRef != null) {
                    img = curState.objectImageRef;
                    drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
            }

            if (curCell.buildingInstance != null) {
                var building = curCell.buildingInstance.buildingRef;

                img = building.imageRef;

                if (img.hasCorners()) {
                    var conNum = curMap.getConnectionNumber(x, y);
                    drawImage(ctx, img.info[conNum], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
                else {
                    drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
                }

                if (building.canUpgrade) {
                    drawText(ctx, curCell.buildingInstance.level, x, y);

                    if (selectedAction == ACTION_UPGRADE) {
                        var cost = building.getUpgradeCost(curCell.buildingInstance.level);

                        if (hasDataLinks(cost)) {
                            img = cachedImg_smallUpgrade;
                            drawImage(ctx, img.info[0], x * GRID_WIDTH + effect_exclamationX, y * GRID_HEIGHT + effect_exclamationY);
                        }
                    }
                }

                if (!curCell.isConnection && building.needConnection) {
                    img = cachedImg_noConnection;
                    drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
            }

            if (curState.questRef != null && curState.questRef.isNewQuest()) {
                img = cachedImg_exclamation;
                drawImage(ctx, img.info[0], x * GRID_WIDTH + effect_exclamationX, y * GRID_HEIGHT + effect_exclamationY);
            }
            
            if (x == selectedCellX && y == selectedCellY) {
                img = cachedImg_select;
                drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
            }

            if (actionBuilding != null) {
                if (!curCell.canPutBuilding(actionBuilding)) {
                    img = cachedImg_blacker;
                    drawImage(ctx, img.info[0], x * GRID_WIDTH, y * GRID_HEIGHT);
                }
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
                img = cachedImg_cloud2;
                drawFullImage(ctx, img.info[0], x * GRID_WIDTH - 16 + getCloud2EffectX(x, y), y * GRID_HEIGHT - 16);
            }
        }
    }

    for (var i = 0; i < curMap.enemies.length; i++) {
        var ei = curMap.enemies[i];
        var curEnemy = ei.enemyRef;

        img = curEnemy.imageRef; 
        drawImage(ctx, img.info[0], ei.x * GRID_WIDTH, ei.y * GRID_HEIGHT);

        drawText(ctx, ei.life, ei.x, ei.y);
    }

    // Tutorial image
    if(getResourceFromId(RESOURCE_WOOD).totalAmount == 0){
        drawFullImage(ctx, cachedImg_cursor.info[0], 8 * GRID_WIDTH - 16 + effect_exclamationX, 3 * GRID_HEIGHT + 8 + effect_exclamationY);
    }
    if(getResourceFromId(RESOURCE_STONE).totalAmount == 0){
        drawFullImage(ctx, cachedImg_cursor.info[0], 6 * GRID_WIDTH - 16 + effect_exclamationX, 0 * GRID_HEIGHT + 8 + effect_exclamationY);
    }

    // Try some clouds
    if (curMap.isSpawning)
        img = cachedImg_redMist
    else
        img = cachedImg_cloud;

    drawFullImage(ctx, img.info[0], effect_cloudX, effect_cloudY);
    drawFullImage(ctx, img.info[0], effect_cloudX + img.info[0].w, effect_cloudY);
    drawFullImage(ctx, img.info[0], effect_cloudX, effect_cloudY + img.info[0].h);
    drawFullImage(ctx, img.info[0], effect_cloudX + img.info[0].w, effect_cloudY + img.info[0].h);

}

function drawImage(ctx, img, x, y) {
    //ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, x, y, GRID_WIDTH, GRID_HEIGHT);
    ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x, y, GRID_WIDTH, GRID_HEIGHT);
}

function drawFullImage(ctx, img, x, y) {
    ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x, y, img.w, img.h);
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