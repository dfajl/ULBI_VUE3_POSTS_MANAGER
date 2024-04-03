<template>
	<div class="app">
		<my-navbar></my-navbar>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	body {
		font-family: 'Montserrat', sans-serif;
		background: #e1e1e1;
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
