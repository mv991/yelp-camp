// JavaScript to hide the loader when the page is fully loaded
async function isServiceUp() {
    try {
      const response = await fetch("https://yelp-camp1-4b2u.onrender.com"); 
      console.log(response);

    } catch (error) {
      console.error('Error checking service status:', error);
      return false; // Service is down or unreachable
    }
  }
$(document).ready( async () => { 
   var isUp = await isServiceUp();
   if (isUp){
      $("#loader").fadeOut(1000);
      $("#content").fadeIn(1000);
   } else {
      $("#loader").show();
   }
});