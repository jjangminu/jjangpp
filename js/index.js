//intro
$(document).ready(function () {
  //애니메이션 처리할 요소
  const $circle = $(".follow_circle");
  const $spans = $("#intro h2 span");
  const $intro = $("#intro");

  //움직일 좌표
  const maxX = $(window).width() - 400;
  const maxY = $(window).height() - 400;
  const path = [
    { left: maxX, top: 0 },
    { left: maxX, top: maxY },
    { left: 0, top: maxY },
    { left: maxX / 2, top: maxY / 2 },
  ];

  //현재 index 지점
  let index = 0;

  //페이드인 효과
  $intro.fadeIn(500, function () {
    $("body").css("background-color", "rgb(76, 70, 55)");
    $("#intro").css("position", "absolute");
  });

  //움직이는 원형
  function scanMotion() {
    //원형이 모두 움직이고 실행
    if (index >= path.length) {
      afterScan();
      return;
    }
    const pos = path[index];
    $circle.animate(pos, 1000, "swing", () => {
      index++;
      scanMotion();
    });
  }

  //텍스트 사라짐
  function afterScan() {
    $spans.each(function (i) {
      $(this)
        .delay(i * 300)
        .animate(
          {
            opacity: 0,
            marginLeft: "-50px",
          },
          700
        );
      $circle.css("transition", "5s");
      $circle.css("transform", "scale(3)");
    });

    //애니메이션이 끝난 후 스크롤, 마우스 보이기
    setTimeout(() => {
      $intro.fadeOut(500, () => {
        $("body").css("overflow", "auto");
        $("body").css("overflow-x", "hidden");
        $("body").css("cursor", "auto");
      });

      $(".mouse").css("display", "block");
    }, $spans.length * 300 + 500);
  }
  scanMotion();
});

const cursor = document.querySelector(".mouse");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX + 10;
  mouseY = e.pageY + 10;
});

function animate() {
  // 부드럽게 이동 (0.1을 조절하면 속도 조절됨)
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  cursor.style.left = currentX + "px";
  cursor.style.top = currentY + "px";

  requestAnimationFrame(animate);
}
animate(); // 애니메이션 시작

//fix menu 보이기
$(window).on("scroll", function () {
  //현재 스크롤 위치
  let scr = $(document).scrollTop();
  //패이지 위치
  let intro = $("#home").offset().top;
  let aboutMe = $("#aboutMe").offset().top;
  let logo = $("#logo").offset().top;
  let workDesign = $("#workDesign").offset().top;
  let workCoding = $("#workCoding").offset().top;
  let project = $("#project").offset().top;
  let contact = $("#contact").offset().top;

  //fix header 보이기
  if (scr >= 150) {
    $("header").fadeIn(1000);
  } else {
    $("header").fadeOut(1000);
  }
  if (scr >= intro && scr < aboutMe) {
    $("body").css("background-color", "rgb(76, 70, 55)");
  } else if (scr >= aboutMe && scr < logo) {
    $("body").css("background-color", "rgb(255, 249, 232)");
  } else if (scr >= logo && scr < workDesign) {
    $("body").css("background-color", "rgb(255, 220, 0)");
  } else if (scr >= workDesign && scr < workCoding) {
    $("body").css("background-color", "rgb(27, 61, 47)");
  } else if (scr >= workCoding && scr < project) {
    $("body").css("background-color", "rgb(255, 249, 232)");
  } else if (scr >= project && scr < contact) {
    $("#project").css(
      "background-image",
      "linear-gradient(rgb(255, 249, 232), rgb(158, 144, 101))"
    );
    $("body").css("background-color", "rgb(76, 70, 55)");
  } else if (scr >= project + 500) {
    $("#project").css(
      "background-image",
      "linear-gradient(rgb(158, 144, 101),rgb(76, 70, 55) )"
    );
  }

  //body 컬러 변환
});

/* top_nav scroll motion */
$("header li").on("click", function () {
  let i = $(this).index();
  if (i == 2) {
    i = 3;
  } else if (i == 3) {
    i = 5;
  } else if (i == 4) {
    i = 6;
  }
  let target = $("main > div").eq(i).offset().top;
  console.log(i, target);
  $("html").animate({ scrollTop: target });
  $("header li").removeClass("nav_mov");
  $(this).addClass("nav_mov");
});
$("#home .navi li").on("click", function () {
  let i = $(this).index();
  if (i == 2) {
    i = 3;
  } else if (i == 3) {
    i = 5;
  } else if (i == 4) {
    i = 6;
  }
  let target = $("main > div").eq(i).offset().top;
  console.log(i, target);
  $("html").animate({ scrollTop: target });
});
