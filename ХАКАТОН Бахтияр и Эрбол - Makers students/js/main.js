$('#add-create').on('click', function(e){
    
    let studentObj = {
        name: $('#add-name').val(),
        surname: $('#add-surname').val(),
        image: $('#add-image').val(),
        phone: $('#add-phone').val(),
        weekTest: $('#add-week-test').val(),
        check: $('#add-check').val()
    }
    createStud(studentObj);
    $('#add-name').val('');
    $('#add-surname').val('');
    $('#add-image').val('');
    $('#add-phone').val('');
    $('#add-week-test').val('');
    $('#add-check').val('');
})

function createStud(obj){
    fetch('http://localhost:8000/students', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json;charset=utf-8",
        }
    })
    .then(()=>render())

}
// function getKPI(a, b){
// return (a+b)/2
// }
function render(){
    $('.cards').html('')
    fetch('http://localhost:8000/students')
        .then(rec=>rec.json())
        .then(data=>data.forEach(item=>{
            $('.cards').append(`
                <div class="card mt-4" style="width: 18rem;" id='${item.id}'>
                <img src="${item.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${item.name} ${item.surname}</h5>
                    <p class="card-text">Phone number: ${item.phone}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Weekly test: ${item.weekTest}</li>
                    <li class="list-group-item">Check your self: ${item.check}</li>
                    <li class="list-group-item">Weekly KPI: ${(Number(item.weekTest) + Number(item.check))/2}</li>
                    </ul>
                    <div class="card-body">
                    <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                    <button type="button" class="btn btn-danger btn-sm">Delete</button>
                    </div>
            </div>

            `)
        })  
        )
    
}

// edit function 
async function getData(id){
    let res = await fetch(`http://localhost:8000/students/${id}`)
    let data = await res.json()
    return data
}

$('body').on('click', '.btn-success', async function(e){
    let id = e.target.parentNode.parentNode.id
    let data = await getData(id);
    $('#add-name').val(data.name),
    $('#add-surname').val(data.surname),
    $('#add-image').val(data.image),
    $('#add-phone').val(data.phone),
    $('#add-week-test').val(data.weekTest),
    $('#add-check').val(data.check)
    
    $('.edit-st').attr('id', data.id)
})


//
$('.edit-st').on('click', async function(e){
   // e.preventDefault()
    let id = e.target.id
    let studentsObj = {
        name: $('#add-name').val(),
        surname: $('#add-surname').val(),
        image: $('#add-image').val(),
        phone: $('#add-phone').val(),
        weekTest: $('#add-week-test').val(),
        check: $('#add-check').val()
    }
    $('#add-name').val('');
    $('#add-surname').val('');
    $('#add-image').val('');
    $('#add-phone').val('');
    $('#add-week-test').val('');
    $('#add-check').val('');
    
    await fetch(`http://localhost:8000/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(studentsObj),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(() => render())
})
//end edit function 

//delete function 
$('body').on('click', '.btn-danger', function(e){
    let id = e.target.parentNode.parentNode.id

    fetch(`http://localhost:8000/students/${id}`, {
        method: 'DELETE'
    })
    .then(()=>render())
})
// end delete 


// update page button
$('#update-page-btn').on('click', (e) => {
    render()
})





// add search
$('#search-btn').on('click', async function(e){
    e.preventDefault()
    let str = $('#search-int').val().toLowerCase()
    $('.cards').html('')
    let res = await fetch(`http://localhost:8000/students`)
    let data = await res.json()
    data.forEach(item=>{
        if(item.name.toLowerCase().includes(str) || item.surname.toLowerCase().includes(str)){
            $('.cards').append(`
            <div class="card mt-4" style="width: 18rem;" id='${item.id}'>
            <img src="${item.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${item.name} ${item.surname}</h5>
                <p class="card-text">Phone number: ${item.phone}</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Weekly test: ${item.weekTest}</li>
                <li class="list-group-item">Check your self: ${item.check}</li>
                <li class="list-group-item">Weekly KPI: ${(Number(item.weekTest) + Number(item.check))/2}</li>
                </ul>
                <div class="card-body">
                <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                </div>
        </div>

        `)

        }
    })
})


// end add search






render();



