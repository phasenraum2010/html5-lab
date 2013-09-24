var canvas;
var ktx;
var worker;

var job = {
    palette :   [],
    lattice:    new Array(),
    current:    0,
    MAX_STATUS: 16,
    MAX_X:      600,
    MAX_Y:      400
};

function init() {
    for(var generation=0;generation<2;generation++){
        job.lattice[generation] = new Array();
        for(var x=0;x<job.MAX_X;x++){
            job.lattice[generation][x] = new Array();
            for(var y=0;y<job.MAX_Y;y++){
                var myvalue =Math.floor(Math.random() * job.MAX_STATUS);
                if(myvalue <0 ) myvalue *= -1;
                job.lattice[generation][x][y] = myvalue;
            }
        }
    }
}

function paint(){
    for(var x=0;x<job.MAX_X;x++){
        for(var y=0;y<job.MAX_Y;y++){
            var myvalue = job.lattice[job.current][x][y];
            var red = job.palette[myvalue][0];
            var green = job.palette[myvalue][1];
            var blue = job.palette[myvalue][2];
            ktx.fillStyle = "rgb("+red+","+green+","+blue+")";
            ktx.fillRect(x,y,1,1);
        }
    }
}

//
// Diese Funktion weist die Zahlen 0 bis MAX_STATUS
// 256 Farben zu und füllt die Palette mit RGB-Werten,
// damit die Farbewerte, die im Array nebeneinander liegen, auch
// farblich relativ ähnlich sind.
//
function erstellePalette() {
    function verpacken(x) {
        x = ((x + 256) & 0x1ff) - 256;
        if (x < 0) x = -x;
        return x;
    }
    for (var i = 0; i <= job.MAX_STATUS; i++) {
        job.palette.push([verpacken(7*i), verpacken(5*i), verpacken(11*i)]);
    }
}

window.onload = function(){
    erstellePalette();
    this.init();
    canvas = document.getElementById("fraktal");
    ktx = canvas.getContext("2d");
    paint();
    worker = new Worker("worker.js");
    worker.onmessage = function(event) {
        job = event.data;
        paint();
        worker.postMessage(job);
    }
    worker.postMessage(job);
}

