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

/** Create the room. */
function createRoom(scene, roomWidth, roomHeight) {
	// floor
	var floorTexture  = THREE.ImageUtils.loadTexture("textures/floor-512.jpg");
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.x = 10;
	floorTexture.repeat.y = 10;
			
	floorMaterial = new THREE.MeshLambertMaterial({ 
	map: floorTexture
	});
	
	floor = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomWidth, 4, 4 ), floorMaterial );
   	floor.rotation.x = - 90 * ( Math.PI / 180 );
   	floor.position.x = roomWidth / 2;
   	floor.position.y = 0;
	floor.position.z = roomWidth / 2;
    floor.overdraw = true;	
   	scene.add( floor );

   	roofMaterial = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/floor-512.jpg")
	});
	roof = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomWidth, 4, 4 ), roofMaterial );
   	roof.rotation.x = - 90 * ( Math.PI / 180 );
   	roof.position.x = roomWidth / 2;
   	roof.position.y = roomHeight;
	roof.position.z = roomWidth / 2;
    roof.overdraw = true;	
   	scene.add( roof );

   	frontWallMaterial = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/wall-512.jpg")
	});
	frontWall = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomHeight, 4, 4 ), frontWallMaterial );
   	frontWall.rotation.x = 0 * ( Math.PI / 180 );
   	frontWall.position.x = roomWidth / 2;
	frontWall.position.y = roomHeight / 2;
	frontWall.position.z = 0;
    frontWall.overdraw = true;	
   	scene.add( frontWall );

   	backWallMaterial = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/wall-512.jpg")
	});
	backWall = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomHeight, 4, 4 ), backWallMaterial );
   	backWall.rotation.x = 180 * ( Math.PI / 180 );
   	backWall.position.x = roomWidth / 2;
	backWall.position.y = roomHeight / 2;
	backWall.position.z = roomWidth;
    backWall.overdraw = true;	
   	scene.add( backWall );

   	leftWallMaterial = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/wall-512.jpg")
	});
	leftWall = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomHeight, 4, 4 ), leftWallMaterial );
   	leftWall.rotation.x = 0 * ( Math.PI / 180 );
   	leftWall.rotation.y = 90 * ( Math.PI / 180 );
   	leftWall.position.x = 0;
	leftWall.position.y = roomHeight / 2;
	leftWall.position.z = roomWidth / 2;
    leftWall.overdraw = true;	
   	scene.add( leftWall );

   	rightWallMaterial = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/wall-512.jpg")
	});
	rightWall = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth, roomHeight, 4, 4 ), rightWallMaterial );
   	rightWall.rotation.x = 0 * ( Math.PI / 180 );
   	rightWall.rotation.y = 90 * ( Math.PI / 180 );
   	rightWall.rotation.y = -90 * ( Math.PI / 180 );
   	rightWall.position.x = roomWidth;
	rightWall.position.y = roomHeight / 2;
	rightWall.position.z = roomWidth / 2;
    rightWall.overdraw = true;	
   	scene.add( rightWall );

   	window1Material = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/window-512.jpg")
	});
	window1 = new THREE.Mesh( new THREE.PlaneGeometry( roomHeight/4, roomHeight/4, 4, 4 ), window1Material );
   	window1.rotation.x = 0 * ( Math.PI / 180 );
   	window1.rotation.y = 90 * ( Math.PI / 180 );
   	window1.position.x = 1;
	window1.position.y = roomHeight / 3;
	window1.position.z = roomWidth * 0.25;
    window1.overdraw = true;	
   	scene.add( window1 );

   	window2Material = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/window-512.jpg")
	});
	window2 = new THREE.Mesh( new THREE.PlaneGeometry( roomHeight/4, roomHeight/4, 4, 4 ), window2Material );
   	window2.rotation.x = 0 * ( Math.PI / 180 );
   	window2.rotation.y = 90 * ( Math.PI / 180 );
   	window2.position.x = 1;
	window2.position.y = roomHeight / 3;
	window2.position.z = roomWidth * 0.5;
    window2.overdraw = true;	
   	scene.add( window2 );

   	window3Material = new THREE.MeshLambertMaterial({ 
	map: THREE.ImageUtils.loadTexture("textures/window-512.jpg")
	});
	window3 = new THREE.Mesh( new THREE.PlaneGeometry( roomHeight/4, roomHeight/4, 4, 4 ), window3Material );
   	window3.rotation.x = 0 * ( Math.PI / 180 );
   	window3.rotation.y = 90 * ( Math.PI / 180 );
   	window3.position.x = 1;
	window3.position.y = roomHeight / 3;
	window3.position.z = roomWidth * 0.75;
    window3.overdraw = true;	
   	scene.add( window3 );

   	doorMaterial = new THREE.MeshLambertMaterial( {
   		map: THREE.ImageUtils.loadTexture("textures/door.jpg")
   	});
   	door = new THREE.Mesh( new THREE.PlaneGeometry( roomWidth/10, roomHeight*0.5, 4, 4), doorMaterial );
   	door.rotation.x = 0 * ( Math.PI / 180 );
   	door.rotation.y = 90 * ( Math.PI / 180 );
   	door.rotation.y = -90 * ( Math.PI / 180 );
   	door.position.x = roomWidth - 1;
	door.position.y = roomHeight / 4;
	door.position.z = roomWidth / 4;
    door.overdraw = true;	
   	scene.add( door );	
} // end createRoom()



