function TileTemplateInformation() {
    this.id = 0;
    this.name = "";
    this.floorTile = "";
    this.object = "";
}

function loadTileTemplate() {
    var item;

    item = new TileTemplateInformation();
    item.id = 0;
    item.name = "Normal Grass";
    item.floorTile = "grass_Size2_NE";
    item.object = "";
    tileTemplates.push(item);

    item = new TileTemplateInformation();
    item.id = 1;
    item.name = "Tree 1";
    item.floorTile = "grass_shadow_Size2_NE";
    item.object = "tree_Size2_NE";
    tileTemplates.push(item);

    item = new TileTemplateInformation();
    item.id = 2;
    item.name = "Tree 2";
    item.floorTile = "grass_shadow_Size2_NE";
    item.object = "tree2_Size2_NE";
    tileTemplates.push(item);

    item = new TileTemplateInformation();
    item.id = 3;
    item.name = "Flower Floor 1";
    item.floorTile = "grass_Size2_NE";
    item.object = "flower2_Size2_NE";
    tileTemplates.push(item);

    item = new TileTemplateInformation();
    item.id = 4;
    item.name = "Flower Floor 2";
    item.floorTile = "grass_Size2_NE";
    item.object = "flower_Size2_NE";
    tileTemplates.push(item);

    item = new TileTemplateInformation();
    item.id = 5;
    item.name = "Cross";
    item.floorTile = "grass_Size2_NE";
    item.object = "cross_Size2_NE";
    tileTemplates.push(item);
}

function getTileTemplateFromId(id) {
    for (var t = 0; t < tileTemplates.length; t++) {
        if (tileTemplates[t].id == id)
            return tileTemplates[t];
    }

    return null;
}