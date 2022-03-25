var url = "";
var v = "";
const CommentURLCopyRe = /([?&]v=|video\/)([^\/&]*)/;
const activeOption = {
    active: true,
    currentWindow: true,
};
function getURLCallback(callback) {
    chrome.tabs.query(activeOption, (tabs) => {
        if (
            typeof tabs[0] !== "undefined" &&
            typeof tabs[0].url !== "undefined"
        ) {
            callback(tabs[0].url);
        }
    });
}
function windowClose(time = 1000) {
    setTimeout(() => {
        window.close();
    }, time);
}
const ulElm = document.querySelector("ul#youtubeExensionMenu");
const intructElm = document.createElement("li");
intructElm.id = "intruct";
const cmCpElm = document.createElement("li");
cmCpElm.id = "CommentURLCopy";
cmCpElm.innerHTML = "コメントURLをコピーする";
cmCpElm.classList.add("button");
cmCpElm.onclick = () => {
    if (cmCpElm.classList.contains("button")) {
        copyClose("https://www.youtube.com/live_chat?v=" + v, cmCpElm);
    }
};
const UrlCpElm = document.createElement("li");
UrlCpElm.id = "URLCopy";
UrlCpElm.innerHTML = "URLをコピーする";
UrlCpElm.classList.add("button");
UrlCpElm.onclick = () => {
    if (UrlCpElm.classList.contains("button")) {
        if (v === "") {
            copyClose(url, UrlCpElm);
        } else {
            copyClose("https://www.youtube.com/watch?v=" + v, UrlCpElm);
        }
    }
};

getURLCallback((aurl) => {
    url = aurl;
    var m = url.match(CommentURLCopyRe);
    v = m ? m[2] : "";
    if (url.match(/youtube\.com/)) {
        if (v) {
            UrlCpElm.innerHTML = "動画URLをコピーする";
            ulElm.appendChild(UrlCpElm);
            ulElm.appendChild(cmCpElm);
        } else {
            ulElm.appendChild(UrlCpElm);
        }
    } else if (url.match(/http/)) {
        ulElm.appendChild(UrlCpElm);
    }
    if (ulElm.children.length === 0) {
        intructElm.innerHTML = "YouTube拡張アプリです";
        ulElm.appendChild(intructElm);
        windowClose(2000);
    }
});
function copyCommentURL(url) {
    var m = null;
    if ((m = url.match(CommentURLCopyRe))) {
    }
}
function copyClose(val, elm = null) {
    navigator.clipboard.writeText(val);
    if (elm !== null) elm.innerHTML = "コピーしました";
    windowClose();
}
