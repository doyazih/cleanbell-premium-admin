var AuthorityTypes = {
    None: {
        code: 'none',
        name: '없음'
    },
    Manager: {
        code: 'manager',
        name: '매니저'
    },
    Administrator: {
        code: 'admin',
        name: '관리자'
    }
}

var convertCodeToName = function (types, code) {

    var keys = Object.keys(types);

    var name = '';

    keys.some(function (key, idx) {
        if (types[key].code == code) {
            name = types[key].name;
            return;
        }
    });

    return name;
}