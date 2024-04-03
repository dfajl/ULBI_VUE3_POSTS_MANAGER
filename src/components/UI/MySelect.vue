<template>
	<select class="mainClass" :value="modelValue" @change="changeOption">
		<option disabled value="">Сортировать</option>
		<option
			v-for="option in options"
			:key="option.value"
			:value="option.value"
		>
			{{ option.name }}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'my-select',
		props: {
			modelValue: {
				type: String,
			},
			options: {
				type: Array,
				default: () => [],
			},
		},
		setup(props, { emit }) {
			function changeOption(event) {
				emit('update:modelValue', event.target.value);
			}
			return {
				changeOption,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.mainClass {
		border-radius: 5px;
		height: 30px;
		background: rgb(98, 183, 183);
		&:hover {
			cursor: pointer;
			background: rgb(92, 212, 212);
		}
	}
</style>
