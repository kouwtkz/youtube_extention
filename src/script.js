var pre_shortcuts = {
    force_hide_command: "KeyB",
    endcard_hide_command: "KeyE",
};
var user_shortcuts = pre_shortcuts;
Object.keys(user_shortcuts).forEach((key) => {
    chrome.storage.sync.get(key, (e) => {
        if (typeof e[key] === "string") {
            user_shortcuts[key] = e[key];
        }
    });
});
document.addEventListener(
    "DOMContentLoaded",
    () => {
        insert_link_element(
            "css",
            "resources/ext_content.css",
            "css_ytb_ext_content"
        );
    },
    false
);
function toggle_class(elm_or_id, class_name) {
    var elm = null;
    if (typeof elm_or_id === "string") {
        elm = document.getElementById(elm_or_id);
    } else {
        elm = elm_or_id;
    }
    if (elm !== null) {
        elm.classList.toggle(class_name);
    }
}
document.addEventListener("keydown", (e) => {
    var target,
        run = false;
    if (typeof e.target === "object") {
        target = e.target;
    } else {
        target = document.activeElement;
    }
    switch (target.tagName) {
        case "INPUT":
        case "TEXTAREA":
            break;
        default:
            run = e.target.contentEditable !== "true";
            break;
    }
    if (run) {
        if (e.location < 1) {
            var code_judge = `${e.ctrlKey ? "Ctrl + " : ""}${
                e.altKey ? "Alt + " : ""
            }${e.shiftKey ? "Shift + " : ""}${e.code}`;
            switch (code_judge) {
                case user_shortcuts["force_hide_command"]:
                    toggle_class("movie_player", "ytp-autohide");
                    break;
                case user_shortcuts["endcard_hide_command"]:
                    toggle_class("movie_player", "ytp-ce-hide");
                    break;
            }
        }
    }
});
function insert_link_element(tag, insert_path, id = "") {
    if (id !== "") {
        if (document.getElementById(id) !== null) return;
    }
    var url,
        elt = null;
    switch (tag.toLowerCase()) {
        case "css":
            url = chrome.runtime.getURL(insert_path);
            elt = document.createElement("link");
            elt.href = url;
            elt.rel = "stylesheet";
            break;
        case "script":
            url = chrome.runtime.getURL(insert_path);
            elt = document.createElement("script");
            elt.src = url;
            elt.type = "text/javascript";
            break;
    }
    if (elt !== null) {
        if (id !== "") elt.id = id;
        document.querySelector("head").appendChild(elt);
    }
}
