
var pager = function (pager) {

    var paginationCount = 5;

    return {
        paginate: function (index, size, totalCount, render) {

            pager.empty();

            var pagerHtml = '<nav><ul class="pagination pagination-sm"><li><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

            var pagesCount = Math.ceil(totalCount / size);

            var firstPaginationNo = index % paginationCount == 0 ? index - paginationCount + 1 : index - (index % paginationCount) + 1;
            var lastPaginationNo = firstPaginationNo + paginationCount - 1;
            lastPaginationNo = lastPaginationNo > pagesCount ? pagesCount : lastPaginationNo;

            for (var i = firstPaginationNo; i <= lastPaginationNo; i++) {
                if (i == index) {
                    pagerHtml = pagerHtml + '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                }
                else {
                    pagerHtml = pagerHtml + '<li><a href="javascript:void(0)">' + i + '</a></li>';
                }
            }

            pagerHtml = pagerHtml + '<li><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav>';

            pager.append(pagerHtml);

            pager.find('li').click(function (e) {

                if ($(e.currentTarget).find('a').attr('aria-label') == 'Previous') {
                    var current = parseInt($(e.currentTarget.parentElement).find('.active > a')[0].text);
                    if (current > 1) {
                        render(current - 1);
                    }
                }
                else if ($(e.currentTarget).find('a').attr('aria-label') == 'Next') {
                    var current = parseInt($(e.currentTarget.parentElement).find('.active > a')[0].text);
                    if (current + 1 <= pagesCount) {
                        render(current + 1);
                    }
                }
                else {
                    render($(e.currentTarget).find('a')[0].text);
                }
            });
        }
    };
};

function parseQuery(qstr) {
    var query = {};
    if (qstr && qstr != '') {
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
    }
    return query;
}

function serializeQuery(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

function convertHypenPhone(phoneNo) {
    phoneNo = phoneNo.replace(/[^0-9]/g, '');
    var tmp = '';
    if (phoneNo.length < 4) {
        return phoneNo;
    } else if (phoneNo.length < 7) {
        tmp += phoneNo.substr(0, 3);
        tmp += '-';
        tmp += phoneNo.substr(3);
        return tmp;
    } else if (phoneNo.length < 11) {
        tmp += phoneNo.substr(0, 3);
        tmp += '-';
        tmp += phoneNo.substr(3, 3);
        tmp += '-';
        tmp += phoneNo.substr(6);
        return tmp;
    } else {
        tmp += phoneNo.substr(0, 3);
        tmp += '-';
        tmp += phoneNo.substr(3, 4);
        tmp += '-';
        tmp += phoneNo.substr(7);
        return tmp;
    }
    return phoneNo;
};

function convertHypenBizRegistartionNo(bizRegistrationNo) {
    bizRegistrationNo = bizRegistrationNo.replace(/[^0-9]/g, '');
    var tmp = '';
    if (bizRegistrationNo.length < 4) {
        return bizRegistrationNo;
    } else if (bizRegistrationNo.length < 6) {
        tmp += bizRegistrationNo.substr(0, 3);
        tmp += '-';
        tmp += bizRegistrationNo.substr(3);
        return tmp;
    } else {
        tmp += bizRegistrationNo.substr(0, 3);
        tmp += '-';
        tmp += bizRegistrationNo.substr(3, 2);
        tmp += '-';
        tmp += bizRegistrationNo.substr(5, 5);
        return tmp;
    }
    return phoneNo;
};

var setSelectOptions = function (object, types, useEmptyChoice) {

    if (useEmptyChoice) {
        object.append('<option value="">선택하여주세요</option>');
    }
    Object.keys(types).forEach(function (key) {
        var type = types[key];
        object.append('<option value="' + type.code + '">' + type.name + '</option>');
    });
};

var setSearchCheckboxes = function (object, types, useAllChoice, useNone) {
    
    if (useAllChoice) {
        object.append('<label><input search-checkbox="all" type="checkbox" name="" value="" checked>전체</label>&nbsp;&nbsp;');
        
        object.find('input[search-checkbox=all]').click(function () {
            if ($(this).prop('checked')) {
                object.find('input[search-checkbox=target]').prop('checked', true);
            }
            else {
                object.find('input[search-checkbox=target]').prop('checked', false);
            }
        });
    }

    if (useNone) {
        object.append('<label><input search-checkbox="target" type="checkbox" name="" value="" checked>없음</label>&nbsp;&nbsp;');
    }

    Object.keys(types).forEach(function (key) {
        var type = types[key];
        object.append('<label><input search-checkbox="target" type="checkbox" name="" value="' + type.code + '" checked>' + type.name + '</label>&nbsp;&nbsp;')
    });
}

var getAgeByRegistrationNumber = function (registrationNumber) {
    var nowYear = new Date().getFullYear();
    var year = parseInt('19' + registrationNumber.substr(0, 2));

    return nowYear - year + 1;
}