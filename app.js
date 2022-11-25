var data;
// loadJSON method to open the JSON file.
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        }
        else {
          error(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  }
  
  loadJSON("https://www.wildernessp2e.com:5001/highscore", myData,'jsonp');
  
  function myData(Data)
  {
    data = Data;
    return;
  
    // Output only the details on the first post
    console.log(Data[5]);
  
    // output the details of first three posts
    console.log("First three posts");
    for(var i=0; i<3; i=i+1)
    {
      console.log(Data[i]);
    } 
    // output the id field of first five elements. 
    console.log("First five ID");
    for(var i=0; i<5; i=i+1)
    {
      console.log(Data[i].id);
      console.log(Data[i].name);

    }
  }

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
        e.preventDefault();
        var task = input.value.trim().toLowerCase();
        if (task === '') {
            return;
        }
 
        for(var i=0; i < data.length; i++) {
            console.log(data[i].name);
            // if (data[i].name.toLowerCase() == task) {
            if (data[i].name.toLowerCase().includes(task)) {
                task = [data[i].name, data[i].id];
                break;
            }
        }
        
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        
        task_el.appendChild(task_content_el);

        
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);
        
        
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        // const task_edit_el = document.createElement('button');
        // task_edit_el.classList.add('edit');
        // task_edit_el.innerText = 'Edit';
        
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';
        
        // task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        
        task_el.appendChild(task_actions_el);
        
        list_el.appendChild(task_el);
        
        input.value = '';
        

		// task_edit_el.addEventListener('click', (e) => {
		// 	if (task_edit_el.innerText.toLowerCase() == "edit") {
		// 		task_edit_el.innerText = "Save";
		// 		task_input_el.removeAttribute("readonly");
		// 		task_input_el.focus();
		// 	} else {
		// 		task_edit_el.innerText = "Edit";
		// 		task_input_el.setAttribute("readonly", "readonly");
		// 	}
		// });

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});