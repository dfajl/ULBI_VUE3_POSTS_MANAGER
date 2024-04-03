<template>
	<button
		class="btn"
		:class="{ bold: isBoldFont }"
		:style="`margin-bottom: ${marginBottom};`"
	>
		<slot> Click </slot>
	</button>
</template>

<script>
	export default {
		name: 'my-button', // для глобальной регистрации компонента
		props: {
			isBoldFont: {
				type: Boolean,
				default: false,
			},
			marginBottom: {
				type: String,
				default: '0px',
			},
		},
		setup(props) {},
	};
</script>

<style lang="scss" scoped>
	.btn {
		padding: 5px;
		background: rgb(113, 191, 191);
		margin: 0;
		border-radius: 5px;
		transition: 0.3s linear;
		&:hover {
			cursor: pointer;
			background: rgb(47, 138, 138);
		}
	}
	.bold {
		font-weight: bold;
	}
</style>
