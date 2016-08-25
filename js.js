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












