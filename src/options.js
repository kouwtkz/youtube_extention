var edit_mode = false;
var pre_shortcuts = {
    force_hide_command: "KeyB",
    endcard_hide_command: "KeyE",
};
document.querySelectorAll(`input.shortcut`).forEach((elm) => {
    elm.dataset.pre_placeholder = "未設定";
    elm.placeholder = elm.dataset.pre_placeholder;
    var user_shortcut = pre_shortcuts[elm.id];
    chrome.storage.sync.get(elm.id, (e) => {
        if (typeof e[elm.id] === "string") {
            user_shortcut = e[elm.id];
        }
        elm.value = user_shortcut;
    });
    elm.onkeydown = (e) => {
        return false;
    };
    elm.onfocus = (e) => {
        if (edit_mode) {
            elm.value = "";
            elm.placeholder = "ショートカットの入力中…";
        } else {
            elm.select();
        }
        return false;
    };
    elm.onblur = (e) => {
        if (edit_mode) {
            elm.placeholder = elm.dataset.pre_placeholder;
            chrome.storage.sync.set({
                [elm.id]: elm.value,
            });
            edit_mode = false;
        }
        return false;
    };
    elm.onkeydown = (e) => {
        if (edit_mode) {
            if (e.location < 1) {
                elm.value = `${e.ctrlKey ? "Ctrl + " : ""}${
                    e.altKey ? "Alt + " : ""
                }${e.shiftKey ? "Shift + " : ""}${e.code}`;
                elm.blur();
            }
            return false;
        }
    };
});
document.querySelectorAll(`input[type="button"][for]`).forEach((elm) => {
    elm.onclick = (e) => {
        var for_id = elm.getAttribute("for");
        if (for_id) {
            var focus_elm = document.getElementById(for_id);
            if (focus_elm) {
                edit_mode = true;
                focus_elm.focus();
            }
        }
        return false;
    };
});
document.querySelectorAll(`input[type="button"][reset]`).forEach((elm) => {
    elm.onclick = (e) => {
        var reset_id = elm.getAttribute("reset");
        if (reset_id) {
            var focus_elm = document.getElementById(reset_id);
            if (focus_elm) {
                focus_elm.value = pre_shortcuts[focus_elm.id];
                chrome.storage.sync.remove(reset_id);
            }
        }
        return false;
    };
});
