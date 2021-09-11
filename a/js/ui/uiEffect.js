var exclamation = 0;
var cloud2X = 0;
var cloudX = 0;
var cloudY = 0;

var effect_exclamationX = 0;
var effect_exclamationY = 0;

var effect_cloudX = 0;
var effect_cloudY = 0;

function uiInitEffect() {
}

function uiUpdateEffect() {
    cloudX -= 10 * (deltaTime / 1000); //0.08;
    cloudY -= 10 * (deltaTime / 1000); //0.08;

    if (cloudX <= -800) cloudX += 800;
    if (cloudY <= -463) cloudY += 463;

    cloud2X += 10 * (deltaTime / 1000); //0.08;

    if (cloud2X > 64) cloud2X -= 64;

    exclamation += 10 * (deltaTime / 1000); //0.08;

    if (exclamation > 16) exclamation -= 16;

    /////////////

    var m = parseInt(exclamation) % 16;
    if (m > 8) m = 8 - (m - 8);

    /////////////

    effect_exclamationX = 0;
    effect_exclamationY = m;

    effect_cloudX = parseInt(cloudX);
    effect_cloudY = parseInt(cloudY);
}

function getCloud2EffectX(x, y) {
    var m = cloud2X + ((x + y) * 4);

    m = parseInt(m) % 64;
    if (m > 32) m = 32 - (m - 32);
    m -= 16;

    return m;
}