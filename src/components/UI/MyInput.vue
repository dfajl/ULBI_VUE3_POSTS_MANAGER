<template>
	<input type="text" class="input" :value="modelValue" @input="updateInput" />
</template>

<script>
	export default {
		name: 'my-input',
		props: {
			modelValue: [String, Number],
		},
		setup(props, { emit }) {
			function updateInput(event) {
				emit('update:modelValue', event.target.value);
			}
			return {
				updateInput,
			};
		},
	};
</script>

<style lang="scss">
	.input {
		background-color: rgb(187, 187, 187);
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
		border-radius: 5px;
		border: none;
		width: 100%;
		padding: 15px;
		//border: 2px solid teal;
		margin-top: 15px;
	}
</style>
