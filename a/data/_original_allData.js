var resourceData = [{"id":0,"n":"Wood","en":"","d":"","ah":false},{"id":1,"n":"Stone","en":"","d":"","ah":false},{"id":2,"n":"Kill","en":"","d":"","ah":true},{"id":3,"n":"Death","en":"","d":"","ah":true},{"id":4,"n":"Flower","en":"","d":"","ah":false},{"id":5,"n":"Fish","en":"","d":"","ah":false},{"id":6,"n":"Plank","en":"","d":"","ah":false},{"id":7,"n":"Coal","en":"","d":"","ah":false},{"id":8,"n":"Block","en":"","d":"","ah":false},{"id":9,"n":"Fruit","en":"","d":"","ah":false}];
var enemyData = [{"id":0,"n":"Enemy 1","en":"","bl":5,"ms":500,"im":"_enemy"},{"id":1,"n":"Enemy 2","en":"","bl":15,"ms":1000,"im":"_enemy2"},{"id":2,"n":"Enemy 3","en":"","bl":150,"ms":1000,"im":"_enemy3"}];
var cellStateData = [{"id":0,"n":"Grass","en":"","ty":3,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"","ei":""},{"id":1,"n":"Forest","en":"","ty":2,"ep":false,"epe":false,"ca":0,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_tree","ei":""},{"id":2,"n":"Mountain","en":"","ty":1,"ep":false,"epe":false,"ca":1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_mountain","ei":""},{"id":3,"n":"Path","en":"","ty":0,"ep":true,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_path","oi":"","ei":""},{"id":4,"n":"Grass Crystal From","en":"","ty":0,"ep":true,"epe":false,"ca":-1,"qu":-1,"ib":6,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"","ei":"_crystal"},{"id":5,"n":"Grass Crystal To","en":"","ty":0,"ep":true,"epe":false,"ca":-1,"qu":-1,"ib":7,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"","ei":"_crystal2"},{"id":6,"n":"Water","en":"","ty":4,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_water","oi":"","ei":""},{"id":7,"n":"Grass Flower","en":"","ty":3,"ep":false,"epe":false,"ca":2,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":14,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_flower","ei":""},{"id":8,"n":"Fisherman","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_fisherman","ei":""},{"id":9,"n":"Port","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":0,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_water","oi":"_port","ei":""},{"id":10,"n":"Water","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":30000,"att":60000,"csc":-1,"tsc":11,"qsc":-1,"ec":false,"fi":"_water","oi":"","ei":"_fish"},{"id":11,"n":"Fish","en":"","ty":0,"ep":false,"epe":false,"ca":3,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":10,"tsc":-1,"qsc":-1,"ec":false,"fi":"_water","oi":"_fish","ei":""},{"id":12,"n":"Man Standing","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":2,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_standing","ei":""},{"id":13,"n":"City","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":3,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_house","ei":""},{"id":14,"n":"No flower","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":30000,"att":60000,"csc":-1,"tsc":7,"qsc":-1,"ec":false,"fi":"_grass","oi":"_floweroff","ei":""},{"id":15,"n":"Pillar","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_pillar","ei":""},{"id":16,"n":"Broken Bridge","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":4,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":17,"ec":false,"fi":"_bridge_broken","oi":"","ei":""},{"id":17,"n":"Fix Bridge","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_bridge_fix","oi":"","ei":""},{"id":18,"n":"Carpenter","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":4,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_standing","ei":""},{"id":19,"n":"Port City","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":5,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_house","ei":""},{"id":20,"n":"Road Helper","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":6,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_person","ei":""},{"id":21,"n":"Lava Path","en":"","ty":0,"ep":true,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":true,"fi":"_lava","oi":"","ei":""},{"id":22,"n":"Volcano","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":true,"fi":"_path","oi":"_volcano","ei":""},{"id":23,"n":"Deep Water","en":"","ty":4,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_deepwater","oi":"","ei":""},{"id":24,"n":"Stream","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_stream","oi":"","ei":""},{"id":25,"n":"Pickaxe Man","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":7,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_pickaxeman","ei":""},{"id":26,"n":"Mountain Hole","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_mountainhole","ei":""},{"id":27,"n":"Grass Bush","en":"","ty":0,"ep":false,"epe":false,"ca":4,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":28,"tsc":-1,"qsc":-1,"ec":false,"fi":"_grass","oi":"_bush_on","ei":""},{"id":28,"n":"No bush","en":"","ty":0,"ep":false,"epe":false,"ca":-1,"qu":-1,"ib":-1,"atf":30000,"att":60000,"csc":-1,"tsc":27,"qsc":-1,"ec":false,"fi":"_grass","oi":"_bush_off","ei":""},{"id":29,"n":"Path End","en":"","ty":0,"ep":true,"epe":true,"ca":-1,"qu":-1,"ib":-1,"atf":-1,"att":-1,"csc":-1,"tsc":-1,"qsc":-1,"ec":false,"fi":"_path","oi":"","ei":"_crystal2"}];
var mapData = [{"id":0,"n":"","en":"","c":[6,0,2,2,2,2,0,0,0,0,1,6,6,2,2,1,0,0,0,0,0,0,6,6,6,6,2,0,0,0,0,0,0,6,6,6,6,6,0,1,0,0,0,1,0,6,6,23,6,6,0,0,0,0,0,0,6,6,6,23,6,6,6,0,0,0,0,0,6,6,23,23,6,6,6,6,0,0,0,0,6,6,23,23,0,6,6,6,0,0,0,1,6,6,23,23,0,0,6,6,0,0,0,0,6,6,23,23,0,0,6,6,0,13,20,0,6,6,23,23,0,0,0,6,6,6,6,6,6,6,23,23,15,0,0,6,6,6,6,6,6,23,23,23]},{"id":1,"n":"","en":"","c":[2,2,2,2,1,0,0,0,12,0,0,6,2,2,2,0,0,0,4,0,0,0,0,6,2,2,2,0,0,0,3,0,0,7,0,6,2,2,1,0,0,3,3,0,7,0,6,10,2,0,0,0,0,3,0,0,0,0,6,6,1,0,0,0,0,3,0,0,0,6,6,6,0,0,3,3,3,3,3,29,19,9,10,6,0,0,3,0,0,3,0,0,0,0,6,6,0,0,3,0,3,3,0,0,0,0,8,6,0,0,3,3,3,0,0,0,0,0,0,6,0,0,0,0,0,27,27,27,0,0,6,10,0,0,0,0,27,27,27,27,27,0,0,6]},{"id":2,"n":"","en":"","c":[6,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,10,6,0,0,4,0,0,10,6,0,6,6,6,6,0,0,3,3,0,6,6,1,0,6,0,0,0,0,0,3,0,6,6,6,6,6,0,0,0,0,3,3,0,6,6,6,10,6,6,0,3,3,3,0,0,6,6,3,3,3,3,3,3,0,0,0,1,6,6,3,0,0,0,0,0,0,0,2,2,6,6,3,3,3,3,3,3,3,29,26,2,10,6,6,6,6,6,0,0,0,25,2,2,6,6,6,10,6,6,0,0,0,1,2,2,6,6,6,6,6,6,6,0,0,2,2,2]},{"id":3,"n":"","en":"","c":[0,0,0,0,0,0,6,6,6,6,6,6,0,4,3,3,3,3,0,6,6,10,6,6,0,0,0,0,0,3,0,0,6,6,6,6,2,1,0,0,0,3,0,0,6,6,6,6,2,2,1,0,0,29,0,0,0,6,6,10,2,2,2,1,0,0,0,0,0,0,6,6,2,2,2,2,24,24,24,24,24,24,6,6,2,2,2,2,0,4,3,3,0,0,0,6,2,2,2,2,0,0,0,3,0,0,0,6,2,2,2,1,0,0,0,3,0,0,0,6,2,2,2,2,0,0,0,3,3,29,0,6,2,2,2,2,1,0,0,0,0,0,0,6]},{"id":4,"n":"","en":"","c":[22,22,22,22,22,22,22,22,22,22,22,2,22,22,22,22,22,22,22,22,22,22,22,2,22,22,21,21,21,22,21,21,21,4,2,2,22,22,21,2,21,22,21,2,2,2,2,2,22,22,21,2,21,21,21,2,2,2,2,2,22,22,21,2,2,2,2,2,2,2,2,2,22,22,21,21,2,2,6,6,6,10,6,1,22,22,22,21,2,6,6,0,0,6,0,0,22,21,21,21,2,6,0,18,6,0,0,0,2,29,2,2,6,6,7,0,16,0,0,0,2,2,2,6,10,0,1,0,6,0,0,0,2,2,2,6,6,6,6,6,6,0,0,0]},{"id":5,"n":"","en":"","c":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,22,22,2,2,2,2,2,2,2,2,2,22,22,22,22,2,2,2,2,22,22,22,22,22,22,22,22,22,2,2,2,22,22,22,22,22,22,22,22,22,2,2,2,22,22,22,22,22,22,22,22,2,2,2,2,22,22,22,22,22,22,22,22,22,2,2,2,22,22,22,22,22,22,22,22,22,2,2,2]},{"id":6,"n":"","en":"","c":[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,6,6,6,6,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0]},{"id":7,"n":"","en":"","c":[2,2,2,6,6,6,6,6,6,0,0,0,2,2,2,6,6,6,6,6,0,0,0,0,2,2,0,6,6,6,6,6,0,0,0,0,2,2,0,6,6,6,6,6,0,0,0,0,2,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,6,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,6,6,6,6,6,6,6,6,6,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0]},{"id":8,"n":"","en":"","c":[6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0,0,6,6,6,6,6,6,6,0,0,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0]}];
var actionData = [{"id":0,"n":"Give Wood","en":"","rw":[{"t":0,"st":0,"o":0,"a":1}]},{"id":1,"n":"Give Stone","en":"","rw":[{"t":0,"st":0,"o":1,"a":1}]},{"id":2,"n":"Give Flower","en":"","rw":[{"t":0,"st":0,"o":4,"a":1}]},{"id":3,"n":"Give Fish","en":"","rw":[{"t":0,"st":0,"o":5,"a":1}]},{"id":4,"n":"Give Fruit","en":"","rw":[{"t":0,"st":0,"o":9,"a":1}]}];
var buildingData = [{"id":0,"n":"Axe","en":"","d":"Build on a tree to gather wood.","tt":0,"at":1000,"pc":2,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":false,"im":"_axe","co":[{"t":0,"st":0,"o":1,"a":20}],"rq":[],"rw":[{"t":0,"st":0,"o":0,"a":1}]},{"id":1,"n":"Pickaxe","en":"","d":"Build on a mountain to gather stone.","tt":0,"at":1000,"pc":1,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":false,"im":"_pickaxe","co":[{"t":0,"st":0,"o":0,"a":20}],"rq":[],"rw":[{"t":0,"st":0,"o":1,"a":1}]},{"id":2,"n":"Storage","en":"","d":"Store gathered resources.","tt":0,"at":0,"pc":3,"uo":true,"cu":false,"nc":false,"is":true,"ic":false,"cs":false,"ka":false,"im":"_storage","co":[{"t":0,"st":0,"o":0,"a":10}],"rq":[],"rw":[]},{"id":3,"n":"Road","en":"","d":"Help transfering resources from buildings to the storage unit.","tt":0,"at":0,"pc":3,"uo":true,"cu":false,"nc":false,"is":false,"ic":true,"cs":false,"ka":false,"im":"_road","co":[{"t":0,"st":0,"o":1,"a":10}],"rq":[],"rw":[]},{"id":4,"n":"Tower 1","en":"","d":"Deals 1 damage per level to one nearby enemies.","tt":1,"at":1000,"pc":3,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":true,"im":"_tower","co":[{"t":0,"st":0,"o":6,"a":4}],"rq":[{"t":0,"st":0,"o":0,"a":1}],"rw":[]},{"id":5,"n":"Tower 2","en":"","d":"Deals 1 damage per level to all nearby enemies.","tt":1,"at":1000,"pc":3,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":true,"im":"_tower2","co":[{"t":0,"st":0,"o":6,"a":4},{"t":0,"st":0,"o":8,"a":4}],"rq":[{"t":0,"st":0,"o":0,"a":8}],"rw":[]},{"id":6,"n":"Spawn Start","en":"","d":"Enemies will start spawning here.","tt":0,"at":5000,"uo":false,"cu":false,"nc":false,"is":false,"ic":false,"cs":true,"ka":true,"im":"_crystal","co":[],"rq":[],"rw":[]},{"id":7,"n":"Spawn End","en":"","d":"When the map has no more life, it will explode and all building will disapear.","tt":0,"at":0,"uo":false,"cu":false,"nc":false,"is":false,"ic":false,"cs":false,"ka":false,"im":"_crystal2","co":[],"rq":[],"rw":[]},{"id":8,"n":"Plank","en":"","d":"Converts wood to plank.","tt":0,"at":1000,"pc":3,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":false,"im":"_plank","co":[{"t":0,"st":0,"o":0,"a":400},{"t":0,"st":0,"o":1,"a":400}],"rq":[{"t":0,"st":0,"o":0,"a":8}],"rw":[{"t":0,"st":0,"o":6,"a":1}]},{"id":9,"n":"Coal","en":"","d":"Converts wood to coal.","tt":0,"at":1000,"pc":3,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":false,"im":"_coal","co":[{"t":0,"st":0,"o":1,"a":5000}],"rq":[{"t":0,"st":0,"o":0,"a":8}],"rw":[{"t":0,"st":0,"o":7,"a":1}]},{"id":10,"n":"Block","en":"","d":"Converts stone to block.","tt":0,"at":1000,"pc":3,"uo":true,"cu":true,"nc":true,"is":false,"ic":false,"cs":false,"ka":false,"im":"_block","co":[{"t":0,"st":0,"o":0,"a":400},{"t":0,"st":0,"o":1,"a":400}],"rq":[{"t":0,"st":0,"o":1,"a":8}],"rw":[{"t":0,"st":0,"o":8,"a":1}]}];
var questData = [{"id":0,"n":"Build Boat","en":"","d":"","ss":"- Our boat was damage in the latest storm.\n- Help us gather planks to fix the boat.","su":"Gather planks to fix the boat.","es":"- With the boat fix.\n- We can give you safe passage to the west.\n","eu":"The passage to the west is now open.","rq":[{"t":0,"st":0,"o":6,"a":1000}],"rw":[{"t":1,"st":1,"o":2,"a":1}]},{"id":1,"n":"Fisherman","en":"","d":"","ss":"- I'm having trouble gathering fish.\n- Can you help me gather some fishes?.\n- I won't give you anything since the developper did not finish my quest.","su":"Gather fish for nothing.","es":"- How...\n- How can you gather so many fish?!","eu":"... wow! ... that's all I can say.","rq":[{"t":0,"st":0,"o":5,"a":1000}],"rw":[]},{"id":2,"n":"Standing Man","en":"","d":"","ss":"- It's very dangerous up north.\n- I can't let anybody go there.\n- Show me your strength and I will let you go.","su":"It's dangerous, show me you can handle it.","es":"- You are very strong.\n- Good luck!","eu":"The passage to the north is now open.","rq":[{"t":3,"st":3,"o":0,"a":100}],"rw":[{"t":1,"st":1,"o":3,"a":1}]},{"id":3,"n":"Start your adventure","en":"","d":"","ss":"- You want to go up north?\n- We really need you here...\n- Can you help us gather some wood and stone before going on your journey?","su":"Get wood and stone to continue the path north.","es":"- With these resources, we will be able to keep the village running for a while.\n- Good luck on your journey up north.","eu":"After giving the resources, the path north was open.","rq":[{"t":0,"st":0,"o":0,"a":1000},{"t":0,"st":0,"o":1,"a":1000}],"rw":[{"t":1,"st":1,"o":1,"a":1}]},{"id":4,"n":"Broken Bridge","en":"","d":"","ss":"- Help!\n- I was investigating the crystal and the bridge collapse.\n- Can you gather wood and help fix the bridge?","su":"Gather wood to fix the bridge.","es":"- I did some investigation.\n- The crystal are getting active.\n- I think we need to start protecting the city.\n- Here are some blueprint.","eu":"The carpender gave tower and plank blueprint.","rq":[{"t":0,"st":0,"o":0,"a":10000}],"rw":[{"t":2,"st":2,"o":4,"a":1},{"t":2,"st":2,"o":8,"a":1}]},{"id":5,"n":"Port city","en":"","d":"","ss":"- Our carpenter went to the west to investigage.\n- Can you help us gather fruits?\n- We will open the path to the west.","su":"Gather fruits to open the path to the west.","es":"- The path to the west is now open.\n- Please, see if the carpenter is ok.","eu":"The path to the west is open.","rq":[{"t":0,"st":0,"o":9,"a":20}],"rw":[{"t":1,"st":1,"o":4,"a":1}]},{"id":6,"n":"Builder","en":"","d":"","ss":"- It will get difficult if you don't build roads.\n- Bring me some stone and I'll teach you how.","su":"Get stone to get the blueprint for roads.","es":"- This is enought stone.\n- Here's the blueprint on how to build roads.","eu":"The builder gave the blueprint for roads.","rq":[{"t":0,"st":0,"o":1,"a":100}],"rw":[{"t":2,"st":2,"o":3,"a":1}]},{"id":7,"n":"Miner","en":"","d":"","ss":"- ???.\n- ???.","su":"Get stone to get the blueprint for block.","es":"- ???\n- ???.","eu":"The miner gave the blueprint for block.","rq":[{"t":0,"st":0,"o":1,"a":300000}],"rw":[{"t":2,"st":2,"o":10,"a":1}]}];

var worldData = [{"id":0,"n":"Main World","en":"","c":[{"x":0,"y":0,"m":0},{"x":0,"y":-1,"m":1},{"x":1,"y":-1,"m":2},{"x":0,"y":-2,"m":3},{"x":-1,"y":-1,"m":4},{"x":-1,"y":-2,"m":5},{"x":1,"y":-2,"m":6},{"x":-1,"y":0,"m":7},{"x":1,"y":0,"m":8}]}];