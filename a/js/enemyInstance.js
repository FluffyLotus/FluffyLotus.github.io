function EnemyInstance() {
    this.enemyId = 0;
    this.x = 0;
    this.y = 0;
    this.mx = 0;
    this.my = 0;
    this.life = 5;
    this.distance = 0;

    this.enemyRef = null;
}

EnemyInstance.prototype.process = function (map) {
    var enemy = this.enemyRef; //getEnemyFromId(this.enemyId);

    if (mainTimer.canExecute(enemy.movementSpeed)) {
        if (this.mx == 0 && this.my == 0) {
            var d = map.findEnemyPathAround(this.x, this.y);

            this.mx = d.x;
            this.my = d.y;
        }

        var d = map.getEnemyMovement(this.x, this.y, this.mx, this.my);

        this.mx = d.x;
        this.my = d.y;

        this.x += this.mx;
        this.y += this.my;
        this.distance += 1;
    }
}

function createEnemyInstance(x, y, enemyId, level) {
    var item = new EnemyInstance();
    var baseEnemy = getEnemyFromId(enemyId);

    item.enemyId = enemyId;
    item.x = x;
    item.y = y;
    item.life = baseEnemy.baseLife * level;

    item.enemyRef = getEnemyFromId(item.enemyId);

    return item;
}