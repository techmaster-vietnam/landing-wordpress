import "../css/style.css";
import "lazysizes";
import { Modal } from "bootstrap";

//passive scroll Jquery
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  },
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  },
};

let bar = document.getElementById("bar");
let navbar = document.getElementById("nav-bar");
let closebar = document.getElementById("close-bar");
let body = document.querySelector("body");
let linklist = document.getElementById("link-list");

let flag = false;

bar.onclick = function () {
  navbar.style.width = "250px";
  bar.style.visibility = "hidden";
  body.style.overflowY = "hidden";
  linklist.style.display = "block";
};

closebar.onclick = function () {
  navbar.style.width = "0px";
  body.style.overflowY = "inherit";
  linklist.style.display = "none";
  setTimeout(function () {
    bar.style.visibility = "inherit";
  }, 200);
};

let toggle_btn = document.querySelectorAll(".toggle_btn");

// toggle_btn.forEach(function(btn){
//     toggle_btn.onclick = function(){
//         console.log("hello");
//     }
// })

toggle_btn.forEach(function(btn){
    btn.addEventListener('click', function() {
        let course_info = this.parentElement.parentElement.querySelector(".course_info");
        console.log(course_info);
        if(course_info.style.display == "block"){
            course_info.style.display = "none";
            this.querySelector("img").src = "img/down-arrow.svg"
            
        }
        else if(course_info.style.display == "none"){
            course_info.style.display = "block";
            console.log(this.src);
            this.querySelector("img").src = "img/up-arrow.svg"

        }
    })
})

console.log(toggle_btn);

function checkValid(name, phone, email) {
  let valid = true;

  const nameMessage = document.querySelector(".name-message");
  const phoneMessage = document.querySelector(".phone-message");
  const emailMessage = document.querySelector(".email-message");

  if (name.value.trim() == "") {
    name.classList.remove("valid");
    name.classList.add("invalid");
    nameMessage.innerText = "Vui lòng nhập đúng họ tên";
    valid = false;
  } else {
    name.classList.remove("invalid");
    name.classList.add("valid");
    nameMessage.innerText = "";
  }

  if (phone.value.trim() == "") {
    phone.classList.remove("valid");
    phone.classList.add("invalid");
    phoneMessage.innerText = "Vui lòng nhập đúng số điện thoại";
    valid = false;
  } else {
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    phoneMessage.innerText = "";
  }

  if (email.value.trim() == "" || !email.value.includes("@")) {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailMessage.innerText = "Vui lòng nhập đúng email";
    valid = false;
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
    emailMessage.innerText = "";
  }

  return valid;
}

function toggleModal() {
  const body = document.querySelector("body");
  successModal.classList.toggle("showUp");
  body.classList.toggle("preventScroll");
}

const successModal = document.getElementById("successModal");
successModal.addEventListener("click", function () {
  toggleModal();
});

document.getElementById("btn-register").addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const note = document.getElementById("note");

  if (checkValid(name, phone, email)) {
    let nameVal = name.value;
    let phoneVal = phone.value;
    let emailVal = email.value;
    let noteVal = note.value;

    let req = {
      FullName: nameVal,
      Email: emailVal,
      Phone: phoneVal,
      Info: noteVal,
      Link: window.location.href,
      ItemId: "zf3",
      Type: 1,
    };

    let myJSON = JSON.stringify(req);

    $.ajax({
      url: "https://techmaster.vn/submit-advisory",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: myJSON,
      dataType: "json",
      success: function () {
        name.value = phone.value = email.value = note.value = "";
        name.classList.remove("valid");
        phone.classList.remove("valid");
        email.classList.remove("valid");
        toggleModal();
      },
      error: function (result) {
        console.error(result)
      },
    });
  }
});

let isMaterialVideoLoaded = false;
/* Lazyload video */
$(window).on("scroll", function () {
  if (!isMaterialVideoLoaded) {
    var hT = $("#target").offset().top,
      hH = $("#target").outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > hT + hH - wH) {
      $(".material .intro_image").html(`
      <iframe width="560" height="315" class="lazyload" data-src="https://www.youtube.com/embed/1oJu87Fw2Pg"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      `);
      isMaterialVideoLoaded = true;
    }
  }
});

let isDemoVideoLoaded = false;
/* Lazyload video */
$(window).on("scroll", function () {
  if (!isDemoVideoLoaded) {
    var hT = $("#product").offset().top,
      hH = $("#product").outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > hT + hH - wH) {
      $(".video_container").html(`
      <div class="video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/1oJu87Fw2Pg"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
        <a href="https://www.youtube.com/watch?v=1oJu87Fw2Pg">
            <div class="video_name">
                HƯỚNG DẪN LẬP TRÌNH GAME TETRIS
            </div>
        </a>
        </div>
        <div class="video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gVqWSkYjqeQ"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            <a href="https://www.youtube.com/watch?v=gVqWSkYjqeQ">
                <div class="video_name">
                    HƯỚNG DẪN LẬP TRÌNH GAME FLAPPY BIRD
                </div>
            </a>
        </div>
      `);
      isDemoVideoLoaded = true;
    }
  }
});
