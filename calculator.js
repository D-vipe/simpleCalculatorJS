$(document).ready(function(){
var inputField = $('.inputExpression');
var argumentDump = new AddArgument;
var keyArray = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48]; // 1-0
var actionsArray = [43, 45, 47, 42, 61, 44, 188, 54] //plus, minus, divide, multiply, equal, coma (last 3)

	$(this).keydown(function(event) {

		if(keyArray.indexOf(event.keyCode) !== -1) {
			switch (event.keyCode) {
				case 49 : showArgument(1); break;
				case 50 : showArgument(2); break;
				case 51 : showArgument(3); break;
				case 52 : showArgument(4); break;
				case 53 : showArgument(5); break;
				case 54 : showArgument(6); break;
				case 55 : showArgument(7); break;
				case 56 : showArgument(8); break;
				case 57 : showArgument(9); break;
				case 48 : showArgument(10); break;
			}
			inputField.removeClass('nextArg');
		}

		if(event.keyCode === 188 && event.key === 'Shift') {
			console.log(123);
		}
	});

	$('.calculator__button').click(function(){
		var btnData = $(this).data('action');
		var argument = inputField.val() / 1;
		if($(this).hasClass('actions')) {
			switch (btnData) {
				case 'reset' : reset(); break;
				case 'result' : 
					argumentDump.arg2 = argument; 
					getResult(argumentDump.arg1, argumentDump.arg2, argumentDump._action);
					break;
				case 'revert_negative' : 
					revertNegative(argument); 
					break;
				case 'float' : 
					addFloat(argument);
					break;
				default : 
					argumentDump.arg1 = argument;
					argumentDump._action = btnData;
					inputField.addClass('nextArg'); 
					break;
			}
		} else {
			showArgument(btnData);
			inputField.removeClass('nextArg');
		}
	});

	function showArgument(arg) {
		var prevArg = inputField.val();
		if(!inputField.hasClass('nextArg')) {
			if (prevArg === '0') {
				inputField.val(arg);
			} else {
				inputField.val(prevArg + arg);
			}
		} else {
			inputField.val(arg);
		}
		
		
	}

	function AddArgument(arg, action) {
		this.arg1 = '';
		this.arg2 = '';
		this._action = action;
	}

	function simpleAdd(arg1, arg2) {
		return arg1 + arg2;
	}

	function simpleSubtraction(arg1, arg2) {
		return arg1 - arg2;
	}

	function simpleMultiply(arg1, arg2) {
		return arg1 * arg2
	}

	function simpleDivision(arg1, arg2) {
		return arg1 / arg2
	}

	function reset() {
		inputField.val(0);
		inputField.removeClass('nextArg');
	}

	function revertNegative(arg) {
		arg = -arg
		inputField.val(arg);
	}

	function addFloat(arg) {
		arg = arg + '.';
		inputField.val(arg);
	}

	function getResult(arg1, arg2, action) {
		var res;
		switch (action) {
			case 'plus' : 
				res = simpleAdd(arg1, arg2);
				inputField.val(res);
				break;
			case 'minus' : 
				res = simpleSubtraction(arg1, arg2);
				inputField.val(res);
				break;
			case 'multiply' :
				res = simpleMultiply(arg1, arg2);
				inputField.val(res);
				break;
			case 'divide' :
				res = simpleDivision(arg1, arg2);
				inputField.val(res);
				break;
		}
		inputField.addClass('nextArg');
	}

});