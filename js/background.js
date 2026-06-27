const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;

export function initBackground() {

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.querySelector('#hero');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const scale = window.devicePixelRatio || 1;

    canvas.style.cssText = 'position:absolute;width:120%;height:120%;top:-10%;left:-10%;z-index:-1;pointer-events:none;';
    container.appendChild(canvas);

    const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#00e887';

    let lines = [];
    let frame = 0;
    let width, height, gradient;
    let rafId;

    function Line(x, y) {
        this.x = x;
        this.y = y;
        this.path = [];
        this.pathLength = 0;
        this.angle = 0;
        this.speed = random(1, 3);
        this.target = { x: x + 0.1, y: y + 0.1 };
        this.thickness = Math.round(random(0.5, 2));
        this.maxLength = Math.round(random(80, 300));
        this.decay = random(0.005, 0.03);
        this.alpha = 0.25;
    }

    Line.prototype.step = function () {
        if (this.pathLength >= this.maxLength) {
            this.alpha -= this.decay;
            return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        const target = this.target;
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let isAnchor = false;

        if (distance < this.speed) {
            isAnchor = true;
            this.x = target.x;
            this.y = target.y;
            this.steer();
        }

        this.path.push({ x: this.x, y: this.y, isAnchor });
        this.pathLength++;
    };

    Line.prototype.draw = function () {
        context.save();
        context.globalAlpha = this.alpha;
        context.lineWidth = this.thickness;
        context.strokeStyle = gradient;
        context.fillStyle = accent;

        context.beginPath();
        this.path.forEach((point, i) => {
            context[i === 0 ? 'moveTo' : 'lineTo'](point.x, point.y);
        });
        context.stroke();

        // nó circular no ponto de origem
        context.beginPath();
        context.arc(this.path[0].x, this.path[0].y, 3, 0, TWO_PI);
        context.fill();

        // nó nos pontos de curva
        this.path.filter(p => p.isAnchor).forEach(p => {
            context.beginPath();
            context.arc(p.x, p.y, 2, 0, TWO_PI);
            context.fill();
        });

        context.restore();
    };

    Line.prototype.steer = function () {
        const distance = random(60, 180);
        const angle = random([-HALF_PI, 0, HALF_PI, -Math.PI]);
        this.path = this.path.filter(p => p.isAnchor);
        this.target.x = this.x + Math.cos(angle) * distance;
        this.target.y = this.y + Math.sin(angle) * distance;
        this.angle = angle;
    };

    function random(min, max) {
        if (Array.isArray(min)) return min[Math.floor(Math.random() * min.length)];
        if (max === undefined) { max = min || 1; min = 0; }
        return min + Math.random() * (max - min);
    }

    function draw() {
        if (document.hidden) {
            rafId = setTimeout(() => requestAnimationFrame(draw), 2000);
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineCap = 'square';

        lines = lines.filter(line => {
            line.step();
            return line.alpha > 0.01;
        });

        lines.forEach(line => line.draw());

        if (frame % 10 === 0) {
            const x = width * 0.5 + random(-200, 200);
            const y = height * 0.5 + random(-150, 150);
            lines.push(new Line(x, y));
        }

        frame++;
        rafId = requestAnimationFrame(draw);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * scale;
        canvas.height = height * scale;
        context.scale(scale, scale);
        gradient = context.createLinearGradient(width * 0.25, 0, width * 0.75, 0);
        gradient.addColorStop(0, accent);
        gradient.addColorStop(1, 'rgba(0, 232, 135, 0.4)');
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
}
