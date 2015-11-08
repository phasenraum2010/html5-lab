
function step(job){
    var next = (job.current+1) % 2;
    for(var x=0;x<job.MAX_X;x++){
        for(var y=0;y<job.MAX_Y;y++){
            job.lattice[next][x][y] = job.lattice[job.current][x][y];
            var myvalue = (job.lattice[job.current][x][y] + 1) % job.MAX_STATUS;
            var neighbourX = (x + job.MAX_X + 1) % job.MAX_X;
            var neighbourY = y;
            if(job.lattice[job.current][neighbourX][neighbourY] == myvalue){
                job.lattice[next][x][y] = myvalue;
            } else {
                neighbourX = x;
                neighbourY = (y + job.MAX_Y + 1) % job.MAX_Y;
                if(job.lattice[job.current][neighbourX][neighbourY] == myvalue){
                    job.lattice[next][x][y] = myvalue;
                } else {
                    neighbourX = (x + job.MAX_X + -1) % job.MAX_X;
                    neighbourY = y;
                    if(job.lattice[job.current][neighbourX][neighbourY] == myvalue){
                        job.lattice[next][x][y] = myvalue;
                    } else {
                        neighbourX = x;
                        neighbourY = (y + job.MAX_Y - 1) %job.MAX_Y;
                        if(job.lattice[job.current][neighbourX][neighbourY] == myvalue){
                            job.lattice[next][x][y] = myvalue;
                        }
                    }
                }
            }
        }
    }
    job.current++;
    job.current %= 2;
    return job;
}

onmessage = function (event) {
    var job = event.data;
    job = step(job);
    this.postMessage(job);
}