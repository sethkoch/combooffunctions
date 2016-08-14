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