var buildingInstanceId = 0;

function buildingInstance() {
    this.id = buildingInstanceId++;
    this.buildingId = -1;
    this.buildingLevel = -1;
    this.buildingRotation = 0;
    this.buildingGradeLevel = 0;
}