// use for storing player data
var data;
loadJSON("https://www.wildernessp2e.com:5001/highscore", playerData, getFromLocalStorage);

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
function playerData(Data){
    data = Data;
    // stores a copy of data locally
    localStorage.setItem("data", JSON.stringify(data));
    return;
}
function getFromLocalStorage() {
  data = localStorage.getItem("data")
  data = JSON.parse(data)
}
function alertNotice(key, uinput) {
  return `'${key}' Found!\n\nOK--continue search for: ${uinput}\nCancel--Display Results`
}
function parseStrings(uid) {
  // find player, display alert with name, if correct player display stats
  // else continue searching until right player is found
  // key will be what to search for, a length of 42 is probably an eth address
  var key = 'name'
  if (uid.length == 42) {
    key = 'id'
  }
  for(let i=0; i < data.length; i++) {
    // name found here
    if (data[i][key].toLowerCase().includes(uid)) {
      let search = confirm(alertNotice(data[i].name, uid))
      // continue searching for player
      if (!search) {
        return data[i]
      } 
    }
    // End of for loop
    if (i+1 === data.length) {
      alert(`${key}: ${uid} NOT FOUND!`)
      return 0
    }
  } 
}
function parseInts(uid) {
  for(var i=0; i < data.length; i++) {
    // name found here
    if (data[i].rank == uid) {
      let search = confirm(alertNotice(data[i].name, uid))
      // continue searching for player
      if (!search) {
        return data[i]
      } 
    }
    // End of for loop
    if (i+1 === data.length) {
      alert(`${uid} NOT FOUND!`)
      return 0
    }
  } 
}
const hds = {
  Name: "name",
  ID: "id",
  Rank: "rank",
  CB: "cblevel",
  CB_XP: "totalxp",
  M_Lv: "magiclevel",
  M_Xp: "magic_xp",
  D_Lv: "defencelevel",
  D_Xp: "defence_xp",
  H_Lv: "hplevel",
  H_Xp: "health_xp"
}

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
        e.preventDefault();
        // trim spaces 
        var task = input.value.trim().toLowerCase();
        if (task === '') {
            return;
        }
      
        var selPlayer = null;
        // likley eth address
        if (task.length == 42 || isNaN(task)) {
          selPlayer = parseStrings(task)
        } 
        // check if number
        if (selPlayer == null){
          selPlayer = parseInts(task)
        }
        
        const task_el = document.createElement('div');
        task_el.classList.add('task');
        
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        
        task_el.appendChild(task_content_el);
                    
        // Don't do anything if no player found, return instead
        if (!selPlayer) {
          input.value = ''
          return
        }
        for (const j of Object.keys(hds)) {
  
          const task_input_el = document.createElement('input');
          task_input_el.classList.add('text');
          task_input_el.type = 'text';
          task_input_el.value = j + ": " + selPlayer[hds[j]];
          task_input_el.setAttribute('readonly', 'readonly');
          task_content_el.appendChild(task_input_el);
        }
        
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';
        
        task_actions_el.appendChild(task_delete_el);
        
        task_el.appendChild(task_actions_el);
        
        list_el.appendChild(task_el);
        
        input.value = '';
        

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});
