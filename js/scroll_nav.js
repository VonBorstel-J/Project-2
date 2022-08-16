
window.onscroll = () => {scrollNavbar()};

scrollNavbar = () => {

    const navBar = document.getElementById("navBar");
    const links = document.querySelectorAll("#navBar a");

if (document.documentElement.scrollTop > 100) {
    navBar.classList.add("pa-fixed-header");


    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        element.classList.add('text-black');
    }

} else {
    navBar.classList.remove("pa-fixed-header");
    
    // Change the color of links back to default
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        element.classList.remove('text-black');
    }
}
}