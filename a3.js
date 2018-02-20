var fp = require('./fp');
var util = require('util');

if ( ! exports )
   var exports = [ ];


// Sample problem 0.   Reverse from the slides for Section 2.4 (slides5)

// This just demonstrates how you develop your solutions and add test
// cases

var reverse = function (ns) {
    return reverse_helper(ns,[]);
}

var reverse_helper = function (input,acc) {
    if (fp.isNull(input))
	return acc;
    else
	return reverse_helper(fp.tl(input),fp.cons(fp.hd(input),acc));
}

// Your solution for problem 1 must appear between this and matching
// end comment below

var addUpOccurrences= function (n,ns) {
  if(fp.isNull(ns)) {
    return 0;
  }
  else if(fp.isEq(fp.hd(ns), n)) {
    return fp.add(n, addUpOccurrences(n, fp.tl(ns)));
  }
  else {
    return addUpOccurrences(n, fp.tl(ns));
  }
};

////////// End of code for problem 1 ////////////////////


// Your solution for problem 2 must appear between this and matching
// end comment below

var intersperse = function (ms,ns) {
  return intersperse_helper(ms, ns, [], 1);
};

var intersperse_helper = function(ms, ns, l, i) {
  if(fp.isNull(ms)){
    return fp.append(l, ns);
  }
  else if (fp.isNull(ns)) {
    return fp.append(l, ms);
  }
  else if(fp.isEq(i, 1)){
    return intersperse_helper(fp.tl(ms), ns, fp.append(l, [fp.hd(ms)]), 2);
  }
  else
    return intersperse_helper(ms, fp.tl(ns), fp.append(l, [fp.hd(ns)]), 1);
};

////////// End of code for problem 2 ////////////////////

// Your solution for problem 3 must appear between this and matching
// end comment below


// Problem 3
var flatten = function (l) {
  if(fp.isNull(l)) {
    return l;
  }
  else if(fp.isList(fp.hd(l))) {
    return fp.append(flatten(fp.hd(l)), flatten(fp.tl(l)));
  }
  else {
    return fp.cons(fp.hd(l), flatten(fp.tl(l)));
  }
};

////////// End of code for problem 3 ////////////////////


// Your solution for problem 4 must appear between this and matching
// end comment below

// Problem 4
var remove_every_nth = function (n,ns) {
  return remove_nth_helper(n, n, ns, []);
};

var remove_nth_helper = function(n, n2, ns, l) {
  if(fp.isNull(ns)) {
    return l;
  }
  else if(fp.isEq(n2, 1)) {
    return remove_nth_helper(n, n, fp.tl(ns), l);
  }
  else {
    return remove_nth_helper(n, fp.sub(n2, 1), fp.tl(ns), 
              fp.append(l, [fp.hd(ns)]));
  }
};

////////// End of code for problem 4 ////////////////////

// Your solution for problem 5 must appear between this and matching
// end comment below

// left, right, and isLeaf are some conveniences for binary tree processing

// Return the left subtree
var left = function (bst) {
    return fp.hd(fp.tl(bst));
};

// Return the right subtree
var right = function (bst) {
    return fp.hd(fp.tl(fp.tl(bst)));
};

// Is this tree a leaf node
var isLeaf = function (tree) {
	return fp.isNull(left(tree)) && fp.isNull(right(tree));
};

var postorder = function (tree) {
  return postorder_helper(tree, []);
};

var postorder_helper = function(tree, l) {
  if(!fp.isNull(tree)) {
	return postorder_helper(left(tree), postorder_helper(right(tree), 
          fp.cons(fp.hd(tree), l)));
  }
  return l;
};

////////// End of ode for problem 5 ////////////////////

// Your solution for problem 6 must appear between this and matching
// end comment below

