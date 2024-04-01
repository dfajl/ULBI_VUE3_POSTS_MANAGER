<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'my-button', // для глобальной регистрации компонента
	};
</script>

<style lang="scss" scoped>
	.btn {
		/* выровнял кнопку по правому краю */
		//align-self: flex-end;
		background: rgb(107, 233, 233);
		margin: 0;

		&:hover {
			cursor: pointer;
			background: rgb(47, 138, 138);
		}
	}
</style>
