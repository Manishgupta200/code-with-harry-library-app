console.log('this is script.js');

// constructor
function Book(name,author,type){
	this.name=name;
	this.author=author;
	this.type=type;
}

// Display constructor
function Display(){

}

// Add method to display prototype
Display.prototype.add=function (book){
	console.log('adding to UI');
	let tableBody=document.getElementById('tableBody');
	let uistring=`<tr>
					<td>${book.name}</td>
					<td>${book.author}</td>
					<td>${book.type}</td>
		         </tr>`;
  	tableBody.innerHTML += uistring;
}

// impliment the clear function 
Display.prototype.clear=function (){
	let libraryForm=document.getElementById('libraryForm');
	libraryForm.reset();
}

// impliment the validate function
Display.prototype.validate=function (book){
	if(book.name.length<2 || book.author.length<2){
		return false;
	}
	else{
		return true;
	}
}
Display.prototype.show=function (type,displayMessage){
	let message=document.getElementById('message');
	let boldText;
	if(type=='success'){
		boldText='Done';
	}
	else{
		boldText='Error!';
	}
	message.innerHTML=` <div class="alert alert-${type}" role="alert">
    				    <strong>${boldText}: </strong>${displayMessage}
    				    </div>`
    setTimeout(function (){
    	message.innerHTML='';
    },5000);
}

// Add submit event listener to libraryForm
let libraryForm=document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
	console.log('You have submit libraryForm');
	let name=document.getElementById('bookName').value;
	let author=document.getElementById('author').value;

	let fiction=document.getElementById('fiction');
	let programming=document.getElementById('programming');
	let cooking=document.getElementById('cooking');
	let type;

	if(fiction.checked){
		type=fiction.value;
	}
	else if(programming.checked){
		type=programming.value;
	}
	else if(cooking.checked){
		type=cooking.value;
	}


	let book=new Book(name,author,type);
	console.log(book);

	let display=new Display();

	// if book object validate then add
	if(display.validate(book)){    
		display.add(book);
		display.clear();
		display.show('success','Your book has been successfully added');	
	}
	else{
		// show error to user
		display.show('danger','Please enter the required field');
	}

	e.preventDefault();
}