/** Manually add the room environment until addDeskAndChair is fixed. */
function addRoomEnvironment(scene, objects, roomWidth, vid_mat) {
    var loader = new THREE.JSONLoader();
    // The material for the blackboard.
    var matBlackboard = new THREE.MeshBasicMaterial( { color: 0x000000 });
    // The material for the desk.
    var matDesk = new THREE.MeshLambertMaterial( { color: 0xFFFFFF });
    // The material for the chair.
    var matChair = new THREE.MeshLambertMaterial( { color: 0xFF0000 });
    // The base coordinates
    var coordX = 0, coordY = 0, coordZ = 0;
    // Adjust the scale if the objects are too large or too small compared to the room.
    var scale = 100;
    // Load BLACKBOARD
    /*loader.load( "models/blackboard.js", function(geo) {
	var meshBlackboard = new THREE.Mesh(geo, matBlackboard);
	meshBlackboard.scale.set(scale, scale, scale);
	meshBlackboard.position.set((roomWidth / 2) + 50, 0, 300);
	scene.add(meshBlackboard);
	objects.push(meshBlackboard);
    });*/
   	var blackBoard_plane = new THREE.PlaneGeometry(480, 204, 4, 4);
   	var blackBoard = new THREE.Mesh(blackBoard_plane, vid_mat);
   	blackBoard.position.set((roomWidth / 2) + 50, 150, 2);
   	//meshBlackboard.scale.set(scale, scale, scale);
   	scene.add(blackBoard);
    objects.push(blackBoard);
    
    // Load DESK #1
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set((roomWidth / 2) + 200, 0, 200);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #1
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) + 200, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) + 100, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			


    // Load DESK #2
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set((roomWidth / 2) - 200, 0, 200);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #2
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) - 300, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) - 200, 0, 200);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			
    

    // Load DESK #3
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, matDesk);
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set((roomWidth / 2) + 200, 0, 400);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
    });
    // The two chairs associated with DESK #1
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) + 200, 0, 400);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) + 100, 0, 400);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });			


    // Load DESK #4
    loader.load( "models/desk.js", function (geo) {
	var meshDesk = new THREE.Mesh(geo, new THREE.MeshBasicMaterial( { color: 0xFF0000 , opacity: 0.5} ));
	meshDesk.scale.set(scale, scale, scale);
	meshDesk.position.set((roomWidth / 2) - 200, 0, 400);
	//group.addChild(meshDesk);		
	scene.add(meshDesk);
	objects.push(meshDesk);
    });
    // The two chairs associated with DESK #2
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) - 300, 0, 400);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });
    loader.load( "models/chair.js", function (geo) {
	var meshChair = new THREE.Mesh(geo, matChair);
	meshChair.scale.set(scale, scale, scale);
	meshChair.position.set((roomWidth / 2) - 200, 0, 400);
	//group.addChild(meshChair);
	scene.add(meshChair);
    });					
    
    
} //end addRoomEnvironment()
