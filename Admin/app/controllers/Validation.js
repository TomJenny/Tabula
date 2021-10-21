function Validation() {

    //Check value isn't empty
    this.checkEmpty = function (inputVal, spanID, message) {

        if (inputVal.trim() != "") {

            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;

            return false;
        }
    }

    //check value length
    this.checkLength = function (inputVal, spanID, message, min, max) {
        if (inputVal.length >= min && inputVal.length <= max) {

            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;

            return false;
        }
    }


    //check value exits in database
    this.checkExit = function (inputVal, spanID, message, array, status) {
        var isExist = false;

        isExist = array.some(function (item) {
            return item.taiKhoan === inputVal;
        });

        if (isExist && status == "add") {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    //check value is a string, not a number
    this.checkString = function (inputVal, spanID, message) {

        var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (namePattern.test(inputVal)) {

            document.getElementById(spanID).innerHTML = "";

            return true;
        } else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;

            return false;
        }
    }

    // check email format
    this.checkEmail = function (inputVal, spanID, message) {

        var EmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (inputVal.match(EmailPattern)) {

            document.getElementById(spanID).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;


            return false;
        }
    }

    //check password
    this.checkPassWord = function (inputVal, spanID, message) {

        var passWordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (inputVal.match(passWordPattern)) {

            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;

            return false;
        }
    }

    // check dropdown list must to choose
    this.checkDropDown = function (selectID, spanID, message) {

        if (document.getElementById(selectID).selectedIndex != 0) {

            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        else {
            document.getElementById(spanID).classList.remove("d-none");
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

}