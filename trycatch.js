//node trycatch

try {
    //nonExistentFunction();
    function myFunction(p1, p2) {
        return p1 * p2;   // The function returns the product of p1 and p2
      }
      console.log(myFunction(3,4))
  }
  catch(error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }