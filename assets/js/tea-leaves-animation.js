/**
 * ASIA SIYAKA COMMODITIES PLC - FLOATING CEYLON TEA LEAVES ANIMATION
 * Creates realistic, gentle falling green tea leaves fluttering across the background.
 */

(function () {
  'use strict';

  function initTeaLeavesAnimation() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'tea-leaves-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2'; // Above background, below interactive cards
    canvas.style.opacity = '0.75';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Ceylon Tea Leaf Particle Class
    class TeaLeaf {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30;
        this.size = Math.random() * 12 + 10; // 10px to 22px
        this.speedY = Math.random() * 1.0 + 0.6; // gentle falling speed
        this.speedX = (Math.random() - 0.5) * 0.8; // wind drift
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        this.swingAngle = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.swingRadius = Math.random() * 20 + 10;
        
        // Natural Ceylon Tea Leaf Palette (Two-leaves-and-a-bud fresh green to rich orthodox olive)
        const greens = [
          { main: '#2e7d32', shadow: '#1b5e20', vein: '#81c784' }, // Fresh Highland Green
          { main: '#43a047', shadow: '#2e7d32', vein: '#a5d6a7' }, // Spring Flush
          { main: '#558b2f', shadow: '#33691e', vein: '#c5e1a5' }, // Olive Ceylon Flush
          { main: '#1b5e20', shadow: '#0d3813', vein: '#66bb6a' }, // Deep Low-Grown
          { main: '#689f38', shadow: '#388e3c', vein: '#dcedc8' }  // Golden Tip leaf
        ];
        this.palette = greens[Math.floor(Math.random() * greens.length)];
        this.opacity = Math.random() * 0.45 + 0.35; // 0.35 to 0.80
      }

      update() {
        this.swingAngle += this.swingSpeed;
        this.x += this.speedX + Math.sin(this.swingAngle) * 0.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset if offscreen
        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Draw natural Ceylon Tea Leaf shape
        ctx.beginPath();
        // Leaf body using bezier curves
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
          this.size * 0.6, -this.size * 0.5,
          this.size * 0.65, this.size * 0.5,
          0, this.size
        );
        ctx.bezierCurveTo(
          -this.size * 0.65, this.size * 0.5,
          -this.size * 0.6, -this.size * 0.5,
          0, -this.size
        );
        ctx.fillStyle = this.palette.main;
        ctx.fill();

        // Subtle shaded side
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
          this.size * 0.6, -this.size * 0.5,
          this.size * 0.65, this.size * 0.5,
          0, this.size
        );
        ctx.fillStyle = this.palette.shadow;
        ctx.globalAlpha = this.opacity * 0.4;
        ctx.fill();

        // Center vein
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.85);
        ctx.lineTo(0, this.size * 0.85);
        ctx.strokeStyle = this.palette.vein;
        ctx.lineWidth = 1;
        ctx.globalAlpha = this.opacity * 0.7;
        ctx.stroke();

        ctx.restore();
      }
    }

    // Leaf pool (16 graceful leaves on desktop, 8 on mobile)
    const isMobile = window.innerWidth < 768;
    const leafCount = isMobile ? 8 : 16;
    const leaves = Array.from({ length: leafCount }, () => new TeaLeaf());

    // Animation Loop
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when page is hidden to save battery/resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeaLeavesAnimation);
  } else {
    initTeaLeavesAnimation();
  }
})();
