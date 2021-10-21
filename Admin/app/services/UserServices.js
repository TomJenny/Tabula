function UserServices() {
    // get data from mockAPI
    this.getData = function () {
        var promise = axios({
            method: 'get',
            url: 'https://6065c01ab8fbbd001756734e.mockapi.io/product'
        });
        return promise;
    }

    // get an object form database 
    this.getUser = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://6065c01ab8fbbd001756734e.mockapi.io/product/${id}`
        });
        return promise;
    }

    //add an object into database with username
    this.addUser = function (user) {
        var promise = axios({
            method: 'post',
            url: 'https://6065c01ab8fbbd001756734e.mockapi.io/product',
            data: user
        });
        return promise;
    }

    //delete an object in database
    this.delUser = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://6065c01ab8fbbd001756734e.mockapi.io/product/${id}`
        });
        return promise;
    }

    // update an object base on id 
    this.updateUser = function (id, user) {
        var promise = axios({
            method: 'put',
            url: `https://6065c01ab8fbbd001756734e.mockapi.io/product/${id}`,
            data: user
        });
        return promise;
    }


}

