<template>
	<div class="navbar">
		<div>
			<my-button @click="$router.push('/')">Vue 3</my-button>
		</div>

		<div>
			<!-- <my-button>
				<router-link to="/about">О приложении</router-link> будет отображаться как ссылка
			</my-button> -->
			<my-button @click="$router.push('/about')">О приложении</my-button>
		</div>

		<div>
			<my-button @click="$router.push('/posts')">
				Страница с постами
			</my-button>
		</div>
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
		background-color: grey;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px 0 20px;
	}
</style>
