export function validateLetters() {
    var letters = /^[A-Za-z\s]*$/;
    var addressValidation = /^[a-zA-Z0-9\s\.,'-]*$/;  // eslint-disable-line
    
    let i = 1;
    let invalidNameIndices = [];
    let fullNameFlag = false;
    document.querySelectorAll('[name="fullName"]').forEach(function (fullName) {
        if (!fullName.value.match(letters)) {
            fullNameFlag = true;
            invalidNameIndices.push(i);
        }
        i += 1;
    })

    i = 1;
    let invalidAddressIndices = [];
    let addressFlag = false;
    document.querySelectorAll('[name="address"]').forEach(function (address) {
        if (!address.value.match(addressValidation)) {
            addressFlag = true;
            invalidAddressIndices.push(i);
        }
        i += 1;
    })

    if (fullNameFlag && addressFlag) {
        alert(`Full Name of student #(${invalidNameIndices.join(', ')}) should contain letters and spaces only !\n\nAddress of student #(${invalidAddressIndices.join(', ')}) should only contain letters, digits, spaces and ". / , / ' / -"`);
        return false;
    } else if (fullNameFlag) {
        alert(`Full Name of student #(${invalidNameIndices.join(', ')}) should contain letters and spaces only !`);
        return false;
    } else if (addressFlag) {
        alert(`Address of student #(${invalidAddressIndices.join(', ')}) should only contain letters, digits, spaces and ". / , / ' / -"`);
        return false;
    } else {
        return true;
    }
}