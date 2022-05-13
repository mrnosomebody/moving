//#############NOTIFICATIONS(TOASTS)#############//

let errorTrigger = document.querySelector('#errorTrigger')
let successTrigger = document.querySelector('#successTrigger')


window.addEventListener("DOMContentLoaded", () => {
    if (successTrigger) {
        const nc = new NotificationCenter('success');
    }
    if (errorTrigger) {
        const nc = new NotificationCenter('error');
    }
});

class NotificationCenter {
    constructor(type) {
        this.items = [];
        this.itemsToKill = [];
        this.messages = NotificationMessages();
        this.killTimeout = null;

        this.spawnNotes(1, type);
    }

    spawnNote(type) {
        const id = this.random(0, 2 ** 32, true).toString(16);
        const message = this.messages[type];
        const note = new Notification({
            id: `note-${id}`,
            icon: message.icon,
            title: message.title,
            subtitle: message.subtitle,
            actions: message.actions
        });
        const transY = 100 * this.items.length;

        note.el.style.transform = `translateY(${transY}%)`;
        note.el.addEventListener("click", this.killNote.bind(this, note.id));

        this.items.push(note);
    }

    spawnNotes(amount, type) {
        while (amount--)
            this.spawnNote(type);
    }

    killNote(id, e) {
        const note = this.items.find(item => item.id === id);
        const tar = e.target;

        if (note && tar.getAttribute("data-dismiss") === id) {
            note.el.classList.add("notification--out");
            this.itemsToKill.push(note);

            clearTimeout(this.killTimeout);

            this.killTimeout = setTimeout(() => {
                this.itemsToKill.forEach(itemToKill => {
                    document.body.removeChild(itemToKill.el);

                    const left = this.items.filter(item => item.id !== itemToKill.id);
                    this.items = [...left];
                });

                this.itemsToKill = [];

            }, note.killTime);
        }
    }

    random(min, max, round = false) {
        const percent = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
        const relativeValue = (max - min) * percent;

        return min + (round === true ? Math.round(relativeValue) : +relativeValue.toFixed(2));
    }
}

class Notification {
    constructor(args) {
        this.args = args;
        this.el = null;
        this.id = null;
        this.killTime = 300;
        this.init(args);
    }

    init(args) {
        const {id, icon, title, subtitle, actions} = args;
        const block = "notification";
        const parent = document.body;
        const xmlnsSVG = "http://www.w3.org/2000/svg";
        const xmlnsUse = "http://www.w3.org/1999/xlink";

        const note = this.newEl("div");
        note.id = id;
        note.className = block;
        parent.insertBefore(note, parent.lastElementChild);

        const box = this.newEl("div");
        box.className = `${block}__box`;
        note.appendChild(box);

        const content = this.newEl("div");
        content.className = `${block}__content`;
        box.appendChild(content);

        const _icon = this.newEl("div");
        _icon.className = `${block}__icon`;
        content.appendChild(_icon);

        const iconSVG = this.newEl("svg", xmlnsSVG);
        iconSVG.setAttribute("class", `${block}__icon-svg`);
        iconSVG.setAttribute("role", "img");
        iconSVG.setAttribute("aria-label", icon);
        iconSVG.setAttribute("width", "32px");
        iconSVG.setAttribute("height", "32px");
        _icon.appendChild(iconSVG);

        const iconUse = this.newEl("use", xmlnsSVG);
        iconUse.setAttributeNS(xmlnsUse, "href", `#${icon}`);
        iconSVG.appendChild(iconUse);

        const text = this.newEl("div");
        text.className = `${block}__text`;
        content.appendChild(text);

        const _title = this.newEl("div");
        _title.className = `${block}__text-title`;
        _title.textContent = title;
        text.appendChild(_title);

        if (subtitle) {
            const _subtitle = this.newEl("div");
            _subtitle.className = `${block}__text-subtitle`;
            _subtitle.textContent = subtitle;
            text.appendChild(_subtitle);
        }

        const btns = this.newEl("div");
        btns.className = `${block}__btns`;
        box.appendChild(btns);

        actions.forEach(action => {
            const btn = this.newEl("button");
            btn.className = `${block}__btn`;
            btn.type = "button";
            btn.setAttribute("data-dismiss", id);

            const btnText = this.newEl("span");
            btnText.className = `${block}__btn-text`;
            btnText.textContent = action;

            btn.appendChild(btnText);
            btns.appendChild(btn);
        });

        this.el = note;
        this.id = note.id;
    }

    newEl(elName, NSValue) {
        if (NSValue)
            return document.createElementNS(NSValue, elName);
        else
            return document.createElement(elName);
    }
}

function NotificationMessages() {
    return {
        error: {
            icon: "error",
            title: "Error",
            subtitle: "Something went wrong",
            actions: ["Close"]
        },
        success: {
            icon: "success",
            title: "Success",
            subtitle: "We've got your application",
            actions: ["OK"]
        }
    };
}