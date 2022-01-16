class List {
	constructor(title, items) {
		this.title = title;
		this.items = items;
	}
}

class Todo extends List {
	constructor(titleOfList, arrayOfListItems) {
		super(titleOfList, arrayOfListItems);
		this.item = '';
	}
}

class Card extends List {
	constructor(titleOfList, arrayOfListItems) {
		super(titleOfList, arrayOfListItems);
		this.cardTitle = '';
		this.cardNote = '';
	}
}

class Reminder extends List {
	constructor(titleOfList, arrayOfListItems) {
		super(titleOfList, arrayOfListItems);
		this.reminderTitle = '';
		this.cardNote = '';
		this.reminderDate = '';
		this.reminderTime = '';
	}
}

const listTitle = document.querySelector('h1');
const listInput = document.querySelector('#add-item');
const listWrapper = document.querySelector('#listObject-wrapper');


const listObjects = {
	_title: '',
	_items: [],

	set title(newTitle) {
		this._title = newTitle;
	},

	get title() {
		return this._title;
	},

	set setItem(newItem) {
		this._items.push(newItem);
		console.log(`${newItem} added to list`);
	},

	get getItems() {
		return this._items;
	}
};

const createList = () => {
	let title = getTitle();
	let items = [];
	return new List(title, items);
}

const saveList = (list) => {
	localStorage.setItem('list', JSON.stringify(list));
}

const retrieveList = () => {
	return JSON.parse(localStorage.getItem('list'));
};

const updateListTitle = (list) => {
	listTitle.addEventListener('focusout', () => {
		list._title = getTitle();
		console.log(`${list}`);
	})
};


const updateListItems = (list) => {
	list._items.push(getListItem());
};

const toggleAddButtonIcon = (element, flag) => {
	element.classList.toggle('add-btn', flag);
}
const selectText = element => {
	element.addEventListener('click', () => {
		toggleAddButtonIcon(listTitle, false);
		element.innerText = '';
	});
}

const editElementText = (element) => {
	let newValue = element.innerText;
	element.addEventListener('click', () => {
		element.addEventListener('focusout', () => {
			newValue = element.value;
			toggleAddButtonIcon(listTitle, false);
		})
	})
	element.innerText = newValue;
}

const isUntitled = () => {
	let title = getTitle();
	let flag = false;
	if (title === 'click to add title' || title === ' ' || title === '')
	{
		listTitle.innerText = `${listObject.title}${listObject.getItems.length - 1}`;
		flag = true;
	} else
	{
		listObject.title = title;
		listTitle.innerText = listObject.title;
	}

	return flag;
}

const getTitle = () => {
	return listTitle.innerText;
}

const elementTextContent = (element) => {

	document.addEventListener('click', () => {

	})

	//let newValue = element.innerText;

	//let e = element.event;

	// element.addEventListener(getEventName(e), () => {
	// 	if (e.keyCode === 13) {
	// 		newValue = element.value;
	// 	}
	// });

	console.log(element.event);
}

elementTextContent(listTitle);

const getEvent = (event) => {
	const events = ['click', 'focusout', 'keydown', 'keyup', 'keypress', 'paste', 'drop', 'drag', 'dragover', 'dragstart', 'dragend', 'dragleave', 'dragenter'];

    return events.find(element => element === event);
}

console.log(getEvent('dragleave'));


// const getListItem = () => {
// 	let item;
// 	listInput.addEventListener('change', (e) => {
// 		item = e.target.value;
// 		e.target.value = '';
// 	})
// 	return item;
// }



const getListItem = () => {
	return elementTextContent(listInput);
}

//console.log(getListItem());

const addListItem = (list) => {
	listInput.addEventListener('keydown', (event) => {
		if (event.keyCode === 13) {
			updateListItems(list);
			listInput.value = '';
		}
	});
}




const styleTitle = () => listTitle.classList.add('title');

const saveItemToListObject = () => {
	if (isItemSubmitted())
	{
		//listObject.setItem = getItem();
		saveItemToListObject();
	}
}

// const runClickEvent = () => {
//     listInput.addEventListener('click', (e) => {
//         saveItemToListObject();
//     })
// }

const isItemSubmitted = () => {
	let flag = false;
	let item = listInput.value;
	listInput.addEventListener('keydown', (e) => {
		if ((item !== '' || item !== ' ') && e.key === 'Enter')
		{
			flag = true;
			listInput.innerHTML = '';
		}
	})
	return flag;
}

const createItemsUI = () => {
	let itemWrapper = document.createElement('div');
	itemWrapper.setAttribute('id', 'item-wrapper');
	let itemElement = document.createElement('input');
	itemElement.type = 'checkbox';
	let itemLabel = document.createElement('label');
	itemLabel.setAttribute('class', 'item-label');
	itemLabel.contentEditable = 'true';


	//itemLabel.innerText = item;

	//append
	itemWrapper.append(itemElement);
	itemWrapper.append(itemLabel);
	listWrapper.append(itemWrapper);
	listInput.value = '';
}

const displayListItemsInUI = () => {

}

window.onload = () => {
	localStorage.clear();
	toggleAddButtonIcon(listTitle, true);

	//create a new list
	const listObject = createList();

	//sve the list
	saveList(listObject);

	//add event listener to all h1 and input elements
	let elements = document.querySelectorAll('h1, input, li');
	elements.forEach((element) => {
		editElementText(element);
		updateListTitle(listObject);
	})





	//editElement(listTitle);
	//saveList(listObject);
	//styleTitle();

	//selectText(listTitle);
}
