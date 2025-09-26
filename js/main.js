

 import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import SplitText  from "./SplitText.js";

gsap.registerPlugin(SplitText);


document.fonts.ready.then(() => {
  function createSplitTexts(elements) {
    const splits = {};

    elements.forEach(({ key, selector, type }) => {
      const config = { type, mask: type };

      if (type === "chars") config.charsClass = "char";
      if (type === "lines") config.linesClass = "line";
      splits[key] = SplitText.create(selector, config);
    });

    return splits;
  }
 var app = (function () {
  var body, menu, menuItems, menuLinks;

  function init() {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-btn');
    menuItems = document.querySelectorAll('.nav__list-item');
    // نجيب كل الـ anchors جوه الـ list items
    menuLinks = document.querySelectorAll('.nav__list-item a');
    applyListeners();
  }

  function applyListeners() {
    if (!menu) return;

    // فتح/قفل المينيو عن طريق إضافة/إزالة كلاس على الـ body
    menu.addEventListener('click', function () {
      toggleClass(body, 'nav-active');
    });

    // لما تدوس على أي لينك داخل المينيو → نقفل المينيو
    if (menuLinks && menuLinks.length) {
      Array.prototype.forEach.call(menuLinks, function (link) {
        link.addEventListener('click', function (e) {
          // إذا أردت التأكد من إغلاق المينيو قبل الانتقال استخدم remove بدلاً من toggle
          if (body && body.classList) body.classList.remove('nav-active');

          // ملاحظة: لو الروابط داخلية (#section) التصفح العادي سيعمل بعد الغلق
          // لو بدك تتحكم في التنقل بـ JS (SPA) تقدر تمنع السلوك الافتراضي هنا:
          // e.preventDefault(); ثم تعامل مع التنقل يدوياً
        });
      });
    }
  }

  function toggleClass(element, stringClass) {
    if (!element) return;
    if (element.classList.contains(stringClass)) element.classList.remove(stringClass);
    else element.classList.add(stringClass);
  }

  // تهيئة بعد تحميل الـ DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {}; // لا نحتاج إرجاع شيء
})();
  const splitElements = [
  { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
  { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
  { key: "headerChars", selector: ".header h1", type: "chars" },
  { key: "heroFooterH3", selector: ".hero-footer h3", type: "lines" },
  { key: "heroFooterP", selector: ".hero-footer p", type: "lines" },
  { key: "btnLabels", selector: ".btn-label span", type: "lines" },
];
const splits = createSplitTexts(splitElements);

gsap.set([splits.logoChars.chars], { x: "100%" });

gsap.set(
  [
    splits.footerLines.lines,
    splits.headerChars.chars,
    splits.heroFooterH3.lines,
    splits.heroFooterP.lines,
    splits.btnLabels.lines,
  ],
  { y: "100%" }
);

gsap.set(".btn-icon", { clipPath: "circle(0% at 50% 50%)" });
gsap.set(".btn", { scale: 0 });
function animateProgress(duration = 4) {
  const tl = gsap.timeline();
  const counterSteps = 5;
  let currentProgress = 0;

  for (let i = 0; i < counterSteps; i++) {
    const finalStep = i === counterSteps - 1;
    const targetProgress = finalStep
      ? 1
      : Math.min(currentProgress + Math.random() * 0.3 + 0.1);
    currentProgress = targetProgress;

    tl.to(".preloader-progress-bar", {
      scaleX: targetProgress,
      duration: duration / counterSteps,
      ease: "power2.out",
    });
  }

  return tl;
}
const tl = gsap.timeline({ delay: 0.5 });

tl.to(splits.logoChars.chars, {
  x: "0%",
  stagger: 0.05,
  duration: 1,
  ease: "power4.inOut",
}).to(
  splits.footerLines.lines,
  {
    y: "0%",
    stagger: 0.1,
    duration: 1,
    ease: "power4.inOut",
  },
  "0.25"
)
.add(animateProgress(), "<")
.set(".preloader-progress", { backgroundColor: "var(--base-300)" })
.to(
  splits.logoChars.chars,
  {
    x: "-100%",
    stagger: 0.05,
    duration: 1,
    ease: "power4.inOut",
  },
  "-=0.5"
).to(
  splits.footerLines.lines,
  {
    y: "-100%",
    stagger: 0.1,
    duration: 1,
    ease: "power4.inOut",
  },
  "<"
)
.to(
  ".preloader-progress",
  {
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
  },
  "-=0.25"
).to(
  ".preloader-mask",
  {
    scale: 7,
    duration: 2.5,
    ease: "power3.out",
  },
  "<"
).to(
  ".preloader-mask",
  {
    display: "none",
    duration: 0,
    ease: "power3.out",
  },
  "<"
)
.to(
  ".hero-img",
  {
    scale: 1,
    duration: 1.5,
    ease: "power3.out",
  },
  "<"
).to(
  ".logo-svg",
  {
    scale: 1,
    duration: 1.5,
    ease: "power3.out",
  },
  "<"
).to(splits.headerChars.chars, {
  y: 0,
  stagger: 0.05,
  duration: 1,
  ease: "power4.out",
  delay: -2,
})
.to(
  [splits.heroFooterH3.lines, splits.heroFooterP.lines],
  {
    y: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power4.out",
  },
  "-=1.5"
).to(
  ".btn",
  {
    scale: 1,
    duration: 1,
    ease: "power4.out",
    onStart: () => {
      tl.to(".btn-icon", {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        ease: "power2.out",
        delay: -1.25,
      }).to(splits.btnLabels.lines, {
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: -1.25,
      });
    },
  },
  "<"
);
});
	

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__list-item a');



// لما تدوس على أي لينك → يقفل المينيو
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    // المتصفح تلقائي هيروح للـ href بتاع اللينك
  });
});

 document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // العناصر من الشمال
    gsap.utils.toArray(".fade-left").forEach((el) => {
      gsap.from(el, {
        x: -100,
        opacity: 0,
        rotate: 45,
        duration: .7,
        ease: "linear",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // يبدأ الأنيميشن لما العنصر يوصل 80% من الشاشة
        },
      });
    });

    // العناصر من اليمين
    gsap.utils.toArray(".fade-right").forEach((el) => {
      gsap.from(el, {
        x: 100,
        opacity: 0,
        duration: .7,
        rotate: -45,
        ease: "linear",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    // العناصر من فوق
    gsap.utils.toArray(".fade-top").forEach((el) => {
      gsap.from(el, {
        y: -100,
        opacity: 0,
        duration: .7,
        ease: "linear",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    // العناصر من تحت
    gsap.utils.toArray(".fade-bottom").forEach((el) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: .7,
        ease: "linear",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });
  });

const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // منع التحويل لصفحة Formspree

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset(); // يمسح الفورم
        message.classList.remove("hidden");
        message.classList.remove("text-red-600");
        message.classList.add("text-green-600");
        message.textContent = "Your message has been sent successfully!";
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      message.classList.remove("hidden");
      message.classList.remove("text-green-600");
      message.classList.add("text-red-600");
      message.textContent = "Something went wrong, please try again.";
    }
  });