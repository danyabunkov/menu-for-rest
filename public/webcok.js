const webSocket = new WebSocket('ws://localhost:3005');
let connectionEstablished = false;

webSocket.onopen = () => {
  console.log('Connection established.');
  connectionEstablished = true;
};
webSocket.onmessage = async (event) => {
  const {
    order
  } = JSON.parse(event.data);
  const bascketFormResponse = await fetch("/interOrders.hbs");
  const bascketForm =await bascketFormResponse.text();
const articlesTemplate = Handlebars.compile(bascketForm);
  document.body.innerHTML += articlesTemplate({order});
};

