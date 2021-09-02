var GRID_WIDTH = 32;
var GRID_HEIGHT = 32;

var c, ctx;

function uiInitCanvas() {
    c = document.getElementById("mainCanvas");
    ctx = c.getContext("2d");
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
                }

                if (!curCell.isConnection) {
                    img = getImageFromName(IMAGE_NOCONNECTION);
                    drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
                }
            }
            
            if (x == selectedCellX && y == selectedCellY) {
                img = getImageFromName(IMAGE_SELECT);
                drawImage(ctx, img.img, x * GRID_WIDTH, y * GRID_HEIGHT);
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
    img = getImageFromName(IMAGE_CLOUD);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX, cloudY, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX + 800, cloudY, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX, cloudY + 463, 800, 463);
    ctx.drawImage(img.img, 0, 0, 800, 463, cloudX + 800, cloudY + 463, 800, 463);

    cloudX -= 10 * (deltaTime / 1000); //0.08;
    cloudY -= 10 * (deltaTime / 1000); //0.08;

    if (cloudX <= -800) cloudX += 800;
    if (cloudY <= -463) cloudY += 463;
}

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