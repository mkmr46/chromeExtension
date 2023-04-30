const handleClick = async (event) => {
  const { value } = event.target;
  const win2 = window.open(value);
  win2.onload = () =>{
    const mainUrl = win2.location.href;
    let filename = mainUrl.split("/").pop();
    const text = win2.document.querySelector("tbody").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const textFile = URL.createObjectURL(blob);
    const link = win2.document.createElement("a");
    link.href = textFile;
    link.download = filename;
    win2.document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(textFile);
    win2.close();
  }
};

const numFiles = document.querySelectorAll(".dropdown-menu.dropdown-menu-sw.show-more-popover.color-fg-default.position-absolute.f5");
numFiles.forEach((menu) => {
  const link = menu.children[2].href;
  const ele = document.createElement("button");
  ele.role = "menuitem";
  ele.value = link;
  ele.className = "pl-5 dropdown-item btn-link";
  ele.textContent = "Download file";
  ele.onclick = handleClick;
  menu.appendChild(ele);
});

