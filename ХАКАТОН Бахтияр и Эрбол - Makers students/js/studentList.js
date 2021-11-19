function renderTable(){
    $('tbody').html('')
    fetch('http://localhost:8000/students')
        .then(rec=>rec.json())
        .then(data=>data.forEach(item=>{
            $('tbody').append(`
            <tr>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.phone}</td>
                <td>${item.weekTest}</td>
                <td>${item.check}</td>
                <td>${(Number(item.weekTest) + Number(item.check))/2}</td>
                
            </tr> 

            `)
        })  
        )
    
}


renderTable()