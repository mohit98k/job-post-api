//its a higher order function : a function that takes another function as input 
//async function always returns a Promise either resolved or rejected with error 
//if the promise is rejected we need to handle it 
//m1-> await+try-catch 
//m2-> fn().catch(err){//handle here }  & conect this to express using next(err) = fn().catch(next)


//but what about sync errors for it we wrap it around promise.resolve()
// If fn(async) returns a Promise → handled normally
// If fn(sync) throws sync errors→ Promise.resolve() converts it into a rejected Promise then it gets handled by .catch(next)

const asyncHandler=(fn)=>{
     return (req, res, next) => {
        Promise.resolve(fn(req,res,next)).catch(next);
    }
}
export default asyncHandler;