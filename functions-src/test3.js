exports.handler = function(event, context, callback) {
	
	try {
        //nonExistentFunction();
        function myFunction(p1, p2) {
            return p1 * p2;   // The function returns the product of p1 and p2
        }

        const result = myFunction(3,4)

        console.log(result)

        callback(null, {
            statusCode:200,
            body:JSON.stringify(result)
        });
    }
    catch(error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
        callback(null, {
            statusCode: 422, 
            body: String(error)
        });
    
    }

	

}