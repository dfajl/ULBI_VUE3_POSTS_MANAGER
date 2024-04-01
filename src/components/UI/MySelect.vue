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
		methods: {
			changeOption(event) {
				console.log(event);
				this.$emit('update:modelValue', event.target.value);
			},
			/* 
				опишу здесь как я понял двустороннее связывание:
				- в родителе App есть поле selectedSort: '' в дате. Это поле через v-model="selectedSort" связано с атрибутом  v-model="modelValue" в компоненте my-select. Если у <option></option> поле value совпадает с полем
				value у самого селекта, то этот <option></option> становится автоматически выбранным. поэтому изначально в селекте показывается строка "Выберите из списка" (т.е. v-model="selectedSort" == v-model="modelValue" == "". значит выбран самый первый <option></option>).
				Потом при выборе любого другого опшна происходит событие @change="changeOption", которое эммитит наверх (в App) событие по особому шаблону update:modelValue. там, благодаря v-model="selectedSort", обновляется пустая строка в дате на value выбранного опшна. Затем этот value идет в ребенка и попадает в v-model="modelValue". и при совпадении v-model="modelValue" у селекта с :value="option.value"
				в селект выбирается value выбранного опшна
			*/
		},
	};
</script>

<style lang="scss" scoped>
	.mainClass {
		height: 30px;
		background: rgb(98, 183, 183);
		&:hover {
			cursor: pointer;
			background: rgb(92, 212, 212);
		}
	}
</style>
