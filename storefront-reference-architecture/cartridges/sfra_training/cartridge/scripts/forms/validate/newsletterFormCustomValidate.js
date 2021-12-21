    exports.validate = function (form) {

        if (form.subscribeToSecondEmailList.checked && empty(form.firstName.value)) {
    
            form.firstName.invalidateFormElement('error.firstname.reqired.to.subscribe.to.additional.list');
    
            return false;
    
        }
    
        return true;
    
    };
    