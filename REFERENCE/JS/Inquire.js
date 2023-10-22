console.log ("Javascript Active!");

let project = 1;

function addProject()
{
    console.log ("addProject");
    project++;
    document.getElementById("add-project").innerHTML += 
    '<div class="main-order-form-container">'+
        '<p class="main-order-form-label" id="main-order-form-label">Project '+project+'</p>'+
        '<div class="main-order-form-content-container-Project-Name" id="main-order-form-content-container-Project-Name">'+
            '<label class="main-order-form-content" id="main-order-form-content">Project Name:</label>'+
            '<input class="main-order-form-input" id="main-order-form-input" type="text" name="projectname'+project+'"></input>'+
        '</div>'+
        '<div class="main-order-form-content-container-Book-Quantity" id="main-order-form-content-container-Book-Quantity">'+
            '<label class="main-order-form-content" id="main-order-form-content">Book Quantity:</label>'+
            '<input class="main-order-form-input" id="main-order-form-input" type="text" name="bookquantity'+project+'"></input>'+
        '</div>'+
        '<div class="main-order-form-content-container-Binding-Type" id="main-order-form-content-container-Binding-Type">'+
            '<label class="main-order-form-content" id="main-order-form-content">Binding Type:</label>'+
            '<select class="main-order-form-input" id="main-order-form-input" name="bindingtype'+project+'">'+
                '<option value="Sewn Binding">Sewn Binding</option>'+
                '<option value="Glue Binding">Glue Binding</option>'+
                '<option value="Staple Binding">Staple Binding</option>'+
            '</select>'+
        '</div>'+
        '<div class="main-order-form-content-container-Cover-Material" id="main-order-form-content-container-Cover-Material">'+
            '<label class="main-order-form-content" id="main-order-form-content">Cover Material:</label>'+
            '<select class="main-order-form-input" id="main-order-form-input" name="covermaterial'+project+'">'+
                '<option value="M00003">Card Board 1530gsm</option>'+
                '<option value="M00004">Card Board 1510gsm</option>'+
                '<option value="M00005">Card Board 1450gsm</option>'+
            '</select>'+
        '</div>'+
        '<div class="main-order-form-content-container-Fly-Leaf" id="main-order-form-content-container-Fly-Leaf">'+
            '<label class="main-order-form-content" id="main-order-form-content">Fly Leaf:</label>'+
            '<input class="main-order-form-input-Fly-Leaf" id="main-order-form-input-Fly-Leaf" type="checkbox" name="flyleaf'+project+'"></input>'+
        '</div>'+
        '<div class="main-order-line-container">'+
        '<hr class="main-order-line">'+
        '</div>'+
    '</div>'
}

