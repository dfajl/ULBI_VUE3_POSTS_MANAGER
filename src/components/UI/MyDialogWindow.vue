<template>
	<div class="dialog" v-if="show" @click="hideDialog">
		<div @click.stop class="dialog__content">
			<!-- @click.stop - чтобы событие не всплывало до уровня всей страницы по клику на модальное окно -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import toggleMixin from '@/mixins/toggleMixin';
	export default {
		name: 'my-dialog-window',

		//вместо этого кода тут будет миксин
		/* props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			hideDialog() {
				this.$emit('update:show', false);
			},
		}, */
		mixins: [toggleMixin],
		mounted() {
			console.log('component was mounted');
		},
	};
</script>

<style lang="scss" scoped>
	.dialog {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		position: fixed;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		transition: 1s linear;
		&__content {
			margin: auto;
			background: white;
			border-radius: 12px;
			min-height: 50px;
			min-width: 400px;
			padding: 20px;
		}
	}
</style>
