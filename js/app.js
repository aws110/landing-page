/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const body_sections = document.querySelectorAll("section");
const nav_bar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Helper function used to check to see if a section is inside the viewport
 */
function isInViewport(section){
    const section_size = section.getBoundingClientRect();
    return (
        section_size.top >= 0 &&
        section_size.left >= 0 &&
        section_size.bottom <= (window.innerHeight ||  document.documentElement.clientHeight) &&
        section_size.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Function to create the nav bar and set event listeners to see if certain parts are clicked
 * If clicked, scroll to that section.
 */
function create_nav(){
    // build the nav
    for (let i=0; i <body_sections.length; i++){
        const currentSection = body_sections[i];
        //check for attribute, future sections may not have the data-nav attribute.
        if(currentSection.hasAttribute("data-nav")){
            // create anchor
            let anchor = document.createElement("a");
            //create text inside of anchor
            let text = document.createTextNode(currentSection.getAttribute("data-nav"))
            //append text to anchor
            anchor.appendChild(text);

            //create list element
            let li_element = document.createElement("li");
            li_element.classList.add("menu__link");
        
            // Add scroll to section functionality when clicked
            let sectionID = currentSection.getAttribute('id');
            li_element.addEventListener('click', function scrollToView(){
                document.getElementById(sectionID).scrollIntoView({behavior: 'smooth'});
            });
            //append anchor to li
            li_element.appendChild(anchor);
            //append li to nav bar
            nav_bar.appendChild(li_element);
        }
    }
}

// Add class 'active' to section when near top of viewport
/**
 * Add class 'your-active-class' to the section being viewed.
 * Uses helper function 'inInViewport' found in helper functions section.
 */
function addActiveClass(){
    body_sections.forEach((section) => {
        console.log(isInViewport(section));
        if (isInViewport(section)){
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    }, false);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// Scroll to section on link click
// Set sections as active
function run(){
    // call these when page loads
    create_nav();
    window.addEventListener('scroll', addActiveClass);
}
// run functions
document.addEventListener('DOMContentLoaded', run);