let demo = document.querySelector('.demo')
let searchB = document.querySelector('.search-input');
let data = [];

searchB.addEventListener('keyup' , () => {
    let searchalco = searchB.value;
    console.log(searchalco  )
    let filtereDate = data.filter(el =>{
        return el.name.includes(searchalco) 
    })
    wbeers(filtereDate);
})


async function beers() {
    const res = await fetch('https://api.punkapi.com/v2/beers');
    data = await res.json()
    console.log(data)
    displayItem(data,demo,rows,current_page)
    btnCreating(data,pagination_element,rows);
    // wbeers(data)
}

function wbeers(alco){
    let html = ``
    alco.map(alcol => {
        html += `<div class="alcohol" style="width:30%;padding:2rem">
                        <img src="${alcol.image_url}" style="width:100%;height: 700px; border-radius:15px"></img>
                        <h2 style="text-align:center">${alcol.name}</h2>
                        <p style="text-align:center">Tagline: ${alcol.tagline}</p>
                        <p style="text-align:center">Brewed: ${alcol.first_brewed}</p>                        
                </div>`
    })
    demo.innerHTML= html;
}

beers()

const pagination_element = document.getElementById('pagination');
let current_page = 1;
let rows = 5;

function displayItem(array, wrapper, rows, current_page){
    current_page --;
    let start = current_page * rows;
    let end = start + rows;

    let pagination = array.slice(start,end);
    wbeers(pagination)
    // pagination.map(el=>{
    //     html += `<div class="item">${el}</div>`
    //     wrapper.innerHTML = html;
    // })
}

function btnCreating(array,wrapper,rows){
    let numberOfPage = Math.ceil(array.length / rows);
    for(let i = 1;i <= numberOfPage; i++){
        let btn = paginationButton(i);
        wrapper.appendChild(btn);
    }
}
function paginationButton(i){
    let btn = document.createElement('button');
    btn.innerText = i;
    btn.addEventListener('click', ()=>{
        current_page = i;
        displayItem(data,demo,rows,current_page);
    })
    return btn
}

btnCreating(data,pagination_element,rows);
