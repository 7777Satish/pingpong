/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
var cw = 270;
var ch = 400;
canvas.height = ch;
canvas.width = cw;

//Game Vars Below
const myPing = {
    w: 50,
    h: 10,
    x: (cw/2)-25,
    y: ch-17,
};
const cPing = {
    w: 50,
    h: 10,
    x: (cw/2)-25,
    y: 7,
};
const score = {
    my: 0,
    comp: 0,
};
//Game  Vars Above

//JS Classes Below
class Ball{
    constructor(vx,vy){
        this.vx = vx;
        this.vy = vy;
        this.x = cw/2;
        this.y = ch/2;
        this.s = 9;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.s,0,7);
        c.fillStyle = 'white';
        c.fill();
    }
    update(){
        this.draw();
        this.x += this.vx;
        this.y += this.vy;
        if(this.x+this.s>cw){this.vx = -this.vx}
        if(this.x-this.s<0){this.vx = -this.vx}
    }
}
//JS Classes Above
var a = new Ball(((Math.random()-0.9)*9)+3,4);
//animate below
function animate(){
    c.clearRect(0,0,cw,ch);
    c.fillStyle="white";
    c.fillRect(cPing.x,cPing.y,cPing.w,cPing.h);
    c.fillRect(myPing.x,myPing.y,myPing.w,myPing.h);
    a.update();
    c.strokeStyle = "grey";
    c.beginPath();
    c.setLineDash([cw/40.5]);
    
    c.arc(cw/2,ch/2,10,0,7);
    c.moveTo(0,ch/2);
    c.lineTo(cw,ch/2);
    c.stroke();
    c.font = "20px Sans Serif";
    c.fillStyle = "#ffffff";
    c.fillText(score.comp, 5, (canvas.height/2)-10);
    c.fillText(score.my, 5, (canvas.height/2)+20);
    c.beginPath();
    c.setLineDash([0]);
    c.rect(0,(ch/2)-30,20,60);
//             c.beginPath();
    c.strokeStyle = "white";
    c.stroke();
    requestAnimationFrame(animate);
    cPing.x = a.x - cPing.w/2;
    if(a.y>myPing.y){
        if(a.x>myPing.x-10){
            if(a.x<myPing.x+myPing.w+10){
                a.vy = -a.vy;
                if(a.x<myPing.x+(myPing.w/2)){a.vx-=0.5}
                else{a.vx+=0.5}
            }
        }
    }

    if(a.y<cPing.y){
        if(a.x>cPing.x-10){
            if(a.x<cPing.x+cPing.w+10){
                a.vy = -a.vy;
                if(a.x<myPing.x+(myPing.w/2)){a.vx-=1}
                else{a.vx++}
            }
        }
    }
    function initBall(){
        a = new Ball(((Math.random()-0.9)*9)+3,6.5);
        score.comp++;
    }
    if(a.y<0||a.y>ch){
        a = new Ball(0,0);
        setTimeout(initBall,1000);
    }
    
}
animate();
//animate above

// Controls Below
window.addEventListener('mousemove',function(event){
    var d = event.clientX - (innerWidth/2-cw/2)
    myPing.x = event.clientX - (innerWidth/2-cw/2) - (myPing.w/2);
});
window.addEventListener('touchmove',function(event){
    myPing.x = event.touches[0].clientX - (innerWidth/2-cw/2) - (myPing.w/2);
});
//Controls Above