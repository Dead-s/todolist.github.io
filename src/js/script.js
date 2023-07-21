document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    setTimeout(() => {
      toggle_mode();
      var mode = document.getElementById("mode-toggle");
      mode.addEventListener("click", (e) => {
        if (mode.classList.contains("fa-moon")) {
          localStorage.setItem("mode", "dark");
          mode.classList.remove("fa-moon");
          mode.classList.add("fa-sun");
          toggle_mode();
          return;
        } else {
          localStorage.setItem("mode", "light");
          mode.classList.remove("fa-sun");
          mode.classList.add("fa-moon");
          toggle_mode();
          return;
        }
      });
      document.getElementById("new-item-inp").addEventListener("input", (e) => {
        if (e.target.value == "" || null) {
          console.log("null");
          document.getElementById("add-todo").style.visibility = "hidden";
        } else {
          console.log("!null");
          document.getElementById("add-todo").style.visibility = "visible";
        }
      });

      var filter_up = document.getElementById("filter-up");
      filter_up.addEventListener("click", () => {
        if (filter_up.classList.contains("fa-chevron-up")) {
          filter_up.classList.remove("fa-chevron-up");
          filter_up.classList.add("fa-chevron-down");
          document
            .getElementsByClassName("filter-div")[0]
            .setAttribute("style", "height:350px");
        } else {
          filter_up.classList.remove("fa-chevron-down");
          filter_up.classList.add("fa-chevron-up");
          document
            .getElementsByClassName("filter-div")[0]
            .setAttribute("style", "height:0px");
        }
      });
    }, 500);
  }
};
function toggle_mode() {
  if (localStorage.getItem("mode") == "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    document.getElementsByTagName("footer")[0].classList.add("dark");
    document.getElementsByTagName("footer")[0].classList.remove("light");
    document.getElementsByClassName("filter-div")[0].classList.add("dark");
    document.getElementsByClassName("filter-div")[0].classList.remove("light");
    document.getElementById("new-item-inp").classList.remove("inp-light");
    document.getElementById("filter-up").classList.remove("light-icon");
  } else {
    document.body.classList.remove("dark");
    document.getElementsByClassName("filter-div")[0].classList.remove("dark");
    document.body.classList.add("light");
    document.getElementsByTagName("footer")[0].classList.remove("dark");
    document.getElementsByTagName("footer")[0].classList.add("light");
    document.getElementsByClassName("filter-div")[0].classList.add("light");
    document.getElementById("new-item-inp").classList.add("inp-light");
    document.getElementById("filter-up").classList.add("light-icon");
  }
}
