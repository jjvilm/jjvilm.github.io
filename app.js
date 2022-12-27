// use for storing player data
var data;
getFromLocalStorage();
// loadJSON("https://www.wildernessp2e.com:5001/highscore", playerData, getFromLocalStorage);

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

function errorHandler(er) {
  console.log(er);
  console.log("Seems like website is down")
  return;
}
function playerData(Data){
    data = Data;
    const today = Date.now()
    // bundles date and data together to check date if more than 1 day
    let pdata = [today,Data];

    // stores a copy of data locally
    // localStorage.clear()
    localStorage.setItem("data", JSON.stringify(pdata));
    return;
}
function getFromLocalStorage() {
  // try to get from local storage first if it exists
  try {
    // array of 2, index: 0-date, 1-pdata
    let pdata = localStorage.getItem("data")
    pdata = JSON.parse(pdata)
    // gets date 
    let pastDate = pdata[0]
    // retreive data locally
    data = pdata[1]
    // console.log(data)
    console.log("loaded from local storage")
    // fetch new data if data older than 1 day 86400000 msecs in 1 day
    const now = Date.now();
    if ( (now - pastDate) >= 86400000 ) {
      console.log("Data old, fetching new")
      loadJSON("https://www.wildernessp2e.com:5001/highscore", playerData, errorHandler);
    }
  // otherwise try to load from server if no local copy
  } catch {
    console.log("fetching from server")
    loadJSON("https://www.wildernessp2e.com:5001/highscore", playerData, errorHandler);

  }
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
  Combat: "cblevel",
  Total_XP: "totalxp",
  Magic: "magiclevel",
  M_Xp: "magic_xp",
  Defence: "defencelevel",
  D_Xp: "defence_xp",
  HP: "hplevel",
  H_Xp: "health_xp",
  Agility: "agilitylevel",
  A_Xp: "agility_xp",
  Cooking: "cookinglevel",
  C_Xp: "cooking_xp",
  Potion: "potionlevel",
  P_Xp: "potion_xp"
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
        // put data together
        for (const j of Object.keys(hds)) {
  
          const task_input_el = document.createElement('input');
          task_input_el.classList.add('text');
          task_input_el.type = 'text';
          task_input_el.value = j + ": " + selPlayer[hds[j]];
          console.log(selPlayer[hds[j]])
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
