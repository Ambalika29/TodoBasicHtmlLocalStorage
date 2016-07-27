var arrTodoItem = [];

function storeData(data){
	if(data.length<1){
		return;
	}
	var actionItem = {action: data, isDone: false};
	arrTodoItem.push(actionItem);
	localStorage.setItem("todoItem", JSON.stringify(arrTodoItem));
}

function retrieveData(keyWord){
	var getActionItem = JSON.parse(localStorage.getItem("todoItem"));
	return getActionItem;
}
function updateData(){
	localStorage.setItem("todoItem", JSON.stringify(arrTodoItem));
}

function fillExistingActions(){
	var getTodo = retrieveData("todoItem");
	if(!getTodo || getTodo.length<1){
		$("#listView").removeClass("listStyle");
		$("#listView").addClass("displayNone");
		return;
	}
	arrTodoItem = getTodo;
	if(getTodo.length>0){
		//Already saved Items, iterate
		var currentClass = $("#listView").attr('class');
		if(currentClass == "displayNone"){
			$("#listView").removeClass("displayNone");
			$("#listView").addClass("listStyle");
		}
		for(var i = 0; i<getTodo.length; i++){
			if(!getTodo[i].isDone){
				$("#listView").append("<li class = \"listItemStyle\"><input class = \"listItemCheckBox\" type = 'checkbox'>" + "<label class = \"listItemLabel\" >" + getTodo[i].action + "</label>" + "<button class = \"crossButton\">X</button>" + "</li>");
			}else{
				$("#listView").append("<li class = \"listItemStyle\"><input class = \"listItemCheckBox\" type = 'checkbox' checked>" + "<label class = \"isdone\" >" + getTodo[i].action + "</label>" + "<button class = \"crossButton\">X</button>"+"</li>");
			}
		}

	}
}

function updateList(){
	var getTodo = retrieveData("todoItem");
	if(!getTodo || getTodo.length<1){
		$("#listView").removeClass("listStyle");
		$("#listView").addClass("displayNone");
		return;
	}
	if(getTodo.length>0){
		var currentClass = $("#listView").attr('class');
		if(currentClass == "displayNone"){
			$("#listView").removeClass("displayNone");
			$("#listView").addClass("listStyle");
		}
		//Already saved Items, iterate
		$("#listView").empty();
		for(var i = 0; i<getTodo.length; i++){
			if(!getTodo[i].isDone){
				$("#listView").append("<li class = \"listItemStyle\"><input class = \"listItemCheckBox\" type = 'checkbox'>" + "<label class = \"listItemLabel\" >" + getTodo[i].action + "</label>" + "<button class = \"crossButton\">X</button>" + "</li>");
			}else{
				$("#listView").append("<li class = \"listItemStyle\"><input class = \"listItemCheckBox\" type = 'checkbox' checked>" + "<label class = \"isdone\">" + getTodo[i].action + "</label>" + "<button class = \"crossButton\">X</button>" + "</li>");
			}
			
		}

	}
}

function deleteItemFromArray(item){
	var index = getIndexOf(item)
	if(index > -1){
		arrTodoItem.splice(index,1);
	}
}

function getIndexOf(element){
	var index = -1;
	for(var i = 0; i<arrTodoItem.length; i++){
		if(arrTodoItem[i].action == element){
			index = i;
			break;
		}
	}
	return index;
}

$(document).ready(function(){

	fillExistingActions();

	$("#inputTxt").keydown(function(event){
		var code = event.keyCode;
		if(code == 13){ //Enter key code
			event.preventDefault();
			var text = $("#inputTxt").val();
			if(text.length<1){
				return;
			}
			storeData(text);
			updateList();
			$("#inputTxt").val("");
		}

	});

	$("#btnAdd").click(function(event){
		var text = $("#inputTxt").val();
		if(text.length<1){
			return;
		}
		storeData(text);
		updateList();
		$("#inputTxt").val("");
	});

	$("#listView").on('click','input', function(event){
		var text = $(this).parent().find('label').text();
		var index = getIndexOf(text);
		var isChecked = $(this).prop("checked");
		if(isChecked){
			arrTodoItem[index].isDone = true;
		}else{
			arrTodoItem[index].isDone = false;
		}
		
		updateData();
		updateList();

	});

	$('ul').on('click','button', function(event){
		var text = $(this).parent().find('label').text();
		deleteItemFromArray(text);
		updateData();
		$(this).parent().remove();
		updateList();

	});

	
});
