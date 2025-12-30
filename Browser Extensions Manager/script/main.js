const extensionsContainer = document.getElementById("extensions");
const extensions = [
  {
    title: "DevLens",
    parag: "Quickly inspect page layouts and visualize element boundaries.",
  },
  {
    title: "StyleSpy",
    parag: "Instantly analyze and copy CSS from any webpage element.",
  },
  {
    title: "SpeedBoost",
    parag: "Optimizes browser resource usage to accelerate page loading.",
  },
  {
    title: "JSONWizard",
    parag: "Formats, validates, and prettifies JSON responses in-browser.",
  },
  {
    title: "TabMaster Pro",
    parag: "Organizes browser tabs into groups and sessions.",
  },
  {
    title: "ViewportBuddy",
    parag: "Simulates various screen resolutions directly within the browser.",
  },
  {
    title: "Markup Notes",
    parag:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
  },
  {
    title: "GridGuides",
    parag: "Overlay customizable grids and alignment guides on any webpage.",
  },
  {
    title: "Palette Picker",
    parag: "Instantly extracts color palettes from any webpage.",
  },
  {
    title: "LinkChecker",
    parag: "Scans and highlights broken links on any page.",
  },
  {
    title: "DOM Snapshot",
    parag: "Capture and export DOM structures quickly.",
  },
  {
    title: "ConsolePlus",
    parag: "Enhanced developer console with advanced filtering and logging.",
  },
];

// add icon based on title according to assets it follows this format logo-(title)
const regex = /[a-z\s](?=[A-Z])/g;

let allExtensions = extensions.map((obj, idx) => {
  return {
    ...obj,
    icon: `assets/images/logo-${obj.title
      .trim()
      .replace(regex, (val) => (val !== " " ? `${val}-` : "-"))
      .toLowerCase()}.svg`,
    isActive: true,
    id: idx,
  };
});
let activeArray = [...allExtensions.map((inner) => ({ ...inner }))]; //assuming all extensions inially active
let inActiveArray = [];
let currentActive = [...allExtensions];

function handleDataRendering(arr) {
  extensionsContainer.innerHTML = "";
  arr.forEach((item) => {
    extensionsContainer.innerHTML += `
    <div class="extension" data-idx=${item.id}>
      <div class="flex-group">
        <img src="${item.icon}"/>
        <div>
          <h2>${item.title}</h2>
          <p>${item.parag}</p>
        </div>
      </div>
      <div class="flex-group flex">
        <button class="remove">Remove</button>
        <ul class="toggle ${item.isActive ? "active" : ""}">
        <li class="off"></li>
        <li class="on"></li>
        </ul>
      </div>
    </div>
    `;
  });
}
function handleActiveChange() {
  activeArray = [];
  inActiveArray = [];
  allExtensions.forEach((item) => {
    if (item.isActive) {
      activeArray.push(item);
    } else {
      inActiveArray.push(item);
    }
  });
}
function reRender(t) {
  handleActiveChange();

  const activeTab = document
    .querySelector("#tabs li.active")
    .textContent.toLowerCase();

  if (activeTab === "active") {
    currentActive = activeArray;
  } else if (activeTab === "inactive") {
    currentActive = inActiveArray;
  } else {
    currentActive = allExtensions;
  }
  setTimeout(() => {
    handleDataRendering(currentActive);
  }, t);
}
handleDataRendering(allExtensions);
document.addEventListener("click", (e) => {
  const element = e.target.parentElement;
  const extensionEl = e.target.closest(".extension");

  if (element && element.classList.contains("toggle")) {
    const elemntIdx = allExtensions.findIndex(
      (ele) => ele.id == e.target.closest(".extension").dataset.idx
    );
    element.classList.toggle("active");
    allExtensions[elemntIdx].isActive = !allExtensions[elemntIdx].isActive;
    reRender(400);
  } else if (e.target.classList.contains("remove")) {
    const elemntIdx = allExtensions.findIndex(
      (ele) => ele.id == e.target.closest(".extension").dataset.idx
    );
    allExtensions.splice(elemntIdx, 1);
    reRender(0);
  }
});

const tabs = document.querySelectorAll("#tabs li");

function resetActiveStatus(element) {
  element.classList.remove("active");
}
tabs.forEach((tab) => {
  tab.addEventListener("click", (element) => {
    tabs.forEach(resetActiveStatus);
    element.target.classList.toggle("active");
    switch (element.target.textContent.toLowerCase()) {
      case "inactive":
        currentActive = inActiveArray;
        break;
      case "active":
        currentActive = activeArray;

        break;

      default:
        currentActive = allExtensions;
        break;
    }
    handleDataRendering(currentActive);
  });
});
const whiteTheme = document.querySelector(".switch img:nth-of-type(1)");
const darkTheme = document.querySelector(".switch img:nth-of-type(2)");

whiteTheme.addEventListener("click", () => {
  document.body.dataset.theme = "white";
});
darkTheme.addEventListener("click", () => {
  document.body.dataset.theme = "dark";
});
