const targetNode = document;

const options = {
  attributes: true,
  childList: true,
  subtree: true,
};

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeName === "SCRIPT") {
          if (addedNode.dataset.isExecutable) {
            continue;
          }
          addedNode.type = "text/template";
        }
      }
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, options);

var executeScripts = () => {
  const elements = document.querySelectorAll("script");
  elements.forEach((el, index) => {
    // 最初はobserve.jsなので外す
    if (!index) return;

    const newElement = document.createElement("script");

    newElement.type = "text/javascript";

    // srcがないものにsrcがつくと<script>~~~</script>のコードが実行されないためチェックする
    if (el.src) {
      newElement.src = el.src;
    }
    newElement.textContent = el.textContent;

    // observer側でtext/templateに変更しないようにマーク
    newElement.dataset.isExecutable = true;
    el.remove();

    document.body.appendChild(newElement);
  });
};
