var putin = {

    x: 0,
    y: 0,
    selected: 1,
    speed: 1000,

    colors: {
        0: "red",
        1: "green",
        2: "blue",
        3: "purple",
        4: "brown",
        5: "yellow",
        6: "white",
        7: "black"
    },

    blocks: {
        0: 
        [
            "000",
            " 0 "    
        ],
        1: 
        [
            "11 ",
            " 11"    
        ],
        2: 
        [
            " 22",
            "22 "    
        ],
        3: 
        [
            "33",
            "33"    
        ],
        4: 
        [
            "4444"
        ],
        5: 
        [
            "5",
            "555"
        ],
        6: 
        [
            "  6",
            "666"
        ]
    },

    grid: [],

    width:5,
    height: 5,

    canvas: false,
    blockSize: 10,

    init: function() {

        this.createGrid();

        this.canvas = document.getElementById("putin");
        this.canvas.width = this.width * this.blockSize;
        this.canvas.height = this.height * this.blockSize;

        setInterval(function() { this.loop() }.bind(this), this.speed)

   //     this.draw()


    },

    loop: function() {
        
        this.draw()
        this.recordPlayer()


    },

    createGrid: function() {

        x=0
        y=0
    
        while(y < this.height) {

            row = ""
            while(x < this.width) {
                row = row + " "
                x++
            }

            this.grid[y] = row
            x=0;
            y++;
        }
        
    },
    draw: function() {
        x = 0;
        y = 0;

        this.grid.forEach(function(row){
            row.split("").forEach(function(col) {
                if(col == " ") col = 7; 
                this.drawCell(x,y,this.colors[col])
                x++;
            }.bind(this))
            x=0;
            y++;
        }.bind(this))       
        
        this.drawPlayer()        

    },

    recordPlayer: function() {
        
        console.log(this.getBlock().length)

        this.y++

        if((this.getBlock().length - 1) + this.y == this.height) {
            this.y = 0

        } 




    },

    getBlock: function() {
        return this.blocks[this.selected]
    },

    drawPlayer: function() {

        relX = 0
        relY = 0
        this.blocks[this.selected].forEach(function(row) {
            row.split("").forEach(function(col){
                if(col != " ") this.drawCell(this.x + relX, this.y+relY, this.colors[this.selected])
                relX++
            }.bind(this))
            relX = 0
            relY++
        }.bind(this))
    },

    drawCell: function(x, y, color = "red") {

        gradientDepth = 2.5

        x = x * this.blockSize;
        y = y * this.blockSize;

        var c = document.getElementById("putin");
        var ctx = c.getContext("2d");
        
        // Create gradient
        var grd = ctx.createLinearGradient(x, y, x+(this.blockSize*gradientDepth), y+(this.blockSize*gradientDepth));
        grd.addColorStop(0,color);
        grd.addColorStop(1,"white");
        
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(x, y, this.blockSize, this.blockSize);
    }




}

document.addEventListener("DOMContentLoaded", function(event) { 
    putin.init();
  });
