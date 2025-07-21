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

Github repository : [https://github.com/josep-prog/Video\_call\_project.git](https://github.com/josep-prog/Video_call_project.git)  
Author : Joseph Nishimwe  
Email: [j.nishimwe@alustudent.com](mailto:j.nishimwe@alustudent.com)

		***RUN THIS PROJECT*** 

 git clone  [https://github.com/josep-prog/Video\_call\_project.git](https://github.com/josep-prog/Video_call_project.git)  
cd Video\_call\_project  
Drop index.html file into browser

***Integrating Real-Time Video Call Features in Hospital Quick: Bridging Innovation and Accessibility***

***Introduction***

As the world becomes increasingly digitized, the demand for seamless, real-time communication in various industries, including healthcare, continues to grow. One of the most innovative and transformative features now available is **real-time video calling.** In the context of my software development efforts, I have created a Video Call Application , a standalone project built using modern web technologies like WebRTC and Socket.io. While this feature functions independently, its real value emerges when considered as an integral part of a larger system: Hospital Quick.

***Hospital Quick*** is my primary project, an intelligent hospital management platform designed to improve healthcare delivery by making services faster, more responsive, and more patient-centered. Integrating a video call feature into Hospital Quick transforms it into a hybrid care system, allowing patients to connect directly with healthcare professionals remotely.

***The Video Call Application: A Standalone Innovation***

The Video Call Application was developed to simplify real-time video communication. It offers a lightweight, web-based solution that functions similarly to platforms like Zoom and Google Meet but with minimal requirements. Users can initiate or join a call through a browser link without installing extra software, making it highly accessible.

***Key Independent Features:***

* ***WebRTC-Powered Real-Time Communication***: Enables direct, peer-to-peer video and audio streaming.  
    
* ***No Installation Required***: Runs entirely in the browser.  
    
* ***Cross-Platform Compatibility***: Works on desktops, tablets, and smartphones.  
    
* ***Privacy and Security***: Offers encrypted communication for patient confidentiality.  
    
* ***Simple UI:*** Ensures ease of use for both tech-savvy and non-technical users.


Technically, this project is built using HTML, CSS, JavaScript, on the frontend. The backend is javascript and it is powered by AGORA.IO, a robust API platform for real-time voice and video.

***Video Call Feature in Relation to Hospital Quick***

While the video call project is powerful on its own, it reaches its full potential when implemented as a feature of Hospital Quick. Hospital Quick is designed to manage appointments, medical records, prescriptions, and now—virtual consultations.

***Relevance to Hospital Quick***

1. ***Remote Consultations and Follow-Ups***

* Patients in rural or underserved regions can consult with specialists without traveling long distances.


* Follow-up appointments can be conducted from the comfort of the patient’s home, reducing hospital congestion.

2.  ***Emergency Triage and Initial Diagnosis***

* Medical staff can visually assess a patient’s condition before they arrive at the hospital, speeding up emergency response and preparedness.

3. **Doctor-to-Doctor Communication**

* Specialists in different departments or hospitals can communicate directly for second opinions or collaborative treatment plans.

4. **Family Interaction**

* In situations where visitation is restricted (e.g., during pandemics), family members can connect with patients through supervised hospital video calls.

5. **Mental Health Services**

* Remote counseling and therapy sessions can be securely conducted via video call, expanding access to mental health support.

  ***Benefits of Integration***


* **Improved Access:** Brings healthcare to patients who are isolated or far from hospitals.

* **Reduced Operational Load**: Frees up physical space in clinics for critical patients by handling non-urgent consultations remotely.

* **Patient Empowerment:** Provides more flexibility and choice for how patients receive care.

* **Cost-Effective Care**: Minimizes travel costs and lost time for both patients and staff.

* **Continuity of Care:** Enables consistent check-ins, even when patients or providers are mobile.

***Implementation Insight***

From a development standpoint, the integration is straightforward:

* The video call module will be embedded into the Hospital Quick platform using iframe or direct routing.  
    
* Authentication from Hospital Quick will control access to video sessions, ensuring only authorized users can initiate or join calls.  
    
* Integration with user profiles, appointments, and notification systems in Hospital Quick will streamline scheduling and reminders.


  ***Future Enhancements Within Hospital Quick***

As Hospital Quick evolves, the video call feature will continue to grow:

* AI-Driven Symptom Assessment During Calls  
    
* Automatic Transcription for Doctor Notes  
    
* Integrated Electronic Prescription Issuance Post-Call  
    
* Multilingual Support for Diverse Patient Populations

***Conclusion***

The video call application stands as a strong, independent project showcasing my understanding of real-time communication technologies. However, its greatest impact lies in its integration with Hospital Quick, where it serves as a powerful tool to revolutionize healthcare delivery. By making high-quality care more accessible, efficient, and modern, this feature not only solves a real-world problem but also demonstrates how innovation in one area can elevate the entire healthcare experience.