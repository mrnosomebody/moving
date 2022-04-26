// let autocomplete;
// let address1Field;
// let address2Field;
// let postalField;
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

let today = new Date();
let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
document.querySelector('input[type="date"]').value = date
document.querySelector('input[type="date"]').min = date

//#############GOOGLE PLACES (AUTOCOMPLETE ADDRESS)#############//

// // This sample uses the Places Autocomplete widget to:
// // 1. Help the user select a place
// // 2. Retrieve the address components associated with that place
// // 3. Populate the form fields with those address components.
// // This sample requires the Places library, Maps JavaScript API.
// // Include the libraries=places parameter when you first load the API.
// // For example: <script
// // src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
//
//
//
// function initAutocomplete() {
//   address1Field = document.querySelector("#ship-address");
//   address2Field = document.querySelector("#address2");
//   postalField = document.querySelector("#postcode");
//   // Create the autocomplete object, restricting the search predictions to
//   // addresses in the US and Canada.
//   autocomplete = new google.maps.places.Autocomplete(address1Field, {
//     componentRestrictions: { country: ["ca"] },
//     fields: ["address_components", "geometry"],
//     types: ["address"],
//   });
//   address1Field.focus();
//   // When the user selects an address from the drop-down, populate the
//   // address fields in the form.
//   autocomplete.addListener("place_changed", fillInAddress);
// }
//
// function fillInAddress() {
//   // Get the place details from the autocomplete object.
//   const place = autocomplete.getPlace();
//   let address1 = "";
//   let postcode = "";
//
//   // Get each component of the address from the place details,
//   // and then fill-in the corresponding field on the form.
//   // place.address_components are google.maps.GeocoderAddressComponent objects
//   // which are documented at http://goo.gle/3l5i5Mr
//   for (const component of place.address_components) {
//     // @ts-ignore remove once typings fixed
//     const componentType = component.types[0];
//
//     switch (componentType) {
//       case "street_number": {
//         address1 = `${component.long_name} ${address1}`;
//         break;
//       }
//
//       case "route": {
//         address1 += component.short_name;
//         break;
//       }
//
//       case "postal_code": {
//         postcode = `${component.long_name}${postcode}`;
//         break;
//       }
//
//       case "postal_code_suffix": {
//         postcode = `${postcode}-${component.long_name}`;
//         break;
//       }
//       case "locality":
//         document.querySelector("#locality").value = component.long_name;
//         break;
//       case "administrative_area_level_1": {
//         document.querySelector("#state").value = component.short_name;
//         break;
//       }
//       case "country":
//         document.querySelector("#country").value = component.long_name;
//         break;
//     }
//   }
//
//   address1Field.value = address1;
//   postalField.value = postcode;
//   // After filling the form with address components from the Autocomplete
//   // prediction, set cursor focus on the second address line to encourage
//   // entry of subpremise information such as apartment, unit, or floor number.
//   address2Field.focus();
// }
//
// window.initAutocomplete = initAutocomplete;

//#############NOTIFICATIONS(TOASTS)#############//
let submitApplicationBtn = document.querySelector('#submitApplication')
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
        console.log(box)
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
        success :{
            icon: "success",
            title: "Success",
            subtitle: "We've got your application",
            actions: ["OK"]
        }
    };
}

//
// select all accordion items
const accItems = document.querySelectorAll(".accordion__item");

// add a click event for all items
accItems.forEach((acc) => acc.addEventListener("click", toggleAcc));

function toggleAcc() {
  // remove active class from all items exept the current item (this)
  accItems.forEach((item) => item != this ? item.classList.remove("accordion__item--active") : null
  );

  // toggle active class on current item
  if (this.classList != "accordion__item--active") {
    this.classList.toggle("accordion__item--active");
  }
}


