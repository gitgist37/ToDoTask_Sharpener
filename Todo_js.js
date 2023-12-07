let captureTodo = document.getElementById('add');
let captureTodoPending = document.getElementById('TodoPendingAdd');
let captureTodoCompleted = document.getElementById('TodoCompletedAdd');

//console.log(captureTodoPending,captureTodoCompleted);

captureTodo.addEventListener('click', push2Crud);

window.onload = function()
{
    showData();
};



function push2Crud(e)
{
    e.preventDefault();
    let TodoName = document.getElementById('TodoName').value;
    let TodoType = document.getElementById('TodoType').value;


    let myObj = {
                "TodoName":TodoName,
                "TodoType":TodoType,
                "TodoStatus":false
    };

    axios.post("https://crudcrud.com/api/b163fea4db934011b68fdd5520e272e7/Itinery", myObj)
    .then(values=>
        {
            console.log(values);


            let row = captureTodoPending.insertRow();
            let cell_TodoName = row.insertCell(0);
            let cell_TodoType = row.insertCell(1);
            let cell_StatusType = row.insertCell(2);

            cell_TodoName.innerHTML = values.data.TodoName;
            cell_TodoType.innerHTML = values.data.TodoType;

            let DoneBtn = document.createElement('button');
            DoneBtn.textContent = "Done";
            cell_StatusType.appendChild(DoneBtn);

            let OmitBtn = document.createElement('button');
            OmitBtn.textContent = "Omit";
            cell_StatusType.appendChild(OmitBtn);
            

            DoneBtn.addEventListener('click', push2DiffTable);
            DoneBtn.myParam = values.data._id;
            DoneBtn.myParam1 = values.data.TodoName;
            DoneBtn.myParam2 = values.data.TodoType;

            OmitBtn.addEventListener('click', remove4mTable);
            OmitBtn.myParam3 = values.data._id;

            

            
        })
    .catch(err=>console.log(err));    
}


function push2DiffTable(e)
{
    e.preventDefault();
    axios.put(`https://crudcrud.com/api/b163fea4db934011b68fdd5520e272e7/Itinery/${e.target.myParam}`,
        {
            "TodoName":e.target.myParam1,
            "TodoType":e.target.myParam2,
            "TodoStatus":true
        }
    )
    .then(values=>
        {
            showData();
        })
    .catch(err=>console.log(err));

}

function showData()
{
    axios.get("https://crudcrud.com/api/b163fea4db934011b68fdd5520e272e7/Itinery")
    .then(values=>
        {
            captureTodoCompleted.innerHTML = '';
            captureTodoPending.innerHTML = '';
            for(let i=0;i<values.data.length;i++)
            {
                if(values.data[i].TodoStatus===true)
                {
                    
                    let row = captureTodoCompleted.insertRow();
                    let cell_TodoName = row.insertCell(0);
                    let cell_TodoType = row.insertCell(1);
                    let cell_StatusType = row.insertCell(2);

                    cell_TodoName.innerHTML = values.data[i].TodoName;
                    cell_TodoType.innerHTML = values.data[i].TodoType;
                }
                else
                {
                    
                    row = captureTodoPending.insertRow();
                    cell_TodoName = row.insertCell(0);
                    cell_TodoType = row.insertCell(1);
                    cell_StatusType = row.insertCell(2);

                    cell_TodoName.innerHTML = values.data[i].TodoName;
                    cell_TodoType.innerHTML = values.data[i].TodoType;

                    DoneBtn = document.createElement('button');
                    DoneBtn.textContent = "Done";
                    cell_StatusType.appendChild(DoneBtn);

                    OmitBtn = document.createElement('button');
                    OmitBtn.textContent = "Omit";
                    cell_StatusType.appendChild(OmitBtn);
                    OmitBtn.myParam = values.data[i]._id;

                    DoneBtn.addEventListener('click', push2DiffTable);
                    DoneBtn.myParam = values.data[i]._id;
                    DoneBtn.myParam1 = values.data[i].TodoName;
                    DoneBtn.myParam2 = values.data[i].TodoType;

                    OmitBtn.addEventListener('click', remove4mTable);
                    OmitBtn.myParam3 = values.data[i]._id;
                }
            }
        })
    .catch(err=>console.log(err));
}

function remove4mTable(e)
{
    e.preventDefault();
    axios.delete(`https://crudcrud.com/api/b163fea4db934011b68fdd5520e272e7/Itinery/${e.target.myParam3}`)
    .then(values=>
        {
            showData();
        })
    .catch(err=>console.log(err));    
}