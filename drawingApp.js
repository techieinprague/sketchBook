$(function(){
   
    //*----declare variables---*//
    // action painting or erasing 
    var paint = false;
    //--painting or erasing--//
    var paint_erase = "paint";
    //--get the canvas & context--//
    var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");
    //get canvas container
    var canvasContainer = $("#canvasContainer");

    //canvas height & width
    canvas.width = 605;
    canvas.height = 405;


    //mouse positon
    var mouse = {x:0 , y:0};

    //onload Load saved work from localStorage
    if(localStorage.getItem("imageCanvas")!= null){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imageCanvas");
    };
    //set drawing parameters(lineWidth, lineJoin, lineCap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    //click inside container
    canvasContainer.mousedown(function(e){
        canvas = e.target ;
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x,mouse.y);

    });

    //move the mousedown while holding the mouse key
    canvasContainer.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                context.strokeStyle = $("#paintColor").val();
            }else{
                context.strokeStyle = "#E6E4E8";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }

    });
    //mouseup --> not painting or erasing anymore
    canvasContainer.mouseup(function(){
        paint = false;
    });
    //mouseup --> not painting or erasing anymore
    canvasContainer.mouseleave(function(){
        paint = false;
    });
    //reset button
    $("#reset").click(function(){
        context.clearRect(0,0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode"); 
    });

    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imageCanvas" , canvas.toDataURL());
        }else{
            window.alert("Your browser does not support local storage!");
        }
    })

    //erase function
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    //change lineWidth using slider
    $("#slider").slider({
        min : 3,
        max : 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value ;
        }
    });
    //change the color input of the pen 
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });


});
























//How canvas works
    // var canvas = document.getElementById("paint");
    // var context = canvas.getContext('2d');

    // //draw a line
    // //declare new path
    // context.beginPath();

    // //set line width
    // context.lineWidth = 10;

    // //set line color
    // context.strokeStyle = '#42e565';

    // //set cap to the line(round, butt, square)
    // context.lineCap = "round";

    // //set line join style (bevel, round, miter)
    // context.lineJoin = "round";

    // //position the context point
    // context.moveTo(10,10);

    // //draw a line from starting point to a new position
    // context.lineTo(200,200);

    // //draw a new line
    // context.lineTo(300,300);
    
    // //make line visible
    // context.stroke();