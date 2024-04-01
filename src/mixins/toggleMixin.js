//позволяют вынести повторяющийся код в отдельный mixin, который далее можно переиспользовать
// буду юзать для скрытия/показа диалогового окна MyDialogWindow
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		hideDialog() {
			this.$emit('update:show', false);
		},
	},
	mounted() {
		console.log('mixin was mounted');
		// сначала монтируется хук из миксина, а потом хук из диалога
	},
};
