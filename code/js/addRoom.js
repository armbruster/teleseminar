/** This function actually adds TWICE the amount of desks specified by the nr_of_desks variable. 
 * The purpose is to create pairs of desks along the 'aisle'.
 * For every desk two chairs will be added.
 * STATUS: NOT WORKING -> because of the for loop. Three.js doesn't seem to add objects to scene until the for-loop
 * has ended, and will only add the last element.
 */
function addDeskAndChair(scene, nr_of_desks) {
    var loader = new THREE.JSONLoader();
    // The material for the desk.
    var matDesk = new THREE.MeshLambertMaterial( { color: 0xFFFFFF });
    // The material for the chair.
    var matChair= new THREE.MeshLambertMaterial( { color: 0xFF0000 });
    // The base coordinates
    var coordX = 0, coordY = 0, coordZ = 0;
    // Adjust the scale if the objects are too large or too small compared to the room.
    var scale = 100;
    var i;
    //var group = new THREE.Object3D();
    
    for (i = 1; i <= nr_of_desks; i++) {
	loader.load( "models/desk.js", function (geo) {
	    meshDesk[i-1] = new THREE.Mesh(geo, matDesk);
	    meshDesk[i-1].scale.set(scale, scale, scale);
	    //document.write("adac: " + adac_nrAdded + "<br />");
	    meshDesk[i-1].position.set(200 * adac_reverse, 0, adac_nrAdded * 200);
	    //group.addChild(meshDesk[i-1]);
	    document.getElementById('debug').innerHTML+="meshDesk[" + i + "-1].position.set(200 * " + adac_reverse + ", 0, " + adac_nrAdded + " * 200);<br />";
	    scene.add(meshDesk[i-1]);
	});
	// Load the chair (2 chairs per desk)
	loader.load( "models/chair.js", function (geo) {
	    var meshChair = new THREE.Mesh(geo, matChair);
	    meshChair.scale.set(scale, scale, scale);
	    meshChair.position.set(200 * adac_reverse, 0, adac_nrAdded * 200);
	    //group.addChild(meshChair);
	    scene.add(meshChair);
	});
	loader.load( "models/chair.js", function (geo) {
	    var meshChair = new THREE.Mesh(geo, matChair);
	    meshChair.scale.set(scale, scale, scale);
	    meshChair.position.set(100 * adac_reverse, 0, adac_nrAdded * 200);
	    //group.addChild(meshChair);
	    scene.add(meshChair);
	});
	if (adac_reverse == 1) adac_reverse = -1;
	else adac_reverse = 1;
	adac_nrAdded = adac_nrAdded + 1;
	//document.getElementById('debug').innerHTML+="loops: " + i + "<br />";

    } // end for
} // end addDeskAndChair()

/** Manually add the room environment until addDeskAndChair is fixed. */
function addRoomEnvironment(scene) {
    var loader = new THREE.JSONLoader();
    // The material for the blackboard.
    var matBlackboard = new THREE.MeshLambertMaterial( { color: 0x000000 });
    // The material for the desk.
    var matDesk = new THREE.MeshLambertMaterial( { color: 0xFFFFFF });
    // The material for the chair.
    var matChair = new THREE.MeshLambertMaterial( { color: 0xFF0000 });
    // The base coordinates
    var coordX = 0, coordY = 0, coordZ = 0;
    // Adjust the scale if the objects are too large or too small compared to the room.
    var scale = 100;
    // Load BLACKBOARD
    loader.load( "models/blackboard.js", function(geo) {
	var meshBlackboard = new THREE.Mesh(geo, matBlackboard);
	meshBlackboard.scale.set(scale, scale, scale);
	meshBlackboard.position.set(0, 0, -200);
	scene.add(meshBlackboard);
    });
    
    // Load DESK #1
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set(200, 0, 0);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #1
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(200, 0, 0);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(100, 0, 0);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			


    // Load DESK #2
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set(-200, 0, 0);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #2
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(-300, 0, 0);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(-200, 0, 0);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			
    

    // Load DESK #3
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set(200, 0, 200);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #1
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(200, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(100, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			


    // Load DESK #4
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set(-200, 0, 200);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #2
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(-300, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set(-200, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });					
    
    
} //end addRoomEnvironment()