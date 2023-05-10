# Hello, welcome to our project!

## Overview

The goal of this project is to allow people to explore historical sites in NYC via iteneraries where they can either make their own or explore popular ones. They will be able to plan multi-day trips which can be shown and created all in the same website. People can also leave reviews and chat with one another on a site's page. Lastly, users can request that a site be added to the database, which must be approved by an admin of the site.

## To Get Started

- Do `npm install` in both the `/client` and `/server` folders
- Then make sure to download wkhtmltopdf [>Here<](https://wkhtmltopdf.org/downloads.html)
- Also definately download ImageMagick [>Here<](https://imagemagick.org/script/download.php)
- Next, while in the server folder, do `npm run seed`
  - Make sure your MongoDB server is running ahead of time.
  - It may take a while due to ImageMagick
- Next run `npm start` in both folders
  - Would recommend the server first
- Everything should be up and running as long as Mongo server is connected! Yay!
