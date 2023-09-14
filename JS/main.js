
window.addEventListener('load', () => {
	const form = document.querySelector("#form");
	const input = document.querySelector("#inputt");
	const list_el = document.querySelector("#tasks");
	const ratingInputs = document.querySelectorAll('input[name="rating"]'); //!collections
	let selectedRating = null;

	ratingInputs.forEach((input) => {
		input.addEventListener('change', (e) => { 
			selectedRating = e.target.value;
		});
	});
//!submit add listener
	form.addEventListener('submit', (e) => {
		e.preventDefault(); // prevent default behaviours of our event
		const task = input.value;

		if (selectedRating === null) {
			alert("Please select a rating before adding the task.");
			return;
		}
		
		//!Search
		function filterTasks(searchTerm) {
			const tasks = document.querySelectorAll('.task');
			tasks.forEach(task => {
				const taskContent = task.querySelector('.text').value.toLowerCase();
				if (taskContent.includes(searchTerm.toLowerCase())) {
					task.style.display = 'block'; 
				} else {
					task.style.display = 'none'; 
				}
			});
		}
		const searchInput = document.querySelector('#mysearch');
		searchInput.addEventListener('input', () => {
			const searchTerm = searchInput.value;
			filterTasks(searchTerm);
		});

		//!Add delete and edit
		
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task + ' (Priority: ' + selectedRating + ')';
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);
		const rangeSlider = createRangeSlider();
		task_el.appendChild(rangeSlider);
		list_el.appendChild(task_el);

		input.value = '';
		selectedRating = null;
				
		
		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});

	})



	//! Sorting 
	function sortTasksByPriority() {
        const tasks = document.querySelectorAll('.task');

        const sortedTasks = Array.from(tasks).sort((taskA, taskB) => {
            const ratingA = parseInt(taskA.querySelector('.text').value.match(/\d+/)[0]);
            const ratingB = parseInt(taskB.querySelector('.text').value.match(/\d+/)[0]);
            return ratingB - ratingA;
        });

        list_el.innerHTML = '';

        sortedTasks.forEach(task => {
            list_el.appendChild(task);
        });
    }
    const sortButton = document.querySelector('.button-1');
    sortButton.addEventListener('click', () => {
        sortTasksByPriority();
    });
	
});
//!Clock
let hrs=document.getElementById("hrs");
      let min=document.getElementById("min");
      let sec=document.getElementById("sec");
      setInterval(()=>{

        let cT=new Date();
        hrs.innerHTML=(cT.getHours()<10?"0":"")+cT.getHours();
        min.innerHTML=(cT.getMinutes()<10?"0":"")+cT.getMinutes();
        sec.innerHTML=(cT.getSeconds()<10?"0":"")+cT.getSeconds();
      },1000)


//!search bar toggling
	const icon=document.querySelector('.icon')
	const search=document.querySelector('.search')
	icon.onclick=function(){
		search.classList.toggle('active');
	}

	
	//!slider
	function createRangeSlider() {
		const rangeDiv = document.createElement("div");
rangeDiv.classList.add("range");

const sliderValueDiv = document.createElement("div");
sliderValueDiv.classList.add("sliderValue");
const spanElement = document.createElement("span");
spanElement.textContent = "50";
sliderValueDiv.appendChild(spanElement);

const fieldDiv = document.createElement("div");
fieldDiv.classList.add("field");

const leftValueDiv = document.createElement("div");
leftValueDiv.classList.add("value", "left");
leftValueDiv.textContent = "0";

const inputSlider = document.createElement("input");
inputSlider.value = '0';


inputSlider.setAttribute("type", "range");
inputSlider.setAttribute("min", "10");
inputSlider.setAttribute("max", "100");
inputSlider.setAttribute("value", "100");
inputSlider.setAttribute("steps", "1");

const rightValueDiv = document.createElement("div");
rightValueDiv.classList.add("value", "right");

rightValueDiv.textContent ="100"; 

const checkIcon = document.createElement("i");
checkIcon.classList.add("fa-solid", "fa-check");
checkIcon.style.display = "none";


fieldDiv.appendChild(leftValueDiv);
fieldDiv.appendChild(inputSlider);
fieldDiv.appendChild(rightValueDiv);
fieldDiv.appendChild(checkIcon);

rangeDiv.appendChild(sliderValueDiv);
rangeDiv.appendChild(fieldDiv);

document.body.appendChild(rangeDiv);

const slideValue = spanElement;

inputSlider.oninput = () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = value + "%";
  slideValue.classList.add("show");

  if (parseInt(value) === parseInt(inputSlider.max)) {
    inputSlider.style.display = "none";
    leftValueDiv.style.display = "none";
    rightValueDiv.textContent = ""; 
    checkIcon.style.display = "inline-block";
  } else {
    
    inputSlider.style.display = "inline-block";
    leftValueDiv.style.display = "inline-block";
    rightValueDiv.textContent = "100";
    checkIcon.style.display = "none";
  }
};

inputSlider.onblur = () => {
  slideValue.classList.remove("show");
};
	  
		return rangeDiv;
	  }