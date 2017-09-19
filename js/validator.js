$(function () {
	'use strict';

	window.Validator = function (val, rule) {

		// console.log('val: ', val);        // "abc"
		// console.log('rule: ', rule);      // {max: 10, min: 2}
		
		this.is_valid = function (new_val) {
			var key;
			// console.log('new_val: ', new_val);

			if (new_val !== 'undefined') {
				val = new_val;
				// console.log('val: ', val);
			}

			/* 如果不是必填项用户未填写任何内容则直接判定为合法 */
			if (!rule.required && !val) {
				return true;
			}

			for (key in rule) {
				/* 上面已筛选了非必填的，这里防止重复检查 */
				if (key === 'required') {
					continue;
				}

				/* 调用 rule 中相对应的方法 */
				console.log('key: ', key);
				var r = this['validate_' + key]();    // validate_max()
				console.log('r: ', r);
				if (!r) {
					return false;
				}
			}
			return true;
		}

		/* 用于完成 this.validate_max 或 this.validate_min 的前置工作 */
		function pre_max_min() {
			val = parseFloat(val);
		}

		/* 用于完成 this.validate_maxlength 或 this.validate_minlength 的前置工作 */
		function pre_length() {
			val = val.toString();
		}

		this.validate_max = function () {
			pre_max_min();
			return val <= rule.max;
		}

		this.validate_min = function () {
			pre_max_min();
			return val >= rule.min;
		}

		this.validate_maxlength = function () {
			pre_length();
			return val.length <= rule.maxlength;
		}

		this.validate_minlength = function () {
			pre_length();
			return val.length >= rule.minlength;
		}

		this.validate_numeric = function () {
			return $.isNumeric(val);
		}

		this.validate_required = function () {
			var real = $.trim(val);
			if (!val && val !== 0) {
				return false;
			}
			return true;
		}

		this.validate_pattern = function () {
			var reg = new RegExp(rule.pattern);
			return reg.test(val);
		}
		
	}
});