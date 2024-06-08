
document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll("[data-play]");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", () => {
            playMusic();
        });
    }
});

function playMusic() {
    const music = new Audio(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3"
    );

    music.addEventListener("canplay", () => {
        music.play();
    });
}

var data = {
  "videos": [
    {
      "name": "NASA Has Just Found the Most Horrible Planet in the Known Universe",
      "link": "bZEEVwa5H78?si=n-EVPdhGWe2JQ0v_"
    },
    {
      "name": "50+ Space Facts Happening Above Your Head Right Now",
      "link": "_oCgtA9E6YI?si=7d7J2Y-8Ud0b7LS9"
    },
    {
      "name": "A Journey to Mysterious Exoplanets",
      "link": "d-TtwCLg9_Q?si=5gmGClKTf4CIoMYr"
    },
    {
      "name": "A Journey to our Closest Galaxies",
      "link": "MFSawk8oLTU?si=fhffbNrvGZCli_OW"
    }
  ]
};

const randomVidContainer = document.querySelector('.random-video');
var videoList = data['videos'];


//newVideo();
const randomButton = document.querySelector("#random-button");
randomButton.addEventListener("click", newVideo);

function newVideo() { 
	var a = Math.floor(Math.random() * videoList.length);
	randomVidContainer.innerHTML = 
    '<h3>'+videoList[a].name+'</h3><iframe width="560" height="560" src="https://www.youtube.com/embed/'+videoList[a].link+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
}


const formButton = document.querySelector("#formButton");
formButton.addEventListener("click", handleFormSubmission);

function handleFormSubmission() {
    var sent = false;
    var x = document.getElementById("feedback").value;
    var f = document.getElementById("feedbackForm");
    var t = document.getElementById("textArea");

    if (x != null && x !== "") {
        formButton.removeEventListener("click", handleFormSubmission);

        // Handle form submission
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE && !sent) {
                f.innerHTML = '<p>Thank you for your feedback!</p>';
                sent = true;

                var arr = JSON.parse(req.responseText).record;
                arr.push({ feedback: x });

                req.open("PUT", "https://api.jsonbin.io/v3/b/your-bin-id", true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("X-Master-Key", "your-api-key");
                req.send(JSON.stringify({ record: arr }));

                console.log("Feedback sent successfully!");
            }
        };
        req.open("GET", "https://api.jsonbin.io/v3/b/your-bin-id/latest", true);
        req.setRequestHeader("X-Master-Key", "your-api-key");
        req.send();

        // Retrieve data from the JSON bin
        fetch(`https://api.jsonbin.io/v3/b/655ec20a0574da7622ca753a/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": "$2a$10$kkSQVx2Pbb4jUyEdk1yHWOP6kZUwHAz.GGFkhcLLriQZ5n4pgEXWS",
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Access your data within the 'data' variable
            displayRetrievedData(data); // You can create a separate function to handle data display
        })
        .catch(error => console.error("Error:", error));
    }
}

function displayRetrievedData(data) {
    // Handle the display of retrieved data, e.g., update HTML elements
    const outputContainer = document.getElementById("outputContainer");
    outputContainer.innerHTML = `<p>Retrieved Data: ${JSON.stringify(data)}</p>`;
}

var dropdown = document.getElementsByClassName("sidebar-dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

document.querySelector(".to-top").addEventListener("click", () => {
	if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ){
	isScrolling = true;
	} else {
		document.querySelector("#main").scrollIntoView(true);
	}
});

setInterval(update, 1);

function update() {
  if (isScrolling) {
    if (window.scrollY > 0) {
      window.scrollTo(0, window.scrollY - 10);
    } else {
      isScrolling = false;
    }
  }
}

function openNav() {
  
  //if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ){
	  if(window.innerWidth < 600) { 
	  document.getElementById("mySidebar").style.width = "100%";
  }else{
	document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry)
		if(entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/*document.querySelector(".home-logo").addEventListener("click", () => {
  window.location.href = 'index.html';
});*/

var dropdown = document.getElementsByClassName("sidebar-dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
