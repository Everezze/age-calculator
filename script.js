const inputs = Array.from(document.querySelectorAll(".inputs-container input"));
const generator = document.querySelector(".generator");
const inputsContainer = document.querySelector(".inputs-container");
const results = document.querySelectorAll(".result");
const currentDate = new Date();
let dateFilled = 0;
//let errorMessage = "";
//let firstTry=false;

function isValid(event){
	const input = event.currentTarget
	const inputValue = input.value;
	let correctInput = false;
	let errorMessage = "This field is required";
	if(inputValue==""){
		dateFilled -=1;
		return [correctInput,errorMessage];
	}

	if(input.classList.contains("day")){
		//if(!isNaN(input.value)){
		//	input.value = input.value - 0;
		//}
		//input.value = input.value.padStart(2,"0");
		if(inputValue >= 1 && inputValue <= 31){
			correctInput = true;
			dateFilled +=1;
		}
		else{
			correctInput = false;
			errorMessage = "Must be a valid day";
			dateFilled -=1;
		}
	}
	else if(input.classList.contains("month")){
		//if(!isNaN(input.value)){
		//	input.value = input.value - 0;
		//}
		//input.value = input.value.padStart(2,"0");
		if(inputValue >= 1 && inputValue <= 12){
			correctInput = true;
			dateFilled +=1;
		}
		else{
			correctInput = false;
			errorMessage = "Must be a valid month";
			dateFilled -=1;
		}
	}
	else if(input.classList.contains("year")){
		//if(!isNaN(input.value)){
		//	input.value = input.value - 0;
		//}
		//input.value = input.value.padStart(4,"0");
		if(inputValue <= currentDate.getFullYear()){
			correctInput = true;
			dateFilled +=1;
		}
		else{
			correctInput = false;
			errorMessage = "Must be in the past";
			dateFilled -=1;
		}
	}

	return [correctInput,errorMessage];
}

function checkInput(e){
	const input = e.currentTarget;
	const resultArray = isValid(e);
	const error_msg = input.parentElement.parentElement.querySelector("p");
	const title = input.parentElement.parentElement.querySelector("span");

	if(!resultArray[0]){
		error_msg.textContent = resultArray[1];
		error_msg.classList.add("active");
		title.classList.add("active");
		input.classList.add("active");
	}
	else{
		if(title.classList.contains("active")){
			error_msg.classList.remove("active");
			title.classList.remove("active");
			input.classList.remove("active");
		}
		//increment dateFilled here to hint for a valid input then below redo
		//check with this variable
	}
}

inputs.forEach(element => {
	let parentContainer = element.parentElement.parentElement;
	let title = parentContainer.querySelector("span");
	let input = parentContainer.querySelector("input");
	let error_msg = parentContainer.querySelector("p");
	title.classList.add("active");
	input.classList.add("active");
	error_msg.classList.add("active");
	error_msg.textContent = "This field is required";
	element.addEventListener("input",checkInput);
})

generator.addEventListener("click",function(){
	const chosenDate = new Date(`${inputs[2].value}/${inputs[1].value}/${inputs[0].value}`);
	console.log(chosenDate);
	if(!inputsContainer.classList.contains("active")){
		inputsContainer.classList.add("active");
	}

	if(inputs.every(element => !element.classList.contains("active"))){
		if(chosenDate.getDate() != inputs[0].value){
			//console.log("entered nan or input diff condition");
			let containersInput = document.querySelectorAll(".inputs-container > div");
			containersInput.forEach(function(element){
				console.log("current element", element);
				let title = element.querySelector("span");
				let input = element.querySelector("input");
				title.classList.add("active");
				input.classList.add("active");

				if(element === inputs[0].parentElement.parentElement){
					let error_msg = element.querySelector("p");
					//console.log("condition first input selected");
					error_msg.textContent = "Must be a valid date";
					error_msg.classList.add("active");
				}
			});
		}
		else{
			console.log("entered else block");
			//const yearsDifference = String(currentDate.getFullYear() - chosenDate.getFullYear());
			//const monthsDifference = String(Math.abs(currentDate.getMonth() - chosenDate.getMonth()));
			//const daysDifference = String(Math.abs(currentDate.getDate() - chosenDate.getDate()));
			
			let yearsDifference = 0;
			let monthsDifference = 0;
			let daysDifference = String(Math.abs(currentDate.getDate() - chosenDate.getDate()));

			if(chosenDate.getMonth() - currentDate.getMonth() > 0){
				console.log(chosenDate.getMonth() - currentDate.getMonth(), "-> months diff");
				console.log("month overlap, diminish year by one");
				monthsDifference = String(12-chosenDate.getMonth() + currentDate.getMonth());
				yearsDifference = String(currentDate.getFullYear() - chosenDate.getFullYear() - 1);
			}
			else{
				monthsDifference = String(Math.abs(currentDate.getMonth() - chosenDate.getMonth()));
				yearsDifference = String(currentDate.getFullYear() - chosenDate.getFullYear());
			}

			const numbersResult = [yearsDifference,monthsDifference,daysDifference];
			console.log(yearsDifference,monthsDifference,daysDifference);
			console.log(numbersResult);

			for(let i=0; i<results.length;i++){
				let span = results[i].querySelector("span");
				results[i].classList.add("active");
				span.textContent = numbersResult[i];
				span.classList.add("active");
				span.nextElementSibling.classList.add("deactivate");
			}
		}
	}
});

window.addEventListener("load",function(){
	let forms = document.querySelectorAll(".inputs-container form");
	forms.forEach(function(element){
		element.reset();
	});
});
