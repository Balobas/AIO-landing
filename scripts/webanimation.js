function particlesAnimation()
{
	let properties = {
			maxParticleSpeed : 0.5,
			particlesCount   : 50,
			maxLineLength    : 250,
			particleColor    : 'rgba(25, 25, 255, 0.5)',
			particleRadius   : 1,
			lineWidth        : 0.2,
			mouseRadius      : 100,
		},
		canvas = document.getElementById('web-canvas'),
		ctx = canvas.getContext('2d'),
		w = canvas.width = innerWidth,
		h = canvas.height = innerHeight,
		particles = [],
		isParticleMoved = [];

	window.onresize = () => {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
	};

	window.addEventListener('mousemove', (event) => {
		let x = event.x,
			y = event.y;

		for (let i in particles)
		{
			let len = length(x, y, particles[i].x, particles[i].y);
			if (len < properties.mouseRadius)
			{
				if (isParticleMoved[i])
				{
					continue;
				}
				particles[i].dx *= -1;
				particles[i].dy *= -1;

				particles[i].move();

				isParticleMoved[i] = true;

				ctx.lineWidth = '0.2';
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(particles[i].x, particles[i].y);
				ctx.closePath();
				ctx.strokeStyle = 'rgb(92,158,255)';
				ctx.stroke();
			}
			else
			{
				isParticleMoved[i] = false;
			}
		}
	});

	function drawParticles()
	{
		particles.forEach((particle) => {
			particle.draw();
		});
	}

	function moveParticles()
	{
		particles.forEach((particle) => {
			particle.move();
		});
	}

	function length(x1, y1, x2, y2)
	{
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

	function drawLines()
	{
		let x1, y1, x2, y2, len, opacity;
		for (let i in particles)
		{
			for (let j in particles)
			{
				x1 = particles[i].x;
				y1 = particles[i].y;

				x2 = particles[j].x;
				y2 = particles[j].y;

				len = length(x1, y1, x2, y2);
				if (len < properties.maxLineLength)
				{
					opacity = 1 - len / properties.maxLineLength;

					ctx.lineWidth = properties.lineWidth;
					ctx.strokeStyle = 'rgba(25, 25, 255,' + opacity + ')';

					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}

	function restoreFrame()
	{
		ctx.clearRect(0, 0, w, h);
	}


	class Particle{
		constructor()
		{
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.dx = Math.random() * (2 * properties.maxParticleSpeed) - properties.maxParticleSpeed;
			this.dy = Math.random() * (2 * properties.maxParticleSpeed) - properties.maxParticleSpeed;
		}

		draw()
		{
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, 2* Math.PI);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}

		move()
		{
			if (this.x + this.dx >= w || this.x + this.dx <= 0)
			{
				this.dx *= -1;
			}
			if (this.y + this.dy >= h || this.y + this.dy <= 0)
			{
				this.dy *= -1;
			}

			this.x += this.dx;
			this.y += this.dy;
		}
	}

	function loop()
	{
		restoreFrame();
		moveParticles();
		drawParticles();
		drawLines();

		requestAnimationFrame(loop);
	}

	function init()
	{
		for (let i = 0; i < properties.particlesCount; i++)
		{
			particles.push(new Particle());
			isParticleMoved.push(false);
		}
		loop();
	}

	init();
}



