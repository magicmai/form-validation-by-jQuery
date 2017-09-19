$(function () {
	'use strict';

	/**
	 * 过程：
	 * 1. 通过传入的参数 `selector` 获取 `input` 元素中用户输入的值 （`val`）
	 * 2. 获取输入错误时负责给用户提示信息的 （`div`） 元素
	 * 3. 转换 `data-rule` 属性的字符串值为对象 （`rule`）
	 * 4. 新建检测函数的实例，传入用户输入的值和存储验证规则的对象 （`val` 和 `rule`）：`new Validator(val, rule)`
	 * 5. 监听 `input` 输入框中值的变化，判断合法性
	 */
	
	window.Input = function (selector) {             // '#test'
		var val, 
			$ele,
			$error_ele, 
			me = this, 
			rule = {
				required: true
			};

		function init() {
			find_ele();
			get_error_ele();
			parse_rule();			
			me.load_validator();
			listen();
		}

		/**
		 * 找到 input 元素 赋值给 $ele
		 * @return $ele
		 */
		function find_ele() {                   // 传入 $('#test') OR '#test'
			if (selector instanceof jQuery) {
				$ele = selector;
			} else {				
				$ele = $(selector);
			}
			// console.log('$ele: ', $ele);  // input 标签
		}

		/*获取错误时获得相对应的用于显示提示信息的 div 元素*/
		function get_error_ele() {
			$error_ele = $(get_error_selector());  // div#age-input-error         
		}

		/*动态获取元素 name 属性的值（填写错误时）*/
		function get_error_selector() {
			return '#' + $ele.attr('name') + '-input-error';  // "#age-input-error"
		}

		/*把字符串 "max:10|min:2" --> 对象 {max: 10, min: 2} */
		function parse_rule() {
			var i;
			var rule_str = $ele.data('rule');
			// console.log('rule_str:', rule_str);  // "max:10|min:2"
			if (!rule_str) return;

			var rule_arr = rule_str.split('|');
			// console.log('rule_arr:', rule_arr);  // ["max:10", "min:2"]

			for (i = 0; i < rule_arr.length; i++) {
				var item_str = rule_arr[i];
				// console.log('item_str:', item_str);  // "max:10"

				var item_arr = item_str.split(':');
				// console.log('item_arr:', item_arr);  // ["min", "2"]

				rule[item_arr[0]] = JSON.parse(item_arr[1]); // {min: 10}
			}
			// console.log('rule:', rule);  // {max: 10, min: 2}
		}

		this.load_validator = function () {
			val = this.get_val();
			this.validator = new Validator(val, rule);
		}

		/*获取 input 元素中用户输入的值*/
		this.get_val = function () {
			// console.log('$ele.val(): ', $ele.val());  // 用户输入值
			return $ele.val();
		}

		function listen() {
			$ele.on('blur', function () {
				var valid = me.validator.is_valid(me.get_val());
				// console.log('valid: ', valid);        // true/false
				if (valid) {
					$error_ele.hide();
				} else {
					$error_ele.show();
				}
			});
		}

		init();
	}
});