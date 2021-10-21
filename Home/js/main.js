
//GLOBAL
var UserSer = new UserServices();
getTeacher();

function getELE(element) {
    return document.querySelector(element);
}

function getArrayELE(element) {
    return document.querySelectorAll(element);
}

function removeClass(element, nameClass) {
    return getELE(element).classList.remove(nameClass);
}

function addClass(element, nameClass) {
    return getELE(element).classList.add(nameClass);
}

function containClass(element, nameClass) {
    return getELE(element).classList.contains(nameClass);
}

// get data teacher and show on website
function getTeacher() {
    UserSer.getData()
        .then(function (result) {
            renderTeacher(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })

}

// render teacher into HTML 
function renderTeacher(arrTeacher) {
    var arrRenderTeacher = [];
    var contentOurTeacherGroup1 = '';
    var contentOurTeacherGroup2 = '';
    var delayAOS = 200;

    arrRenderTeacher = arrTeacher.filter(function (item) {
        return item.loaiND === "GV";
    });

    arrRenderTeacher.map(function (item, index) {
        if (index === 4) {
            delayAOS = 200;
        }

        var content = `
    <div class="ourTeam__item col-sm-6 col-lg-3" data-aos="fade" data-aos-delay="${delayAOS}">
        <div class="card">
            <span class="overflow-hidden">
                <img class="card-img-top" src="./img/${item.hinhAnh}" class="card-img-top img-fluid" alt="...">
            </span>
        <div class="card-body">
            <h4>${item.ngonNgu}</h4>
            <h2>${item.hoTen}</h2>
            <p>${item.moTa}</p>
        </div>
      </div>
    </div>
    `;
        delayAOS += 200;

        if (index < 4) {
            contentOurTeacherGroup1 += content;
        }
        if (index >= 4 && index < 8) {
            contentOurTeacherGroup2 += content;
        }
    });

    getELE(".ourTeam__group-1").innerHTML = contentOurTeacherGroup1;
    getELE(".ourTeam__group-2").innerHTML = contentOurTeacherGroup2;
}

// initiation AOS with global setting 
AOS.init({
    once: true,
    duration: 1000,
    easing: 'cubic-bezier(.190, 1, .220, 1)',
    delay: 200
});

//animation fade of AOS on footer
animationFooterItem();
function animationFooterItem() {
    var footeritem = getArrayELE(".footer__content-item");
    var delayAOS = 200;
    footeritem.forEach(function (item) {
        item.setAttribute("data-aos", "fade");
        item.setAttribute("data-aos-delay", delayAOS);
        delayAOS += 200;
    });
}


function responsiveSideBar(responsivePosition) {
    if (responsivePosition.matches) {
        getArrayELE(".dropdown-menu").forEach(function (item) {
            item.classList.remove("hoverShow");
        });
    } else {
        removeClass("body", "pushRight");
        removeClass(".navbar-toggler-icon", "change");
        removeClass("#navbarTabula", "showSideBar");

        getArrayELE(".dropdown-menu").forEach(function (item) {
            item.classList.add("hoverShow");
        });
    }
}

var responsivePosition = window.matchMedia("(max-width: 1199.98px)");
responsiveSideBar(responsivePosition);
responsivePosition.addListener(responsiveSideBar);



// show sidebar menu when we click navbar-toggler 
getELE(".navbar-toggler").addEventListener("click", function () {
    getELE("header").removeAttribute("style");

    if (containClass("body", "pushRight") &&
        containClass(".navbar-toggler-icon", "change")) {

        removeClass("body", "pushRight");
        removeClass(".navbar-toggler-icon", "change");
        removeClass("#navbarTabula", "showSideBar");
        removeClass("header .navbar-brand", "hide");
    }
    else {
        addClass("body", "pushRight");
        addClass(".navbar-toggler-icon", "change");
        addClass("#navbarTabula", "showSideBar");
        addClass("header .navbar-brand", "hide");

    }

});


// scroll to show header 
window.onscroll = function () { myFunction() };

function myFunction() {


    if (window.pageYOffset <= 80) {
        anime({
            targets: 'header',
            translateY: [-80, 0],
            duration: 300,
            loop: false,
            easing: 'easeInCirc'
        });
    }

    if (window.pageYOffset > 80) {

        addClass("header", "sticky");
        addClass(".navbar-brand", "invisible");
        addClass(".navbarContact .btn", "scrollButton");
        getELE("header").style.backgroundColor = "white";
        getELE(".navbar").style.height = "48px";

        for (var i = 0; i < 6; i++) {
            getArrayELE("#navbarTabula .navbar-nav .nav-item")[i].style.lineHeight = "48px";
        }
    }
    else {
        removeClass("header", "sticky");
        removeClass(".navbar-brand", "invisible");
        removeClass(".navbarContact .btn", "scrollButton");
        getELE("header").style.backgroundColor = "transparent";

        getELE(".navbar").style.height = "80px";

        for (var i = 0; i < 6; i++) {
            getArrayELE("#navbarTabula .navbar-nav .nav-item")[i].style.lineHeight = "80px";
        }

    }

}

