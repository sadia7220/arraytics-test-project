import swal from 'sweetalert'

export default function errorMessage(param) {
    if (param.status === 422 || param.status === 400) {
        var result = [];
        for (var i in param.data.errors)
            result.push(i, param.data.errors[i]);
        const chars = { '[': '', '"': '', ']': '' };  //retrieving the error message by fixing the format 
        const error_message = result[1].toString().replace(/[[']]/g, m => chars[m]);
        swal("Something went wrong!", error_message, "error")
    } else {
        swal("Something went wrong!", param.data.message, "error")
    }
};

