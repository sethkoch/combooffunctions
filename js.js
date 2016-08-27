var add = function(first, second){
	return first + second;
}

var sub = function(first, second){
	return first - second;
}

var mul = function(first, second){
	return first * second;
}

var identityf = function(x){
	return function(){
		return x;
	}
}

var addf = function(first){
	return function(second){
		return first + second;
	}
}

var liftf = function(binary){
	return function(first){
		return function(second){
			return binary(first,second);
			
		}
	}
}

var curry = function(binary, first){
	return function(second){
		return binary(first, second);
	}
}

var inc = curry(add, 1);


var twice = function(binary){
	return function(a){
		return binary(a, a);
	}
}

var doubl = twice(add);

var square = twice(mul);

var reverse = function(binary){
	return function(first, second){
		return binary(second, first);
	}
}

var composeu = function(f, g){
	return function(a){
      return g(f(a)); 
	}
}

var composeb = function(f, g){
	return function(a, b, c){
		return g(f(a, b), c);
	}
}

var limit = function(binary, count){
	return function (a, b){
		if (count >= 1){
			count -= 1;
			return binary(a, b);
			
		}
		else{
			return undefined;
		};
	}
}

var from = function (start){
	return function(){
	  var next = start;
	  start += 1;
	  return next;
   }
}

var to = function(gen, end){
	return function(){
		var value = gen();
		if(value < end){
		  return value;
	    }
	    else{
	    	return undefined;
	    }
	}
}

var fromTo = function(start, end){
		return to( from(start), end);
	
}

var element = function(arr, gen){
	gen = gen || fromTo(start, arr.length);
	return function(){
		var index = gen();
		if (index !== undefined) {
			return array[index];
		}
	};
}

var collect = function(gen, arr){
	return function(){
		var value = gen();
		if(value !== undefined){
		  arr.push(value);
	    }
		return value;
	}
}

var filter = function (gen, pred){
  return function recur(){	    
    value = gen();
	if(value === undefined || pred(value)){
	  return value;
	}
    return recur();
  }
}

var concat = function(gen1, gen2){
	return function(){
		var value = gen1();
		if(value === undefined){
			return gen2();
		}
		else{
			return value;
		}
	}
}

var gensymf = function(prefix){
	var value = from(0);
	var number;

	return function(){
		number = value();
		return prefix + number;
	}
}

var fibonaccif = function(num1, num2){
	var answer;
	return function(){
      answer = num1 + num2;
      num1 = num2;
      num2 = answer;
      return answer;
	}
}

var counter = function(value){
  return {
  	up: function () {
  		value += 1;
  		return value;
  	},
  	down: function () {
  		value -= 1;
  		return value;
  	}
  };
	
}


var revocable = function(binary){
	return {
		invoke : function(first, second){
			if (binary !== undefined){
			  return binary(first, second);
		    }
		},
		revoke: function(){
			binary = undefined;
		}
	};
}

var rev = revocable(add);
var add_rev = rev.invoke;

var m = function(value, source){
	return {
		value : value,
		source: (typeof source === 'string') ? source : String(value)
	};
}

var addm = function(a, b){
  return m(a.value + b.value, "(" + a.source + "+" + b.source + ")" );

}

var liftm = function(binary, op){
	return function(a, b){
		if(typeof a === 'number'){
			a = m(a);
		}
		if(typeof b === 'number'){
			b = m(b);
		}
		
		return m(binary(a.value, b.value),
			"(" + a.source + op + b.source + ")"
		);
	};
}

var exp = function(value){

	return (Array.isArray(value))
		? value[0](exp(value[1]), exp(value[2])) : value;
}

var addg = function(first){
	function more(next){
		if(next !== undefined){
			return first;
		}
		first += next;
		return more;
	}
	if(first !== undefined){
		return more;
	}
}

var liftg = function(binary){
	return function (first){
		if(first === undefined){
			return first;
		}

		return function more(next){
			if (next === undefined){
				return first;
			}
			first = binary(first, next);
			return more;
		};
	};
}

var arrayg = function(first){
	var array = [];
	function more(next){
		if(next === undefined){
			return array;
		}
		array.push(next);
		return more;
	}
	return more(first);

}

var continuize = function(func){
	return function(callback, argument){
		callback(func(argument));
	}
}


function bar(x, y){
	var z;
	y = 5;
	foo(x);
	return z;
	function foo(){
		y++;
		z = x * y;
	}
}

function foo(a,b){
	return function(){
		return a + b;
	}
}

function mul(){
	args = [].slice.call(arguments);
	if(Array.isArray(args[0])){
		args = args[0].slice(0);
	}

	if(args.length <= 2 ){
		return args[0] * args[1];
	}

	return args[0] * mul(args.slice(1));
}


function poop(value){
	return function(){
		return value;
	}
}

function caca(first, second){
	return first + second;
}

function caca2(fn1, fn2){
	return caca(fn1(),fn2());
}

function addCaca(arr){
	if(arr.length <= 2){
		return caca2(arr[0], arr[1]);
	}
	return caca2(arr[0], addCaca(arr.slice(1)));

}


// computer science in 5 hours with brian holt

// recursive factorial



function factorial(num){
 	if(num === 1){
 		return 1;
 	}
 	return num * factorial(num -1);
}


// inefficient, never to be used, bubbleSort with a do while loop
function bubbleSort(arr){
	var temp;
	do{
		var sorted = false;
		for(var i = 0; i < arr.length; i++){
			if(arr[i] > arr[i+1]){
				temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
				sorted = true;
			}
		}while(sorted);

	}
	return arr;
}

// insertion loop, loop through the unsorted array, take the first number, and build a new list add the 
// next numbers to the left or right of the number, then do again, until sorted.

var insertionSort = function(arr){
	var temp;
	for(var i = 1; i < arr.length; i++){
		for(var j = 0; j < arr.length; j++){
			if(arr[i] < arr[j]){
				temp = arr.splice(i,1);
				arr.splice(j, 0, temp[0]);
			}
			
		
	     }
	}
	return arr;
}


var mergeSort = (arr) => {
	if(arr.length < 2){
		return arr;
	}

	var len = arr.length;
	var middle = Math.floor(len / 2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle);

	return stitch(mergeSort(left), mergeSort(right));
}

var stitch = (left, right) => {
	var returnArray = [];
	while(left.length && right.length){
		if(left[0] <= right[0]){
			returnArray.push(left.shift());
		}
		else{
			returnArray.push(right.shift());
		}
	}
	while(left.length){
		returnArray.push(left.shift());
	}
	while(right.length){
		returnArray.push(right.shift());
	}
	return returnArray;
}


var quicksort = function(arr){
	if(arr.length < 2){
		return arr;
	}
	var pivot = arr[arr.length-1];
	var pivotLeft = [];
	var pivotRight = [];
	for(var i = 0; i < arr.length-1; i ++){
		if(arr[i] <= pivot){
			pivotLeft.push(arr[i]);
		}
		else{
			pivotRight.push(arr[i]);
		}
	}
	return quicksort(pivotLeft).concat(pivot, quicksort(right));

}






