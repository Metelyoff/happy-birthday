var drummerCount = 0;
var chefCount = 0;
var developerCount = 0;
var totalCount = 30;

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
        document.getElementById('drummerResult').innerHTML = drummerCount;
        document.getElementById('chefResult').innerHTML = chefCount;
        document.getElementById('developerResult').innerHTML = developerCount;
        document.getElementById('totalCount').innerHTML = totalCount;
    }

    function checkWinner() {
        updateResult();
        if (totalCount == 0) {
            var winner = '';
            if (drummerCount > chefCount && drummerCount > developerCount)
                winner = 'drummer';
            if (chefCount > drummerCount && chefCount > developerCount)
                winner = 'chef';
            if (developerCount > chefCount && developerCount > drummerCount)
                winner = 'developer';
            switch (winner) {
                case 'drummer':
                    setWinner(winner);
                    return true;
                case 'chef':
                    setWinner(winner);
                    return true;
                case 'developer':
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
            case 'chef':
                showChefWinnerImg();
                break;
            case 'drummer':
                showDrummerWinnerImg();
                break;
            case 'developer':
                showDeveloperWinnerImg();
                break;
        }
        $('#happy').show();
        $('#birthday').show();
        $('#name').show();
        confetti();
    }

    function randomGift() {
        var numberImg = Math.floor(Math.random() * 3) + 1;
        switch (numberImg) {
            case 1:
                showDrummerImg();
                drummerCount++;
                break;
            case 2:
                showChefImg();
                chefCount++;
                break;
            case 3:
                showDeveloperImg();
                developerCount++;
                break;
        }
    }

    function showDrummerImg() {
        $("#chef").hide();
        $("#developer").hide();
        $("#drummer").show();
    }

    function showChefImg() {
        $("#developer").hide();
        $("#drummer").hide();
        $("#chef").show();
    }

    function showDeveloperImg() {
        $("#drummer").hide();
        $("#chef").hide();
        $("#developer").show();
    }

    function showDrummerWinnerImg() {
        $("#chef").hide();
        $("#chefWinner").hide();
        $("#developer").hide();
        $("#developerWinner").hide();
        $("#drummerWinner").show();
    }

    function showChefWinnerImg() {
        $("#chefWinner").show();
        $("#developer").hide();
        $("#developerWinner").hide();
        $("#drummer").hide();
        $("#drummerWinner").hide();
    }

    function showDeveloperWinnerImg() {
        $("#drummerWinner").hide();
        $("#drummer").hide();
        $("#chefWinner").hide();
        $("#chef").hide();
        $("#developerWinner").show();
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
        $("#drummer").hide();
        $("#chef").hide();
        $("#developer").hide();
        $('.buttons').hide();
        classie.remove(hbwrap, 'step-' + 4);
        classie.remove(hbwrap, 'step-' + 3);
        classie.remove(hbwrap, 'step-' + 2);
        init();
    }

    function skip() {
        $("#drummer").hide();
        $("#chef").hide();
        $("#developer").hide();
        $('.buttons').hide();
        t: for (var i = totalCount; i > 0; i--) {
            setTimeout(function (n) {
                if (checkWinner() == false) {
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            drummerCount++;
                            break;
                        case 2:
                            chefCount++;
                            break;
                        case 3:
                            developerCount++;
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

    const modal = document.querySelector(`[data-modal=trigger-1]`);
    const contentWrapper = modal.querySelector('.content-wrapper');
    contentWrapper.addEventListener('click', (e) => e.stopPropagation());
    modal.classList.toggle('open');
    const close = modal.querySelector('.close');
    close.addEventListener('click', () => {
        totalCount = document.getElementById('age').value
        modal.classList.remove('open');
    });

})();


jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
jQuery('.quantity').each(function () {
    var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

    btnUp.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
            var newVal = oldValue;
        } else {
            var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
    });

});