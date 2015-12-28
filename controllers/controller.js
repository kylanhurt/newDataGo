//currently empLog has no dependencies, it may also define the module that bootstraps the HTML page (ng-app)
angular.module("maintenance",[]).controller('empEditCtrl',EmpEditCtrl)

//scope acts as glue between view and model            
function EmpEditCtrl ($scope) {
    $scope.employers = employers;
    $scope.startAdd = startAdd;
    $scope.cancel = cancel;
    $scope.add = add;
    $scope.startEdit = startEdit;
    $scope.save = save;
    $scope.startRemove = startRemove;
    $scope.remove = remove;
    $scope.getSelected = getSelected;

    var selected = -1;
    setView('list');

    function setView(view) {
        $scope.view = view;
    }

    function startAdd() {
        $scope.empBox = '';
        setView('add');
    }

    function cancel(){
        setView('list');
    }

    function add(){
        $scope.employers.push($scope.empBox);
        setView('list');
    }

    function startEdit(index) {
        selected = index;
        //put in the employer variable to be set to the indexed company / employer
        $scope.empBox = $scope.employers[index];
        setView('edit');
    }

    function save() {
        $scope.employers[selected] = $scope.empBox;
        setView('list');
    }

    function startRemove(index) {
        selected = index;
        setView('delete');
    }
    
    function remove() {
        $scope.employers.splice(selected, 1); //selected is set to the index at startRemove
        setView('list');
    }
    
    function getSelected() {
        return employers[selected].company;
    }

    /*
    var index = 0;
    $scope.addEmp = function() {
        if($scope.enableAdd()) {
            $scope.employers.push(employers[index++]);
        }
    }

    $scope.clearEmps = function() {
        $scope.employers = [];
        index = 0;
    }

    $scope.enableAdd = function() {
        //returns the value of whether or not there are any entries left
        return index < employers.length;
    }
    */
}
