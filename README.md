
**YelpCamp** is a massive Node.js application designed using a Model-View-Controller (MVC) architecture. This project includes full CRUD functionality, user authentication, and authorization for protected routes. It also incorporates image handling and input validation to enhance user experience and security.
<br>
## Images

![Screenshot (24)](https://github.com/mv991/yelp-camp/assets/125487704/098f3968-6b9f-4729-8f11-02ca15412393)
![Screenshot (25)](https://github.com/mv991/yelp-camp/assets/125487704/8f0fb1b9-c0f8-42a8-b025-dac98242869b)
![Screenshot (26)](https://github.com/mv991/yelp-camp/assets/125487704/e57fde0d-f288-478f-a97e-47dfd105fd06)


## Features
- **MVC Architecture**: Clean and maintainable code structure using Model-View-Controller pattern.
- **Full CRUD Functionality**: Create, Read, Update, and Delete operations for campgrounds and reviews.
- **User Authentication & Authorization**: Secure routes with user login and roles.  
  - **Passport.js** for session management and cookies.  
  - Protected routes for creating, editing, and deleting campgrounds/reviews.
- **Input Validation**: Validate user inputs using **Zod** for secure and reliable data handling.

- **Image Handling**: Upload and store images using **multer** and **Cloudinary**.  
  - **Multer** for handling multipart/form-data.  
  - **Cloudinary** for storing images in the cloud.
- **Middleware**: Used middleware for user authentication, authorization and for image upload.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (sessions and cookies)
- **Image Storage**: Multer, Cloudinary
- **Validation**: Zod
- **Frontend**: EJS, Bootstrap

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/yeelpcamp.git
   cd yelp-camp <br>
   npm install <br>
   node app.js <br>
   
