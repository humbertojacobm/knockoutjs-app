/// <reference path="knockout-3.5.1.js" />
/// <reference path="jquery-3.4.1.js" />

ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        $(element).keypress(function (event) {
            if (event.which === 13) {
                value.call(viewModel);
                return false;
            }
            return true;
        });
    }
};