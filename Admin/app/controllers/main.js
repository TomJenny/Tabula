//GLOBAL
var UserSer = new UserServices();
var validation = new Validation();
var arrayUser = [];

function getELE(id) {
    return document.getElementById(id);
}

getListUser();

// Get data from database and show on Website
function getListUser() {
    UserSer.getData()
        .then(function (result) {
            // console.log(result.data);
            renderTable(result.data);
            arrayUser = result.data;
        })
        .catch(function (error) {
            console.log(error);
        });

}

// show data on table HTML
function renderTable(arrayUser) {
    var content = "";
    arrayUser.map(function (user, index) {
        content += `
        <tr>
        <td>${user.id}</td>
        <td>${user.taiKhoan}</td>
        <td>${user.matKhau}</td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td>
        <button class="btn btn-danger" onclick="DeleteUser('${user.id}')">Xóa</button>
        <button class="btn btn-success" onclick="ViewUser('${user.id}')">Xem</button>
        </td>
        </tr>
        `;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = content;
}

// add User to database
function AddUser() {
    //get value of user input from form
    var status = "add";
    var user = getValueForm(arrayUser, status);
    if (user != null) {
        UserSer.addUser(user)
            .then(function () {
                getListUser();
                document.querySelector("#myModal .close").click();

            }).catch(function (error) {
                console.log(error);
            })
    }
}

//get data value's user input is valid 
function getValueForm(arrayUser, status) {
    var taiKhoan = getELE("TaiKhoan").value;
    var matKhau = getELE("MatKhau").value;
    var hoTen = getELE("HoTen").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var moTa = getELE("MoTa").value;

    var isValid = true;

    //check value of taiKhoan
    isValid &= validation.checkEmpty(taiKhoan, "txtTaiKhoan", "Vui lòng nhập tên tài khoản") && validation.checkExit(taiKhoan, "txtTaiKhoan", "Tên tài khoản bị trùng", arrayUser, status);

    //check value of matKhau
    isValid &= validation.checkEmpty(matKhau, "txtMatKhau", "Vui lòng nhập mật khẩu") && validation.checkLength(matKhau, "txtMatKhau", "Mật khẩu có độ dài từ 6 đến 8 ký tự", 6, 8) && validation.checkPassWord(matKhau, "txtMatKhau", "Mật khẩu có ít nhất 1 ký tự in hoa, 1 ký tự đặc biệt,1 ký tự số");

    //check value of hoTen
    isValid &= validation.checkEmpty(hoTen, "txtHoTen", "Vui lòng nhập họ và tên") && validation.checkString(hoTen, "txtHoTen", "Họ và Tên không chứa ký tự số và đặc biệt");

    //check value of hoTen
    isValid &= validation.checkEmpty(email, "txtEmail", "Vui lòng nhập Email") && validation.checkEmail(email, "txtEmail", "Email Phải đúng định dạng: nameEmail@Domain.com");

    //check value of hinhAnh
    isValid &= validation.checkEmpty(hinhAnh, "txtHinhAnh", "Vui lòng nhập tên file hình ảnh");

    //check value of ngonNgu
    isValid &= validation.checkDropDown("loaiNgonNgu", "txtLoaiNgonNgu", "Ngôn ngữ phải được chọn");

    //check value of loaiND
    isValid &= validation.checkDropDown("loaiNguoiDung", "txtLoaiNguoiDung", "Loại người dùng phải được chọn");

    //check value of moTa
    isValid &= validation.checkEmpty(moTa, "txtMoTa", "Vui lòng nhập mô tả") && validation.checkLength(moTa, "txtMoTa", "Mô tả phải dưới 60 ký tự", 0, 60);

    if (isValid) {
        var user = new User(
            taiKhoan,
            hoTen,
            matKhau,
            email,
            loaiND,
            ngonNgu,
            moTa,
            hinhAnh
        );
    }
    return user;
}

getELE("btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-title").innerHTML = "THÊM MỚI NGƯỜI SỬ DỤNG";
    var footerELE = document.querySelector(".modal-footer");
    footerELE.innerHTML = `
    <button class="btn btn-success" onclick="AddUser()">Add User</button>
    `;
});

// Delete a user - button xoa
function DeleteUser(id) {
    UserSer.delUser(id)
        .then(function () {
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// view detail information of user - button xem
function ViewUser(id) {
    UserSer.getUser(id)
        .then(function (result) {

            $('#myModal').modal('show');
            document.querySelector(".modal-title").innerHTML = "CẬP NHẬT THÔNG TIN NGƯỜI DÙNG";

            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("HoTen").value = result.data.hoTen;
            getELE("Email").value = result.data.email;
            getELE("HinhAnh").value = result.data.hinhAnh;
            getELE("loaiNgonNgu").value = result.data.ngonNgu;
            getELE("loaiNguoiDung").value = result.data.loaiND;
            getELE("MoTa").value = result.data.moTa;

            var footerELE = document.querySelector(".modal-footer");
            footerELE.innerHTML = `
            <button class="btn btn-success" onclick ="UpdateUser(${result.data.id})">Update Products</button>
            `;

        })
        .catch(function (error) {
            console.log(error);
        });
}


//update information of user - button cap nhat
function UpdateUser(id) {
    var status = null;
    var user = getValueForm(arrayUser, status);

    if (user != null) {
        UserSer.updateUser(id, user)
            .then(function () {

                getListUser();
                document.querySelector("#myModal .close").click();

            }).catch(function (error) {
                console.log(error);
            })
    }

}

// reset content's element in modal
function resetForm() {
    getELE("formQLND").reset();

    var userwarning = document.querySelectorAll(".thongBaoND");
    for (i = 0; i < userwarning.length; i++) {
        document.querySelectorAll(".thongBaoND")[i].classList.add("d-none");
    }
}

document.querySelector("#myModal .close").addEventListener("click", function () {
    resetForm();
});
