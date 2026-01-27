export default function tryCatchWrapperForErrorHandeling(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}