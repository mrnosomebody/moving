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
