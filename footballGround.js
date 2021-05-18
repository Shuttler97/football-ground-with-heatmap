var canvas = document.getElementById('pitch');
var ctx = canvas.getContext('2d');
var geoCord = {
    lat: [
        28.486687,
        28.486687,
        28.486687,
        28.486687,
        28.486687,
        28.486687,
        28.486687,
        28.486687,
        28.486687,
    ],
    long: [
        77.15976,
        77.15976,
        77.15976,
        77.15976,
        77.15976,
        77.15976,
        77.15976,
        77.15976,
        77.15976,
    ]
};
var chord = [];

var pitch = {
    draw() {

        // Outer lines
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#060";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        ctx.fillStyle = "#FFF";
        ctx.closePath();

        // Mid line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.closePath();

        //Mid circle
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Mid point
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

        //Home penalty box
        ctx.beginPath();
        ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
        ctx.stroke();
        ctx.closePath();
        //Home goal box
        ctx.beginPath();
        ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
        ctx.stroke();
        ctx.closePath();
        //Home goal
        ctx.beginPath();
        ctx.moveTo(1, (canvas.height / 2) - 22);
        ctx.lineTo(1, (canvas.height / 2) + 22);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        // ctx.lineWidth = 1;

        //Home penalty point
        ctx.beginPath()
        ctx.arc(88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Home half circle
        ctx.beginPath()
        ctx.arc(88, canvas.height / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();

        //Away penalty box
        ctx.beginPath();
        ctx.rect(canvas.width - 132, (canvas.height - 322) / 2, 132, 322);
        ctx.stroke();
        ctx.closePath();
        //Away goal box
        ctx.beginPath();
        ctx.rect(canvas.width - 44, (canvas.height - 146) / 2, 44, 146);
        ctx.stroke();
        ctx.closePath();
        //Away goal
        ctx.beginPath();
        ctx.moveTo(canvas.width - 1, (canvas.height / 2) - 22);
        ctx.lineTo(canvas.width - 1, (canvas.height / 2) + 22);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        //Away penalty point
        ctx.beginPath()
        ctx.arc(canvas.width - 88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Away half circle
        ctx.beginPath()
        ctx.arc(canvas.width - 88, canvas.height / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();

        //Home L corner
        ctx.beginPath()
        ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Home R corner
        ctx.beginPath()
        ctx.arc(0, canvas.height, 8, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        //Away R corner
        ctx.beginPath()
        ctx.arc(canvas.width, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Away L corner
        ctx.beginPath()
        ctx.arc(canvas.width, canvas.height, 8, 1 * Math.PI, 1.5 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }
};

var ball = {
    x: canvas.width / 3,
    y: canvas.height / 3,
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }
};

var player = {
    team: "home",
    speed: 1.5,
    x: 10,
    y: 10,
    isAt: function (point) {
        return Math.abs(this.x - point.x) < 1 ? (Math.abs(this.y - point.y) < 1 ? true : false) : false;
    },
    move: function (point) {
        if (!this.isAt(point)) {

            var h = Math.sqrt(Math.pow(Math.abs(this.x - point.x), 2) + Math.pow(Math.abs(this.y - point.y), 2));
            var v = Math.acos((Math.abs(this.x - point.x) / h));
            var x = this.speed * Math.cos(v);
            var y = this.speed * Math.sin(v);

            if (point.x >= this.x && point.y >= this.y) {
                this.x += x;
                this.y += y;
            } else if (point.x >= this.x && point.y < this.y) {
                this.x += x;
                this.y -= y;
            } else if (point.x < this.x && point.y >= this.y) {
                this.x -= x;
                this.y += y;
            } else if (point.x < this.x && point.y < this.y) {
                this.x -= x;
                this.y -= y;
            }
            this.draw();
        }
    },
    draw: function () {
        pitch.draw();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#F00";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
        // ball.draw();
        // player.draw();
        for (var i = 0 ;  i<geoCord.long.length; i++) {
           var loCord = {x: window.geo.lonToX(geoCord.long[i]), y:window.geo.latToY(geoCord.lat[i])}
        }

        chord = loCord;
    }
};

window.geo = {

    glOffset: Math.pow(2, 28), //268435456,
    glRadius: Math.pow(2, 28) / Math.PI,
    a: Math.pow(2, 28),
    b: 85445659.4471,
    c: 0.017453292519943,
    d: 0.0000006705522537,
    e: Math.E, //2.7182818284590452353602875,
    p: Math.PI / 180,

    lonToX: function (lon) {
        return Math.round(this.glOffset + this.glRadius * lon * this.p);
    },

    latToY: function (lat) {
        return Math.round(this.glOffset - this.glRadius *
            Math.log((1 + Math.sin(lat * this.p)) /
                (1 - Math.sin(lat * this.p))) / 2);
    }
};
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976
// 28.486687	77.15976

var coordinates = [
    {x: 500, y: 259},
    {x: 230, y: 229},
    {x: 290, y: 289},
    {x: 550, y: 289},
    {x: 400, y: 320},
    {x: 200, y: 259},
    {x: 400, y: 309},
    {x: 200, y: 359},
];

var game = {
    timer: {},
    step: function () {
        player.move(chord);
    },
    start: function () {
        pitch.draw();
        this.timer = window.setInterval(this.step, 20);

    }
};
game.start();
