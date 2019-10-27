## Client Side React Server Boilerplate
Client side server react boilerplate implementation that includes jest, enzyme, lint, prettier, hot module reload, redux, router and etc. Feel free to fork it.<br>

Server: `localhost:9999`<br>
Client: `localhost:3000`

#### Getting Started
1. On root directory install packages:<br>
`npm i`
2. Then start your dev server<br>
`npm run dev`
3. To run production:<br>
`npm run start`

#### Docker
1. In root directory just create an image with:<br>
`docker build -t <your-username>/client-side-react-server-boilerplate .`
2. And then run you container:<br>
`docker run -it -p 9000:9999 --name client-side-react-server-boilerplate <your-username>/client-side-react-server-boilerplate
`
