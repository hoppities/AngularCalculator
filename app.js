(function() {
	'use strict';

	var calculator = angular.module('calculatorApp', []);

	calculator.controller('mainController', ['$scope', function ($scope) {
		$scope.equation;
		var building = false;
		var finalEquation, answer;
		var evaluated = false;
		$scope.number;
		$scope.storedEquations = [];

		$scope.buildEquation = function(input, operator) {
			if (evaluated) {
				evaluated = false;
			}
			if (building) {
				$scope.equation = $scope.equation + " " + input + " " + operator;
				$scope.number = "";
			} else {
				$scope.equation = input + " " + operator;
				$scope.number = "";
				building = true;
			}

			console.log("equation: " + $scope.equation);
			$scope.showEquation = true;
		};

		$scope.inputNumber = function(input) {
			if (evaluated) {
				console.log("This happened");
				$scope.equation = "";
				evaluated = false;
			}
			if ($scope.number) {
				$scope.number = $scope.number + input;
			} else {
				$scope.number = input;
			}
			$scope.showEquation = false;
			console.log("equation at end of input: " + $scope.equation);
		}

		$scope.evaluate = function(equation, lastNumber) {
			finalEquation = equation + " " + lastNumber;
			console.log("final Equation: " + finalEquation);
			answer = math.eval(finalEquation);
			$scope.equation = "" + answer + "";
			$scope.showEquation = true;
			$scope.storedEquations.push(finalEquation + " = " + answer);
			finalEquation = "";
			$scope.number = "";
			evaluated = true;
		};

		$scope.clearCalculator = function() {
			$scope.equation = "";
			$scope.number = "";
		};
	}]);

	calculator.filter('multiplyFilter',function() {
		return function(input) {
		    if (input) {
		        return input.replace(/\*/i, 'X');    
		    }
		}
	});

	calculator.filter('negativeFilter',function() {
		return function(input) {
		    if (input) {
		        return input.replace(/--/i, '');    
		    }
		}
	});
})();