function parallax(container, block, speed, direction = 'up', bias = 0)
{
	let base = block.getBoundingClientRect().y - container.getBoundingClientRect().y - bias;
	window.addEventListener('scroll', (event) => {
		switch (direction)
		{
			case "up": {
				block.style.top = String(base - speed * scrollY) + 'px';
				break;
			}
			case "down": {
				if (scrollY > container.getBoundingClientRect().y + base + bias)
				{
					return;
				}
				block.style.top = String(base + speed * (scrollY - bias)) + 'px';
				break;
			}
		}
	});
}
