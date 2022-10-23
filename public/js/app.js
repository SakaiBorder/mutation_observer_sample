console.log("app.js");
setTimeout(() => {
  var app = new Vue({
    el: "#app",
    data: {
      message: "Hello Vue!",
    },
  });
  console.log(app);
}, 1000);
