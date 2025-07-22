***Project Overview: Video Call Application***

**Section A: For Non-Programmers**

***Introduction***

The Video Call Project is a software application designed to facilitate real-time video communication between users over the internet. Similar to popular platforms like Zoom or Google Meet, this project allows people to connect with each other using their webcams and microphones, making it ideal for remote meetings, such as consultation . as also this is a feature of my hospital quick main project . 

***Key Features***

* **Real-Time Video Calls** : Users can see and hear each other instantly.

* **User-Friendly Interface** :  Simple and intuitive design for easy navigation.

* **Secure Communication** :  Ensures that conversations remain private.

* **Cross-Platform Compatibility** :  Works on different devices (computers, smartphones, etc.).

* **No Installation Required (Web-Based)** :  Users can join calls directly from a web browser.

***How It Works***

* A user creates a call session and shares a unique link with others.  
    
* Participants click the link to join the call via their browser.  
    
* The application manages audio and video streaming seamlessly.

  ***Why This Project Matters***

With the increasing need for remote communication, this project provides a lightweight, easy-to-use alternative to commercial video conferencing tools. It is particularly useful for small teams, educators, and individuals who prefer a simple, no-frills video calling solution.

***Section B: For Programmers***

***Technical Overview***

The **Video Call Project** is a web-based real-time communication (RTC) application built using modern web technologies. It leverages **WebRTC (Web Real-Time Communication)** for peer-to-peer video streaming, ensuring low-latency and efficient data transfer.

This project is created under support of AGORA.IO  API , which means to be able to run it you need first to create account 

And then drop provided credential into script.js , read comment carefully to know where to drop them 

***Link to agora.io*** : [https://console.agora.io/](https://console.agora.io/)

***DEMO VIDEO :*** 

Slides presentation :[https://youtu.be/T-efDIKAjFM](https://youtu.be/T-efDIKAjFM)

Project overview: [https://youtu.be/nihjMzcILXY](https://youtu.be/nihjMzcILXY)

***Tech Stack***

* **Frontend:** HTML, CSS, JavaScript, React.js (or vanilla JS)  
    
* **Backend:** Node.js with Express.js (for signaling server)  
    
* **WebRTC:** Handles peer connections, audio/video streaming  
    
* **Socket.io:** Enables real-time signaling for call setup  
    
* **Deployment**: Hosted on platforms like Heroku, Vercel, or AWS

***Project Structure***

Video\_call\_project/    
│── client/            \# Frontend code (HTML, CSS, JS)    
│   ├── index.html     \# Main UI    
│   ├── styles.css     \# Styling    
│   └── script.js      \# WebRTC logic    
│── server/            \# Backend signaling server    
│   ├── server.js      \# Node.js \+ Socket.io setup    
│   └── package.json   \# Dependencies    
│── README.md          \# Setup & usage guide 

***Key Components***

1. ***Signaling Server (Node.js \+ Socket.io)***

* Manages session initiation, user connections, and WebRTC signaling.


* Facilitates SDP (Session Description Protocol) and ICE (Interactive Connectivity Establishment) exchange.

2. ***WebRTC Peer Connection***

* Establishes direct browser-to-browser communication.


* Handles media streams (getUserMedia API).

3. ***Frontend UI***

* Provides call controls (mute, video on/off, leave call).


* Displays remote and local video streams.

***Future Enhancements***

* ***Group Video Calls :***  Using SFU (Selective Forwarding Unit) architecture.  
    
* ***Screen Sharing :***  Additional WebRTC data channels.  
    
* ***End-to-End Encryption :***  For enhanced security.

