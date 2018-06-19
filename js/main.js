var beachCount = 0;
var houseCount = 0;
var moneyCount = 0;
var totalCount = 47;

(function () {

    'use strict';

    var hbwrap = document.getElementById('hbwrap'),
        box = hbwrap.querySelector('.giftbox'),
        step = 1, stepTimes = [1000, 1000, 1000, 1000];

    function init() {
        box.addEventListener('click', runAnimation);
        box.addEventListener('mouseup', updateResult);
        setTimeout(function () {
            randomGift();
        }, 1000);
    }

    function updateResult() {
        $('#result').show();
        document.getElementById('houseResult').innerHTML = houseCount;
        document.getElementById('beachResult').innerHTML = beachCount;
        document.getElementById('moneyResul').innerHTML = moneyCount;
        document.getElementById('totalCount').innerHTML = totalCount;
    }

    function checkWinner() {
        updateResult();
        if (totalCount == 0) {
            var winner = '';
            if (houseCount > beachCount && houseCount > moneyCount)
                winner = 'house';
            if (beachCount > houseCount && beachCount > moneyCount)
                winner = 'beach';
            if (moneyCount > beachCount && moneyCount > houseCount)
                winner = 'money';
            switch (winner) {
                case 'beach':
                    setWinner(winner);
                    return true;
                case 'house':
                    setWinner(winner);
                    return true;
                case 'money':
                    setWinner(winner);
                    return true;
                default:
                    ++totalCount;
                    skip();
                    return false;
            }
        } else {
            return false;
        }
    }

    function setWinner(winner) {
        $('.buttons').hide();
        $('.background').find('img').addClass('pulse');
        switch (winner) {
            case 'beach':
                showBeachImg();
                break;
            case 'house':
                showHouseImg();
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
                showHouseImg();
                houseCount++;
                break;
            case 2:
                showBeachImg();
                beachCount++;
                break;
            case 3:
                showMoneyImg();
                moneyCount++;
                break;
        }
    }

    function showHouseImg() {
        $("#beach").hide();
        $("#money").hide();
        $("#house").show();
    }

    function showBeachImg() {
        $("#money").hide();
        $("#house").hide();
        $("#beach").show();
    }

    function showMoneyImg() {
        $("#house").hide();
        $("#beach").hide();
        $("#money").show();
    }

    function runAnimation() {
        if (step === 1) {
            box.removeEventListener('click', runAnimation);
            document.getElementById('repeat').removeEventListener('click', repeat);
            document.getElementById('skip').removeEventListener('click', skip);
        }
        incStep(step);
        if (step === 4) {
            document.getElementById('repeat').addEventListener('click', repeat);
            document.getElementById('skip').addEventListener('click', skip);
            if (checkWinner() == false) {
                $(".buttons").show();
                totalCount--;
                updateResult();
                checkWinner();
            }
            return;
        }
        setTimeout(function () { runAnimation(); }, stepTimes[step - 1]);
        ++step;
    }

    function repeat() {
        step = 1;
        $("#house").hide();
        $("#beach").hide();
        $("#money").hide();
        $('.buttons').hide();
        classie.remove(hbwrap, 'step-' + 4);
        classie.remove(hbwrap, 'step-' + 3);
        classie.remove(hbwrap, 'step-' + 2);
        init();
    }

    function skip() {
        $("#house").hide();
        $("#beach").hide();
        $("#money").hide();
        $('.buttons').hide();
        t:for (var i = totalCount; i > 0; i--) {
            setTimeout(function (n) {
                if (checkWinner() == false) {
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            houseCount++;
                            break;
                        case 2:
                            beachCount++;
                            break;
                        case 3:
                            moneyCount++;
                            break;
                    }
                    --totalCount;
                    updateResult();
                    checkWinner();
                }
            }, i * 50, totalCount);
        }
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

            this.draw = function () {
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
            function () {
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