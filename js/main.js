$(function () {	
	'use strict';

	/* 1. 选中页面中所有的 input[data-rule] 元素 */

	var $inputs = $('[data-rule]')
		, $form = $('#signup')
		, inputs = [];

	$inputs.each(function (index, node) {
		// console.log('index: ', index);
		// console.log('node: ', node);
		
		/* 2. 解析每一个 input 的验证规则 */
		var tmp = new Input(node);
		inputs.push(tmp);
	});
	console.log('inputs: ', inputs);

	/* 3. 验证 */
	$form.on('submit', function (e) {
		e.preventDefault();  // 阻止提交行为
		$inputs.trigger('blur');
		for (var i = 0; i < inputs.length; i++) {
			var item = inputs[i];
			var r = item.validator.is_valid();
			if (!r) {
				alert('invalid');
				return;
			}
		}

		//signup();  // 可以新建 signup 函数处理表单提交
		alert('注册成功！');
	});

	function signup() {
		// $.post('./api/signup', {...});
	}
});