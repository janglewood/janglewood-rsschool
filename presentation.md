- https://youtu.be/yzn4_f0ykFk

- http://janglewood-electron-presentation.surge.sh/

Hi guys. Today I want to introduce you to an amazing thing. As you know, the stack of JS, HTML, and CSS allows you to create websites or web applications. Some of you may know that you can use JS as the server language (if you use Node.js).

However, what if I say that many famous desktop applications have been written in JS. For example, the text editors that many of you use every day to write JS code were written in JS. I talked about VS & Atom. Slack & the latest version of Skype was also written in JS. In addition, I want to show you really cool thing. You can run Windows 95 on your computer as a desktop application. That’s amazing.

All this magic would not exist without Electron.
Electron is an open source platform developed by GitHub that helps developers create cross-platform applications using technologies such as HTML, CSS and JavaScript.

You may ask what are the pros and cons of the Electron.
Let's start with the pros.
In my opinion, Electron has only one advantage. This is an abillity to write a desktop application without having to learn another programming language or framework (of course, if you already know JS, HTML and CSS).
But, I can count more cons than pros.
First, when you run the Electron application, Electron starts the chrome plating process and displays your JS and HTML in the window.
The fact is that Chrome (a browser based on Chromium) includes 15 million lines of code (the same as the Linux core). How do you think, it affects the performance and battery life of your laptop (if you use a laptop, of course). Many users of Electron applications notice that their applications decrease the running time of their machines and productivity.
For example, Slack requires from 300 MB to 1 GB of RAM. For a second, this is just an application for chat messages.
In addition, these applications require a lot of disk space.
The smallest electron app which we could write will require 100 MB of disk space.
Also, you have to know that files aren’t encrypted which means that anyone can get a working copy of the code.

How does this works?
In detail, once you start up an application using Electron, a main process is created. This main process is responsible for interacting with the native GUI of your operating system and creates the GUI of your application (your application windows).
Purely starting the main process doesn’t give the users of your application any application windows. Those are created by the main process in the main file by using something called a BrowserWindow module. Each browser window then runs its own renderer process. This renderer process takes a web page (an HTML file which references the usual CSS files, JavaScript files, images, etc.) and renders it in the window. Your web pages are rendered with Chromium so a very high level of compatibility with standards is guaranteed.

Today we will try to create a beta version of a desktop application that converts currencies.
First we need to install Node.js. We can do it this way.
For an easier start we also need to install an electron quick start. (structure template for Electron based applications)

When we open the project structure, we see a lot of familiar things, such as index.html, style.css package.json.
But two things are different. These are two js-files: main.js and rendered.js. The main create windows and manage them. Rendered, obviously,  to render components.

In main we import from an electron app to manage the state of an application and a browserWindow to create windows, and also request from a request, because we need access to the API;
Then we describe the start function, which calls the function to create the main window of our application, and calls the function that makes a request to the currency API and sends the response to rendered.js. You may ask why we need to send some data to rendered.js. This is because in main.js we do not have access to the DOM. DOM is only available in rendered.js.
This function is called after the application is ready. Next, we describe the behavior of the window for different states of the application.

Let's see what we have in our render.js file.
To get data from the method we describe in main, we need to import ipcRenderer.
Next, we describe method which will receive data from method in main js. Then we can see addOptions function, select handler, functions for convert currencies and creating elements.
That’s it!
Let's see how our application works.

Conclusion
I still think Electron is great but only for making bigger apps for example you shouldn’t use Electron to make an very simple app! It will be just waste of space.
