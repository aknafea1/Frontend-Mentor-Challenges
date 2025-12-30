const screen = document.querySelector(".screen");
const themeContainer = document.getElementById("switch");
const themeButtons = document.querySelectorAll("#switch li");
const keybadButtons = document.querySelectorAll(".buttons div");
const numReg = /\B(?=(\d{3})+(?!\d))/g;
const numbersFormat = /^[0-9\.\+\/\*-]+$/;
function numberForamtter() {
  screen.textContent = screen.textContent.replace(numReg, ",");
}

themeButtons.forEach((button, idx) => {
  button.addEventListener("click", function () {
    document.body.className = `theme-${idx + 1}`;
    themeContainer.style.setProperty("--switch-position", `${idx * 33}%`);
  });
});
function handleKeyPress(keyValue) {
  switch (keyValue) {
    case "del":
      screen.textContent = screen.textContent.slice(0, -1);
      break;
    case "reset":
      screen.textContent = "";
      break;
    case "x":
      screen.textContent = screen.textContent + "*";
      break;
    case "=":
      if (screen.textContent.match(numbersFormat)) {
        screen.textContent = eval(screen.textContent);
      }
      break;

    default:
      screen.textContent += keyValue;
  }
}
keybadButtons.forEach(function (key) {
  key.addEventListener("click", function () {
    screen.textContent = screen.textContent.split(",").join("");
    handleKeyPress(this.textContent);
    numberForamtter();
  });
  key.addEventListener("mousedown", function () {
    this.style.setProperty("--box-shadow-depth", "0px");
    this.style.setProperty("transform", "translateY(2px)");
  });
  key.addEventListener("mouseup", function () {
    this.style.setProperty("--box-shadow-depth", "2px");
    this.style.setProperty("transform", "translateY(0px)");
  });
});