var removeLeafNodesLessThan = function (n,tree) {
	if(! fp.isNull(tree)) {
		if(isLeaf(tree) && fp.isLT(fp.hd(tree), n)) {
			return [];
		}
		else if(!fp.isNull(left(tree)) && !fp.isNull(right(tree))){     
			if(isLeaf(left(tree)) && (!isLeaf(right(tree)))) {       
				return fp.cons(fp.hd(tree), fp.cons(
						removeLeaf_helper(n, left(tree)),
						removeLeafNodesLessThan(n, right(tree))));
			}
			else if(isLeaf(right(tree)) && !isLeaf(left(tree))) {
				return fp.cons(fp.hd(tree), fp.cons(
						[removeLeafNodesLessThan(n, left(tree))], 
						removeLeaf_helper(n, right(tree))));
			}
			else if(isLeaf(left(tree)) && isLeaf(right(tree))) {
        if( (fp.isNull(removeLeaf_helper(n, left(tree))) 
              && fp.isNull(removeLeaf_helper(n, right(tree)))) 
              || (!fp.isNull(removeLeaf_helper(n, left(tree))) 
              && !fp.isNull(removeLeaf_helper(n, right(tree)))) ) {
          return [fp.cons(fp.hd(tree), fp.cons(			
            removeLeaf_helper(n, left(tree)),
            [removeLeaf_helper(n, right(tree))]))];
        }
        else {
          return fp.cons(fp.hd(tree), fp.cons(			
            removeLeaf_helper(n, left(tree)),
            [removeLeaf_helper(n, right(tree))]));
        } 
			}
			else {
          return fp.cons(fp.hd(tree), fp.cons(			
            removeLeafNodesLessThan(n, left(tree)),
            removeLeafNodesLessThan(n, right(tree))));
			}
		}
		else if(!fp.isNull(left(tree)) && fp.isNull(right(tree))){
			if(isLeaf(left(tree))) {
				return [fp.cons(fp.hd(tree), fp.cons([],
						[removeLeaf_helper(n, left(tree))]))];
			}
			else if(!isLeaf(left(tree))) {
				return fp.cons(fp.hd(tree), fp.cons([],
					[removeLeafNodesLessThan(n, left(tree))]));
			}
		}
		else if(fp.isNull(left(tree)) && !fp.isNull(right(tree))){
			if(isLeaf(right(tree))) {
				return [fp.cons(fp.hd(tree), fp.cons([],
						[removeLeaf_helper(n, right(tree))]))];
			}
			else if(!isLeaf(right(tree))) {
				return fp.cons(fp.hd(tree), fp.cons([], 
					[removeLeafNodesLessThan(n, right(tree))]));
			}
		}
	}
	else {
		return [];
	}
};


var removeLeaf_helper = function (n, tree) {
	if(fp.isLT(fp.hd(tree), n)) {
		return [];
	}
	else {
		return tree;
	}
};
////////// End of code for problem 6 ////////////////////



////////// All test cases you add must be below this comment line

////////// Everything below this line will be stripped away when your
////////// submission is evaluated

console.log("Testing sample problem 0");
console.log(reverse( [1,2,3] ));
console.log(reverse( [0] ));
console.log(util.inspect(reverse( [1,2,3]), false ,null,true));

console.log("Testing Problem 1");
console.log(addUpOccurrences( 3, [1,2,3] ));
console.log(addUpOccurrences( 3, [1,2,3,3,4,3,2,1,3] ));
console.log(addUpOccurrences( 3, [1,2,4,5,6] ));
console.log(addUpOccurrences( 3, [ ] ));

console.log("Testing Problem 2");
console.log(intersperse( [1,3,5], [2,4,6] ));
console.log(intersperse( [1,3,5,7,8], [2,4,6] ));
console.log(intersperse( [1,3,5], [2,4,6,7,8] ));

console.log("Testing Problem 3");
console.log(flatten([1, 2, [3, 4, 5], 6]));

console.log("Testing Problem 4");
console.log(remove_every_nth(4, [3, 6, 8, 1, 10, 23, 22, 18, 45]));
console.log(remove_every_nth(2, [3, 6, 8, 1, 10, 23, 22, 18, 45]));

var tree1 = [ 20,
	      [ 10,
		[ 5, [], [] ],
		[ 15, [], [] ] ],
	      [ 30, [], [ 35, [], [] ] ] ];

var tree2 =     [12, [11, [], [] ],
                     [3, [4, [], [] ],
		         [4, [], [] ]]];

 var tree3 =     [12, [11, [5, [], []], [8, [], [] ]],
                     [3, [4, [], [] ],
		         [4, [], [] ]]];
 var tree4 =     [12, [11, [8, [], []], [5, [], [] ]],
                     [3, [4, [], [] ],
		         [4, [], [] ]]];
console.log("Testing Problem 5");
console.log(postorder(tree1));
console.log(postorder(tree2));


console.log("Testing Problem 6");

console.log(removeLeafNodesLessThan(10, tree1));
console.log(removeLeafNodesLessThan(4, tree2));
console.log(removeLeafNodesLessThan(5, tree2));
console.log(removeLeafNodesLessThan(8, tree3));
console.log(removeLeafNodesLessThan(8, tree4));