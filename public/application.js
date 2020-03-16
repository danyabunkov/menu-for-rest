const webSocket = new WebSocket('ws://localhost:3005');
let connectionEstablished = false;

webSocket.onopen = () => {
  console.log('Connection established.');
  connectionEstablished = true;
};


document.getElementById('products-container').addEventListener('submit',async (event)=>{
  event.preventDefault();
  const quantity = event.target.quantity.value;
  const nameoffood = event.target.nameoffood.value;
  const price = event.target.price.value;

  const response= await fetch('/restaurant/order',{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      quantity,
      nameoffood,
      price,
    })
    
  })
  const json = await response.json();
  let order=json[1]
 
  let check=0;
  let maincost=0
  json[0].items.forEach(element => {
    check += +element.value;
    maincost += element.maincost
  })
  document.getElementById('countofproduct').innerHTML=check
  document.getElementById('maincost').innerHTML=maincost 
  if (connectionEstablished) {
    webSocket.send(JSON.stringify({
      order:order,
    }));
  }
})

{/* <nav class="parallax">
  <div class="nav-wrapper black">
      <a style="margin-left: 80px;" href="#" class="brand-logo" style="font-size: 44px;"> <i style="font-size: 30px;text-decoration: underline;
text-decoration-color: aquamarine;">{{json.name}}</i></a>
      <ul style="margin-right: 400px;" id="nav-mobile" class="right hide-on-med-and-down">
        <li ><a href="collapsible.html" style="font-size: 20px;"> <i class="large material-icons right ">shopping_basket </i> 
        <strong id='countofproduct'>{{items}}</strong>
</a></li>
<li>Main Cost: <strong id='maincost'>{{cost}}</strong> Kč</li>
      </ul>
    </div>
</nav>
</div> */}
document.getElementById('bascketUser').addEventListener('click',async (event)=>{
  debugger
  event.preventDefault();
  const bascketFormResponse = await fetch("/index.hbs");
  const bascketForm =await bascketFormResponse.text();
  const response = await fetch('/restaurant/basket')
const user=await response.json();

const articlesTemplate = Handlebars.compile(bascketForm);
  document.body.innerHTML = articlesTemplate({user});
});



// document.getElementById('products-container').addEventListener('submit',async (event)=>{
//   event.preventDefault();
//   const quantity = event.target.quantity.value;
//   const nameoffood = event.target.nameoffood.value;
//   const price = event.target.price.value;
//   console.log(quantity,nameoffood,price)

//   const response= await fetch('/restaurant/order',{
//     method:'POST',
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify({
//       quantity,
//       nameoffood,
//       price,
//     })
    
//   })
//   const json = await response.json();4

// })
