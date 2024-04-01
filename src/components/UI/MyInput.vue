<template>
	<input type="text" class="input" :value="modelValue" @input="updateInput" />
	<!-- :value="modelValue" @input="updateInput" именно для синтаксиса глобального компонента -->
</template>

<script>
	export default {
		name: 'my-input',
		props: {
			modelValue: [String, Number], // это для того, чтобы в любом родительском элементе данного компонента работал v-model
		},
		methods: {
			updateInput(event) {
				this.$emit('update:modelValue', event.target.value);
			},
		},
	};
</script>

<style lang="scss">
	.input {
		width: 100%;
		padding: 15px;
		border: 2px solid teal;
		margin-top: 15px;
	}
</style>
