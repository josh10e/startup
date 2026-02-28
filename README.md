# Dive Planner

[My Notes](notes.md)

My website will be designed for scuba divers to more easily plan for dives. Current software is incredibly outdated and annoying to use, so I am creating a newer version. Additionally, more studies have come out regarding nitrogen absorption that may be more accurate than the dive tables created in 1915.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

This website will be a more comprehensive, multi-level dive planner than is currently offered online. When given various depths and gas mixture, a no-decompression limit will be calculated. If time allows, another section of the website will allow for logging of dives (depth, time, weight used, etc).

### Design

![Design image](IMG_0464.jpeg)

### Key features

- No decompression limit (ND L) calculator
- Multi-level Dive Planning
- Dive log

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - User interface, display results, dive log page.
- **CSS** - To make the page much more styled. More detail to come.
- **React** - To create the backbone of the website.
- **Service** - To perform all backend calculations and send them to the frontend.
- **DB/Login** - To store accounts and dive logs for future retrieval.
- **WebSocket** - To show real time updates.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://mydiveplanner.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Created the following HTML pages: index, divelog, diveplanner
- [x] **Proper HTML element usage** - I properly used HTML elements.
- [x] **Links** - Each page has links to the other pages.
- [x] **Text** - There is text on each page describing what will be going there in the future.
- [x] **3rd party API placeholder** - I put in a results section that will pull data from a third party dive table website.
- [x] **Images** - I put in a cool picture that actually shows up.
- [x] **Login placeholder** - I made the boxes for login information but there is no backbone yet.
- [x] **DB data placeholder** - There is a section where dives will be logged and stored in a database for retrieval later.
- [x] **WebSocket placeholder** - There is a place for websocket in the diveplanner page but nothing there to back it up.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - Changed the title background color to match ocean colors more closely. Also added a sidebar with a darker gray to split up the page more.
- [x] **Use of a CSS framework** - I created rules.css to easily change the basic framing of each page simultaneously.
- [x] **All visual elements styled using CSS** - All visual elements I created were only using CSS.
- [x] **Responsive to window resizing using flexbox and/or grid display** - Pictures, titles, sidebars all react to window resizing.
- [x] **Use of a imported font** - I imported Roboto to my website.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - See my rules.css file, I included all the things.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I bundled everything using Vite.
- [x] **Components** - I created app.jsx to create a uniform layout with the header, footer, and sidebar. I also created login.jsx, diveplanner.jsx, and divelog.jsx to maintain the same usage that I had before with the individual html pages. I also added a NotFound component in app.jsx to render a 404 page.
- [x] **Router** - I implemented a router in app.jsx using browserrouter and NavLink. This replaces reloading different html pages with adapting the same page with different use cases.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - The diveplanner was mostly created, however calculating NDL and pressure groups are not simple formulas, I either need to create the dive tables from scratch or find a formula that curve fits it. That will require much more research to find the best method before I can code it into my website. The dive log works with dives nestled in dive trips in a list so finding individual dives is easy. I will need to store the data in the future, currently it uses the local storage.
- [x] **Hooks** - I used useState to create reactive variables that I can update. I used this in the diveplanner by tracking the number of dives and water type, as well as in the divelog to track the dives and which trips/dives are expanded.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
