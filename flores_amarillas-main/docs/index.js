(function () {


    var ctx = new AudioContext();

    function getRandomColor() {
        var colors = ["#456", "#890", "#634", "#299", "tomato", "#fb3"],
            idx = Math.floor(colors.length * Math.random());

        return (colors[idx]);
    }

    function animateIt(el, dur, delay) {
        var animateEl = el.animate([
            {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0)"
            },

            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)"
            },
            {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(1.1)"
            }

        ],
            {
                duration: dur,
                easing: "ease-out",
                fill: "forwards",
                delay: delay || 0
            });

        return animateEl;
    }



    function createBubble(word) {
        var ns = "http://www.w3.org/2000/svg",
            bubble = document.createElement("div"),
            bubbleDummy = document.createElement("div"),
            heart = document.createElementNS(ns, "svg"),
            heartPath = document.createElementNS(ns, "path"),
            text = document.createElement("div");
        
        heart.setAttribute("viewBox", "0 0 600 500");
        heartPath.setAttribute("d", "M300,150 C500,10 600,300 300,400 C0,300 100,10 300,150");
        bubble.classList.add("bubble");
        bubble.style.color = getRandomColor();
        bubbleDummy.classList.add("bubble-dummy");
        heart.classList.add("heart");
        text.classList.add("text");
        
        // Agregar la palabra a la burbuja
        text.textContent = word;
        
        heart.appendChild(heartPath);
        bubble.appendChild(bubbleDummy);
        bubble.appendChild(heart);
        bubble.appendChild(text);
        
        document.body.appendChild(bubble);
        
        return {
          setPosition: function(x, y) {
            bubble.style.left = x + "px";
            bubble.style.top = y + "px";
          },
          _animate: function() {
            var animateBubble = animateIt(bubbleDummy, 1200),
                animateHeart = animateIt(heart, 2000);  
            
            console.log(animateBubble);
            
            return {
              bubbleDur: 1200,
              heartDur: 2000
            };
          },
          remove: function(el) {
            bubble.remove();
          }
        };
      }
      
      document.body.addEventListener("click", handleDown, false);
      document.body.addEventListener("touchstart", handleDown, false);
      
      function handleDown(e) {
        var _x = e.pageX,
            _y = e.pageY; 
        
        // Aquí creas una burbuja con la palabra que desees
        var bubble = createBubble("Te amo");
        
        bubble.setPosition(_x, _y);
        var animation = bubble._animate(),
            totalDelay = animation.bubbleDur + animation.heartDur;
        
        if (e.type) {
          createSound(20, 5000, 1, "sawtooth", 1);
        }
        
        setTimeout(() => {
          bubble.remove();
          console.log("removed");
        }, totalDelay);
        
        console.log(animation);
      }
      
      var w = document.body.clientWidth,
          h = document.body.clientHeight;
      
      function bubbleUp() {
        var de = {
          pageX: Math.random() * w,
          pageY: Math.random() * h
        };
        
        handleDown(de);
        
        bblUp = setTimeout(bubbleUp, 200);
      }
      
      bubbleUp();
      
      window.addEventListener("resize", function() {
        w = document.body.clientWidth,
        h = document.body.clientHeight;
      }, false);
      


   
})();