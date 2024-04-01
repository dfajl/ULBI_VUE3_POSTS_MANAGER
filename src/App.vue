<template>
	<my-navbar></my-navbar>
	<div class="app">
		<!-- пишем <navbar></navbar> над <router-view></router-view>,
		чтобы навбар был на каждой странице -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	body {
		font-family: 'Montserrat', sans-serif;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.app {
		padding: 20px;
	}
</style>
