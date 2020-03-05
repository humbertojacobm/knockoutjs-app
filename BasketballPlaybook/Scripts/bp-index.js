/// <reference path="knockout-3.5.1.js" />
/// <reference path="jquery-ui-1.12.1.min.js" />
/// <reference path="jquery-3.4.1.js" />
/// <reference path="jquery.tmpl.js" />
/// <reference path="ajax-util.js" />
/// <reference path="ko-protected-observable.js" />

$(function() {
    $("#tagDialog").hide();

    // var data = [
    //     { Id: 1, Name: "Ball Handling" },
    //     { Id: 2, Name: "Passing" },
    //     { Id: 3, Name: "Shooting" },
    //     { Id: 4, Name: "Rebounding" },
    //     { Id: 5, Name: "Transition" },
    //     { Id: 6, Name: "Defense" },
    //     { Id: 7, Name: "Team Offense" },
    //     { Id: 8, Name: "Team Defense" }
    // ];

//     var data = [
//        new tagItem("Ball Handling", 1),
//        new tagItem("Passing", 2),
//        new tagItem("Shooting", 3),
//        new tagItem("Rebounding", 4),
//        new tagItem("Transition", 5),
//        new tagItem("Defense", 6),
//        new tagItem("Team Offense", 7),
//        new tagItem("Team Defense", 8)
//    ];

    // function tagItem(name, id){
    //     return {
    //         Name: ko.protectedObservable(name),
    //         Id: ko.observable(id)
    //     }
    // }

    $.getJSON("/tags", function (data){

        var viewModel = {
            //data
            tags: ko.observableArray(ko.toProtectedObservableItemArray(data)),
            tagToAdd: ko.observable(""),
            selectedTag: ko.observable(null),
            //behaviours.
            addTag: function () {
                // this.tags.push(
                //     {
                //         Name: this.tagToAdd()
                //     }
                // );
                var newTag = {Name: this.tagToAdd()};
                this.tagToAdd("");
                ajaxAdd("/tags", ko.toJSON(newTag), function (data){
                    viewModel.tags.push(new ko.protectedObservableItem(data));
                });
            },
            selectTag: function() {            
                viewModel.selectedTag(this);
            }        
        }

        $(document).on("click", ".tag-delete", function () {
            var itemToRemove = ko.dataFor(this);
            viewModel.tags.remove(itemToRemove);
        });

        $(document).on("click",".tag-edit", function(){
            $("#tagDialog").dialog({
            buttons: {
                Save: function(){
                    $(this).dialog("close");
                    viewModel.selectedTag().commit();
                },
                Cancel: function() { 
                    $(this).dialog("close");
                }
            }
            });
        });



        ko.applyBindings(viewModel);

    })

});