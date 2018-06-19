var sexyGirlCount = 0;
var teslaCount = 0;
var moneyCount = 0;
var totalCount = 33;

(function() {

    'use strict';

    var hbwrap = document.getElementById('hbwrap'),
        box = hbwrap.querySelector('.giftbox'),
        step = 1, stepTimes = [1000, 1000, 1000, 1000];

    function init() {
        box.addEventListener('click', runAnimation);
        box.addEventListener('mouseup', updateResult);
        setTimeout(function() {
            randomGift();
        }, 1000);
    }

    function updateResult() {
        $('#result').show();
        document.getElementById('carResult').innerHTML = teslaCount;
        document.getElementById('girlResult').innerHTML = sexyGirlCount;
        document.getElementById('moneyResul').innerHTML = moneyCount;
        document.getElementById('totalCount').innerHTML = totalCount;
    }

    function checkWinner() {
        if (totalCount == 0) {
            if (teslaCount > sexyGirlCount && teslaCount > moneyCount) {
                setWinner('car');
            } else if (sexyGirlCount > teslaCount && sexyGirlCount > moneyCount) {
                setWinner('girl');
            } else if (moneyCount > sexyGirlCount && moneyCount > teslaCount) {
                setWinner('money');
            } else {
				++totalCount;
			}
            return true;
        } else {
            return false;
        }
    }

    function setWinner(winner) {
        $('#repeat').hide();
        $('.background').find('img').addClass('pulse');
        switch (winner) {
            case 'girl':
                showGirlImg();
                break;
            case 'car':
                showCarImg();
                break;
            case 'money':
                showMoneyImg();
                break;
        }
        $('#happy').show();
        $('#birthday').show();
        confetti();
    }

    function randomGift() {
        var numberImg = Math.floor(Math.random() * 3) + 1;
        switch (numberImg) {
            case 1:
                showCarImg();
                teslaCount++;
                break;
            case 2:
                showGirlImg();
                sexyGirlCount++;
                break;
            case 3:
                showMoneyImg();
                moneyCount++;
                break;
        }
    }

    function showCarImg() {
        $("#sexy-girl").hide();
        $("#money").hide();
        $("#tesla").show();
    }

    function showGirlImg() {
        $("#money").hide();
        $("#tesla").hide();
        $("#sexy-girl").show();
    }

    function showMoneyImg() {
        $("#tesla").hide();
        $("#sexy-girl").hide();
        $("#money").show();
    }

    function runAnimation() {
        if (step === 1) {
            box.removeEventListener('click', runAnimation);
            document.getElementById('repeat').removeEventListener('click', repeat);
        }
        incStep(step);
        if (step === 4) {
            document.getElementById('repeat').addEventListener('click', repeat);
            if(checkWinner() == false) {
            	$("#repeat").show();
            	totalCount--;
            	updateResult();
            	checkWinner();
            }
            return;
        }
        setTimeout(function() { runAnimation(); }, stepTimes[step - 1]);
        ++step;
    }

    function repeat() {
        step = 1;
        $("#tesla").hide();
        $("#sexy-girl").hide();
        $("#money").hide();
        $('#repeat').hide();
        classie.remove(hbwrap, 'step-' + 4);
        classie.remove(hbwrap, 'step-' + 3);
        classie.remove(hbwrap, 'step-' + 2);
        init();
    }

    function incStep(step) {
        classie.remove(hbwrap, 'step-' + Number(step - 1));
        classie.add(hbwrap, 'step-' + step);
    }

    function confetti() {
        let W = window.innerWidth;
        let H = window.innerHeight;
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const maxConfettis = 150;
        const particles = [];

        const possibleColors = [
            "DodgerBlue",
            "OliveDrab",
            "Gold",
            "Pink",
            "SlateBlue",
            "LightBlue",
            "Gold",
            "Violet",
            "PaleGreen",
            "SteelBlue",
            "SandyBrown",
            "Chocolate",
            "Crimson"
        ];

        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function confettiParticle() {
            this.x = Math.random() * W; // x
            this.y = Math.random() * H - H; // y
            this.r = randomFromTo(11, 33); // radius
            this.d = Math.random() * maxConfettis + 11;
            this.color =
                possibleColors[Math.floor(Math.random() * possibleColors.length)];
            this.tilt = Math.floor(Math.random() * 33) - 11;
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
            this.tiltAngle = 0;

            this.draw = function() {
                context.beginPath();
                context.lineWidth = this.r / 2;
                context.strokeStyle = this.color;
                context.moveTo(this.x + this.tilt + this.r / 3, this.y);
                context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
                return context.stroke();
            };
        }

        function Draw() {
            const results = [];

            // Magical recursive functional love
            requestAnimationFrame(Draw);

            context.clearRect(0, 0, W, window.innerHeight);

            for (var i = 0; i < maxConfettis; i++) {
                results.push(particles[i].draw());
            }

            let particle = {};
            let remainingFlakes = 0;
            for (var i = 0; i < maxConfettis; i++) {
                particle = particles[i];

                particle.tiltAngle += particle.tiltAngleIncremental;
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
                particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

                if (particle.y <= H) remainingFlakes++;

                // If a confetti has fluttered out of view,
                // bring it back to above the viewport and let if re-fall.
                if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                    particle.x = Math.random() * W;
                    particle.y = -30;
                    particle.tilt = Math.floor(Math.random() * 10) - 20;
                }
            }

            return results;
        }

        window.addEventListener(
            "resize",
            function() {
                W = window.innerWidth;
                H = window.innerHeight;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            },
            false
        );

        // Push new confetti objects to `particles[]`
        for (var i = 0; i < maxConfettis; i++) {
            particles.push(new confettiParticle());
        }

        // Initialize
        canvas.width = W;
        canvas.height = H;
        Draw();

    }

    init();

})();