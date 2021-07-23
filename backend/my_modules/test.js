let a = JSON.parse('{"hi":[1, 2, 3]}')
a.hi = a.hi.filter((e)=> e != 1);
console.log(a)