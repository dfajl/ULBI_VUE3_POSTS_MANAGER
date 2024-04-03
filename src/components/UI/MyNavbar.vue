<template>
	<div class="navbar">
		<my-button @click="$router.push('/')">Vue 3</my-button>
		<my-button @click="$router.push('/about')">О приложении </my-button>
		<my-button @click="$router.push('/posts')">
			Страница с постами
		</my-button>
	</div>
</template>

<script>
	export default {
		name: 'my-navbar',
	};
</script>

<style lang="scss">
	.navbar {
		height: 50px;
		background-color: rgb(179, 178, 178);
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px 0 20px;
		border-radius: 5px;
		margin-bottom: 20px;
	}
</style>
